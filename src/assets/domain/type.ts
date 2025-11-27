export type BillingPeriod = 'monthly' | 'yearly';

export type Plan = {
  id: number;
  title: string;
  description: string;
  prices: Record<BillingPeriod, number>;
  features: string[];
};

export type CartItem = {
  planId: Plan['id'];
  period: BillingPeriod;
  quantity: number;
};
