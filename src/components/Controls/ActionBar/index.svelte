<script>
	import Timer from './Timer.svelte';
	import Actions from './Actions.svelte';
	import Message from './Message.svelte';
</script>

<div class="action-bar space-y-3 xs:space-y-0">

	<div class="top-item"> 
		<Timer />
		<Message />
	</div>

	<div class="buttom-item">
		<Actions />
	</div>

</div>

<style>
	.action-bar {
		@apply grid grid-cols-2 gap-3 pb-5;
	}

	.top-item {
		@apply col-span-2 flex justify-between
	}

	.buttom-item {
		@apply col-span-2 flex justify-end
	}

	@screen xs {
		.action-bar {
			@apply flex-row;
		}
	}
</style>