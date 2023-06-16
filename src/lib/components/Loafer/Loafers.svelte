<script>
  import { onMount, afterUpdate } from "svelte";
  import * as THREE from "three";
  import { initScene } from "./sceneInit.js";
  import { loadGLTFModel } from "./loadGLTFModel.js";
  import MATERIALS from "../MATERIALS.js";
  import {
    loaferData,
    selectedColor,
    selectedMaterial,
    selectedObjectName,
    hoverPart,
    orderProgress,
    finalParts,
    initialParts,
  } from "$lib/store/store";
  import {
    applyHighlightMaterial,
    resetHighlightMaterial,
    setHighlightColor,
    resetHighlightColor,
    removeHighlight,
  } from "./highlight.js";
  import {
    getOldColorFromObject,
    getOldMaterialFromObject,
  } from "./undoFunctions.js";
  import { applyColorToObject } from "./coloring.js";
  import { applyTextureToObject } from "./texture.js";

  let scene, camera, renderer, loafer, controls;
  let highlightMaterial = null;
  const highlightColor = new THREE.Color("#00FF00");

  $: {
    function applyHighlight() {
      if (loafer && $hoverPart) {
        removeHighlight(loafer, resetHighlightMaterial, resetHighlightColor);

        loafer.traverse(function (child) {
          if (child.name === $hoverPart) {
            if (child.material) {
              if (!highlightMaterial) {
                highlightMaterial = child.material.clone();
                highlightMaterial.transparent = true;
                highlightMaterial.opacity = 0.5;
                child.userData.originalMaterial = child.material;
              }
              applyHighlightMaterial(child, highlightMaterial);
              setHighlightColor(child, highlightColor);
            }
          }
        });
      } else {
        removeHighlight(loafer, resetHighlightMaterial, resetHighlightColor);
      }
    }
    applyHighlight();
  }

  $: {
    if (loafer && $selectedColor) {
      let oldValue = getOldColorFromObject(loafer, $selectedObjectName);
      applyColorToObject(loafer, $selectedColor, $selectedObjectName);
      resetHighlightMaterial(loafer);

      finalParts.update((values) => {
        return {
          ...values,
          [$selectedObjectName]: {
            ...values[$selectedObjectName],
            color: $selectedColor,
          },
        };
      });

      orderProgress.update((progress) => [
        ...progress,
        {
          type: "color",
          objectName: $selectedObjectName,
          oldValue: oldValue,
          newValue: $selectedColor,
        },
      ]);
    }
  }

  $: {
    if (loafer && $selectedMaterial) {
      const material = MATERIALS.find((m) => m.name === $selectedMaterial);

      if (material) {
        let oldValue = getOldMaterialFromObject(loafer, $selectedObjectName);

        applyTextureToObject(loafer, material.image, $selectedObjectName);
        resetHighlightMaterial(loafer);

        finalParts.update((values) => {
          return {
            ...values,
            [$selectedObjectName]: {
              ...values[$selectedObjectName],
              texture: $selectedMaterial,
            },
          };
        });

        orderProgress.update((progress) => [
          ...progress,
          {
            type: "texture",
            objectName: $selectedObjectName,
            oldValue: oldValue,
            newValue: $selectedMaterial,
          },
        ]);
      }
    }
  }

  onMount(() => {
    // scene은 3D 객체를 담는 공간, camera는 환경을 어떻게 볼 것인지 정의, renderer는 3D를 렌더링하는 역할, controls는 카메라 컨트롤러 역할

    ({ scene, camera, renderer, controls } = initScene({
      minDistance: 1,
      maxDistance: 20,
      fov: 3,
    }));

    (async () => {
      try {
        loafer = await loadGLTFModel("/model/loafer/Loafers.glb", scene);
        loafer.position.x += 0.1;
        loafer.position.y += 0.1;
        loafer.rotation.x = 0.2;

        loafer.castShadow = true;
        loafer.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
          }

          if (child.material && child.material.color) {
            child.userData.originalMaterial = child.material;

            let initialColor = child.material.color.getHexString();
            initialParts.update((values) => {
              return {
                ...values,
                [child.name]: {
                  ...values[child.name],
                  color: initialColor,
                },
              };
            });
          }
        });
        loaferData.set(loafer);
        const box = new THREE.Box3().setFromObject(loafer);
        const center = box.getCenter(new THREE.Vector3());
        controls.target.copy(center);
        controls.update();

        window.addEventListener("click", onMouseClick, false);
        //정확한 클릭을 위해 로퍼모델이 로드되고 위치조정된뒤에 등록
      } catch (error) {
        console.error("Failed to load glb model: ", error);
      }
    })();

    const canvas = document.querySelector("#canvas");

    function resizeCanvas() {
      const choiceSection = document.querySelector(".pallete");
      const height = window.innerHeight - choiceSection.offsetHeight;
      const width = window.innerWidth;
      canvas.style.height = `${height}px`;
      canvas.style.width = `${width}px`;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();

    function onMouseClick(event) {
      // 드래그 중인 경우에는 클릭 이벤트를 처리하지 않음
      if (controls.isDragging) {
        return;
      }

      if (event.clientY > window.innerHeight - 224) {
        return;
      }
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();

      let canvasBounds = canvas.getBoundingClientRect();

      mouse.x =
        ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.y =
        -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      let intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 1) {
        let firstIntersection = intersects[0];
        let selectedObject = firstIntersection.object;

        let objectNameToSelect; // 선택할 객체의 이름을 저장하기 위한 새로운 변수를 선언

        if (selectedObject.material) {
          if (selectedObject.name !== "Coin") {
            if (selectedObject.name === "Lion") {
              objectNameToSelect = "Leather"; // 'Lion' 객체가 클릭되면 'Leather'를 선택하도록 설정
            } else if (selectedObject.name === "Logo") {
              objectNameToSelect = "Innersole"; // 'Logo' 객체가 클릭되면 'Innersole'를 선택하도록 설정
            } else {
              objectNameToSelect = selectedObject.name; // 그렇지 않으면, 선택한 객체의 이름을 사용
            }
            if ($selectedObjectName !== objectNameToSelect) {
              selectedObjectName.set(objectNameToSelect);
              selectedColor.set("");
              selectedMaterial.set("");
            }
          }
        }
      }
    }

    document.body.appendChild(renderer.domElement); // 렌더러를 DOM에 추가

    camera.position.set(4, 8, 5);
    camera.lookAt(0, 0, 0);

    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // for damping
      renderer.render(scene, camera);
    }
    animate();
  });
</script>

<canvas id="canvas" />
