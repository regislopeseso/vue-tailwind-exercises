<!-- This is the /src/views/HomeView.vue file. -->
<script setup lang="ts">
import { usePlansStore } from '@/stores/plansStore';
import PlanCard from '@/components/PlanCard.vue';

const store = usePlansStore();

function pickPlan(id: number) {
  store.addToCart(id);
}
</script>

<template>
  <main
    class="flex py-10 h-auto items-center justify-center gap-5"
  >
    <PlanCard
      v-for="plan in store.plans"
      :key="plan.id"
      :plan-title="plan.title"
      :plan-description="plan.description"
      :plan-price="plan.price"
      :plan-features="plan.features"
      :plan-discount="store.discountPercent"
      @select="pickPlan(plan.id)"
    />
  </main>
</template>
