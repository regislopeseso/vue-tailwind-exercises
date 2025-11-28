<!-- This is the src/components/shoppingcart/EmptyCart.vue file -->

<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/16/solid';
</script>

<template>
  <div class="text-center py-8">
    <ShoppingCartIcon
      class="w-12 h-12 mx-auto text-gray-500 mb-2"
    />
    <p class="text-gray-400 text-sm">Your cart is empty</p>
  </div>
</template>
