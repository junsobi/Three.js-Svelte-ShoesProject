<script>
	export let close;
</script>

<div
	class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
>
	<div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
		<div class="w-full">
			<div class="m-8 my-20 max-w-[400px] mx-auto">
				<div class="mb-8">
					<h1 class="mb-4 text-3xl pl-2 font-extrabold">변경사항이 저장되었습니다.</h1>
					<p class="text-gray-600 pl-4">당신만을 위한 신발이 준비되었습니다.</p>
				</div>
				<div class="space-y-4">
					<button on:click={close} class="p-3 bg-white border rounded-full w-full font-semibold"
						>조금 더 수정하기</button
					>
					<button class="p-3 bg-black rounded-full text-white w-full font-semibold"
						>홈페이지로 돌아가기</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
