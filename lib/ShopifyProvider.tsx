'use client';

import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import '@shopify/polaris/build/esm/styles.css';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const shopifyConfig = {
  apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
  forceRedirect: true,
};

function InnerShopifyProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const host = searchParams.get('host');

  if (!host) return <p>Missing host parameter...</p>;

  const config = {
    ...shopifyConfig,
    host,
  };

  return (
    <AppBridgeProvider config={config}>
      <PolarisAppProvider i18n={{}}>
        {children}
      </PolarisAppProvider>
    </AppBridgeProvider>
  );
}

export function ShopifyProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p>Loading Shopify...</p>}>
      <InnerShopifyProvider>{children}</InnerShopifyProvider>
    </Suspense>
  );
}
