<script>
  import materials from "./MATERIALS";
  import { logChanges } from "./Loafer/logChanges";
  import {
    selectedObjectName,
    selectedMaterial,
    finalParts,
  } from "$lib/store/store";
  import { get } from "svelte/store";

  let startX, scrollLeft;
  let carousel;
  let isDown = false;

  function startDrag(e) {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  }

  function drag(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const scroll = x - startX;
    carousel.scrollLeft = scrollLeft - scroll;
  }

  function stopDrag(e) {
    isDown = false;
  }
</script>

<div
  bind:this={carousel}
  on:mousedown={startDrag}
  on:mousemove={drag}
  on:mouseup={stopDrag}
  on:mouseleave={stopDrag}
  class="flex flex-nowrap lg:justify-center w-full pb-2 overflow-x-auto px-4 carousel"
>
  {#each materials as material}
    <button
      on:click={() => {
        if ($selectedObjectName) {
          selectedMaterial.set(material.name);

          finalParts.update((parts) => ({
            ...parts,
            [$selectedObjectName]: {
              ...parts[$selectedObjectName],
              texture: $selectedMaterial,
            },
          }));

          logChanges(
            "push",
            $selectedObjectName,
            $selectedMaterial,
            get(finalParts)[get(selectedObjectName)].color
          );
        }
      }}
      class="material-button m-1 flex items-center justify-center text-sm"
      style="background-image: url({material.preview});"
    >
      <p class="text-white">{material.alt}</p>
    </button>
  {/each}
</div>

<style>
  .carousel {
    scroll-behavior: smooth;
  }
  .material-button {
    width: 152px;
    height: 36px;
    border-radius: 18px;
    background-color: rgba(0, 0, 0, 0.3);
    background-blend-mode: multiply;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    flex-shrink: 0;
  }
</style>
