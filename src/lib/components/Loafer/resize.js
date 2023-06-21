export function handleResize({ canvas, choiceSection, camera, renderer }) {
  function resizeCanvas() {
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

  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
  });
  resizeObserver.observe(choiceSection);
}
