// app/_not-found/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
