'use client';

import { useState } from 'react';
import GetStart from '@/component/GetStart';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <GetStart onStart={() => setStarted(true)} />
      ) : (
        <main>
          Hello
        </main>
      )}
    </>
  );
}
