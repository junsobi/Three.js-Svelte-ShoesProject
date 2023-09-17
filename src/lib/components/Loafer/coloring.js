import * as THREE from "three";
import { finalParts, undoing } from "$lib/store/store";

import { resetHighlightMaterial } from "./highlight.js";
import { logChanges } from "./logChanges.js";
import { get } from "svelte/store";

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
    applyColorToObject(object, selectedColor, selectedObjectName);
    resetHighlightMaterial(object);
  }
}
