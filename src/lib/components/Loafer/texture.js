import * as THREE from "three";
import { finalParts } from "$lib/store/store";
import { resetHighlightMaterial } from "./highlight.js";
import { getOldMaterialFromObject } from "./undoFunctions.js";
import { logChanges } from "./logChanges.js";

export function applyTextureToObject(
  object,
  textures,
  selectedObjectName,
  selectedMaterial
) {
  const textureTypes = [
    "albedo",
    "ao",
    "dx",
    "height",
    "metallic",
    "roughness",
  ];

  object.traverse(function (child) {
    if (child.name === selectedObjectName && child.material) {
      textureTypes.forEach((textureType) => {
        if (!textures[textureType]) {
          if (textureType === "albedo") {
            child.material.map = null;
          } else if (textureType === "ao") {
            child.material.aoMap = null;
          } else if (textureType === "dx" || textureType === "height") {
            child.material.displacementMap = null;
            child.material.displacementScale = 0;
            child.material.displacementBias = 0;
          } else if (textureType === "metallic") {
            child.material.metalnessMap = null;
          } else if (textureType === "roughness") {
            child.material.roughnessMap = null;
          }

          child.material.needsUpdate = true;
        } else {
          new THREE.TextureLoader().load(
            textures[textureType],
            function (texture) {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(1, 1);

              if (textureType === "albedo") {
                child.material.map = texture;
              } else if (textureType === "ao") {
                child.material.aoMap = texture;
              } else if (textureType === "dx") {
                child.material.displacementMap = texture;
                child.material.displacementScale = 0;
                child.material.displacementBias = 0;
              } else if (textureType === "height") {
                child.material.displacementMap = texture;
              } else if (textureType === "metallic") {
                child.material.metalnessMap = texture;
              } else if (textureType === "roughness") {
                child.material.roughnessMap = texture;
              }

              child.material.needsUpdate = true;

              resetHighlightMaterial(object);
              let oldValue = getOldMaterialFromObject(
                object,
                selectedObjectName
              );
            },
            undefined,
            function (err) {
              console.error(
                `An error happened while loading ${textureType} texture.`
              );
              console.error(err);
            }
          );
        }
      });
    }
  });
}
