import React from 'react';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Hero />
      <HowItWorks />
    </div>
  );
};
