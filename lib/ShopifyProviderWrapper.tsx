// components/ShopifyProviderWrapper.tsx
'use client';

import { Suspense } from 'react';
import { ShopifyProvider } from './ShopifyProvider';

export default function ShopifyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p>Loading Shopify App...</p>}>
      <ShopifyProvider>{children}</ShopifyProvider>
    </Suspense>
  );
}
