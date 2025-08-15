<script lang="ts">
  import type { Model } from '../types/api';
  import Card from './ui/Card.svelte';
  import CardHeader from './ui/CardHeader.svelte';
  import CardContent from './ui/CardContent.svelte';
  import Button from './ui/Button.svelte';
  import Badge from './ui/Badge.svelte';
  import { Car, DollarSign, Edit } from 'lucide-svelte';
  import { formatPrice } from '../lib/utils';

  export let model: Model;
  export let brandName: string = '';
  export let onEdit: () => void;
</script>

<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <Car class="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{model.name}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{brandName}</p>
        </div>
      </div>
      <Badge variant="default" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
        <DollarSign class="w-3 h-3 mr-1" />
        {formatPrice(model.average_price)}
      </Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        <p>Model ID: {model.id}</p>
        <p>Brand ID: {model.brand_id}</p>
      </div>
      <Button variant="outline" size="sm" on:click={onEdit}>
        <Edit class="w-4 h-4 mr-1" />
        Edit Price
      </Button>
    </div>
  </CardContent>
</Card>
