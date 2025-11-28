<!-- This is the /src/components/AppNavBar.vue file. -->
<script setup lang="ts">
import NavIcons from './NavIcons.vue';
import DesktopNav from './DesktopNav.vue';
import MobileNav from './MobileNav.vue';
</script>

<template>
  <header class="bg-gray-600 dark:bg-gray-800">
    <nav
      class="mx-auto flex items-center px-5 h-20 justify-between"
      aria-label="Global"
    >
      <!-- logos left side -->
      <NavIcons />

      <!-- desktop nav -->
      <DesktopNav />

      <!-- mobile nav -->
      <MobileNav />
    </nav>
  </header>
</template>

<style scoped></style>
