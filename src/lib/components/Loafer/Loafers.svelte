<script>
  import { onMount, onDestroy } from "svelte";
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
    initialParts,
    cameraPosition,
    orderProgress,
    currentPosition,
  } from "$lib/store/store";
  import {
    setHighlightOnHover,
    applyHighlight,
    removeHighlight,
  } from "./highlight.js";
  import { applyColorChange } from "./coloring.js";
  import { applyTextureToObject } from "./texture.js";
  import { setupRaycaster } from "./raycaster.js";
  import { handleResize } from "./resize.js";
  import { logChanges } from "./logChanges.js";

  let scene, camera, renderer, loafer, controls;
  let highlightMaterial = null;
  const highlightColor = new THREE.Color("#00FF00");
  let hoverTimeout;
  let cameraSubscribe;
  let targetCameraPosition = new THREE.Vector3(4, 8, 5);
  let cameraPositionChanged = false;
  let cameraMoveSpeed = 0.1; // 카메라 이동 속도를 조정할 수 있는 변수

  $: {
    hoverTimeout = setHighlightOnHover(loafer);
  }

  $: {
    $hoverPart
      ? applyHighlight(loafer, highlightMaterial, highlightColor)
      : removeHighlight(loafer);
  }

  $: {
    if (loafer && $selectedColor && !$hoverPart) {
      const appliedColor = applyColorChange(
        loafer,
        $selectedColor,
        $selectedObjectName,
        $hoverPart
      );
    }
    console.log($orderProgress);
    console.log($currentPosition);
  }

  $: {
    if (loafer && $selectedMaterial && !$hoverPart) {
      const material = MATERIALS.find((m) => m.name === $selectedMaterial);
      if (material) {
        applyTextureToObject(
          loafer,
          material.textures,
          $selectedObjectName,
          $selectedMaterial
        );
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
        loafer = await loadGLTFModel(
          "/model/loafer/Loafers.glb",
          scene,
          initialParts
        );

        loaferData.set(loafer);
        const box = new THREE.Box3().setFromObject(loafer);
        const center = box.getCenter(new THREE.Vector3());
        controls.target.copy(center);
        controls.update();
      } catch (error) {
        console.error("Failed to load glb model: ", error);
      }
    })();

    const canvas = document.querySelector("#canvas");
    const choiceSection = document.querySelector(".pallete");

    handleResize({ canvas, choiceSection, camera, renderer });

    const setHoverTimeout = (timeout) => {
      hoverTimeout = timeout;
    };

    const clearHoverTimeout = () => {
      if (hoverTimeout) {
        cleartTimeout(hoverTimeout);
        hoverTimeout = null;
      }
    };

    setupRaycaster(
      canvas,
      camera,
      scene,
      hoverPart.set,
      selectedObjectName.set,
      selectedColor.set,
      selectedMaterial.set,
      hoverTimeout,
      setHoverTimeout,
      clearHoverTimeout,
      controls
    );

    document.body.appendChild(renderer.domElement); // 렌더러를 DOM에 추가

    const cameraSubscribe = cameraPosition.subscribe(({ x, y, z }) => {
      targetCameraPosition.set(x, y, z);
      cameraPositionChanged = true;
    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // for damping
      renderer.render(scene, camera);
      if (cameraPositionChanged) {
        const currentPosition = camera.position.clone();
        const newPosition = currentPosition.lerp(
          targetCameraPosition,
          cameraMoveSpeed
        );
        camera.position.copy(newPosition);
        // 이동이 완료되었는지 체크
        const distance = currentPosition.distanceTo(targetCameraPosition);
        if (distance < 0.01) {
          cameraPositionChanged = false;
        }
      }
    }
    animate();
  });
</script>

<canvas id="canvas" />
