<script>
  import ChosenPart from "./ChosenPart.svelte";
  import ColorChoice from "./ColorChoice.svelte";
  import ColorMaterialChoice from "./ColorMaterialChoice.svelte";
  import ControlBox from "./ControlBox.svelte";
  import MaterialChoice from "./MaterialChoice.svelte";
</script>

<div class=" z-50 w-full h-full bg-white choiceSection">
  <ChosenPart />
  <MaterialChoice />
  <ColorChoice />
  <!-- <ControlBox /> -->
</div>

<style>
  .choiceSection {
    border: 1px solid white;
  }
</style>
