<script>
	import { candidates } from '@sudoku/stores/candidates';
	import { userGrid } from '@sudoku/stores/grid';
	import { cursor } from '@sudoku/stores/cursor';
	import { hints } from '@sudoku/stores/hints';
	import { notes } from '@sudoku/stores/notes';
	import { settings } from '@sudoku/stores/settings';
	import { keyboardDisabled } from '@sudoku/stores/keyboard';
	import { gamePaused } from '@sudoku/stores/game';
    import { possibleNumberSwitch, possibleNumbers } from '@sudoku/stores/possibleNumbers';
	import { possibleNumberSolver, possibleNumberSolverTest } from '@sudoku/solver';
	import { message } from '@sudoku/stores/message';
	import { GRID_COORDS } from '@sudoku/constants';
	import Button from './Button.svelte';

	$: hintsAvailable = $hints > 0;

	function handleHint() {
		if (hintsAvailable) {
			if ($candidates.hasOwnProperty($cursor.x + ',' + $cursor.y)) {
				candidates.clear($cursor);
			}

			userGrid.applyHint($cursor);
		}
	}

	function handleLearn() {
		const [{idx, value}, msg] = possibleNumberSolver($userGrid);
		const [row, col] = GRID_COORDS[idx];
		$message = msg;
		userGrid.set({ y: row, x: col } , value);
	}

	let isTest = false;
	let testFuncName = '';

	function handleTest(e) {
        if (e.key === 'Enter') {
            isTest = false;
			eval(`${testFuncName.trim()}()`);
        } else if (e.key === 'Escape') {
            showTestInput = false;
        }		
	}
</script>
<div class="action-buttons space-x-3">

	<input class="test-input w-20 h-7 text-sm" class:visible={isTest} class:invisible={!isTest} bind:value={testFuncName} on:keydown={handleTest} placeholder="输入测试函数名，回车运行"/>

	<button class="btn btn-round" disabled={$gamePaused} on:click={()=>{isTest = !isTest}} title="Test">
		<svg class="icon-outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
		</svg>
	</button>	

    <Button disable={$gamePaused} title="Learn" on:click={handleLearn}>
		<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </Button>

	{#if $possibleNumberSwitch}
		<Button disable={$gamePaused} title={"Hide Possible Numbers"} on:click={possibleNumberSwitch.toggle}>
			<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
		</Button>
	{:else}
		<Button disable={$gamePaused} title={"Show Possible Numbers"} on:click={possibleNumberSwitch.toggle}>
			<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			<path slot='path2' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
		</Button>
	{/if}
    <Button disable={$gamePaused} title="Undo">
		<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </Button>

    <Button disable={$gamePaused} title="Redo">
		<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 90 00-8 8v2M21 10l-6 6m6-6l-6-6" />
    </Button>

    <Button isBadgeButton={true} disabled={$keyboardDisabled || !hintsAvailable || $userGrid[$cursor.y][$cursor.x] !== 0} title={`Hints (${$hints})`} on:click={handleHint}>
		<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        {#if $settings.hintsLimited}
            <span class="badge" class:badge-primary={hintsAvailable}>{$hints}</span>
        {/if}
    </Button>

    <Button isBadgeButton={true} title={`Notes (${$notes ? 'ON' : 'OFF'})`} on:click={notes.toggle}>
		<path slot='path' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        <span class="badge tracking-tighter" class:badge-primary={$notes}>{$notes ? 'ON' : 'OFF'}</span>
    </Button>

</div>


<style>
	.action-buttons {
		@apply flex flex-wrap justify-evenly self-end;
	}

	.badge {
		min-height: 20px;
		min-width:  20px;
		@apply p-1 rounded-full leading-none text-center text-xs text-white bg-gray-600 inline-block absolute top-0 left-0;
	}

	.badge-primary {
		@apply bg-primary;
	}
</style>