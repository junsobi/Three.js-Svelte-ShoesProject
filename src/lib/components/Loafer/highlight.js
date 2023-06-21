// highlight.js
import { hoverPart, selectedObjectName } from "$lib/store/store";
import { get } from "svelte/store";
import * as THREE from "three";

let hoverTimeout;

export function setHighlightOnHover(loafer, timeoutDuration = 1600) {
  if (loafer && get(selectedObjectName)) {
    hoverPart.set(get(selectedObjectName));

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    hoverTimeout = setTimeout(() => {
      hoverPart.set("");
    }, timeoutDuration);
  }

  return hoverTimeout;
}

export function applyHighlightMaterial(
  object,
  highlightMaterial,
  highlightColor
) {
  if (object.material) {
    if (!highlightMaterial) {
      highlightMaterial = object.material.clone();
      highlightMaterial.transparent = true;
      highlightMaterial.opacity = 0.5;
      object.userData.originalMaterial = object.material;
    }
    object.material = highlightMaterial;
    object.material.color = highlightColor;
  }
}

export function resetHighlightMaterial(object) {
  if (object.material && object.userData.originalMaterial) {
    object.material = object.userData.originalMaterial;
  }
}

export function removeHighlight(loafer) {
  if (loafer) {
    loafer.traverse(function (child) {
      resetHighlightMaterial(child);
    });
  }
}

export function applyHighlight(loafer, highlightMaterial, highlightColor) {
  if (loafer && get(hoverPart)) {
    removeHighlight(loafer);

    loafer.traverse(function (child) {
      if (child.name === get(hoverPart)) {
        applyHighlightMaterial(child, highlightMaterial, highlightColor);
      }
    });
  } else {
    removeHighlight(loafer);
  }
}
