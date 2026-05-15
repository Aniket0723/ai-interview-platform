import { BrainCircuit, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  className?: string;
};

export function AppHeader({ className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm">
          <BrainCircuit className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 text-slate-950">
            HireAI Interview
          </p>
          <p className="text-xs text-slate-500">AI assessment workspace</p>
        </div>
      </div>

      <Badge
        variant="outline"
        className="hidden border-emerald-200 bg-emerald-50 text-emerald-700 sm:inline-flex"
      >
        <ShieldCheck className="size-3" aria-hidden="true" />
        Secure session
      </Badge>
    </header>
  );
}
