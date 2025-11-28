<!-- This is the src/components/planscatalog/BillingOptions.vue file -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// v-model:isYearly support
const props = defineProps<{
  isYearly: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isYearly', value: boolean): void;
}>();

// proxy so template can still use v-model
const localIsYearly = computed({
  get: () => props.isYearly,
  set: (v: boolean) => emit('update:isYearly', v),
});

// controls the one-shot sweep animation
const sweep = ref(false);

// whenever isYearly changes, retrigger the sweep
watch(localIsYearly, () => {
  sweep.value = false;
  requestAnimationFrame(() => {
    sweep.value = true;
  });
});
</script>

<!-- TODO: adjust this component for small screens  -->
<template>
  <label
    class="inline-flex items-center cursor-pointer border-3 border-gray-600 p-3 rounded-xl gap-3"
  >
    <span
      class="select-none text-sm font-medium text-heading underline underline-offset-4 decoration-4 decoration-transparent transition-[text-decoration-color] duration-100 delay-100"
      :class="{
        'decoration-blue-400! font-extrabold!':
          !localIsYearly,
      }"
    >
      Monthly Billing
    </span>

    <input
      v-model="localIsYearly"
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
          'sweep-ltr': sweep && localIsYearly,
          'sweep-rtl': sweep && !localIsYearly,
        }"
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
