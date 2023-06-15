<script>
	export let text = '';
</script>

<div class="arrowBox">
	<div class="arrow" />
	<div class="box">{text}</div>
</div>

<style>
	.arrowBox {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 56px;
		z-index: 99;
	}

	.box {
		background: white;
		padding: 8px;
		font-size: 11px;
		font-weight: bold;
		text-align: center;
		color: gray;
		border-radius: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.arrow {
		position: absolute;
		top: -10px;
		left: 50%;
		transform: translateX(-50%);
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid white;
		content: '';
	}
</style>
