<script lang="ts">
  import { cn } from '../../lib/utils';

  export let className: string = '';
</script>

<div class={cn('card rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-200', className)}>
  <slot />
</div>
