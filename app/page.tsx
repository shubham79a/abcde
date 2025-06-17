'use client';

import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
import { Provider as AppBridgeReactProvider, TitleBar } from '@shopify/app-bridge-react';
import '@shopify/polaris/build/esm/styles.css';
import { useEffect, useState } from 'react';
import { useAuthenticatedFetch } from '../utils/autoFetch'; // use your correct relative path

function DashboardContent({ shop }: { shop: string }) {
  const fetchAuth = useAuthenticatedFetch();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      const res = await fetchAuth(`/api/shop?shop=${shop}`);
      const json = await res.json();
      setData(json);
    };
    fetchShopData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">Ziovy Loyalty Dashboard</h1>
      <p className="mb-4 text-gray-600">Welcome, store: {shop}</p>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-2">Shop Info</h2>
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  );
}

function ClientApp() {
  const [host, setHost] = useState('');
  const [shop, setShop] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setHost(urlParams.get('host') || '');
    setShop(urlParams.get('shop') || '');
  }, []);

  if (!host) return <p>Loading app…</p>;

  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
    host,
    forceRedirect: true,
  };

  return (
    <AppBridgeReactProvider config={config}>
      <PolarisAppProvider i18n={{}}>
        <TitleBar title="Ziovy Loyalty Dashboard" />
        <DashboardContent shop={shop} />
      </PolarisAppProvider>
    </AppBridgeReactProvider>
  );
}

export default ClientApp;
