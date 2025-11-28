<!-- This is the /src/components/navbar/MobileNav.vue file. -->
<script setup lang="ts">
import { ref } from 'vue';
import { usePlansStore } from '@/stores/plansStore';
import AppShoppingCart from '../shoppingcart/AppShoppingCart.vue';
import NavIcons from './NavIcons.vue';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/vue/16/solid';

const store = usePlansStore();

const mobileMenuOpen = ref(false);
</script>

<template>
  <div>
    <!-- mobile hamburger -->
    <div class="flex lg:hidden ps-5">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
        @click="mobileMenuOpen = true"
      >
        <span class="sr-only">Open main menu</span>

        <Bars3Icon class="size-6" aria-hidden="true" />
      </button>
    </div>

    <!-- mobile dialog - teleported to body -->
    <Teleport to="body">
      <Dialog
        class="lg:hidden"
        @close="mobileMenuOpen = false"
        :open="mobileMenuOpen"
      >
        <div class="fixed inset-0 z-50"></div>
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10"
        >
          <!-- header logos + close -->
          <div class="flex items-center justify-between">
            <NavIcons />

            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-400"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>

              <XMarkIcon
                class="size-6"
                aria-hidden="true"
              />
            </button>
          </div>

          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-white/10">
              <div class="space-y-2 py-6">
                <RouterLink
                  to="/princing"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >Pricing</RouterLink
                >

                <Disclosure
                  as="div"
                  class="-mx-3"
                  v-slot="{ open }"
                >
                  <DisclosureButton
                    class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    <span class="flex items-center gap-2">
                      Shopping Cart

                      <span
                        v-if="store.totalQuantity > 0"
                        class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full"
                      >
                        {{ store.totalQuantity }}
                      </span>
                    </span>

                    <ChevronDownIcon
                      :class="[
                        open ? 'rotate-180' : '',
                        'size-5 flex-none',
                      ]"
                      aria-hidden="true"
                    />
                  </DisclosureButton>

                  <DisclosurePanel class="mt-2 space-y-2">
                    <AppShoppingCart />
                  </DisclosurePanel>
                </Disclosure>
              </div>

              <div class="py-6">
                <RouterLink
                  to="/checkout"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5 items-center gap-2"
                >
                  Checkout
                  <span
                    v-if="store.totalQuantity > 0"
                    class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full"
                  >
                    {{ store.totalQuantity }}
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </Teleport>
  </div>
</template>

<style scoped></style>
