export function animate(
  scene,
  camera,
  controls,
  renderer,
  targetCameraPosition,
  cameraMoveSpeed,
  cameraPositionChanged,
  setCameraPositionChanged
) {
  const loop = () => {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);

    if (cameraPositionChanged) {
      const currentPosition = camera.position.clone();
      const newPosition = currentPosition.lerp(
        targetCameraPosition,
        cameraMoveSpeed
      );
      camera.position.copy(newPosition);

      const distance = currentPosition.distanceTo(targetCameraPosition);
      if (distance < 0.01) {
        setCameraPositionChanged(false);
      }
    }
  };

  return loop;
}
