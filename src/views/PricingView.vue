<!-- This is the /src/views/PrincingView.vue file. -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePlansStore } from '@/stores/plansStore.ts';
import type { BillingPeriod } from '@/assets/domain/type.ts';
import PlanCard from '@/components/PlanCard.vue';

const store = usePlansStore();

// Toggle State: false = monthly and true = yearly
const isYearly = ref(false);

const period = computed<BillingPeriod>(() =>
  isYearly.value === true ? 'yearly' : 'monthly',
);

function pickPlan(id: number) {
  store.addToCart(id, period.value);
}

function getDiscountForPlan(planId: number): number {
  const cartItem = store.cartDetailed.find(
    (item) =>
      item.planId === planId &&
      item.period === period.value,
  );
  return cartItem?.discountPercent ?? 0;
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-5"
  >
    <label
      class="inline-flex items-center cursor-pointer border-3 border-gray-600 p-2 rounded-xl gap-3"
    >
      <span
        class="select-none text-sm font-medium text-heading"
        :class="{
          'font-extrabold!': isYearly === false,
        }"
      >
        Monthly
      </span>

      <input
        v-model="isYearly"
        type="checkbox"
        class="sr-only peer"
      />

      <div
        :class="[
          'relative w-[400px] h-5 bg-neutral-quaternary rounded-full peer  peer-checked:after:translate-x-80',
          'peer-focus:ring-red-300 dark:peer-focus:ring-gray-600 dark:bg-gray-700 after:bg-white peer-checked:bg-red-600 dark:peer-checked:bg-gray-600 peer-checked:after:border-white',
          'rtl:peer-checked:after:-translate-x-[400%] after:absolute after:top-0.5 after:start-0.5  after:rounded-full after:h-4 after:w-20 after:transition-all ',
          `after:content-['']`,
        ]"
      ></div>

      <span
        class="select-none text-sm font-medium text-heading"
        :class="{
          'font-extrabold!': isYearly === true,
        }"
      >
        Yearly
      </span>
    </label>

    <div class="flex flex-wrap w-full justify-center gap-5">
      <PlanCard
        v-for="plan in store.plans"
        :key="plan.id"
        :plan-title="plan.title"
        :plan-description="plan.description"
        :period="period"
        :plan-price="plan.prices[period]"
        :plan-features="plan.features"
        :plan-discount="getDiscountForPlan(plan.id)"
        @select="pickPlan(plan.id)"
      />
    </div>
  </div>
</template>
