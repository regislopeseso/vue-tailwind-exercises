<!-- This is the /src/components/AppNavBar.vue file. -->
<script setup lang="ts">
import { ref } from 'vue';
import { usePlansStore } from '@/stores/plansStore';
import { useRouter } from 'vue-router';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue';

import {
  Bars3Icon,
  XMarkIcon,
  FaceFrownIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@heroicons/vue/16/solid';

const store = usePlansStore();
const router = useRouter();

const callsToAction = [
  {
    name: 'Clear Cart',
    action: () => store.clearCart(),
    icon: FaceFrownIcon,
  },
  {
    name: 'Checkout',
    action: () => router.push('/checkout'),
    icon: CreditCardIcon,
  },
];

const mobileMenuOpen = ref(false);

function periodLabel(period: 'monthly' | 'yearly') {
  return period === 'yearly' ? '/year' : '/month';
}
</script>

<template>
  <header class="bg-gray-600 dark:bg-gray-900">
    <nav
      class="mx-auto flex items-center p-6 justify-between"
      aria-label="Global"
    >
      <!-- logos left side -->
      <div class="flex flex-none gap-3">
        <div class="flex">
          <a href="https://vuejs.org/" target="_blank">
            <span class="sr-only">Vue Js Webpage</span>

            <img
              class="h-8 w-auto"
              src="/favicon.ico"
              alt=""
            />
          </a>
        </div>

        <div class="flex">
          <a href="https://vueschool.io/" target="_blank">
            <span class="sr-only">Vue School Webpage</span>

            <img
              class="h-8 w-auto"
              src="/vueschool_logo_icon_only.svg"
              alt=""
            />
          </a>
        </div>

        <div class="flex">
          <a
            href="https://tailwindcss.com/"
            target="_blank"
          >
            <span class="sr-only">Tailwind Webpage</span>

            <img
              class="h-8 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
            />
          </a>
        </div>
      </div>

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

      <!-- desktop nav -->
      <PopoverGroup
        class="hidden lg:flex lg:gap-x-12 lg:justify-center grow"
      >
        <RouterLink
          to="/pricing"
          class="text-sm/6 font-semibold text-white"
          >Princing</RouterLink
        >

        <Popover class="relative">
          <PopoverButton
            class="flex items-center gap-x-1 text-sm/6 font-semibold text-white"
          >
            Shopping Cart
            <span
              v-if="store.totalQuantity > 0"
              class="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full"
            >
              {{ store.totalQuantity }}
            </span>
            <ChevronDownIcon
              class="size-5 flex-none text-gray-500"
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
              class="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10"
            >
              <div class="p-4">
                <!-- empty cart -->
                <div
                  v-if="store.cartDetailed.length === 0"
                  class="text-center py-8"
                >
                  <ShoppingCartIcon
                    class="w-12 h-12 mx-auto text-gray-500 mb-2"
                  />
                  <p class="text-gray-400 text-sm">
                    Your cart is empty
                  </p>
                </div>

                <!-- cart lines -->
                <div
                  v-for="item in store.cartDetailed"
                  :key="`${item.planId}-${item.period}`"
                  class="flex justify-between items-center rounded-lg p-4 text-sm/6 hover:bg-white/5"
                >
                  <div
                    class="flex flex-2 items-baseline justify-start p-2 rounded-lg gap-1"
                  >
                    <span
                      class="text-lg font-bold text-white"
                    >
                      {{ item.plan.title }}
                    </span>
                    <span
                      class="text-sm font-semibold text-white"
                    >
                      ({{ item.quantity }}x)</span
                    >
                    <span class="text-xs text-gray-400">
                      {{ item.period }}
                    </span>
                  </div>

                  <div class="flex-1">
                    <p class="mt-1 text-gray-400">
                      ${{ item.unitPrice.toFixed(2) }}
                      {{ periodLabel(item.period) }} ×
                      {{ item.quantity }}
                      <span
                        v-if="item.discountPercent > 0"
                        class="text-green-400"
                      >
                        ({{ item.discountPercent }}% off)
                      </span>
                    </p>
                    <p class="text-white font-semibold">
                      Total: ${{
                        item.lineTotal.toFixed(2)
                      }}
                    </p>
                  </div>
                </div>

                <!-- totals -->
                <div
                  v-if="store.cartDetailed.length > 0"
                  class="mt-4 pt-4 border-t border-white/10"
                >
                  <div
                    class="flex justify-between text-white px-4"
                  >
                    <span class="font-semibold"
                      >Subtotal:</span
                    >
                    <span
                      >${{
                        store.subtotal.toFixed(2)
                      }}</span
                    >
                  </div>
                  <div
                    v-if="store.discountAmount > 0"
                    class="flex justify-between text-green-400 px-4 mt-1"
                  >
                    <span class="font-semibold"
                      >Discount:</span
                    >
                    <span
                      >-${{
                        store.discountAmount.toFixed(2)
                      }}</span
                    >
                  </div>
                  <div
                    class="flex justify-between text-white font-bold px-4 mt-2 text-lg"
                  >
                    <span>Total:</span>
                    <span
                      >${{ store.total.toFixed(2) }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div
                v-if="store.cartDetailed.length > 0"
                class="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50"
              >
                <button
                  v-for="item in callsToAction"
                  :key="item.name"
                  @click="item.action"
                  class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-white hover:bg-gray-700/50"
                >
                  <component
                    :is="item.icon"
                    class="size-5 flex-none text-gray-500"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </button>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </PopoverGroup>

      <!-- desktop checkout link -->
      <div
        class="hidden lg:flex lg:justify-end flex-none rounded p-2"
      >
        <RouterLink
          to="/checkout"
          class="relative text-sm/6 font-semibold text-white inline-flex items-center gap-2"
        >
          <div
            class="flex w-full justify-center items-center gap-2"
          >
            <span>Checkout</span>

            <span
              v-if="store.totalQuantity > 0"
              class="flex items-center justify-center w-full h-5 text-xs font-bold text-white"
            >
              ( {{ store.totalQuantity }} items )
            </span>
          </div>
          <span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </div>
    </nav>

    <!-- mobile dialog -->
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50"></div>
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10"
      >
        <!-- header logos + close -->
        <div class="flex items-center justify-between">
          <a href="https://vuejs.org/" target="_blank">
            <span class="sr-only">Vue Js Webpage</span>

            <img
              class="h-8 w-auto"
              src="/favicon.ico"
              alt=""
            />
          </a>

          <a href="https://vueschool.io/" target="_blank">
            <span class="sr-only">Vue School Webpage</span>

            <img
              class="h-8 w-auto"
              src="/vueschool_logo_icon_only.svg"
              alt=""
            />
          </a>

          <a
            href="https://tailwindcss.com/"
            target="_blank"
          >
            <span class="sr-only">Tailwind Webpage</span>

            <img
              class="h-8 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
            />
          </a>

          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-400"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>

            <XMarkIcon class="size-6" aria-hidden="true" />
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
                  <div
                    v-if="store.cartDetailed.length === 0"
                    class="text-center py-4 px-6"
                  >
                    <p class="text-gray-400 text-sm">
                      Your cart is empty
                    </p>
                  </div>

                  <div
                    v-for="item in store.cartDetailed"
                    :key="`${item.planId}-${item.period}`"
                    class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 text-white"
                  >
                    <p class="font-semibold">
                      {{ item.plan.title }}
                    </p>
                    <p class="text-gray-400 text-xs">
                      Quantity: {{ item.quantity }} × ${{
                        item.unitPrice.toFixed(2)
                      }}
                      {{ periodLabel(item.period) }}
                      <span
                        v-if="item.discountPercent > 0"
                        class="text-green-400"
                      >
                        ({{ item.discountPercent }}% off)
                      </span>
                    </p>
                    <p
                      class="text-white font-semibold text-xs"
                    >
                      Total: ${{
                        item.lineTotal.toFixed(2)
                      }}
                    </p>
                  </div>

                  <div
                    v-if="store.cartDetailed.length > 0"
                    class="border-t border-white/10 pt-2 mt-2 px-6"
                  >
                    <div
                      class="flex justify-between text-white text-sm"
                    >
                      <span>Subtotal:</span>
                      <span
                        >${{
                          store.subtotal.toFixed(2)
                        }}</span
                      >
                    </div>
                    <div
                      v-if="store.discountAmount > 0"
                      class="flex justify-between text-green-400 text-sm"
                    >
                      <span>Discount:</span>
                      <span
                        >-${{
                          store.discountAmount.toFixed(2)
                        }}</span
                      >
                    </div>
                    <div
                      class="flex justify-between text-white font-bold mt-1"
                    >
                      <span>Total:</span>
                      <span
                        >${{ store.total.toFixed(2) }}</span
                      >
                    </div>
                  </div>

                  <div
                    v-if="store.cartDetailed.length > 0"
                    class="flex flex-col gap-2 pt-2 px-6"
                  >
                    <button
                      @click="store.clearCart()"
                      class="w-full rounded-lg py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
                    >
                      Clear Cart
                    </button>
                    <RouterLink
                      to="/checkout"
                      @click="mobileMenuOpen = false"
                      class="w-full rounded-lg py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center"
                    >
                      Checkout
                    </RouterLink>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
            <div class="py-6">
              <RouterLink
                to="/checkout"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5 inline-flex items-center gap-2"
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
  </header>
</template>

<style scoped></style>
