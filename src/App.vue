<!-- This is the /src/App.vue file. -->
<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue';
</script>

<template>
  <div>
    <AppNavbar class="w-full" />
    <main class="w-full flex justify-center pt-5">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
