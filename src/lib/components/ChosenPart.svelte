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

  finalParts.subscribe((value) => {
    parts = value;
  });

  selectedObjectName.subscribe((value) => {
    selectedAltName = parts[value]?.alt || "";
  });

  onMount(() => {
    const handleClickOutside = (event) => {
      if (
        showModal &&
        !document.querySelector(".modal").contains(event.target)
      ) {
        showModal = false;
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div
  class="flex flex-col gap-4 p-10 h-28 text-lg font-bold justify-center items-center text-black chosenContainer"
>
  <button
    class="flex pb-3 text-sm gap-5 text-center justify-center items-center"
    style="height: 2em;"
    on:click={(event) => {
      event.stopPropagation();
      showModal = !showModal;
    }}
  >
    <div>{selectedAltName}</div>
  </button>

  {#if showModal}
    <ChangeableParts class="modal" onClose={() => (showModal = false)} />
  {/if}
</div>

<style>
  .chosenContainer {
    border-bottom: 1px solid black;
  }
  .chosenTitle {
    position: relative;
    width: 100%;
  }
</style>
