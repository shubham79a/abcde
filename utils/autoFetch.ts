// utils/authFetch.ts
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';

export const useAuthenticatedFetch = () => {
  const app = useAppBridge();
  return authenticatedFetch(app);
};
