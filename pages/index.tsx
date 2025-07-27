'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { theme } from '../styles/theme';

export default function Home() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsLoading(true);
    // Simple URL-safe name conversion
    const urlName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    router.push(`/${urlName}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradients.background} flex items-center justify-center p-4`}>
      <div className={`bg-white rounded-2xl ${theme.shadows.lg} p-8 max-w-md w-full text-center`}>
        <div className="text-6xl mb-6">💝</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pick Your Perfect Date</h1>
        <p className="text-gray-600 mb-8">
          Enter your name to discover amazing date ideas tailored just for you
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What's your name?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className={`w-full bg-gradient-to-r ${theme.gradients.button} text-white py-3 rounded-lg font-medium hover:bg-gradient-to-r ${theme.gradients.buttonHover} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Loading...' : 'Start Exploring'}
          </button>
        </form>
        
        <p className="text-xs text-gray-500 mt-6">
          Your experience is private and personalized just for you
        </p>
      </div>
    </div>
  );
}
