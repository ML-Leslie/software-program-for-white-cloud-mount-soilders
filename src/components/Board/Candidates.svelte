<script>
	import { CANDIDATE_COORDS } from '@sudoku/constants';
	import { possibleNumberSwitch, possibleNumbers } from '@sudoku/stores/possibleNumbers';
	import { cursor } from '@sudoku/stores/cursor';
	import { rightNumber, wrongNumber } from '@sudoku/stores/branchPoints';
	export let candidates = [];
	export let selected = false;
	function judgeRight(index) {
		if (index+1 === $rightNumber) {
			$rightNumber = 0;
			return true;
		}
		return false;
	}
	function judgeWrong(index) {
		if (index+1 === $wrongNumber) {
			$wrongNumber = 0;
			return true;
		}
		return false;
	}
</script>

<div class="candidate-grid">
	{#each CANDIDATE_COORDS as [row, col], index}
		<div class="candidate row-start-{row} col-start-{col}"
		     class:invisible={!candidates.includes(index + 1)}
		     class:visible={candidates.includes(index + 1)}
			 class:possible-number={$possibleNumberSwitch}
			 class:backtracking-right-number={selected && judgeRight(index)}
			 class:backtracking-wrong-number={selected && judgeWrong(index)} >
			{index + 1}
		</div>
	{/each}
</div>

<style>
	.candidate-grid {
		@apply grid h-full w-full p-1;
	}

	.candidate {
		@apply h-full w-full row-end-auto col-end-auto leading-full;
	}

	.possible-number {
		@apply text-gray-400;
	}

	/* .backtracking-right-number {
		@apply bg-green-500;
	} */

	.backtracking-wrong-number {
		@apply bg-red-500;
	}
</style>