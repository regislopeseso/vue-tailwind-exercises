<template>
  <label
    class="flex items-center justify-end mb-10 text-md text-white font-semibold cursor-pointer"
  >
    <input
      type="checkbox"
      class="w-2 h-2 mr-4 rounded-full appearance-none ring-offset-5 ring-offset-gray-300 ring-blue-400 ring-1 checked:bg-blue-400 checked:ring-blue-400 checked:ring-offset-blue-400"
    />
    <slot></slot>
  </label>
</template>
