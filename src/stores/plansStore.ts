import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import plansData, { type Plan } from '@/assets/data.ts';

type CartItem = {
  planId: number;
  quantity: number;
};

export const usePlansStore = defineStore('plans', () => {
  // State
  // Catalog of plans
  const plans = ref<Plan[]>(plansData);

  // Shopping Cart State
  const cart = ref<CartItem[]>([]);

  // Helpers
  const getPlanById = (id: Plan['id']) =>
    plans.value.find((plan) => plan.id === id);

  // Computed (getters)

  // Shopping Cart Details (joined with plans data)
  const cartDetailed = computed(() => {
    return cart.value
      .map((item) => {
        const plan = getPlanById(item.planId);

        if (!plan) return null;

        return {
          ...item,
          plan,
          lineTotal: plan.price * item.quantity,
        };
      })
      .filter(Boolean) as Array<
      CartItem & { plan: Plan; lineTotal: number }
    >;
  });

  const totalQuantity = computed(() =>
    cart.value.reduce((sum, i) => sum + i.quantity, 0),
  );

  const subtotal = computed(() =>
    cartDetailed.value.reduce(
      (sum, i) => sum + i.lineTotal,
      0,
    ),
  );

  // Discount rules
  function calculateDiscountPercentage(
    quantity: number,
  ): number {
    if (quantity >= 10) return 25;
    if (quantity >= 5) return 15;
    if (quantity >= 3) return 5;
    return 0;
  }

  const discountPercent = computed(() =>
    calculateDiscountPercentage(totalQuantity.value),
  );

  const discountAmount = computed(
    () => subtotal.value * (discountPercent.value / 100),
  );

  const total = computed(
    () => subtotal.value - discountAmount.value,
  );

  // Actions
  function addToCart(planId: Plan['id'], quantity = 1) {
    const existing = cart.value.find(
      (i) => i.planId === planId,
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({ planId, quantity });
    }
  }

  function decrementFromCart(
    planId: Plan['id'],
    quantity = 1,
  ) {
    const existing = cart.value.find(
      (i) => i.planId === planId,
    );

    if (!existing) return;

    existing.quantity -= quantity;

    if (existing.quantity <= 0) {
      cart.value = cart.value.filter(
        (i) => i.planId !== planId,
      );
    }
  }

  function removeFromCart(planId: Plan['id']) {
    cart.value = cart.value.filter(
      (i) => i.planId !== planId,
    );
  }

  function clearCart() {
    cart.value = [];
  }

  return {
    // State
    plans, // catalog of plans
    cart, // cart state
    cartDetailed,

    totalQuantity,
    subtotal,
    discountPercent,
    discountAmount,
    total,

    // Actions
    addToCart,
    decrementFromCart,
    removeFromCart,
    clearCart,
  };
});
