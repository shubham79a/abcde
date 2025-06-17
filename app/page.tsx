'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [shop, setShop] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setShop(urlParams.get('shop') || '');
    setToken(urlParams.get('token') || '');
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">Ziovy Loyalty Dashboard</h1>
      <p className="mb-4 text-gray-600">Welcome, store: {shop}</p>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        {/* Replace with actual dashboard data */}
        <h2 className="text-2xl font-semibold mb-2">Points Stats</h2>
        <p className="mb-2">Total Points Awarded: 9,230</p>
        <p>Top Customer: John Doe (1,230 pts)</p>
        <p>token:{token}</p>
      </div>
    </main>
  );
}
