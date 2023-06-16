<script>
  import "../app.css";
  import ChoiceSection from "$lib/components/ChoiceSection.svelte";
  import Loafers from "$lib/components/Loafer/Loafers.svelte";
</script>

<div class="title">WAGKI</div>
<Loafers />
<div class="pallete">
  <div class="w-screen h-56"><ChoiceSection /></div>
</div>

<style>
  .title {
    position: fixed;
    top: 4%;
    left: 4%;
    color: #2b2b2b;
    font-size: 48px;
    letter-spacing: 48px;
    text-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  }

  .pallete {
    position: fixed;
    bottom: 0;
    z-index: 1;
  }
</style>
