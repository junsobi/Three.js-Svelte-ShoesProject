<script>
  import { createEventDispatcher } from "svelte";
  import {
    hoverPart,
    selectedColor,
    selectedMaterial,
    selectedObjectName,
    finalParts,
    cameraPosition,
  } from "$lib/store/store";
  import ChangeableParts from "./ChangeableParts.svelte";

  import { undoFunction, redoFunction } from "./Loafer/logChanges.js";
  import objectsCameraPosition from "./objectsCameraPosition.js";

  const dispatch = createEventDispatcher();
  let showModal = false;
  let parts = {};
  let selectedAltName = "";
  let selectedObjectIndex = 0;
  let partsOrder = [];
  let isExpanded = true;
  let iconSrc = "/icon/down-arrow.svg";
  let cameraPositionChanged = false;

  finalParts.subscribe((value) => {
    parts = value;
    partsOrder = Object.keys(parts);
  });

  selectedObjectName.subscribe((value) => {
    selectedAltName = parts[value]?.alt || "";
    selectedObjectIndex = partsOrder.indexOf(value);
  });

  function switchPart(direction) {
    if (direction === "left") {
      selectedObjectIndex =
        (selectedObjectIndex + partsOrder.length - 1) % partsOrder.length;
    } else if (direction === "right") {
      selectedObjectIndex = (selectedObjectIndex + 1) % partsOrder.length;
    }
    selectedObjectName.set(partsOrder[selectedObjectIndex]);
    selectedColor.set(null);
    selectedMaterial.set(null);
  }

  function switchPartAndHover(direction) {
    switchPart(direction);
    hoverPart.set(partsOrder[selectedObjectIndex]);
    cameraPosition.set(objectsCameraPosition[partsOrder[selectedObjectIndex]]);
    cameraPositionChanged = true;

    setTimeout(() => {
      hoverPart.set("");
    }, 1600); // 2000ms 뒤에 hoverPart를 초기화
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
    dispatch("toggleExpand");
  }

  $: {
    iconSrc = isExpanded ? "/icon/down-arrow.svg" : "/icon/up-arrow.svg";
  }
</script>

<div
  class="flex w-full md:p-5 p-1 text-lg justify-between items-center text-black chosenContainer"
>
  <div class="flex pl-2 md:gap-24 gap-4 w-2/6 md:w-1/4 controlButton">
    <button
      on:click={undoFunction}
      class="w-9 h-9 rounded-full border-2 border-grey-500 button"
    >
      <img class="w-6 mx-auto" src="/icon/undo.png" alt="취소" />
    </button>
    <button
      on:click={redoFunction}
      class="w-9 h-9 rounded-full border-2 border-grey-500 button"
    >
      <img class="w-6 mx-auto" src="/icon/redo.png" alt="취소" />
    </button>
  </div>
  <div
    class="flex justify-between md:w-auto w-3/6 gap-4 md:gap-48 directionControl"
  >
    <button on:click={() => switchPartAndHover("left")}>
      <img class="w-6" src="/icon/left-arrow.svg" alt="왼쪽" />
    </button>

    <div class="flex items-center gap-8">
      <div
        class="text-center md:text-lg text-sm whitespace-nowrap overflow-visible"
      >
        {selectedAltName}
      </div>
      <p class="md:text-base text-sm text-center text-gray-400">
        {selectedObjectIndex + 1}/{partsOrder.length}
      </p>
    </div>
    <button on:click={() => switchPartAndHover("right")}>
      <img class="w-6" src="/icon/right-arrow.svg" alt="오른쪽" />
    </button>
  </div>

  <div class="flex pr-2 md:gap-24 gap-8 md:w-1/4 w-1/6 justify-end sizeControl">
    <button
      on:click={toggleExpand}
      class="w-9 h-9 rounded-full border-2 border-grey-500 button"
    >
      <img class="w-4 mx-auto" src={iconSrc} alt="축소" />
    </button>
  </div>
</div>

<style>
  .chosenContainer {
    height: 72px;
  }
</style>
