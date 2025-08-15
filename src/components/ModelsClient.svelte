<script lang="ts">
  import { onMount } from 'svelte';
  import type { Model, Brand } from '../types/api';
  import { api } from '../lib/api';
  import ModelCard from './ModelCard.svelte';
  import EditModelForm from './EditModelForm.svelte';
  import Button from './ui/Button.svelte';
  import Input from './ui/Input.svelte';
  import { RefreshCw, AlertCircle, Filter, Search } from 'lucide-svelte';

  let models: Model[] = [];
  let brands: Brand[] = [];
  let isLoading = true;
  let error = '';
  let searchTerm = '';
  let greaterPrice = '';
  let lowerPrice = '';
  let showFilters = false;
  let selectedModelForEdit: Model | null = null;
  let showEditForm = false;

  // Get the brand id from the url
  let brandId: string | null = null;
  
  onMount(() => {
    brandId = new URLSearchParams(window.location.search).get('brand');
    loadModels(brandId || '');
  });

  // Create a map for quick brand lookup
  $: brandMap = new Map(brands.map(brand => [brand.id, brand]));

  async function loadModels(brandId: string) {
    try {
      isLoading = true;
      error = '';
      
      // Load brands first
      // brands = await api.getBrands();
      
      // Load models with filters
      const filters: { greater?: number; lower?: number } = {};
      if (greaterPrice) filters.greater = parseFloat(greaterPrice);
      if (lowerPrice) filters.lower = parseFloat(lowerPrice);
      
      // models = await api.getModels(filters);
      if (brandId) {
        models = await api.getModelsByBrand(parseInt(brandId));
      } else {
        models = await api.getModels(filters);
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load models';
    } finally {
      isLoading = false;
    }
  }

  async function handleUpdateModel(event: CustomEvent) {
    if (!selectedModelForEdit) return;
    
    try {
      const updatedModel = await api.updateModel(selectedModelForEdit.id, event.detail);
      models = models.map(model => 
        model.id === updatedModel.id ? updatedModel : model
      );
      showEditForm = false;
      selectedModelForEdit = null;

    } catch (err) {
      console.error('Failed to update model:', err);
    } finally {
      loadModels(brandId || '');
    }
  }

  function handleEditModel(model: Model) {
    selectedModelForEdit = model;
    showEditForm = true;
  }

  function handleCancelEdit() {
    showEditForm = false;
    selectedModelForEdit = null;
  }

  function getBrandName(brandId: number): string {
    return brandMap.get(brandId)?.name || 'Unknown Brand';
  }

  // Filter models based on search term
  $: filteredModels = models.filter(model => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      model.name.toLowerCase().includes(searchLower) ||
      getBrandName(model.brand_id).toLowerCase().includes(searchLower)
    );
  });


</script>

<div class="space-y-6">
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
    <div class="flex items-center space-x-4">
      <Button on:click={() => loadModels(brandId || '')} disabled={isLoading} variant="outline">
        <RefreshCw class="w-4 h-4 mr-2 {isLoading ? 'animate-spin' : ''}" />
        Refresh
      </Button>
      <Button 
        variant="outline" 
        on:click={() => showFilters = !showFilters}
        className="flex items-center"
      >
        <Filter class="w-4 h-4 mr-2" />
        Filters
      </Button>
    </div>
    
    <!-- Search -->
    <div class="relative w-full sm:w-64">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search models..."
        bind:value={searchTerm}
        className="pl-10"
      />
    </div>
  </div>

  <!-- Filters -->
  {#if showFilters}
    <div class="bg-white p-4 rounded-lg border border-gray-200">
      <h3 class="text-sm font-medium text-gray-900 mb-3">Price Filters</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="greaterPrice" class="block text-sm font-medium text-gray-700 mb-1">
            Greater than (MXN)
          </label>
          <Input
            id="greaterPrice"
            type="number"
            placeholder="Min price..."
            bind:value={greaterPrice}
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label for="lowerPrice" class="block text-sm font-medium text-gray-700 mb-1">
            Less than (MXN)
          </label>
          <Input
            id="lowerPrice"
            type="number"
            placeholder="Max price..."
            bind:value={lowerPrice}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div class="mt-4 flex space-x-2">
        <Button on:click={() => loadModels(brandId || '')} disabled={isLoading}>
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          on:click={() => {
            greaterPrice = '';
            lowerPrice = '';
            loadModels(brandId || '');
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  {/if}

  <!-- Error Message -->
  {#if error}
    <div class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <AlertCircle class="w-5 h-5 text-red-400 mr-2" />
        <div class="text-sm text-red-700">{error}</div>
      </div>
    </div>
  {/if}

  <!-- Loading State -->
  {#if isLoading}
    <div class="flex justify-center items-center py-12">
      <RefreshCw class="w-8 h-8 text-gray-400 animate-spin" />
    </div>
  {:else if filteredModels.length === 0}
    <!-- Empty State -->
    <div class="text-center py-12">
      <div class="mx-auto h-12 w-12 text-gray-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No models found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {searchTerm || greaterPrice || lowerPrice 
          ? 'Try adjusting your search or filters.' 
          : 'No models available yet.'}
      </p>
    </div>
  {:else}
    <!-- Results Count -->
    <div class="text-sm text-gray-500">
      Showing {filteredModels.length} of {models.length} models
    </div>

    <!-- Models Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each filteredModels as model (model.id)}
        <ModelCard
          {model}
          brandName={getBrandName(model.brand_id)}
          onEdit={() => handleEditModel(model)}
        />
      {/each}
    </div>
  {/if}

  <!-- Edit Model Form Modal -->
  {#if showEditForm && selectedModelForEdit}
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full">
        <EditModelForm
          model={selectedModelForEdit}
          brandName={getBrandName(selectedModelForEdit.brand_id)}
          on:submit={handleUpdateModel}
          on:cancel={handleCancelEdit}
        />
      </div>
    </div>
  {/if}
</div>
