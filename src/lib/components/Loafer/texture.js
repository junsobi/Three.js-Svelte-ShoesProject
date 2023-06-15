import * as THREE from 'three';

export function applyTextureToObject(object, textureURL, selectedObjectName) {
	if (!textureURL) {
		object.traverse(function (child) {
			if (child.name === selectedObjectName && child.material) {
				child.material.map = null;
				child.material.needsUpdate = true;
			}
		});
		return;
	}

	new THREE.TextureLoader().load(
		textureURL,
		function (texture) {
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(2, 2);

			object.traverse(function (child) {
				if (child.name === selectedObjectName && child.material) {
					child.material.map = texture;
					child.material.needsUpdate = true;
				}
			});
		},
		undefined,
		function (err) {
			console.error('An error happened while loading texture.');
			console.error(err);
		}
	);
}
