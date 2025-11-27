<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps<{
  icon: string;
}>();
</script>
<template>
  <Icon
    class="opacity-50 hover:drop-shadow-0_0_16px_#fff transition-all hover:opacity-100 hover:text-white"
    :icon="icon"
  />
</template>
