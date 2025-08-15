<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Card from './ui/Card.svelte';
  import CardHeader from './ui/CardHeader.svelte';
  import CardContent from './ui/CardContent.svelte';
  import Button from './ui/Button.svelte';
  import Input from './ui/Input.svelte';
  import { Save, Loader2, X } from 'lucide-svelte';
  import type { Model } from '../types/api';

  const dispatch = createEventDispatcher();

  export let model: Model;
  export let brandName: string = '';

  let averagePrice = model.average_price.toString();
  let isLoading = false;
  let error = '';

  async function handleSubmit() {
    if (!averagePrice || isNaN(parseFloat(averagePrice))) {
      error = 'Please enter a valid price';
      return;
    }

    isLoading = true;
    error = '';

    try {
      dispatch('submit', { average_price: parseFloat(averagePrice) });
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to update model';
    } finally {
      isLoading = false;
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Edit Model Price</h3>
        <p class="text-sm text-gray-500">{model.name} - {brandName}</p>
      </div>
      <Button variant="ghost" size="icon" on:click={handleCancel}>
        <X class="w-4 h-4" />
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="averagePrice" class="block text-sm font-medium text-gray-700 mb-1">
          Average Price (MXN)
        </label>
        <Input
          id="averagePrice"
          type="number"
          placeholder="Enter new price..."
          bind:value={averagePrice}
          required
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

      <div class="flex space-x-2">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {#if isLoading}
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Saving...
          {:else}
            <Save class="w-4 h-4 mr-2" />
            Save Changes
          {/if}
        </Button>
        <Button type="button" variant="outline" on:click={handleCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  </CardContent>
</Card>
