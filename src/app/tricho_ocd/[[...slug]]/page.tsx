"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const App = dynamic(() => import('../_src/App.tsx'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
});

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string[] | undefined;
  
  // Construct the initial path for the MemoryRouter
  const initialPath = slug ? `/${slug.join('/')}` : "/";
  
  return <App initialPath={initialPath} />;
}
