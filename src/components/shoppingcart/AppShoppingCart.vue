<!-- This is the src/components/shoppingcart/ShoppingCart.vue file -->
<script setup lang="ts">
import { provide, toRef } from 'vue';
import { usePlansStore } from '@/stores/plansStore';
import EmptyCart from './EmptyCart.vue';
import CartItemsList from './CartItemsList.vue';
import CartTotals from './CartTotals.vue';
import CartButtons from './CartButtons.vue';

const store = usePlansStore();

const props = withDefaults(
  defineProps<{
    showButtons?: boolean;
    showGrandTotal?: boolean;
  }>(),
  {
    showButtons: true,
    showGrandTotal: true,
  },
);

const showGrandTotalRef = toRef(props, 'showGrandTotal');

// Provide the value to all descendants
provide('showGrandTotal', showGrandTotalRef.value);
</script>

<template>
  <div>
    <div class="p-4">
      <!-- empty cart -->
      <EmptyCart v-if="store.cartDetailed.length === 0" />

      <!-- cart lines -->
      <CartItemsList />

      <!-- totals -->
      <CartTotals />
    </div>

    <!-- Buttons -->
    <CartButtons
      v-if="
        store.cartDetailed.length > 0 && props.showButtons
      "
    />
  </div>
</template>

<style scoped></style>
