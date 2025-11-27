<script setup lang="ts">
const props = defineProps<{
  label: string;
  class?: string;
}>();

function slugify(str: string) {
  return str.toLowerCase().replace(/\s/g, '-');
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div :class="props.class">
    <input
      class="block focus:border-blue-300 focus:outline-none w-full text-sm font-light tracking-wider bg-gray-200 border-gray-800 placeholder:text-center! placeholder-black"
      v-bind="$attrs"
      :id="slugify(label)"
    />
    <label
      class="text-md text-white opacity-50"
      :for="slugify(label)"
      >{{ label }}</label
    >
  </div>
</template>
