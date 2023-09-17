import {
  orderProgress,
  currentPosition,
  selectedObjectName,
  selectedColor,
  selectedMaterial,
  initialParts,
} from "$lib/store/store";
import { get } from "svelte/store";

export function logChanges(action, where, texture, color) {
  // 'push' action일 때는 동작을 기록
  if (action === "push") {
    pushFunction(where, texture, color);
    return;
  }

  // 'undo' action일 때는 undo 함수를 호출
  if (action === "undo") {
    undoFunction();
    return;
  }

  if (action === "redo") {
    redoFunction();
    return;
  }
}
function pushFunction(where, texture, color) {
  let isFirstWhere;
  orderProgress.update((arr) => {
    isFirstWhere = !arr.find((item) => item.where === where);
    const initialPartsStoreValue = get(initialParts);

    if (isFirstWhere) {
      const initialPart = initialPartsStoreValue[where];
      arr.push({
        where,
        texture: "leather2",
        color: initialPart.color,
      });
    }
    currentPosition.update((n) => n + (isFirstWhere ? 2 : 1));

    const currentPositionValue = get(currentPosition);
    if (currentPositionValue < arr.length) {
      arr.splice(currentPositionValue);
    }

    arr.push({ where, texture, color });
    return arr;
  });
}

export function undoFunction() {
  currentPosition.update((n) => {
    let newCurrentPosition = n - 1; // 현재 위치를 감소
    if (newCurrentPosition < 0) newCurrentPosition = 0; // 현재 위치가 0 이하인 경우 0으로 설정

    // 그 위치에 해당되는 OrderProgress 내용을 가져온다
    const orderProgressStoreValue = get(orderProgress);
    const initialPartsStoreValue = get(initialParts); // 추가

    if (newCurrentPosition === 0) {
      // 처음으로 되돌릴 경우, 최초의 상태로 되돌리기
      const orderAtFirstPosition = orderProgressStoreValue[0];
      selectedObjectName.set(orderAtFirstPosition.where);
      // 수정
      selectedColor.set(
        initialPartsStoreValue[orderAtFirstPosition.where].color
      );
      selectedMaterial.set(
        initialPartsStoreValue[orderAtFirstPosition.where].texture
      );
    } else {
      // 그 외의 경우, 해당 위치의 OrderProgress 내용에 따라 상태를 업데이트한다
      const orderAtCurrentPosition =
        orderProgressStoreValue[newCurrentPosition - 1];
      selectedObjectName.set(orderAtCurrentPosition.where);
      selectedColor.set(orderAtCurrentPosition.color);
      selectedMaterial.set(orderAtCurrentPosition.texture);
    }

    return newCurrentPosition;
  });
}

export function redoFunction() {
  currentPosition.update((n) => {
    let orderProgressStoreValue = get(orderProgress);
    let newCurrentPosition = n + 1; // 현재 위치를 증가

    if (newCurrentPosition >= orderProgressStoreValue.length + 1) {
      // 최신 동작까지 redo한 경우, 아무 작업도 수행하지 않음
      return n;
    }
    const orderAtCurrentPosition =
      orderProgressStoreValue[newCurrentPosition - 1];
    selectedObjectName.set(orderAtCurrentPosition.where);
    selectedColor.set(orderAtCurrentPosition.color);
    selectedMaterial.set(orderAtCurrentPosition.texture);

    return newCurrentPosition;
  });
}
