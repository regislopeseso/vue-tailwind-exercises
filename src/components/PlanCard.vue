<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  planTitle?: string;
  planDescription?: string;
  planPrice?: number;
  planDiscount?: number;
  planFeatures?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  planTitle: 'Plan Title',
  planDescription: 'Plan Description',
  planPrice: 0,
  planDiscount: 0,
  planFeatures: () => [],
});

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
    class="prose flex flex-col justify-between gap-5 w-sm h-[700px] bg-gray-900 p-5 rounded-2xl text-center"
  >
    <div
      class="flex flex-0 flex-col justify-center align-middle w-full"
    >
      <h1 class="text-white p-0! m-0!">
        {{ props.planTitle }}
      </h1>

      <p
        class="text-white italic text-center w-[60%] mx-auto"
      >
        {{ props.planDescription }}
      </p>
    </div>

    <div
      class="flex flex-1 w-full m-auto flex-col justify-center items-center"
    >
      <div class="flex justify-center items-baseline">
        <h1
          class="text-white p-0! m-0!"
          :class="{
            'line-through opacity-60 ': hasDiscount,
          }"
        >
          ${{ props.planPrice }}
        </h1>

        <span class="text-white opacity-60">/month</span>
      </div>

      <div
        v-if="hasDiscount"
        class="flex flex-0 justify-center items-baseline"
      >
        <h1 class="text-white p-0! m-0!">
          ${{ newPrice.toFixed(0) }}
        </h1>

        <span class="text-white opacity-60">/month</span>
      </div>
    </div>

    <ul class="flex-0 text-white text-left space-y-2">
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
      class="bg-blue-500 rounded w-full text-white font-semibold py-2 text-sm hover:font-bold"
      @click="handlePlanSelection"
    >
      Add to Cart
    </button>
  </div>
</template>

<style scoped></style>
