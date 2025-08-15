<script lang="ts">
  import { onMount } from 'svelte';
  import type { Brand, Model } from '../types/api';
  import { api } from '../lib/api';
  import BrandCard from './BrandCard.svelte';
  import AddBrandForm from './AddBrandForm.svelte';
  import AddModelForm from './AddModelForm.svelte';
  import Button from './ui/Button.svelte';
  import { Plus, RefreshCw, AlertCircle } from 'lucide-svelte';

  let brands: Brand[] = [];
  let brandModels: Record<number, Model[]> = {};
  let isLoading = true;
  let error = '';
  let showAddBrandForm = false;
  let selectedBrandForModel: Brand | null = null;
  let showAddModelForm = false;

  async function loadBrands() {
   // try {
      isLoading = true;
      error = '';
      brands = await api.getBrands();
      
      // Load models for each brand
/*       for (const brand of brands) {
        try {
          brandModels[brand.id] = await api.getModelsByBrand(brand.id);
        } catch (err) {
          console.error(`Failed to load models for brand ${brand.id}:`, err);
          brandModels[brand.id] = [];
        }
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load brands';
    } finally {
    } */
    isLoading = false;
  }

  async function handleAddBrand(event: CustomEvent) {
    try {
      const newBrand = await api.createBrand(event.detail);
      brands = [...brands, newBrand];
      brandModels[newBrand.id] = [];
      showAddBrandForm = false;
    } catch (err) {
      console.error('Failed to create brand:', err);
    }
  }

  async function handleAddModel(event: CustomEvent) {
    if (!selectedBrandForModel) return;
    
    try {
      const newModel = await api.createModel(selectedBrandForModel.id, event.detail);
      brandModels[selectedBrandForModel.id] = [...brandModels[selectedBrandForModel.id], newModel];
      showAddModelForm = false;
      selectedBrandForModel = null;
    } catch (err) {
      console.error('Failed to create model:', err);
    }
  }

  function handleViewModels(brand: Brand) {
    // Navigate to models page or show models modal
    window.location.href = `/models?brand=${brand.id}`;
  }

  function handleAddModelClick(brand: Brand) {
    selectedBrandForModel = brand;
    showAddModelForm = true;
  }

  onMount(() => {
    loadBrands();
  });
</script>

<div class="space-y-6">
  <!-- Header Actions -->
  <div class="flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <Button on:click={loadBrands} disabled={isLoading} variant="outline">
        <RefreshCw class="w-4 h-4 mr-2 {isLoading ? 'animate-spin' : ''}" />
        Refresh
      </Button>
    </div>
    <Button on:click={() => showAddBrandForm = true}>
      <Plus class="w-4 h-4 mr-2" />
      Add Brand
    </Button>
  </div>

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
  {:else if brands.length === 0}
    <!-- Empty State -->
    <div class="text-center py-12">
      <div class="mx-auto h-12 w-12 text-gray-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No brands</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new brand.</p>
      <div class="mt-6">
        <Button on:click={() => showAddBrandForm = true}>
          <Plus class="w-4 h-4 mr-2" />
          Add Brand
        </Button>
      </div>
    </div>
  {:else}
    <!-- Brands Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each brands as brand (brand.id)}
        <BrandCard
          {brand}
          modelCount={brandModels[brand.id]?.length || 0}
          onViewModels={() => handleViewModels(brand)}
          onAddModel={() => handleAddModelClick(brand)}
        />
      {/each}
    </div>
  {/if}

  <!-- Add Brand Form Modal -->
  {#if showAddBrandForm}
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full">
        <AddBrandForm on:submit={handleAddBrand} />
        <div class="p-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            on:click={() => showAddBrandForm = false}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Add Model Form Modal -->
  {#if showAddModelForm && selectedBrandForModel}
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full">
        <AddModelForm
          brandId={selectedBrandForModel.id}
          brandName={selectedBrandForModel.name}
          on:submit={handleAddModel}
        />
        <div class="p-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            on:click={() => {
              showAddModelForm = false;
              selectedBrandForModel = null;
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  {/if}
</div>
