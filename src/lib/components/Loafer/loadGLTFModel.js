import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadGLTFModel(modelPath, scene) {
	const loader = new GLTFLoader();

	return new Promise((resolve, reject) => {
		loader.load(
			modelPath,
			(gltf) => {
				const model = gltf.scene;
				scene.add(model);

				resolve(model);
			},
			undefined,
			(error) => {
				console.error(error);
				reject(error);
			}
		);
	});
}
