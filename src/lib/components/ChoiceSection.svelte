<script>
  import ChosenPart from "./ChosenPart.svelte";
  import ColorChoice from "./ColorChoice.svelte";
  import ColorMaterialChoice from "./ColorMaterialChoice.svelte";

  import MaterialChoice from "./MaterialChoice.svelte";
  import { createEventDispatcher } from "svelte";
  import ChoosenPart from "./ChosenPart.svelte";

  const dispatch = createEventDispatcher();

  function handleToggleExpand() {
    dispatch("toggleExpand");
  }
</script>

<div class=" z-50 w-full h-full bg-white choiceSection">
  <ChosenPart on:toggleExpand={handleToggleExpand} />
  <MaterialChoice />
  <ColorChoice />
  <!-- <ControlBox /> -->
</div>

<style>
  .choiceSection {
    border: 1px solid white;
  }
</style>
