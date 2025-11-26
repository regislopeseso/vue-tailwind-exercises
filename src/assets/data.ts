// This is the /src/assets/data.ts file
export type Plan = {
  id: number; // or string, but be consistent
  title: string;
  description: string;
  price: number;
  features: string[];
};

const plans: Plan[] = [
  {
    id: 1,
    title: 'Starter',
    description:
      'Best option for personal use & for your next project.',
    price: 29,
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
    price: 50,
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
    price: 150,
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
