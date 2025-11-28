<!-- This is the src/components/shoppingcart/CartButtons.vue file -->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePlansStore } from '@/stores/plansStore';

import {
  FaceFrownIcon,
  CreditCardIcon,
} from '@heroicons/vue/16/solid';

const router = useRouter();
const store = usePlansStore();

const callsToAction = [
  {
    name: 'Clear Cart',
    action: () => store.clearCart(),
    icon: FaceFrownIcon,
  },
  {
    name: 'Checkout',
    action: () => router.push('/checkout'),
    icon: CreditCardIcon,
  },
];
</script>

<template>
  <div
    class="grid grid-cols-2 divide-x divide-white/30 bg-blue-400"
  >
    <button
      v-for="item in callsToAction"
      :key="item.name"
      @click="item.action"
      class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-white hover:bg-blue-500 cursor-pointer"
    >
      <component
        :is="item.icon"
        class="size-5 flex-none text-white"
        aria-hidden="true"
      />
      {{ item.name }}
    </button>
  </div>
</template>
