import type {
  BillingPeriod,
  Plan,
  CartItem,
} from '@/assets/domain/type.ts';

export function getUnitPrice(
  plan: Plan,
  period: BillingPeriod,
) {
  return plan.prices[period];
}

export function calculateDiscountPercentage(
  quantity: number,
): number {
  if (quantity >= 5) return 35;
  if (quantity >= 3) return 20;
  if (quantity >= 2) return 10;
  return 0;
}

export function calculateLine(
  plan: Plan,
  period: BillingPeriod,
  quantity: number,
) {
  const unitPrice = getUnitPrice(plan, period);

  const discountPercent =
    calculateDiscountPercentage(quantity);
  const lineSubtotal = unitPrice * quantity;
  const lineDiscount =
    lineSubtotal * (discountPercent / 100);
  const lineTotal = lineSubtotal - lineDiscount;

  return {
    unitPrice,
    quantity,
    discountPercent,
    lineSubtotal,
    lineDiscount,
    lineTotal,
  };
}

export function buildCartDetailed(
  cart: CartItem[],
  plans: Plan[],
) {
  return cart
    .map((item) => {
      const plan = plans.find((p) => p.id === item.planId);
      if (!plan) return null;

      return {
        ...item,
        plan,
        ...calculateLine(plan, item.period, item.quantity),
      };
    })
    .filter(Boolean) as Array<
    CartItem & {
      plan: Plan;
      unitPrice: number;
      lineSubtotal: number;
      discountPercent: number;
      lineDiscount: number;
      lineTotal: number;
    }
  >;
}
