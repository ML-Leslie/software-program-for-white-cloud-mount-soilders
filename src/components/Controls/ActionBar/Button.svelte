<script>
    export let isBadgeButton = false;
    export let disabled;
    export let title;
</script>

<button class="btn btn-round" class:btn-badge={isBadgeButton} class:disable={disabled} title={title} on:click>
    <svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <slot name="path" />
        <slot name="path2" />
    </svg>

    {#if isBadgeButton}
        <slot />
    {/if}
</button>

<style>
	.btn-badge {
		@apply relative;
	}
</style>