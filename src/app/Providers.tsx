"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import * as Tooltip from "@radix-ui/react-tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <Tooltip.Provider delayDuration={200} skipDelayDuration={300}>
        {children}
      </Tooltip.Provider>
    </ThemeProvider>
  );
};

export default Providers;
