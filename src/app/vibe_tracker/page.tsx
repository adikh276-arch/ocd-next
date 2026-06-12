"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const App = dynamic(() => import("./_src/App"), { ssr: false });

export default function Page() {
  const pathname = usePathname();
  const basePath = "/ocd/vibe_tracker";
  const relativePath = pathname.replace(basePath, "") || "/";

  return <App initialPath={relativePath} />;
}
