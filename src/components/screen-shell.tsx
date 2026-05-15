import type { ReactNode } from "react";

import { AppHeader } from "@/components/app-header";
import { cn } from "@/lib/utils";

type ScreenShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function ScreenShell({
  children,
  className,
  contentClassName,
}: ScreenShellProps) {
  return (
    <main
      className={cn(
        "min-h-screen overflow-x-hidden bg-[#f4f7fb] px-3 py-4 text-slate-950 sm:px-5 sm:py-5 lg:px-8",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col",
          contentClassName
        )}
      >
        <AppHeader />
        {children}
      </div>
    </main>
  );
}
