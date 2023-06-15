import * as THREE from 'three';

export function applyColorToObject(object, color, selectedObjectName) {
	if (object && color) {
		const newColor = new THREE.Color('#' + color);

		object.traverse(function (child) {
			if (child.name === selectedObjectName && child.material) {
				child.material.color = newColor;
			}
		});
	}
}
