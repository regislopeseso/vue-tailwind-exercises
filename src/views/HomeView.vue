<!-- This is the /src/views/HomeView.vue file. -->
<script setup lang="ts">
import { usePlansStore } from '@/stores/plansStore';
import PlanCard from '@/components/PlanCard.vue';

const store = usePlansStore();

function pickPlan(id: number) {
  store.addToCart(id);
}

function getDiscountForPlan(planId: number): number {
  const cartItem = store.cartDetailed.find(
    (item) => item.planId === planId,
  );
  return cartItem?.discountPercent ?? 0;
}
</script>

<template>
  <div class="flex flex-wrap w-full justify-center gap-5">
    <PlanCard
      v-for="plan in store.plans"
      :key="plan.id"
      :plan-title="plan.title"
      :plan-description="plan.description"
      :plan-price="plan.price"
      :plan-features="plan.features"
      :plan-discount="getDiscountForPlan(plan.id)"
      @select="pickPlan(plan.id)"
    />
  </div>
</template>
