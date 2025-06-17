// app/not-found.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic'; // Important to avoid build errors

function NotFoundContent() {
  const params = useSearchParams();
  return <div>Missing params: {params.get('host')}</div>;
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotFoundContent />
    </Suspense>
  );
}
