<script setup lang="ts">
import { computed } from 'vue';
import type { BillingPeriod } from '@/assets/domain/type.ts';

type Props = {
  planTitle?: string;
  planDescription?: string;
  period?: BillingPeriod;
  planPrice?: number;
  planDiscount?: number;
  planFeatures?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  planTitle: 'Plan Title',
  planDescription: 'Plan Description',
  period: 'monthly',
  planPrice: 0,
  planDiscount: 0,
  planFeatures: () => [],
});

const periodLabel = computed(() =>
  props.period === 'yearly' ? '/year' : '/month',
);

const newPrice = computed(() => {
  const price = props.planPrice ?? 0;

  const discount = props.planDiscount ?? 0;

  if (discount > 0) {
    return price - (price * discount) / 100;
  }

  return price;
});

const hasDiscount = computed(
  () => (props.planDiscount ?? 0) > 0,
);

// emit event when user clicks
const emit = defineEmits<{
  (e: 'select'): void;
}>();

function handlePlanSelection() {
  emit('select');
}
</script>

<template>
  <div
    class="flex flex-col justify-between gap-5 w-sm h-[700px] p-5 rounded-2xl text-center border-3 border-gray-600 dark:border-gray-600 dark:bg-gray-800 bg-gray-300"
  >
    <div
      class="flex flex-0 flex-col justify-center align-middle w-full"
    >
      <h2 class="text-4xl font-extrabold">
        {{ props.planTitle }}
      </h2>

      <p class="italic text-center w-[60%] mx-auto">
        {{ props.planDescription }}
      </p>
    </div>

    <div
      class="flex flex-1 w-full m-auto flex-col justify-center items-center"
    >
      <div class="flex justify-center items-baseline gap-1">
        <h1
          class="text-5xl"
          :class="{
            'line-through opacity-60 text-xl ': hasDiscount,
          }"
        >
          ${{ props.planPrice }}
        </h1>

        <span class="opacity-60"> {{ periodLabel }} </span>
      </div>

      <div
        v-if="hasDiscount"
        class="flex flex-0 justify-center items-baseline"
      >
        <h1 class="text-5xl">${{ newPrice.toFixed(0) }}</h1>

        <span class="opacity-60">/month</span>
      </div>
    </div>

    <ul class="flex-0 text-left space-y-2">
      <li
        v-for="(feature, i) in props.planFeatures"
        :key="i"
        class="flex items-start gap-2"
      >
        <span class="text-green-500 font-bold mt-0.5"
          >✓</span
        >
        {{ feature }}
      </li>
    </ul>

    <button
      type="button"
      class="font-semibold hover:font-bold py-4 text-xl border-3 rounded-2xl w-[80%] mx-auto hover:cursor-pointer border-gray-600 text-white bg-blue-400 hover:bg-blue-500"
      @click="handlePlanSelection"
    >
      Add to Cart
    </button>
  </div>
</template>

<style scoped></style>
