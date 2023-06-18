<script>
  import "../app.css";
  import ChoiceSection from "$lib/components/ChoiceSection.svelte";
  import Loafers from "$lib/components/Loafer/Loafers.svelte";
  import { orderProgress, finalParts, initialParts } from "$lib/store/store";
  import { undoLastChange } from "$lib/components/Loafer/undoFunctions";
  import PaymentModal from "$lib/components/PaymentModal.svelte";
  import SavingModal from "$lib/components/SavingModal.svelte";

  let isExpanded = true;
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
  function handleToggleExpand() {
    isExpanded = !isExpanded;
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

{#if showModal}
  {#if modalType === "buy"}
    <PaymentModal {close} />
  {:else if modalType === "save"}
    <SavingModal {close} />
  {/if}
{/if}

<div class="title">WAGKI</div>
<button
  on:click={() => openModal("buy")}
  class="fixed right-8 top-8 w-24 h-10 text-sm font-bold border text-black bg-white rounded-full"
  >Done</button
>

<Loafers />
<div class="pallete w-full" class:expanded={isExpanded}>
  <ChoiceSection on:toggleExpand={handleToggleExpand} />
</div>

<style>
  .title {
    position: fixed;
    top: 4%;
    left: 4%;
    color: #2b2b2b;
    font-size: 24px; /* 일반적인 화면 크기를 위한 기본 font-size 설정 */
    letter-spacing: 24px;
    text-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  }

  /* md 사이즈 이상의 화면 크기에 대한 미디어 쿼리 */
  @media screen and (min-width: 768px) {
    .title {
      font-size: 48px; /* md 사이즈 이상일 때의 font-size 설정 */
      letter-spacing: 48px;
    }
  }

  .pallete {
    height: 80px;
    position: fixed;
    bottom: 0;
    z-index: 1;
    transition: height 0.5s ease-in-out;
  }
  .pallete.expanded {
    height: 224px;
  }
</style>
