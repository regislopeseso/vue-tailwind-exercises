<!-- This is the src/components/shoppingcart/CartTotals.vue file -->
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { usePlansStore } from '@/stores/plansStore';

const store = usePlansStore();

// Inject the value with a default
const showGrandTotal = inject<Ref<boolean>>(
  'showGrandTotal',
  { value: true } as Ref<boolean>,
);

const formatMoney = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;
</script>

<template>
  <div
    v-if="store.cartDetailed.length > 0"
    class="mt-4 pt-4 border-t border-white/10"
  >
    <div class="flex justify-between text-white px-4">
      <span class="font-semibold">Subtotal:</span>
      <span>${{ formatMoney(store.subtotal) }}</span>
    </div>

    <div
      v-if="store.discountAmount > 0"
      class="flex justify-between text-green-400 px-4 mt-1"
    >
      <span class="font-semibold">Discount:</span>
      <span>-${{ formatMoney(store.discountAmount) }}</span>
    </div>

    <div
      v-if="showGrandTotal"
      class="flex justify-between text-white font-bold px-4 mt-2 text-lg"
    >
      <span>Total:</span>
      <span>${{ formatMoney(store.total) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
