import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import plansData from '@/assets/plansData.ts';

import type {
  BillingPeriod,
  Plan,
  CartItem,
} from '@/assets/domain/type.ts';

import { buildCartDetailed } from '@/assets/domain/pricing.ts';

export const usePlansStore = defineStore('plans', () => {
  // --------------------
  // State
  // --------------------
  const plans = ref<Plan[]>(plansData);
  const cart = ref<CartItem[]>([]);

  // --------------------
  // Helpers
  // --------------------
  const getPlanById = (id: Plan['id']) =>
    plans.value.find((plan) => plan.id === id);

  // --------------------
  // Getters / Computeds
  // --------------------
  const cartDetailed = computed(() =>
    buildCartDetailed(cart.value, plans.value),
  );

  const totalQuantity = computed(() =>
    cart.value.reduce((sum, i) => sum + i.quantity, 0),
  );

  const subtotal = computed(() =>
    cartDetailed.value.reduce(
      (sum, i) => sum + i.lineSubtotal,
      0,
    ),
  );

  const discountAmount = computed(() =>
    cartDetailed.value.reduce(
      (sum, i) => sum + i.lineDiscount,
      0,
    ),
  );

  const total = computed(() =>
    cartDetailed.value.reduce(
      (sum, i) => sum + i.lineTotal,
      0,
    ),
  );

  // --------------------
  // Actions
  // --------------------
  function addToCart(
    planId: Plan['id'],
    period: BillingPeriod,
    quantity = 1,
  ) {
    const existing = cart.value.find(
      (i) => i.planId === planId && i.period === period,
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({ planId, period, quantity });
    }
  }

  function decrementFromCart(
    planId: Plan['id'],
    period: BillingPeriod,
    quantity = 1,
  ) {
    const existing = cart.value.find(
      (i) => i.planId === planId && i.period === period,
    );

    if (!existing) return;

    existing.quantity -= quantity;

    if (existing.quantity <= 0) {
      cart.value = cart.value.filter(
        (i) =>
          !(i.planId === planId && i.period === period),
      );
    }
  }

  function removeFromCart(
    planId: Plan['id'],
    period: BillingPeriod,
  ) {
    cart.value = cart.value.filter(
      (i) => !(i.planId === planId && i.period === period),
    );
  }

  function clearCart() {
    cart.value = [];
  }

  return {
    // State
    plans,
    cart,

    // Getters
    cartDetailed,
    totalQuantity,
    subtotal,
    discountAmount,
    total,

    // Actions
    addToCart,
    decrementFromCart,
    removeFromCart,
    clearCart,
    getPlanById, // optional export, handy in UI
  };
});
