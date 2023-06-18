	<script>
  import { orderProgress, finalParts, initialParts } from "$lib/store/store";
  import { undoLastChange } from "./Loafer/undoFunctions";
  import PaymentModal from "./PaymentModal.svelte";
  import FinalParts from "./PaymentModal.svelte";
  import SavingModal from "./SavingModal.svelte";
  let totalParts = 0;
  let completedParts = 0;
  let incompleteParts = [];
  let showModal = false;
  let modalType = "";
  function close() {
    showModal = false;
  }
  function openModal(type) {
    modalType = type;
    showModal = true;
  }

  finalParts.subscribe((value) => {
    totalParts = Object.keys(value).length;
    completedParts = Object.entries(value).filter(
      ([part, data]) => data.texture !== null || data.color !== null
    ).length;
    incompleteParts = Object.entries(value)
      .filter(([part, data]) => data.texture === null && data.color === null)
      .map(([part, data]) => data.alt);
  });

  let tooltip = { x: 0, y: 0, show: false };
  function handleMousemove(event) {
    tooltip = { x: event.offsetX, y: event.offsetY, show: true };
  }
  function handleMouseleave(event) {
    tooltip.show = false;
  }
</script>

<div
  on:mousemove={handleMousemove}
  on:mouseleave={handleMouseleave}
  class="h-full w-full items-center controlBoxWrapper"
>
  <div class="font-bold text-white p-4 pb-0">
    선택 가능구역 : {completedParts} / {totalParts}
  </div>
  <div>
    <div class="w-full p-5">
      <progress class="w-full" max={totalParts} value={completedParts} />
    </div>
    {#if tooltip.show && incompleteParts.length > 0}
      <div class="tooltip">
        <p class="font-bold border-b border-black">남은 구역</p>
        <ul class="text-sm">
          {#each incompleteParts as part (part)}
            <li>{part}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  <div class="flex justify-center items-center">
    <div class="flex gap-4 justify-between items-center w-5/6 buttons">
      <button
        on:click={undoLastChange}
        class="relative w-2/5 h-14 text-lg text-white rounded-full border-2 border-white duration-200 ease-in hover:text-gray-500 hover:bg-white button"
      >
        되돌리기
      </button>
      <button
        on:click={() => openModal("save")}
        class="relative w-2/5 h-14 text-lg text-white rounded-full border-2 border-white duration-200 ease-in hover:text-gray-500 hover:bg-white button"
      >
        <p>저장하기</p>
      </button>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="flex justify-center w-full">
      <button
        on:click={() => openModal("buy")}
        class="mt-3 w-5/6 h-14 text-lg font-bold text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full duration-300 ease-in hover:from-pink-500 hover:to-yellow-500"
        >구매하기</button
      >
    </div>

    {#if showModal}
      {#if modalType === "buy"}
        <PaymentModal {close} />
      {:else if modalType === "save"}
        <SavingModal {close} />
      {/if}
    {/if}
  </div>
</div>

<style>
  .tooltip {
    position: absolute;
    left: -80px;
    top: 70%;
    background: white;
    color: black;
    padding: 1em;
    border-radius: 5px;
    pointer-events: none;
    z-index: 9999;
  }
  .button {
    text-align: center;
  }
</style>
