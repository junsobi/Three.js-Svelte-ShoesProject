export function applyHighlightMaterial(object, highlightMaterial) {
	if (object.material && highlightMaterial) {
		object.material = highlightMaterial;
	}
}

export function resetHighlightMaterial(object) {
	if (object.material && object.userData.originalMaterial) {
		object.material = object.userData.originalMaterial;
	}
}

export function setHighlightColor(object, highlightColor) {
	if (object.material) {
		object.material.color = highlightColor;
	}
}

export function resetHighlightColor(object) {
	if (object.material && object.userData.originalColor) {
		object.material.color = object.userData.originalColor;
	}
}

export function removeHighlight(loafer) {
	if (loafer) {
		loafer.traverse(function (child) {
			resetHighlightMaterial(child);
			resetHighlightColor(child);
		});
	}
}
