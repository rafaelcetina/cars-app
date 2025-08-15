<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Card from './ui/Card.svelte';
  import CardHeader from './ui/CardHeader.svelte';
  import CardContent from './ui/CardContent.svelte';
  import Button from './ui/Button.svelte';
  import Input from './ui/Input.svelte';
  import { Plus, Loader2 } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  export let brandId: number;
  export let brandName: string;

  let modelName = '';
  let averagePrice = '';
  let isLoading = false;
  let error = '';

  async function handleSubmit() {
    if (!modelName.trim()) {
      error = 'Model name is required';
      return;
    }

    isLoading = true;
    error = '';

    try {
      const modelData = {
        name: modelName.trim(),
        ...(averagePrice && { average_price: parseFloat(averagePrice) }),
      };
      
      dispatch('submit', modelData);
      modelName = '';
      averagePrice = '';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to create model';
    } finally {
      isLoading = false;
    }
  }
</script>

<Card>
  <CardHeader>
    <h3 class="text-lg font-semibold text-gray-900">Add New Model</h3>
    <p class="text-sm text-gray-500">Brand: {brandName}</p>
  </CardHeader>
  <CardContent>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="modelName" class="block text-sm font-medium text-gray-700 mb-1">
          Model Name
        </label>
        <Input
          id="modelName"
          type="text"
          placeholder="Enter model name..."
          bind:value={modelName}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label for="averagePrice" class="block text-sm font-medium text-gray-700 mb-1">
          Average Price (MXN) - Optional
        </label>
        <Input
          id="averagePrice"
          type="number"
          placeholder="Enter average price..."
          bind:value={averagePrice}
          disabled={isLoading}
          min="0"
          step="0.01"
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
          Add Model
        {/if}
      </Button>
    </form>
  </CardContent>
</Card>
