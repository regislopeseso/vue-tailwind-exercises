<script setup lang="ts">
import ShoppingCart from '../shoppingcart/AppShoppingCart.vue';

import { usePlansStore } from '@/stores/plansStore';

const store = usePlansStore();

const formatMoney = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

console.log(
  'Cart size: store.cartDetailed.length is',
  store.cartDetailed.length,
);
</script>

<template>
  <div
    :class="{
      'flex h-full justify-center items-center':
        store.cartDetailed.length === 0,
    }"
    class="relative col-span-5 bg-gray-600 dark:bg-gray-800"
  >
    <ShoppingCart
      :show-grand-total="false"
      :show-buttons="false"
    />

    <!-- Price -->
    <div
      class="absolute right-0 z-10 bottom-10"
      :class="{
        '-right-25! bottom-5!':
          store.cartDetailed.length > 3,
      }"
    >
      <div class="px-4 py-1 bg-blue-400 translate-x-2/4">
        <div class="text-center">
          <span class="text-xl font-bold text-white"
            >${{ formatMoney(store.total) }}</span
          >
          <span
            class="block text-sm font-semibold text-white"
            >In Stock | Free Shipping</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
