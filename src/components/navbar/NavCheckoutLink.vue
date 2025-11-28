<!-- This is the /src/components/navbar/NavCheckoutLink.vue file. -->
<script setup lang="ts">
import { usePlansStore } from '@/stores/plansStore';

const store = usePlansStore();

function checkcoutLabel() {
  return store.totalQuantity > 1 ? 'items' : 'item';
}
</script>

<template>
  <!-- desktop checkout link -->
  <div
    class="hidden lg:flex lg:justify-end flex-none rounded p-2"
  >
    <RouterLink
      to="/checkout"
      class="relative text-xl/6 font-semibold text-white inline-flex items-center gap-2"
    >
      <div
        class="flex w-full justify-center items-center gap-2"
      >
        <span
          :class="{
            'animate-bounce font-extrabold! text-2xl':
              store.totalQuantity > 0,
          }"
          >Checkout</span
        >

        <span
          v-if="store.totalQuantity > 0"
          :class="{
            'animate-bounce font-extrabold! ':
              store.totalQuantity > 0,
          }"
          class="inline-flex items-center justify-center p-2 h-10 text-md font-bold text-white bg-blue-500 rounded"
        >
          {{ store.totalQuantity }}
          {{ checkcoutLabel() }}
        </span>
      </div>
      <span
        :class="{
          'animate-bounce text-4xl! font-extrabold! ':
            store.totalQuantity > 0,
        }"
        aria-hidden="true"
        >&rarr;</span
      >
    </RouterLink>
  </div>
</template>

<style scoped></style>
