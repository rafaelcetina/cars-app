<script lang="ts">
  import { onMount } from 'svelte';

  export let brand: string;
  export let model: string;
  export let year: number = 2025;

  let isLoading = false;
  let content = '';
  let error = '';
  let contentExists = false;
  let isChecking = true;
  let updatedAt = '';

  async function checkContentExists() {
    try {
      const response = await fetch(
        `/api/check-content?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}`
      );
      if (response.ok) {
        const result = await response.json();
        contentExists = result.exists;

        if (contentExists && result.content) {
          content = result.content.content;
          updatedAt = result.content.updatedAt;
        }
      }
    } catch (err) {
      console.error('Error checking content:', err);
    } finally {
      isChecking = false;
    }
  }

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
          year: year,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        content = result.savedContent.content;
        updatedAt = result.savedContent.updatedAt;
        contentExists = true; // Mark as existing after generation
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }
    } catch (err) {
      console.error('❌ Error generating content:', err);
      error = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    checkContentExists();
  });

  function formatContent(text: string): string {
    // Simple formatting for plain text content
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }
</script>

<div class="dynamic-content">
  {#if isChecking}
    <!-- Checking State -->
    <div class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-400">Checking content availability...</span>
    </div>
  {:else if isLoading}
    <!-- Loading State -->
    <div class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-400">Generating AI content...</span>
    </div>
  {:else if error}
    <!-- Error State -->
    <div
      class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4 mb-6"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Try Again
      </button>
    </div>
  {:else if contentExists && content}
    <!-- Existing Content State -->
    <div
      class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4 mb-6"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800 dark:text-green-200">Content Available</h3>
          <div class="mt-2 text-sm text-green-700 dark:text-green-300">
            <p>Detailed information has been generated for this model.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Generated Content -->
    <div class="prose dark:prose-invert max-w-none">
      <div>
        <div class="ai-badge">
          <span>✨ Generado con IA</span>
        </div>
      </div>
      <div class="content">{@html formatContent(content)}</div>
      <div>
        <div class="content-footer">
          <small class="generated-date">
            📅 Actualizado: {new Date(updatedAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </small>
          <small style="color: #64748b;"> 🤖 Powered by OpenAI GPT-4-mini </small>
        </div>
      </div>
    </div>
  {:else}
    <!-- No Content State -->
    <div class="text-center py-12">
      <div class="mb-6">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No Detailed Content Yet
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        Generate AI-powered detailed information about the {brand}
        {model}.
      </p>
      <button
        on:click={generateContent}
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Generate AI Content
      </button>
    </div>
  {/if}
</div>

<style>
  .ai-badge {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .content-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
    margin-top: 1rem;
  }
</style>
