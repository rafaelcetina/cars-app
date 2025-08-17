<script lang="ts">
  import { onMount } from 'svelte';

  export let brand: string;
  export let model: string;
  export let hasExistingContent: boolean = false;
  export let existingContent: any = null;

  let isLoading = false;
  let content = '';
  let error = '';
  let isGenerated = false;

  async function generateContent() {
    if (isLoading) return;
    
    isLoading = true;
    error = '';
    
    try {      
      const response = await fetch('/api/generate-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          brand: brand, 
          model: model, 
          year: 2025 
        }),
      });

      if (response.ok) {
        const result = await response.json();
        content = result.content;
        isGenerated = true;
      } else {
        throw new Error('Failed to generate content');
      }
    } catch (err) {
      console.error('❌ Error generating content:', err);
      error = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      isLoading = false;
    }
  }

  // Handle content on mount
  onMount(async () => {
    if (hasExistingContent && existingContent) {
      try {
        const rendered = await existingContent.render();
        content = rendered.body;
        isGenerated = true;
      } catch (error) {
        console.error('Error rendering existing content:', error);
        // Fallback to generating new content
        generateContent();
      }
    } else if (!hasExistingContent) {
      generateContent();
    }
  });

  function formatMarkdown(markdown: string): string {
    return markdown
      .replace(/\n/g, '<br>')
      .replace(/#{1,6}\s+(.+)/g, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
  }
</script>

<div class="content-generator">
  {#if isLoading}
    <!-- Loading State -->
    <div class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-400">Generating content...</span>
    </div>
  {:else if error}
    <!-- Error State -->
    <div class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
            Error Generating Content
          </h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Retry Button -->
    <div class="text-center py-8">
      <button 
        on:click={generateContent}
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Try Again
      </button>
    </div>
  {:else if isGenerated && content}
    <!-- Success State with Content -->
    <div class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
            Content Generated Successfully!
          </h3>
          <div class="mt-2 text-sm text-green-700 dark:text-green-300">
            <p>Content has been generated and saved.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Generated Content -->
    <div class="prose dark:prose-invert max-w-none">
      <div class="markdown-content">{@html formatMarkdown(content)}</div>
    </div>
  {:else if !hasExistingContent}
    <!-- Initial State -->
    <div class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        No detailed content available for this model yet.
      </p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mb-6">
        Content will be generated automatically...
      </p>
      <button 
        on:click={generateContent}
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Generate Content
      </button>
    </div>
  {/if}
</div>

<style>
 /*  .prose {
    @apply text-gray-900 dark:text-gray-100;
  }
  
  .prose h2 {
    @apply text-xl font-semibold mb-4 mt-6 text-gray-900 dark:text-white;
  }
  
  .prose strong {
    @apply font-semibold text-gray-900 dark:text-white;
  }
  
  .prose em {
    @apply italic text-gray-700 dark:text-gray-300;
  }
  
  .prose code {
    @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono;
  }
  
  .prose pre {
    @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto;
  }
  
  .prose pre code {
    @apply bg-transparent p-0;
  } */
</style>
