"use client";
import React from "react";

import dynamic from 'next/dynamic';
import './_src/index.css';

const App = dynamic(() => import('./_src/App.tsx'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
});

export default function Page({ params }: { params: Promise<{ activity?: string }> }) {
  React.use(params);
  const initialPath = "/";
  return <App initialPath={initialPath} />;
}
