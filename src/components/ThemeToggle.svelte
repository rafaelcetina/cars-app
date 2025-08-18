<script lang="ts">
  import { onMount } from 'svelte';
  import { Moon, Sun } from 'lucide-svelte';
  import Button from './ui/Button.svelte';

  let theme: 'light' | 'dark' = 'light';

  onMount(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Always default to light mode if no preference is saved
    theme = savedTheme || 'light';
    applyTheme(theme);
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  function applyTheme(newTheme: 'light' | 'dark') {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Force the theme to override system preferences
    root.style.colorScheme = newTheme;
    console.log("🚀 ~ applyTheme ~ newTheme:", newTheme)
  }
</script>

<Button
  variant="ghost"
  size="icon"
  on:click={toggleTheme}
  className="relative"
  ariaLabel="Toggle theme"
>
  <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  <span class="sr-only">Toggle theme</span>
</Button>
