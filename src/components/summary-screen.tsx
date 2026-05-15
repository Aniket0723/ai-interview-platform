"use client";

import type { ElementType } from "react";
import {
  Award,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Lightbulb,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { ScreenShell } from "@/components/screen-shell";
import { Button } from "@/components/ui/button";
import type { CandidateDetails, InterviewStats } from "@/data/questions";

type SummaryScreenProps = {
  candidateDetails: CandidateDetails;
  interviewStats: InterviewStats;
  onRestart: () => void;
};

const strengths = [
  "Clear communication style with structured responses.",
  "Good understanding of frontend workflow and implementation tradeoffs.",
  "Comfortable moving between interview questions and coding context.",
];

const improvementAreas = [
  "Add more measurable impact when describing previous project work.",
  "Explain edge cases earlier during technical problem solving.",
  "Use concise summaries at the end of longer answers.",
];

export function SummaryScreen({
  candidateDetails,
  interviewStats,
  onRestart,
}: SummaryScreenProps) {
  const candidateName = candidateDetails.fullName || "Candidate";
  const roleName = candidateDetails.roleAppliedFor || "Role not specified";
  const attemptedQuestions =
    interviewStats.attemptedQuestions > 0
      ? interviewStats.attemptedQuestions
      : interviewStats.totalQuestions;
  const timeTaken =
    interviewStats.elapsedMinutes > 0
      ? `${interviewStats.elapsedMinutes} min`
      : "28 min";
  const codingAttempted =
    interviewStats.status === "Submitted for Review" &&
    attemptedQuestions >= interviewStats.totalQuestions;

  return (
    <ScreenShell>
      <PageHeading
        action={
          <Button
            type="button"
            variant="outline"
            onClick={onRestart}
            className="border-slate-300 bg-white text-slate-800"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Start New Interview
          </Button>
        }
        description="The interview has been completed and submitted for recruiter review."
        title="Interview Summary"
      />

      <section className="grid flex-1 gap-4 pb-5 pt-1 sm:gap-5 sm:pb-7 sm:pt-2 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4 sm:space-y-5">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-950 p-4 text-white sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 sm:size-14">
                    <UserRound
                      className="size-5 text-blue-200 sm:size-7"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase text-slate-400 sm:text-xs">
                      Candidate
                    </p>
                    <h2 className="mt-1 truncate text-lg font-semibold sm:text-2xl">
                      {candidateName}
                    </h2>
                    <p className="mt-1 truncate text-xs text-slate-300 sm:text-sm">
                      {roleName}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 sm:text-sm">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    Interview completed
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-100/80 sm:text-xs">
                    Submitted for Review
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-5 xl:grid-cols-4">
              <SummaryMetric
                icon={FileCheck2}
                label="Questions attempted"
                value={`${attemptedQuestions}/${interviewStats.totalQuestions}`}
              />
              <SummaryMetric
                icon={Clock3}
                label="Time taken"
                value={timeTaken}
              />
              <SummaryMetric
                icon={BarChart3}
                label="Confidence score"
                value={`${interviewStats.confidenceScore}%`}
              />
              <SummaryMetric
                icon={Send}
                label="Coding question"
                value={codingAttempted ? "Attempted" : "Pending"}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5 xl:grid-cols-2">
            <EvaluationCard
              icon={Award}
              title="Strengths"
              tone="emerald"
              items={strengths}
            />
            <EvaluationCard
              icon={Lightbulb}
              title="Improvement areas"
              tone="blue"
              items={improvementAreas}
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-950">
                  AI evaluation placeholder
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The candidate demonstrated solid communication, role
                  awareness, and technical reasoning. In a production system,
                  this section would include rubric scores, transcript
                  highlights, coding assessment details, and recruiter notes
                  generated from the AI interview session.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="min-w-0 space-y-4 sm:space-y-5">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 shadow-sm sm:p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 sm:text-sm">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Submitted for Review
            </div>
            <p className="mt-2 text-xs leading-5 text-emerald-800 sm:text-sm sm:leading-6">
              The candidate interview package is ready for recruiter or hiring
              manager review.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-xs font-semibold text-slate-950 sm:text-sm">
              Candidate profile
            </p>
            <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
              <ProfileRow label="Name" value={candidateName} />
              <ProfileRow
                label="Email"
                value={candidateDetails.email || "Not provided"}
              />
              <ProfileRow label="Role" value={roleName} />
              <ProfileRow
                label="Experience"
                value={candidateDetails.experienceLevel || "Not selected"}
              />
              <ProfileRow
                label="Resume"
                value={candidateDetails.resumeFileName || "Not uploaded"}
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-950 sm:text-sm">
              <Target className="size-4 text-blue-600" aria-hidden="true" />
              Review readiness
            </div>
            <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              <ReadinessItem label="Interview transcript captured" />
              <ReadinessItem
                label={
                  codingAttempted
                    ? "Coding response attached"
                    : "Coding response pending"
                }
              />
              <ReadinessItem label="AI evaluation queued" />
              <ReadinessItem label="Recruiter review status updated" />
            </div>
          </div>
        </aside>
      </section>
    </ScreenShell>
  );
}

type SummaryMetricProps = {
  icon: ElementType;
  label: string;
  value: string;
};

function SummaryMetric({ icon: Icon, label, value }: SummaryMetricProps) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-4">
      <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 sm:gap-2 sm:text-xs">
        <Icon
          className="size-3.5 shrink-0 text-blue-600 sm:size-4"
          aria-hidden="true"
        />
        {label}
      </div>
      <p className="mt-2 truncate text-sm font-semibold text-slate-950 sm:mt-3 sm:text-lg">
        {value}
      </p>
    </div>
  );
}

type EvaluationCardProps = {
  icon: ElementType;
  items: string[];
  title: string;
  tone: "blue" | "emerald";
};

function EvaluationCard({
  icon: Icon,
  items,
  title,
  tone,
}: EvaluationCardProps) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-blue-50 text-blue-700";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-10 ${toneClass}`}
        >
          <Icon className="size-4 sm:size-5" aria-hidden="true" />
        </div>
        <p className="text-xs font-semibold text-slate-950 sm:text-sm">
          {title}
        </p>
      </div>
      <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:gap-3 sm:p-3"
          >
            <CheckCircle2
              className="mt-0.5 size-3.5 shrink-0 text-emerald-600 sm:size-4"
              aria-hidden="true"
            />
            <p className="text-xs leading-5 text-slate-600 sm:text-sm">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

type ProfileRowProps = {
  label: string;
  value: string;
};

function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0 sm:flex sm:items-start sm:justify-between sm:gap-4 sm:pb-3">
      <p className="text-[11px] text-slate-500 sm:text-xs">{label}</p>
      <p className="min-w-0 break-words text-right text-xs font-medium text-slate-900 sm:max-w-48 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function ReadinessItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:gap-3 sm:p-3">
      <span className="text-[11px] font-medium text-slate-700 sm:text-xs">
        {label}
      </span>
      <CheckCircle2
        className="size-3.5 shrink-0 text-emerald-600 sm:size-4"
        aria-hidden="true"
      />
    </div>
  );
}
