<!-- This is the src/components/planscatalog/AppPlansCatalog.vue file -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePlansStore } from '@/stores/plansStore.ts';
import type { BillingPeriod } from '@/assets/domain/type.ts';
import PlanCard from '@/components/planscatalog/PlanCard.vue';
import BillingOptions from '@/components/planscatalog/BillingOptions.vue';

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
    <BillingOptions v-model:isYearly="isYearly" />

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
