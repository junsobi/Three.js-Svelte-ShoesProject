<script>
  import colors from "./COLORS";
  import {
    selectedObjectName,
    selectedColor,
    initialParts,
    finalParts,
  } from "$lib/store/store";
  import { logChanges } from "./Loafer/logChanges";
  import { get } from "svelte/store";

  let part;
  let initColor;
  let finalColor;

  $: {
    part = $selectedObjectName;
    if (part in $initialParts && $initialParts[part].color !== undefined) {
      initColor = $initialParts[part].color;
    }
    if (part in $finalParts && $finalParts[part].color !== undefined) {
      finalColor = $finalParts[part].color;
    }
  }

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
  console.log(get(finalParts)[get(selectedObjectName)].texture);
</script>

<div
  bind:this={carousel}
  on:mousedown={startDrag}
  on:mousemove={drag}
  on:mouseup={stopDrag}
  on:mouseleave={stopDrag}
  class="flex flex-nowrap lg:justify-center w-full overflow-x-auto px-4 carousel"
>
  <div class="color-container m-3 relative">
    <button
      on:click={() => $selectedObjectName && selectedColor.set(initColor)}
    >
      <div
        class="w-8 h-8 mb-3 rounded-full border border-gray-500"
        style="background-color: #{initColor}"
      />
      {#if finalColor === null || finalColor === initColor}
        <div
          class="ring-2 ring-gray-500 absolute top-0 left-0 w-8 h-8 rounded-full"
        />
        <p
          class="text-xs text-gray-600 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-visible"
        >
          Default
        </p>
      {/if}
    </button>
  </div>

  {#each colors as color}
    <div class="color-container m-3 relative">
      <button
        on:click={() => {
          if ($selectedObjectName) {
            selectedColor.set(color.code);

            finalParts.update((parts) => ({
              ...parts,
              [$selectedObjectName]: {
                ...parts[$selectedObjectName],
                color: color.code,
              },
            }));

            logChanges(
              "push",

              $selectedObjectName,

              get(finalParts)[get(selectedObjectName)].texture,

              color.code
            );
          }
        }}
      >
        <div
          class="w-8 h-8 mb-2 rounded-full border border-gray-500"
          style="background-color: #{color.code}"
        />
      </button>
      {#if finalColor === color.code}
        <div
          class="ring-2 ring-gray-500 absolute top-0 left-0 w-8 h-8 rounded-full"
        />
        <p
          class="text-xs text-gray-600 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-visible"
        >
          {color.name}
        </p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .carousel {
    scroll-behavior: smooth;
  }
</style>
