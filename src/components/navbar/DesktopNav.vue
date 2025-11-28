<!-- This is the /src/components/navbar/DesktopNav.vue file. -->
<script setup lang="ts">
import { usePlansStore } from '@/stores/plansStore';
import AppShoppingCart from '../shoppingcart/AppShoppingCart.vue';
import NavCheckoutLink from './NavCheckoutLink.vue';

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue';

import { ChevronDownIcon } from '@heroicons/vue/16/solid';

const store = usePlansStore();
</script>

<template>
  <div
    class="hidden lg:flex lg:gap-x-12 lg:justify-end items-center grow"
  >
    <RouterLink
      to="/pricing"
      class="text-xl/6 font-semibold text-white pl-3"
      >Princing</RouterLink
    >

    <PopoverGroup>
      <Popover class="relative">
        <PopoverButton
          class="flex items-center gap-x-1 text-xl/6 font-semibold text-white focus:outline-none focus:ring-0 focus-visible:outline-none cursor-pointer"
        >
          Shopping Cart
          <span
            v-if="store.totalQuantity > 0"
            class="ml-2 inline-flex items-center justify-center w-8 h-8 text-lg/6 font-bold text-white bg-blue-500 rounded-full"
          >
            {{ store.totalQuantity }}
          </span>

          <ChevronDownIcon
            class="size-8 flex-none text-white dark:text-gray-500"
            aria-hidden="true"
          />
        </PopoverButton>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <PopoverPanel
            class="absolute left-1/2 z-99 mt-3 w-[800px] max-w-6xl -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-600 dark:bg-gray-800 outline-1 -outline-offset-1 outline-white/10 border-2 border-gray-600"
            :class="{
              'w-[200px]!': store.cartDetailed.length === 0,
            }"
          >
            <AppShoppingCart />
          </PopoverPanel>
        </transition>
      </Popover>
    </PopoverGroup>

    <NavCheckoutLink />
  </div>
</template>

<style scoped></style>
