//Define layout for doc page for using liveblocks
import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}

export default PageLayout;
