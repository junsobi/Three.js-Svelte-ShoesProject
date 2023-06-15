<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		selectedColor,
		selectedMaterial,
		selectedObjectName,
		finalParts
	} from '$lib/store/store';
	import ChangeableParts from './ChangeableParts.svelte';
	let showModal = false;
	let parts = {};
	let selectedAltName = '';

	finalParts.subscribe((value) => {
		parts = value;
	});

	selectedObjectName.subscribe((value) => {
		selectedAltName = parts[value]?.alt || '';
	});

	onMount(() => {
		const handleClickOutside = (event) => {
			if (showModal && !document.querySelector('.modal').contains(event.target)) {
				showModal = false;
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div
	class="flex flex-col gap-4 p-10 h-28 text-lg font-bold justify-center items-center text-white chosenContainer"
>
	<div class="flex justify-between items-center chosenTitle">
		<button
			on:click={(event) => {
				event.stopPropagation();
				showModal = !showModal;
			}}
		>
			<img src="icon/menu.svg" alt="menu icon" class="w-5 md:invisible lg:visible icon" />
		</button>
		<button
			on:click={(event) => {
				event.stopPropagation();
				showModal = !showModal;
			}}>{$selectedObjectName ? '색상과 재료를 골라주세요' : '영역을 골라주세요'}</button
		>
		<div clss="md:invisible lg:visible" />
	</div>

	<button
		class="flex pb-3 text-sm gap-5 text-center justify-center items-center"
		style="height: 2em;"
		on:click={(event) => {
			event.stopPropagation();
			showModal = !showModal;
		}}
	>
		<div>선택영역 {selectedAltName}</div>
	</button>

	{#if showModal}
		<ChangeableParts class="modal" onClose={() => (showModal = false)} />
	{/if}
</div>

<style>
	.chosenContainer {
		border-bottom: 1px solid white;
	}
	.chosenTitle {
		position: relative;
		width: 100%;
	}
</style>
