<script lang="ts">
  import type { Brand } from '../types/api';
  import Card from './ui/Card.svelte';
  import CardHeader from './ui/CardHeader.svelte';
  import CardContent from './ui/CardContent.svelte';
  import Button from './ui/Button.svelte';
  import Badge from './ui/Badge.svelte';
  import { Car, Plus } from 'lucide-svelte';

  export let brand: Brand;
  export let modelCount: number = 0;
  export let onViewModels: () => void;
  export let onAddModel: () => void;
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Car class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{brand.name}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">ID: {brand.id}</p>
        </div>
      </div>
      <Badge variant="secondary">{modelCount} models</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div class="flex space-x-2">
      <Button variant="outline" size="sm" on:click={onViewModels}>
        View Models
      </Button>
      <Button size="sm" on:click={onAddModel}>
        <Plus class="w-4 h-4 mr-1" />
        Add Model
      </Button>
    </div>
  </CardContent>
</Card>
