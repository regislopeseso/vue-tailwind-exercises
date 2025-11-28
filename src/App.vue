<!-- This is the /src/App.vue file. -->
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppNavbar from './components/navbar/AppNavbar.vue';

const route = useRoute();
const showNavbar = computed(() => !route.meta.hideNavbar);
</script>

<template>
  <div>
    <Transition name="navbar" mode="out-in">
      <AppNavbar v-if="showNavbar" class="w-full" />
    </Transition>

    <main class="w-full flex justify-center pt-5">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in"
          ><component :is="Component"></component>
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
/* Navbar: fade + slight slide */
.navbar-enter-active,
.navbar-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.navbar-enter-from,
.navbar-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Pages: fade + slight slide up */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
