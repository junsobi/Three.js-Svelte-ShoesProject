import { get } from "svelte/store";
import {
  loaferData,
  orderProgress,
  backOrderProgress,
  finalParts,
  initialParts,
} from "../../store/store";
import { applyColorToObject } from "./coloring.js";
import { applyTextureToObject } from "./texture.js";
import MATERIALS from "../MATERIALS";

function findTextureUrl(textureName) {
  const texture = MATERIALS.find((m) => m.name === textureName);
  return texture ? texture.image : null;
}

export function redoLastChange() {
  let backOrderProgressList = get(backOrderProgress);
  let redoChange = backOrderProgressList[backOrderProgressList.length - 1];

  if (redoChange) {
    let loaferModel = get(loaferData);
    let finalPartValue = get(finalParts)[redoChange.objectName];

    if (redoChange.type === "color") {
      applyColorToObject(
        loaferModel,
        redoChange.newValue || finalPartValue.color,
        redoChange.objectName
      );
    } else if (redoChange.type === "texture") {
      applyTextureToObject(
        loaferModel,

        redoChange.newValue || finalPartValue.texture,
        redoChange.objectName
      );
    }

    backOrderProgress.update((progress) => progress.slice(0, -1));

    orderProgress.update((progress) => [...progress, redoChange]);

    finalParts.update((values) => {
      if (redoChange.type === "color") {
        let updatedColor = redoChange.newValue || finalPartValue.color;
        return {
          ...values,
          [redoChange.objectName]: {
            ...values[redoChange.objectName],
            color: updatedColor === finalPartValue.color ? null : updatedColor,
          },
        };
      } else if (redoChange.type === "texture") {
        let updatedTexture = redoChange.newValue || finalPartValue.texture;
        return {
          ...values,
          [redoChange.objectName]: {
            ...values[redoChange.objectName],
            texture:
              updatedTexture === finalPartValue.texture ? null : updatedTexture,
          },
        };
      }
    });
  }
}
export function undoLastChange() {
  let currentOrderProgress = get(orderProgress);
  let lastChange = currentOrderProgress[currentOrderProgress.length - 1];

  if (lastChange) {
    let loaferModel = get(loaferData);
    let initialValue = get(initialParts)[lastChange.objectName];

    if (lastChange.type === "color") {
      applyColorToObject(
        loaferModel,
        lastChange.oldValue || initialValue.color,
        lastChange.objectName
      );
    } else if (lastChange.type === "texture") {
      applyTextureToObject(
        loaferModel,
        lastChange.oldValue || initialValue.texture,
        lastChange.objectName
      );
    }

    let updatedLastChange = {
      ...lastChange,
      newValue:
        lastChange.type === "texture"
          ? findTextureUrl(lastChange.newValue)
          : lastChange.newValue,
    };

    backOrderProgress.update((progress) => [...progress, updatedLastChange]);

    orderProgress.update((progress) => progress.slice(0, -1));

    finalParts.update((values) => {
      if (lastChange.type === "color") {
        let updatedColor = lastChange.oldValue || initialValue.color;
        return {
          ...values,
          [lastChange.objectName]: {
            ...values[lastChange.objectName],
            color: updatedColor === initialValue.color ? null : updatedColor,
          },
        };
      } else if (lastChange.type === "texture") {
        let updatedTexture = lastChange.oldValue || initialValue.texture;
        return {
          ...values,
          [lastChange.objectName]: {
            ...values[lastChange.objectName],
            texture:
              updatedTexture === initialValue.texture ? null : updatedTexture,
          },
        };
      }
    });
  }
}

export function getOldColorFromObject(object, selectedObjectName) {
  let oldColor = null;
  if (object) {
    object.traverse(function (child) {
      if (
        child.name === selectedObjectName &&
        child.material &&
        child.material.color
      ) {
        oldColor = child.material.color.getHexString();
      }
    });
  }
  return oldColor;
}

export function getOldMaterialFromObject(object, selectedObjectName) {
  if (object) {
    let targetChild;
    object.traverse(function (child) {
      if (child.name === selectedObjectName) {
        targetChild = child;
      }
    });

    if (
      targetChild &&
      targetChild.material &&
      targetChild.material.map &&
      targetChild.material.map.image
    ) {
      return targetChild.material.map.image.src;
    }
  }

  return null;
}
