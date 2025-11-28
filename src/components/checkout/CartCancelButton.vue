<script setup lang="ts">
import { usePlansStore } from '@/stores/plansStore';
import { useRouter } from 'vue-router';

const store = usePlansStore();
const router = useRouter();

function handleCancelCheckout() {
  store.clearCart();
  router.push('/');
}
</script>

<template>
  <button
    @click="handleCancelCheckout()"
    class="relative flex items-center gap-2 text-sm font-bold uppercase group h-2.5"
  >
    <span
      class="inline-block w-8 h-0.5 bg-red-400 group-hover:w-6 transition-all duration-150"
    ></span>

    <span
      class="absolute left-0 top-[50%] translate-y-[-50%] w-3 h-0.5 bg-red-400 group-hover:-rotate-45 origin-left transition-all duration-150"
    ></span>

    <span
      class="absolute left-0 top-[50%] translate-y-[-50%] w-3 h-0.5 bg-red-400 group-hover:rotate-45 origin-left transition-all duration-150"
    ></span>

    <span class="z-10 hover:text-red-400">Cancel</span>
  </button>
</template>
