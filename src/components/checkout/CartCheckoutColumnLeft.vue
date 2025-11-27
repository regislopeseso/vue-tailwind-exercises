<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/16/solid';
import { usePlansStore } from '@/stores/plansStore';

const store = usePlansStore();

function periodLabel(period: 'monthly' | 'yearly') {
  return period === 'yearly' ? '/year' : '/month';
}

const formatMoney = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;
</script>

<template>
  <div
    :class="{
      'flex h-full justify-center items-center':
        store.cartDetailed.length === 0,
    }"
    class="relative col-span-5 bg-gray-600 dark:bg-gray-800"
  >
    <!-- cart empty -->
    <div
      v-if="store.cartDetailed.length === 0"
      class="text-center py-8"
    >
      <ShoppingCartIcon
        class="w-12 h-12 mx-auto text-gray-500 mb-2"
      />
      <p class="text-white opacity-50 text-md">
        Your cart is empty
      </p>
    </div>

    <!-- cart lines -->
    <div
      v-for="item in store.cartDetailed"
      :key="`${item.planId}-${item.period}`"
      class="flex justify-between items-center rounded-lg p-4 text-sm/6 hover:bg-white/5"
    >
      <div
        class="flex flex-2 items-baseline justify-start p-2 rounded-lg gap-1"
      >
        <span class="text-lg font-bold text-white">
          {{ item.plan.title }}
        </span>
        <span class="text-sm font-semibold text-white">
          ({{ item.quantity }}x)</span
        >
        <span class="text-xs text-gray-400">
          {{ item.period }}
        </span>
      </div>

      <div class="flex-2 text-end">
        <p class="mt-1 text-gray-400">
          ${{ item.unitPrice.toFixed(2) }}
          {{ periodLabel(item.period) }} ×
          {{ item.quantity }}
          <span
            v-if="item.discountPercent > 0"
            class="text-green-400"
          >
            ({{ item.discountPercent }}% off)
          </span>
        </p>
        <p class="text-white font-semibold">
          Total: ${{ formatMoney(item.lineTotal) }}
        </p>
      </div>
    </div>

    <!-- totals -->
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
        <span
          >-${{ formatMoney(store.discountAmount) }}</span
        >
      </div>
    </div>
    <!-- Price -->
    <div class="absolute right-0 z-10 bottom-10">
      <div class="px-4 py-1 bg-blue-400 translate-x-2/4">
        <span
          class="absolute text-gray-800 text-sm right-[106%] top-[50%] translate-y-[-50%]"
          >Total:</span
        >
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
