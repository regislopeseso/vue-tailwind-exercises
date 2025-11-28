<!-- This is the src/components/shoppingcart/CartItemsList.vue file -->

<script setup lang="ts">
import { usePlansStore } from '@/stores/plansStore';
import type { BillingPeriod } from '@/assets/domain/type';

import {
  XMarkIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/vue/16/solid';

const store = usePlansStore();

const formatMoney = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

function periodLabel(period: 'monthly' | 'yearly') {
  return period === 'yearly' ? '/year' : '/month';
}

function handleIncrementToCart(
  planId: number,
  period: BillingPeriod,
) {
  store.addToCart(planId, period, 1);
}

function handleDecrementFromCart(
  planId: number,
  period: BillingPeriod,
) {
  store.decrementFromCart(planId, period, 1);
}

function handleRemoveFromCart(
  planId: number,
  period: BillingPeriod,
) {
  store.removeFromCart(planId, period);
}
</script>

<template>
  <div
    v-for="item in store.cartDetailed"
    :key="`${item.planId}-${item.period}`"
    class="flex justify-between items-center rounded-lg p-4 text-sm/6 hover:bg-white/5 gap-3"
  >
    <PlusCircleIcon
      class="size-6 hover:text-blue-400 cursor-pointer"
      aria-hidden="true"
      @click="
        handleIncrementToCart(item.planId, item.period)
      "
    />

    <MinusCircleIcon
      class="size-6 hover:text-red-400 cursor-pointer"
      aria-hidden="true"
      @click="
        handleDecrementFromCart(item.planId, item.period)
      "
    />
    <div
      class="flex flex-2 items-baseline justify-start p-2 rounded-lg gap-0"
    >
      <span class="text-lg font-bold text-white">
        {{ item.plan.title }}
        <button></button>
      </span>
      <span class="text-sm font-semibold text-white">
        ({{ item.quantity }}x)</span
      >
    </div>

    <div class="flex-2 text-end pe-3">
      <p class="mt-1 text-gray-400">
        ${{ item.unitPrice.toFixed(2) }}
        {{ periodLabel(item.period) }} ×
        {{ item.quantity }}
      </p>
      <span
        v-if="item.discountPercent > 0"
        class="text-green-400"
      >
        ({{ item.discountPercent }}% off)
      </span>
      <p class="text-white font-semibold">
        Total: ${{ formatMoney(item.lineTotal) }}
      </p>
    </div>

    <XMarkIcon
      class="size-8 top-0 hover:text-red-400 cursor-pointer"
      @click="
        handleRemoveFromCart(item.planId, item.period)
      "
    />
  </div>
</template>
