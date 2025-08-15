<script lang="ts">
  import { cn } from '../../lib/utils';

  export let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  export let className: string = '';

  const variants = {
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600',
    destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800',
    outline: 'text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
  };

  $: classes = cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer hover:scale-105',
    variants[variant],
    className
  );
</script>

<div class={classes}>
  <slot />
</div>
