import * as THREE from "three";
import { finalParts } from "$lib/store/store";
import { updateOrderProgress } from "./undoFunctions.js";
import { resetHighlightMaterial } from "./highlight.js";
import { getOldMaterialFromObject } from "./undoFunctions.js";

export function applyTextureToObject(
  object,
  textureURL,
  selectedObjectName,
  selectedMaterial
) {
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
      texture.repeat.set(1, 1);
      applyAlphaFadeOut(texture, 0.8);

      object.traverse(function (child) {
        if (child.name === selectedObjectName && child.material) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });

      // 여기서 추가로 기능을 구현
      resetHighlightMaterial(object);
      let oldValue = getOldMaterialFromObject(object, selectedObjectName);

      finalParts.update((values) => {
        return {
          ...values,
          [selectedObjectName]: {
            ...values[selectedObjectName],
            texture: selectedMaterial,
          },
        };
      });

      updateOrderProgress(
        "texture",
        selectedObjectName,
        oldValue,
        selectedMaterial
      );
    },
    undefined,
    function (err) {
      console.error("An error happened while loading texture.");
      console.error(err);
    }
  );
}
// 텍스처의 가장자리에 투명도를 적용하여 페이드 아웃하는 함수
function applyAlphaFadeOut(texture, fadeOutStrength) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = texture.image.width;
  canvas.height = texture.image.height;
  ctx.drawImage(texture.image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const edgeSize = 2; // 가장자리에 적용할 페이드 아웃 영역 크기
  const fadeOutDistance = edgeSize * fadeOutStrength;

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % canvas.width;
    const y = Math.floor(i / (4 * canvas.width));

    // 가장자리에 해당하는 픽셀에 대해 투명도 조절
    if (
      x < edgeSize ||
      x >= canvas.width - edgeSize ||
      y < edgeSize ||
      y >= canvas.height - edgeSize
    ) {
      const distance = Math.min(
        x,
        y,
        canvas.width - x - 1,
        canvas.height - y - 1
      );
      const alpha = 1 - Math.min(distance / fadeOutDistance, 1);
      data[i + 3] = Math.round(alpha * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  texture.image = canvas;
  texture.needsUpdate = true;
}
