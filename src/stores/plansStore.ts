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

  // Discount rules
  function calculateDiscountPercentage(
    quantity: number,
  ): number {
    if (quantity >= 5) return 35;
    if (quantity >= 3) return 20;
    if (quantity >= 2) return 10;
    return 0;
  }

  // Computed (getters)
  // Shopping Cart Details (joined with plans data)
  const cartDetailed = computed(() => {
    return cart.value
      .map((item) => {
        const plan = getPlanById(item.planId);

        if (!plan) return null;

        const discountPercent = calculateDiscountPercentage(
          item.quantity,
        );
        const lineSubtotal = plan.price * item.quantity;
        const lineDiscount =
          lineSubtotal * (discountPercent / 100);
        const lineTotal = lineSubtotal - lineDiscount;

        return {
          ...item,
          plan,
          lineSubtotal,
          discountPercent,
          lineDiscount,
          lineTotal,
        };
      })
      .filter(Boolean) as Array<
      CartItem & {
        plan: Plan;
        lineSubtotal: number;
        discountPercent: number;
        lineDiscount: number;
        lineTotal: number;
      }
    >;
  });

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
    discountAmount,
    total,

    // Actions
    addToCart,
    decrementFromCart,
    removeFromCart,
    clearCart,
  };
});
