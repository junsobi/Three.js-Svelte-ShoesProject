import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export function initScene({ minDistance = 100, maxDistance = 500, fov = 100 }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  let renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 배경색을 fafafa로 설정합니다.
  renderer.setClearColor(new THREE.Color("#fffaff"));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.92);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

  scene.add(directionalLight);
  scene.add(ambientLight);

  directionalLight.castShadow = true;
  directionalLight.position.set(1, 20, 5).normalize();

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // PCFSoftShadowMap는 그림자를 더 부드럽게
  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    new THREE.MeshPhongMaterial({ color: 0xfffaff, shininess: 10 })
  );
  plane.rotation.x = -Math.PI / 2; // -90 degrees
  plane.position.y = 0.051;
  plane.receiveShadow = true;
  scene.add(plane);
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.1;

  return { scene, camera, renderer, controls };
}
