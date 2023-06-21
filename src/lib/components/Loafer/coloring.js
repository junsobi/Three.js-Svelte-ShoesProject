import * as THREE from "three";
import { finalParts } from "$lib/store/store";
import { updateOrderProgress } from "./undoFunctions.js";
import { getOldColorFromObject } from "./undoFunctions.js";
import { resetHighlightMaterial } from "./highlight.js";

export function applyColorToObject(object, color, selectedObjectName) {
  if (object && color) {
    const newColor = new THREE.Color("#" + color);

    object.traverse(function (child) {
      if (child.name === selectedObjectName && child.material) {
        child.material.color = newColor;
      }
    });
  }
}

export function applyColorChange(
  object,
  selectedColor,
  selectedObjectName,
  hoverPart
) {
  if (object && selectedColor && !hoverPart) {
    let oldValue = getOldColorFromObject(object, selectedObjectName);
    applyColorToObject(object, selectedColor, selectedObjectName);
    resetHighlightMaterial(object);

    finalParts.update((values) => {
      return {
        ...values,
        [selectedObjectName]: {
          ...values[selectedObjectName],
          color: selectedColor,
        },
      };
    });

    updateOrderProgress("color", selectedObjectName, oldValue, selectedColor);
  }
}
