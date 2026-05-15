import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeadingProps = {
  action?: ReactNode;
  badge?: string;
  badgeClassName?: string;
  description: string;
  descriptionClassName?: string;
  title: string;
};

export function PageHeading({
  action,
  badge,
  badgeClassName,
  description,
  descriptionClassName,
  title,
}: PageHeadingProps) {
  return (
    <header className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-5">
      <div className="min-w-0">
        {badge && (
          <Badge
            variant="outline"
            className={cn(
              "border-blue-200 bg-blue-50 text-blue-700",
              badgeClassName,
            )}
          >
            {badge}
          </Badge>
        )}
        <h1
          className={cn(
            "text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl",
            badge ? "mt-3" : "",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-2 max-w-full text-sm leading-6 text-slate-600 lg:max-w-3xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      </div>

      {action ? <div className="w-full shrink-0 lg:w-auto">{action}</div> : null}
    </header>
  );
}
