<script>
	import {
		hoverPart,
		selectedObjectName,
		finalParts,
		selectedColor,
		selectedMaterial
	} from '$lib/store/store';
	import { createEventDispatcher } from 'svelte';

	let parts = {};
	finalParts.subscribe((value) => {
		parts = value;
	});
	function handleClick(partKey) {
		selectedObjectName.set(partKey);
		selectedColor.set('');
		selectedMaterial.set('');
		hoverPart.set('');
		$$props.onClose();
	}
</script>

<div class="modal">
	{#each Object.entries(parts) as [partKey, partValue] (partKey)}
		<button
			class="modal-button"
			on:focus={() => hoverPart.set(partKey)}
			on:mouseover={() => hoverPart.set(partKey)}
			on:mouseout={() => hoverPart.set('')}
			on:blur={hoverPart.set('')}
			on:click={() => handleClick(partKey)}
		>
			{partValue.alt}
		</button>
	{/each}
</div>

<style>
	.modal {
		display: flex;
		flex-direction: column;
		z-index: 999;
		background-color: black;
		width: 100%;
		position: absolute;
		top: 10%;
		left: 0;
		opacity: 88%;
	}
	.modal-button {
		height: 50px;
		color: #ffffff;
		background-color: #000000;
		transition: background-color 0.3s ease;
	}
	.modal-button:hover {
		background-color: #333333;
	}
</style>
