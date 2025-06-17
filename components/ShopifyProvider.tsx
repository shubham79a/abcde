'use client';

import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { createApp } from '@shopify/app-bridge';

interface Props {
  children: ReactNode;
  shop: string;
}

export default function ShopifyProvider({ children, shop }: Props) {
  const [appBridge, setAppBridge] = useState<any>(null);

  const appConfig = useMemo(() => ({
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
    host: btoa(shop),
    forceRedirect: true,
  }), [shop]);

  useEffect(() => {
    const app = createApp(appConfig);
    setAppBridge(app);
  }, [appConfig]);

  return (
    <PolarisAppProvider i18n={{}}>
      {children}
    </PolarisAppProvider>
  );
}
