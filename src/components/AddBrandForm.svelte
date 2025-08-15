<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Card from './ui/Card.svelte';
  import CardHeader from './ui/CardHeader.svelte';
  import CardContent from './ui/CardContent.svelte';
  import Button from './ui/Button.svelte';
  import Input from './ui/Input.svelte';
  import { Plus, Loader2 } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  let brandName = '';
  let isLoading = false;
  let error = '';

  async function handleSubmit() {
    if (!brandName.trim()) {
      error = 'Brand name is required';
      return;
    }

    isLoading = true;
    error = '';

    try {
      dispatch('submit', { name: brandName.trim() });
      brandName = '';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to create brand';
    } finally {
      isLoading = false;
    }
  }
</script>

<Card>
  <CardHeader>
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New Brand</h3>
  </CardHeader>
  <CardContent>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="brandName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Brand Name
        </label>
        <Input
          id="brandName"
          type="text"
          placeholder="Enter brand name..."
          bind:value={brandName}
          required
          disabled={isLoading}
        />
      </div>

      {#if error}
        <div class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      {/if}

      <Button type="submit" disabled={isLoading} className="w-full">
        {#if isLoading}
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Creating...
        {:else}
          <Plus class="w-4 h-4 mr-2" />
          Add Brand
        {/if}
      </Button>
    </form>
  </CardContent>
</Card>
