<script>
  import { finalParts, initialParts } from "$lib/store/store";
  import MATERIALS from "./MATERIALS";

  const getImageUrl = (name) => {
    const material = MATERIALS.find((material) => material.name === name);
    return material ? material.preview : null;
  };

  const getColor = (part) => {
    return $finalParts[part] && $finalParts[part].color
      ? $finalParts[part].color
      : $initialParts[part].color;
  };

  export let close;
</script>

<div
  class="fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-3"
>
  <div
    class="max-h-full w-11/12 rounded-lg max-w-xl overflow-y-auto sm:rounded-2xl bg-white"
  >
    <div class="w-full">
      <div class="m-8 my-10 max-w-[400px] mx-auto">
        <div class="mb-2">
          <h1 class="mb-4 pl-3 text-3xl font-extrabold">
            이대로 구매하시겠습니까?
          </h1>
          <p class="text-gray-600 pl-4">당신만을 위한 신발이 준비되었습니다!</p>
        </div>
        <table class="w-full mb-5">
          <thead>
            <tr>
              <th>Part</th>
              <th>Texture</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries($finalParts) as [part, { texture, alt }]}
              <tr class="text-center text-gray-500">
                <td>{alt}</td>
                <td>
                  <div class="center-content">
                    {#if texture === "leather2"}
                      <div class="text-center text-gray-500">기본재료</div>
                    {:else if texture}
                      <img
                        class="w-10 h-10 rounded-full"
                        src={getImageUrl(texture)}
                        {alt}
                      />
                    {/if}
                  </div>
                </td>
                <td>
                  <div class="center-content">
                    <div
                      class="w-10 h-10 rounded-full"
                      style="background-color: #{getColor(part)}"
                    />
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <div class="space-y-4 px-4">
          <button
            class="p-3 bg-white border rounded-full w-full font-semibold"
            on:click={close}>조금 더 고르기</button
          >
          <button
            class="p-3 bg-black rounded-full text-white w-full font-semibold"
            >구매 진행하기</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
