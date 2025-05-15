<script>
    import { message } from '@sudoku/stores/message';
</script>

<div class="message-box">
    {$message}
</div>

<style>
    .message-box {
        @apply flex items-center bg-opacity-0 text-gray-800 ml-3;
        white-space: pre-line;
    }
</style>