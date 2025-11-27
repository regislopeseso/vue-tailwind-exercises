<!-- This is the /src/views/PrincingView.vue file. -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
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

// controls the one-shot sweep animation
const sweep = ref(false);

// whenever isYearly changes, retrigger the sweep
watch(isYearly, () => {
  sweep.value = false;
  requestAnimationFrame(() => {
    sweep.value = true;
  });
});

function onSweepEnd() {
  sweep.value = false;
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-5"
  >
    <label
      class="inline-flex items-center cursor-pointer border-3 border-gray-600 p-3 rounded-xl gap-3"
    >
      <span
        class="select-none text-sm font-medium text-heading underline underline-offset-4 decoration-4 decoration-transparent transition-[text-decoration-color] duration-100 delay-100"
        :class="{
          'decoration-blue-400! font-extrabold!': !isYearly,
        }"
      >
        Monthly Billing
      </span>

      <input
        v-model="isYearly"
        type="checkbox"
        class="sr-only peer"
      />

      <!-- Invisible track; animated line appears only during sweep -->
      <div
        class="relative w-[400px] h-0.5 rounded-full bg-gray-600 dark:bg-gray-700"
      >
        <span
          class="absolute top-3 left-0 h-1 w-20 rounded-full bg-blue-400 opacity-0"
          :class="{
            'sweep-ltr': sweep && isYearly,
            'sweep-rtl': sweep && !isYearly,
          }"
          @animationend="onSweepEnd"
        ></span>
      </div>

      <span
        class="select-none text-sm font-medium text-heading underline underline-offset-4 decoration-4 decoration-transparent transition-[text-decoration-color] duration-100 delay-100"
        :class="{
          'decoration-blue-400! font-extrabold!': isYearly,
        }"
      >
        Yearly Billing
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

<style scoped>
/* line moves left -> right and fades out */
.sweep-ltr {
  animation: sweep-ltr 250ms ease-out forwards;
}

/* line moves right -> left and fades out */
.sweep-rtl {
  animation: sweep-rtl 250ms ease-out forwards;
}

@keyframes sweep-ltr {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(320px);
    opacity: 0;
  }
}

@keyframes sweep-rtl {
  0% {
    transform: translateX(320px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}
</style>
