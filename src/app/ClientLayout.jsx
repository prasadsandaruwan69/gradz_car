"use client";

import { useState, useEffect } from 'react';
import AdminWrapper from '../components/AdminWrapper';
import GrandCarzLoader from '@/components/GrandCarzLoader';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for fonts + small delay for luxury feel
    const load = async () => {
      await document.fonts.ready;
      setTimeout(() => setIsLoading(false), 800); // Smooth fade
    };
    load();
  }, []);

  return (
    <>
      {isLoading ? (
        <GrandCarzLoader />
      ) : (
        <AdminWrapper>
          {children}
        </AdminWrapper>
      )}
    </>
  );
}