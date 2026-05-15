"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Mic,
  Video,
  Wifi,
} from "lucide-react";

import { ScreenShell } from "@/components/screen-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { candidateInstructions } from "@/data/questions";

type LandingScreenProps = {
  onStart: () => void;
};

const processSteps = [
  {
    label: "Candidate profile",
    detail: "Basic details and resume context",
    icon: FileText,
  },
  {
    label: "System readiness",
    detail: "Camera, mic, and internet checks",
    icon: Video,
  },
  {
    label: "AI interview",
    detail: "Behavioral and technical questions",
    icon: BrainCircuit,
  },
  {
    label: "Coding round",
    detail: "Editor, test cases, and submission",
    icon: Code2,
  },
];

const readinessItems = [
  {
    label: "Camera",
    icon: Camera,
  },
  {
    label: "Mic",
    icon: Mic,
  },
  {
    label: "Network",
    icon: Wifi,
  },
];

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <ScreenShell>
      <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="min-w-0 w-full"
        >
          <h1 className="text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
            Complete your AI-led interview with confidence.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-700 sm:text-base">
            HireAI Interview guides candidates through profile capture,
            readiness checks, structured AI questions, and a realistic coding
            round in one clean hiring workflow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onStart}
              className="h-10 w-fit bg-blue-600 px-4 text-sm text-white shadow-sm hover:bg-blue-700"
            >
              Start Interview
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              className="h-10 w-fit border-slate-300 bg-white px-4 text-sm text-slate-800 hover:bg-slate-100"
            >
              Review Instructions
            </Button>
          </div>

          <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-800">
            <Clock3 className="size-3.5" aria-hidden="true" />
            Estimated interview duration: 30-45 min
          </div>

          <div className="mt-7 grid auto-rows-fr gap-2.5 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2">
            {candidateInstructions.map((instruction) => (
              <div
                key={instruction}
                className="flex min-h-16 gap-2.5 h-full items-center rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm"
              >
                <CheckCircle2
                  className="mt-0.5 size-3.5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <p className="text-xs leading-5 text-slate-600">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
          className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 lg:translate-y-2"
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-950">
                Interview flow
              </p>
              <p className="mt-1 whitespace-nowrap text-[11px] text-slate-500 sm:text-xs">
                Guided steps before final review
              </p>
            </div>
            <Badge className="ml-auto h-5 shrink-0 bg-slate-950 px-2 py-0 text-[10px] text-white">
              Process Preview
            </Badge>
          </div>

          <div className="mt-5 space-y-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.label}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-slate-950">
                        {step.label}
                      </p>
                      <span className="text-xs font-medium text-slate-400">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-blue-950">
                  Current readiness
                </p>
                <p className="text-xs text-blue-700">
                  Checks will run before the AI interview begins.
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Ready
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {readinessItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-lg bg-white px-2 py-3 ring-1 ring-blue-100"
                  >
                    <Icon
                      className="mx-auto size-4 text-blue-600"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-xs font-medium text-slate-950">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-600">Good</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>
    </ScreenShell>
  );
}
