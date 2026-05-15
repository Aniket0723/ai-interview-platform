"use client";

import type { ElementType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Mic,
  MonitorCheck,
  ShieldCheck,
  Video,
  Wifi,
} from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { ScreenShell } from "@/components/screen-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";
import type { CandidateDetails } from "@/data/questions";

type SetupScreenProps = {
  candidateDetails: CandidateDetails;
  onBack: () => void;
  onStartInterview: () => void;
};

const readinessChecks = [
  {
    title: "Camera Check",
    description: "Preview is visible and face framing looks clear.",
    status: "Ready",
    icon: Camera,
    detail: "HD camera detected",
  },
  {
    title: "Microphone Check",
    description: "Input level is stable with low background noise.",
    status: "Ready",
    icon: Mic,
    detail: "Voice input active",
  },
  {
    title: "Internet Status",
    description: "Connection is strong enough for a live AI interview.",
    status: "Good",
    icon: Wifi,
    detail: "42 ms latency",
  },
];

const guidelines = [
  "Keep your camera on and stay centered during the interview.",
  "Answer in a quiet environment with your microphone unmuted.",
  "Do not refresh, close, or switch away from the interview tab.",
  "You can skip a question, but skipped questions may affect review quality.",
  "Coding questions will appear in a dedicated editor when required.",
];

