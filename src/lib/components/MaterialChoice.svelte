<script>
  import materials from "./MATERIALS";
  import ArrowBox from "./ArrowBox.svelte";
  import { selectedObjectName, selectedMaterial } from "$lib/store/store";
  let hoveredMaterial = null;

  function handleMouseOver(material) {
    hoveredMaterial = material;
  }

  function handleMouseOut() {
    hoveredMaterial = null;
  }
</script>

<div class="pb-3 text-xl font-bold text-white">Material</div>
<div class="flex flex-wrap justify-start w-full">
  {#each materials as material}
    <button
      class="relative m-1"
      on:mouseover={() => handleMouseOver(material)}
      on:focus={() => handleMouseOver(material)}
      on:mouseout={handleMouseOut}
      on:blur={handleMouseOut}
      on:click={() =>
        $selectedObjectName && selectedMaterial.set(material.name)}
    >
      <img
        class="w-14 h-14 rounded-full"
        src={material.image}
        alt={material.name}
      />
      {#if hoveredMaterial === material}
        <ArrowBox text={material.name} />
      {/if}
    </button>
  {/each}
</div>
