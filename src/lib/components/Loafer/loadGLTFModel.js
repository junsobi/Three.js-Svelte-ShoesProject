import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export function loadGLTFModel(modelPath, scene, initialParts) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      (gltf) => {
        const loafer = gltf.scene;
        scene.add(loafer);

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

        resolve(loafer);
      },
      undefined,
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}
