import * as THREE from "three";

export function setupRaycaster(
  canvas,
  camera,
  scene,
  setHoverPart,
  setSelectedObjectName,
  setSelectedColor,
  setSelectedMaterial,
  setHoverTimeout,
  hoverTimeout,
  controls
) {
  function onMouseClick(event) {
    // 드래그 중인 경우에는 클릭 이벤트를 처리하지 않음
    if (controls.isDragging) {
      return;
    }

    const canvasHeight = canvas.offsetHeight;

    if (event.clientY > canvasHeight) {
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
          if (setSelectedObjectName !== objectNameToSelect) {
            setSelectedObjectName(objectNameToSelect);
            setSelectedColor("");
            setSelectedMaterial("");

            setHoverPart(objectNameToSelect);
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            setHoverTimeout(
              setTimeout(() => {
                setHoverPart("");
              }, 1600)
            );
          }
        }
      }
    }
  }

  window.addEventListener("click", onMouseClick, false);
}
