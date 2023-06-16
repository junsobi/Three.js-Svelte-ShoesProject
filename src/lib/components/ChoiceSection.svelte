<script>
  import ChosenPart from "./ChosenPart.svelte";
  import ColorMaterialChoice from "./ColorMaterialChoice.svelte";
  import ControlBox from "./ControlBox.svelte";
</script>

<div class=" z-50 w-full h-full bg-white choiceSection">
  <ChosenPart />
  <ColorMaterialChoice />
  <!-- <ControlBox /> -->
</div>

<style>
  .choiceSection {
    border: 1px solid white;
    padding-bottom: 30px;
  }
</style>