export function SetupScreen({
  candidateDetails,
  onBack,
  onStartInterview,
}: SetupScreenProps) {
  const displayName = candidateDetails.fullName || "Candidate";
  const displayRole = candidateDetails.roleAppliedFor || "Selected role";

  return (
    <ScreenShell>
      <PageHeading
        action={
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-slate-300 bg-white text-slate-800"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Candidate Details
          </Button>
        }
        description="Confirm your device readiness and review the guidelines before starting the AI interview."
        title="Interview Setup"
      />

      <section className="grid flex-1 gap-4 pb-5 pt-1 sm:gap-5 sm:pb-7 sm:pt-2 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-4 sm:space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {readinessChecks.map((check) => (
              <ReadinessCard key={check.title} {...check} />
            ))}
          </div>

          <div className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2">
            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-6 lg:p-4 xl:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                    Camera Preview
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Simulated preview for frontend assessment
                  </p>
                </div>
                <Badge className="shrink-0 bg-emerald-100 text-[11px] text-emerald-700 sm:text-xs">
                  <CheckCircle2 className="size-3" aria-hidden="true" />
                  Ready
                </Badge>
              </div>

              <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-950 sm:mt-5 lg:mt-4 xl:mt-5">
                <div className="relative flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#1d4ed8_0,#0f172a_42%,#020617_100%)]">
                  <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 text-[10px] font-medium text-white sm:left-4 sm:top-4 sm:gap-2 sm:px-3 sm:text-xs">
                    <span className="size-1.5 rounded-full bg-emerald-400 sm:size-2" />
                    Live preview
                  </div>
                  <div className="flex size-20 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 sm:size-28 lg:size-20 xl:size-28">
                    <Video
                      className="size-8 sm:size-10 lg:size-8 xl:size-10"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/10 p-2 text-white backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:p-3 lg:bottom-3 xl:bottom-4">
                    <p className="truncate text-xs font-semibold sm:text-sm">
                      {displayName}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-white/70 sm:mt-1 sm:text-xs">
                      {displayRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-6 lg:p-4 xl:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                    Audio Level
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Microphone input is stable
                  </p>
                </div>
                <Badge className="shrink-0 bg-emerald-100 text-[11px] text-emerald-700 sm:text-xs">
                  Connected
                </Badge>
              </div>

              <Waveform
                active
                className="mt-4 sm:mt-8 lg:mt-5 xl:mt-8"
                frameClassName="h-24 sm:h-28 lg:h-24 xl:h-28"
              />

              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
                <MetricTile label="Noise" value="Low" />
                <MetricTile label="Clarity" value="92%" />
              </div>
            </div>
          </div>

        </div>

        <aside className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2 lg:block lg:space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-4 xl:p-5">
            <p className="text-xs font-semibold text-slate-950 sm:text-sm">
              Session Summary
            </p>
            <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
              <SummaryRow label="Candidate" value={displayName} />
              <SummaryRow label="Role" value={displayRole} />
              <SummaryRow
                label="Experience"
                value={candidateDetails.experienceLevel || "Not selected"}
              />
              <SummaryRow label="Duration" value="30-45 min" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-3 text-white shadow-sm sm:p-5 lg:p-4 xl:p-5">
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
              <Clock3 className="size-4 text-blue-300" aria-hidden="true" />
              What happens next
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6">
              The AI interviewer will begin with a short introduction, then move
              through structured behavioral and technical questions.
            </p>
            <Button
              type="button"
              onClick={onStartInterview}
              className="mt-4 h-10 w-full bg-blue-600 text-sm text-white hover:bg-blue-700 sm:mt-5 sm:h-11 lg:h-10 lg:text-xs xl:h-11 xl:text-sm"
            >
              Start Interview
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </aside>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 shadow-sm sm:p-5 lg:col-span-2 lg:p-4 xl:p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 sm:text-sm">
            <MonitorCheck className="size-4" aria-hidden="true" />
            All systems ready
          </div>
          <p className="mt-2 text-xs leading-5 text-emerald-800 sm:text-sm sm:leading-6">
            Camera, microphone, and network checks are passing. You can start
            the interview whenever you are ready.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-6 lg:col-span-2 lg:p-4 xl:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:size-10">
              <ShieldCheck className="size-4 sm:size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                Interview Guidelines
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                These checks help keep the AI interview fair, consistent, and
                review-ready.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:gap-3">
            {guidelines.map((guideline) => (
              <div
                key={guideline}
                className="flex w-full items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 shadow-sm sm:gap-3 sm:p-3"
              >
                <CheckCircle2
                  className="mt-0.5 size-3.5 shrink-0 text-emerald-600 sm:size-4"
                  aria-hidden="true"
                />
                <p className="text-xs leading-6 text-slate-600 sm:text-sm">
                  {guideline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScreenShell>
  );
}

type ReadinessCardProps = {
  description: string;
  detail: string;
  icon: ElementType;
  status: string;
  title: string;
};

function ReadinessCard({
  description,
  detail,
  icon: Icon,
  status,
  title,
}: ReadinessCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-4 xl:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-white sm:size-11 lg:size-10 xl:size-11">
          <Icon
            className="size-4 sm:size-5 lg:size-4 xl:size-5"
            aria-hidden="true"
          />
        </div>
        <Badge className="bg-emerald-100 text-[11px] text-emerald-700 sm:text-xs lg:text-[10px] xl:text-xs">
          <CheckCircle2 className="size-3" aria-hidden="true" />
          {status}
        </Badge>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-950 sm:mt-5 sm:text-sm lg:text-[11px] xl:text-sm">
        {title}
      </p>
      <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6 lg:text-[11px] xl:text-sm">
        {description}
      </p>
      <p className="mt-3 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] font-medium text-slate-500 sm:mt-4 sm:px-3 sm:text-xs lg:text-[10px] xl:text-xs">
        {detail}
      </p>
    </div>
  );
}

type MetricTileProps = {
  label: string;
  value: string;
};

function MetricTile({ label, value }: MetricTileProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
      <p className="text-[11px] text-slate-500 sm:text-xs">
        {label}
      </p>
      <p className="mt-1 text-xs font-semibold text-slate-950 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0 sm:gap-4 sm:pb-3">
      <p className="text-[11px] text-slate-500 sm:text-xs">
        {label}
      </p>
      <p className="max-w-40 truncate text-right text-xs font-medium text-slate-900 sm:max-w-44 sm:text-sm lg:text-[11px] xl:text-sm">
        {value}
      </p>
    </div>
  );
}
