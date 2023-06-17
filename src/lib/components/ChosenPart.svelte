<script>
  import { onMount, onDestroy } from "svelte";
  import {
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

  // onMount(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       showModal &&
  //       !document.querySelector(".modal").contains(event.target)
  //     ) {
  //       showModal = false;
  //     }
  //   };

  //   window.addEventListener("click", handleClickOutside);

  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // });

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
</script>

<div
  class="flex w-full gap-8 p-5 text-lg justify-center items-center text-black chosenContainer"
>
  <button on:click={() => switchPart("left")}
    ><img class="w-6" src="/icon/left-arrow.svg" alt="왼쪽" /></button
  >
  <!-- <button
    class="pb-3 text-sm text-center"
    style="height: 2em;"
    on:click={(event) => {
      event.stopPropagation();
      showModal = !showModal;
    }}
  > -->
  <!-- </button> -->
  <div class="w-20 text-center">
    {selectedAltName}
  </div>
  <p class="text-base text-gray-400">
    {selectedObjectIndex + 1}/{partsOrder.length}
  </p>
  <button on:click={() => switchPart("right")}
    ><img class="w-6" src="/icon/right-arrow.svg" alt="오른쪽" /></button
  >
  <!-- {#if showModal}
    <ChangeableParts class="modal" onClose={() => (showModal = false)} />
  {/if} -->
</div>

<style>
</style>
