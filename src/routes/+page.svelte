<script>
  import "../app.css";
  import ChoiceSection from "$lib/components/ChoiceSection.svelte";
  import Loafers from "$lib/components/Loafer/Loafers.svelte";
</script>

<main>
  <div class="title">WAGKI</div>
  <a href="https://genu.io/" target="_blank">
    <button
      class="fixed text-lg font-bold text-white rounded-full border-2 border-white duration-200 ease-in hover:text-gray-500 hover:bg-white toHomepage"
    >
      <img src="icon/home.svg" alt="toHomepageicon" class="w-12" />
    </button>
  </a>
  <Loafers />
</main>
<div class="w-1/3 rightSection"><ChoiceSection /></div>

<style>
  .title {
    position: fixed;
    top: 4%;
    left: 4%;
    color: white;
    font-size: 48px;
    letter-spacing: 48px;
    text-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  }
  .toHomepage {
    position: fixed;
    bottom: 4%;
    left: 4%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rightSection {
    position: fixed;
    bottom: 0;
    right: 0;
    /* transform: translateY(-0%); */
    max-width: 800px;
  }
</style>
