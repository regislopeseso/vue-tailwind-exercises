// This is the /src/assets/data.ts file
import type { Plan } from '@/assets/domain/type.ts';

const plans: Plan[] = [
  {
    id: 1,
    title: 'Starter',
    description:
      'Best option for personal use & for your next project.',
    prices: {
      monthly: 29,
      yearly: 289,
    },
    features: [
      'Unlimited Access',
      '24/7 Customer Support',
      'Customizable Dashboard',
      'Advanced Analytics Tools',
      'Integration with Third-Party Services',
      'Secure Data Encryption',
    ],
  },
  {
    id: 2,
    title: 'Plus',
    description:
      'Great for small teams and anyone looking to scale',
    prices: {
      monthly: 50,
      yearly: 499,
    },
    features: [
      'Starter Plan Features',
      'Multi-User Collaboration Tools',
      'Real-Time Data Backup',
      'Mobile App Access',
      'Custom Branding Options',
      'Automated Reporting System',
    ],
  },
  {
    id: 3,
    title: 'Enterprise',
    description:
      'Best for large users and extended redistribution rights.',
    prices: {
      monthly: 150,
      yearly: 1499,
    },
    features: [
      'Starter & Plus Plan Features',
      'Priority Feature Updates',
      'Extended Storage Capacity',
      'Personalized User Experience',
      'In-depth Training Materials',
      'Dedicated Account Manager',
    ],
  },
];

export default plans;
