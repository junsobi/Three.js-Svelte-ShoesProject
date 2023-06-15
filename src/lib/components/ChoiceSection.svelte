<script>
	import ChosenPart from './ChosenPart.svelte';
	import ColorMaterialChoice from './ColorMaterialChoice.svelte';
	import ControlBox from './ControlBox.svelte';
</script>

<div
	class="fixed top-0 right-0 z-50 w-1/3 h-full bg-gray-700 bg-opacity-20 backdrop-blur choiceSection"
>
	<ChosenPart />
	<ColorMaterialChoice />
	<ControlBox />
</div>

<style>
	.choiceSection {
		border-left: 1px solid white;
	}
</style>
