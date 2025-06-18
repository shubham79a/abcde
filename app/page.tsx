'use client';

import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
import { Provider as AppBridgeProvider, TitleBar } from '@shopify/app-bridge-react';
import { useEffect, useState } from 'react';
import '@shopify/polaris/build/esm/styles.css';

export default function App() {
  const [host, setHost] = useState('');
  const [shop, setShop] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHost(params.get('host') || '');
    setShop(params.get('shop') || '');
  }, []);

  useEffect(() => {
    const fetchShop = async () => {
      if (!shop) return;
      try {
        const res = await fetch(`/api/shop?shop=${shop}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to load shop info:', err);
      }
    };

    fetchShop();
  }, [shop]);

  if (!host || !shop) return <p>Loading app...</p>;

  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
    host,
    forceRedirect: true,
  };

  return (
    <AppBridgeProvider config={config}>
      <PolarisAppProvider i18n={{}}>
        <TitleBar title="Ziovy Loyalty Dashboard" />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to Ziovy Loyalty</h1>
          <p className="text-gray-600 mb-4">Store: {shop}</p>
          {data ? (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">Shop Info</h2>
              <pre className="text-sm">{JSON.stringify(data.shop, null, 2)}</pre>
            </div>
          ) : (
            <p>Loading shop info...</p>
          )}
        </main>
      </PolarisAppProvider>
    </AppBridgeProvider>
  );
}
