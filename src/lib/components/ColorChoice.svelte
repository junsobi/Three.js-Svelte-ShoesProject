<script>
  import colors from "./COLORS";
  import ArrowBox from "./ArrowBox.svelte";
  import { selectedObjectName, selectedColor } from "$lib/store/store";
  let hoveredColor = null;

  function handleMouseOver(color) {
    hoveredColor = color;
  }

  function handleMouseOut() {
    hoveredColor = null;
  }
</script>

<div class="pb-3 text-xl font-bold text-white">Color</div>
<div class="flex flex-wrap justify-start w-full">
  {#each colors as color}
    <button
      class="relative color-container m-1"
      on:mouseover={() => handleMouseOver(color)}
      on:focus={() => handleMouseOver(color)}
      on:mouseout={handleMouseOut}
      on:blur={handleMouseOut}
      on:click={() => $selectedObjectName && selectedColor.set(color.code)}
    >
      <div
        class="w-14 h-14 rounded-full"
        style="background-color: #{color.code}"
      />
      {#if hoveredColor === color}
        <div class="arrowBox">
          <ArrowBox text={color.name} />
        </div>
      {/if}
    </button>
  {/each}
</div>
