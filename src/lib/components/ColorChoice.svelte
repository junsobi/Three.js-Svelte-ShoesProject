<script>
  import colors from "./COLORS";
  import ArrowBox from "./ArrowBox.svelte";
  import { selectedObjectName, selectedColor } from "$lib/store/store";
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
  class="flex flex-nowrap lg:justify-center w-full overflow-x-auto px-4"
>
  {#each colors as color}
    <button
      class=" color-container m-3"
      on:click={() => $selectedObjectName && selectedColor.set(color.code)}
    >
      <div
        class="w-10 h-10 rounded-full border border-gray-500"
        style="background-color: #{color.code}"
      />
    </button>
  {/each}
</div>
