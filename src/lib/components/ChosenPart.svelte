<script>
  import { onMount, onDestroy } from "svelte";
  import {
    hoverPart,
    selectedColor,
    selectedMaterial,
    selectedObjectName,
    finalParts,
  } from "$lib/store/store";
  import ChangeableParts from "./ChangeableParts.svelte";
  let showModal = false;
  let parts = {};
  let selectedAltName = "";
  let selectedObjectIndex = 0;
  let partsOrder = [];

  finalParts.subscribe((value) => {
    parts = value;
    partsOrder = Object.keys(parts);
  });

  selectedObjectName.subscribe((value) => {
    selectedAltName = parts[value]?.alt || "";
    selectedObjectIndex = partsOrder.indexOf(value);
  });

  function switchPart(direction) {
    if (direction === "left") {
      selectedObjectIndex =
        (selectedObjectIndex + partsOrder.length - 1) % partsOrder.length;
    } else if (direction === "right") {
      selectedObjectIndex = (selectedObjectIndex + 1) % partsOrder.length;
    }
    selectedObjectName.set(partsOrder[selectedObjectIndex]);
    selectedColor.set(null);
    selectedMaterial.set(null);
  }

  function switchPartAndHover(direction) {
    switchPart(direction);
    hoverPart.set(partsOrder[selectedObjectIndex]);

    setTimeout(() => {
      hoverPart.set("");
    }, 1600); // 2000ms 뒤에 hoverPart를 초기화
  }
</script>

<div
  class="flex w-full gap-28 p-5 text-lg justify-center items-center text-black chosenContainer"
>
  <button on:click={() => switchPartAndHover("left")}
    ><img class="w-6" src="/icon/left-arrow.svg" alt="왼쪽" /></button
  >
  <div class="flex gap-8">
    <div class="w-20 text-center">
      {selectedAltName}
    </div>
    <p class="text-base text-gray-400">
      {selectedObjectIndex + 1}/{partsOrder.length}
    </p>
  </div>
  <button on:click={() => switchPartAndHover("right")}
    ><img class="w-6" src="/icon/right-arrow.svg" alt="오른쪽" /></button
  >
</div>

<style>
</style>
