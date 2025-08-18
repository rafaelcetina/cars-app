<script lang="ts">
  import { cn } from '../../lib/utils';
  import { createEventDispatcher } from 'svelte';

  export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let className: string = '';
  export let ariaLabel: string = '';

  const dispatch = createEventDispatcher();

  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:scale-105 active:scale-95';

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md hover:shadow-lg',
    destructive: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 shadow-md hover:shadow-lg',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm hover:shadow-md',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
    link: 'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline'
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  };

  $: classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );
</script>

<button
  {type}
  {disabled}
  class={classes}
  aria-label={ariaLabel}
  on:click={(e) => dispatch('click', e)}
  on:submit={(e) => dispatch('submit', e)}
>
  <slot />
</button>
