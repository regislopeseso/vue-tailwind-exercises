<script setup lang="ts">
import CartCheckoutColumnLeft from './CartCheckoutColumnLeft.vue';
import CartCheckoutColumnRight from './CartCheckoutColumnRight.vue';
import CartCheckoutShadow from './CartCheckoutShadow.vue';
</script>

<template>
  <div class="relative">
    <div
      class="min-h-50! rounded-xl overflow-hidden border-gray-600 border-3 grid grid-cols-12 relative z-10"
    >
      <CartCheckoutColumnLeft />
      <CartCheckoutColumnRight />
    </div>
    <CartCheckoutShadow />
  </div>
</template>
