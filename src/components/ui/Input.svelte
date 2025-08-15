<script lang="ts">
  import { cn } from '../../lib/utils';
  import { createEventDispatcher } from 'svelte';

  export let type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';
  export let placeholder = '';
  export let value = '';
  export let disabled = false;
  export let required = false;
  export let name = '';
  export let id = '';
  export let min: string | number = '';
  export let step: string | number = '';
  export let className: string = '';

  const dispatch = createEventDispatcher();

  const baseClasses = 'flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:border-blue-500 dark:focus:border-blue-400';

  $: classes = cn(baseClasses, className);
</script>

<input
  {type}
  {placeholder}
  {value}
  {disabled}
  {required}
  {name}
  {id}
  {min}
  {step}
  class={classes}
  on:input={(e) => {
    value = e.currentTarget.value;
    dispatch('input', e);
  }}
  on:change={(e) => dispatch('change', e)}
  on:focus={(e) => dispatch('focus', e)}
  on:blur={(e) => dispatch('blur', e)}
/>
