"use client";

import type { ElementType, MouseEvent } from "react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  Code2,
  FileCode2,
  Maximize2,
  Minimize2,
  Play,
  Send,
  Terminal,
  Video,
} from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { ScreenShell } from "@/components/screen-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CandidateDetails, InterviewQuestion } from "@/data/questions";

type CodingScreenProps = {
  candidateDetails: CandidateDetails;
  onBackToInterview: () => void;
  onSubmitCode: () => void;
  question: InterviewQuestion;
  remainingSeconds: number;
};

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
];

const starterCode: Record<string, string> = {
  javascript: `function topTwoUniqueScores(scores) {
  // Return the top two unique scores in descending order.
  const uniqueScores = [...new Set(scores)];
  uniqueScores.sort((a, b) => b - a);
  return uniqueScores.slice(0, 2);
}

console.log(topTwoUniqueScores([88, 92, 88, 75, 92, 99]));`,
  typescript: `function topTwoUniqueScores(scores: number[]): number[] {
  const uniqueScores = Array.from(new Set(scores));
  uniqueScores.sort((a, b) => b - a);
  return uniqueScores.slice(0, 2);
}

console.log(topTwoUniqueScores([88, 92, 88, 75, 92, 99]));`,
  python: `def top_two_unique_scores(scores):
    unique_scores = sorted(set(scores), reverse=True)
    return unique_scores[:2]

print(top_two_unique_scores([88, 92, 88, 75, 92, 99]))`,
  java: `import java.util.*;

class Solution {
  static List<Integer> topTwoUniqueScores(int[] scores) {
    return Arrays.stream(scores)
      .boxed()
      .distinct()
      .sorted(Comparator.reverseOrder())
      .limit(2)
      .toList();
  }
}`,
};

const examples = [
  {
    input: "[88, 92, 88, 75, 92, 99]",
    output: "[99, 92]",
  },
  {
    input: "[70, 70, 65, 80]",
    output: "[80, 70]",
  },
];

const testCases = [
  { name: "Handles duplicate scores", status: "Ready" },
  { name: "Sorts descending", status: "Ready" },
  { name: "Returns only two values", status: "Ready" },
];

export function CodingScreen({
  candidateDetails,
  onBackToInterview,
  onSubmitCode,
  question,
  remainingSeconds,
}: CodingScreenProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(starterCode.javascript);
  const [hasRun, setHasRun] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoPreviewPosition, setVideoPreviewPosition] = useState({
    x: 16,
    y: 96,
  });
  const candidateName = candidateDetails.fullName || "Candidate";
  const roleName = candidateDetails.roleAppliedFor || "Interview role";

  const countdownLabel = useMemo(
    () => formatTimer(remainingSeconds),
    [remainingSeconds],
  );

  const lineNumbers = useMemo(
    () =>
      Array.from({ length: code.split("\n").length }, (_, index) => index + 1),
    [code],
  );

  function handleLanguageChange(nextLanguage: string) {
    setLanguage(nextLanguage);
    setCode(starterCode[nextLanguage] ?? starterCode.javascript);
    setHasRun(false);
  }

  function openCandidateVideo(event: MouseEvent<HTMLButtonElement>) {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const margin = 16;
    const previewWidth = Math.min(320, window.innerWidth - margin * 2);
    const previewHeight = 280;
    const cardLeft = buttonRect.left;
    const cardTop = buttonRect.bottom + 10;

    setVideoPreviewPosition({
      x: Math.min(
        Math.max(cardLeft, margin),
        Math.max(margin, window.innerWidth - previewWidth - margin),
      ),
      y: Math.min(
        Math.max(cardTop, margin),
        Math.max(margin, window.innerHeight - previewHeight - margin),
      ),
    });
    setIsVideoOpen(true);
  }

  return (
    <ScreenShell>
      <PageHeading
        action={
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end sm:gap-3 lg:gap-5">
            <CandidateVideoControl
              active={isVideoOpen}
              onClick={(event) => {
                if (isVideoOpen) {
                  setIsVideoOpen(false);
                  return;
                }

                openCandidateVideo(event);
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={onBackToInterview}
              className="border-slate-300 bg-white text-slate-800"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Interview
            </Button>
          </div>
        }
        description="Solve the technical prompt in the editor. Execution is simulated for this frontend assessment."
        descriptionClassName="max-w-4xl xl:whitespace-nowrap"
        title="Coding Question"
      />

      {isVideoOpen ? (
        <CandidateVideoPreview
          candidateName={candidateName}
          position={videoPreviewPosition}
          roleName={roleName}
        />
      ) : null}

      <section className="grid flex-1 gap-4 pb-5 pt-1 sm:gap-5 sm:pb-7 sm:pt-2 md:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] lg:grid-cols-[minmax(280px,390px)_minmax(0,1fr)]">
        <aside className="min-w-0 space-y-4 sm:space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                  Problem statement
                </p>
                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Focus area: {question.focusArea}
                </p>
              </div>
              <Badge
                variant="outline"
                className="shrink-0 border-blue-200 bg-blue-50 text-[11px] text-blue-700 sm:text-xs"
              >
                {question.difficulty}
              </Badge>
            </div>

            <h2 className="mt-4 text-base font-semibold leading-6 text-slate-950 sm:mt-5 sm:text-lg sm:leading-7">
              Top two unique scores
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
              {question.question} If fewer than two unique scores exist, return
              every unique score available.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
              <InfoTile
                icon={Clock3}
                label="Time Remaining"
                value={countdownLabel}
                isWarning={remainingSeconds < 300}
              />
              <InfoTile icon={Code2} label="Type" value="Algorithm" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-xs font-semibold text-slate-950 sm:text-sm">
              Examples
            </p>
            <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {examples.map((example, index) => (
                <div
                  key={example.input}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3"
                >
                  <p className="text-[11px] font-semibold text-slate-950 sm:text-xs">
                    Example {index + 1}
                  </p>
                  <p className="mt-1.5 break-words text-[11px] leading-5 text-slate-600 sm:mt-2 sm:text-xs">
                    Input:{" "}
                    <span className="font-semibold">{example.input}</span>
                  </p>
                  <p className="break-words text-[11px] leading-5 text-slate-600 sm:text-xs">
                    Output:{" "}
                    <span className="font-semibold">{example.output}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-xs font-semibold text-slate-950 sm:text-sm">
              Test cases
            </p>
            <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {testCases.map((testCase) => (
                <div
                  key={testCase.name}
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:gap-3 sm:p-3"
                >
                  <span className="min-w-0 text-[11px] font-medium text-slate-700 sm:text-xs">
                    {testCase.name}
                  </span>
                  <Badge className="shrink-0 bg-slate-200 text-[11px] text-slate-700 sm:text-xs">
                    {hasRun ? "Passed" : testCase.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-4 sm:space-y-5">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white sm:size-10">
                  <FileCode2 className="size-4 sm:size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                    Code editor
                  </p>
                  <p className="mt-1 truncate text-[11px] text-slate-500 sm:text-xs">
                    Candidate: {candidateName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="h-9 w-full bg-white text-xs sm:w-40 sm:text-sm">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge className="bg-emerald-100 text-[11px] text-emerald-700 sm:text-xs">
                  Auto-saved
                </Badge>
              </div>
            </div>

            <div className="h-[300px] bg-slate-950 sm:h-[420px] xl:h-[460px]">
              <div className="grid h-full grid-cols-[2.5rem_minmax(0,1fr)] overflow-hidden text-xs leading-5 text-slate-200">
                <div
                  aria-hidden="true"
                  className="overflow-hidden border-r border-white/10 bg-slate-900/80 px-2 py-3 text-right text-[11px] text-slate-500"
                >
                  {lineNumbers.map((lineNumber) => (
                    <div key={lineNumber}>{lineNumber}</div>
                  ))}
                </div>
                <textarea
                  aria-label="Code editor"
                  spellCheck={false}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className="h-full min-w-0 resize-none overflow-auto border-0 bg-slate-950 px-3 py-3 font-mono text-[12px] leading-5 text-slate-100 outline-none placeholder:text-slate-500 focus:ring-0 sm:px-4 sm:text-[13px]"
                />
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-4 sm:gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                    Output console
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Simulated execution result
                  </p>
                </div>
                <Terminal
                  className="size-5 text-slate-400"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 min-w-0 overflow-hidden rounded-lg bg-slate-950 p-3 text-[11px] leading-5 text-slate-200 sm:mt-4 sm:p-4 sm:text-xs sm:leading-6">
                {hasRun ? (
                  <pre className="whitespace-pre-wrap break-words">{`Running ${language} solution...
Test 1 passed: [99, 92]
Test 2 passed: [80, 70]
All visible test cases passed.`}</pre>
                ) : (
                  <pre className="whitespace-pre-wrap break-words">{`Click "Run Code" to simulate visible test cases.`}</pre>
                )}
              </div>
            </div>

            <div className="min-w-0 space-y-4 sm:space-y-5">
              <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                  Submission
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                  Submit when your solution is ready. The result will be added
                  to the interview summary.
                </p>
                <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
                  <Button
                    type="button"
                    onClick={() => setHasRun(true)}
                    className="h-10 bg-slate-950 text-xs text-white hover:bg-slate-800 sm:h-11 sm:text-sm"
                  >
                    <Play className="size-4" aria-hidden="true" />
                    Run Code
                  </Button>
                  <Button
                    type="button"
                    onClick={onSubmitCode}
                    className="h-10 bg-blue-600 text-xs text-white hover:bg-blue-700 sm:h-11 sm:text-sm"
                  >
                    <Send className="size-4" aria-hidden="true" />
                    Submit Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScreenShell>
  );
}

type InfoTileProps = {
  icon: ElementType;
  label: string;
  value: string;
  isWarning?: boolean;
};

function InfoTile({ icon: Icon, label, value, isWarning }: InfoTileProps) {
  return (
    <div
      className={`rounded-lg border p-2.5 sm:p-3 ${
        isWarning ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-xs ${
          isWarning ? "text-red-600" : "text-slate-500"
        }`}
      >
        <Icon
          className={`size-3.5 sm:size-4 ${
            isWarning ? "text-red-600" : "text-blue-600"
          }`}
          aria-hidden="true"
        />
        {label}
      </div>
      <p
        className={`mt-1.5 text-xs font-semibold sm:mt-2 sm:text-sm ${
          isWarning ? "text-red-700" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type MiniMetricProps = {
  label: string;
  value: string;
};

function MiniMetric({ label, value }: MiniMetricProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
      <p className="text-[11px] text-slate-500 sm:text-xs">{label}</p>
      <p className="mt-1 text-xs font-semibold text-slate-950 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

type CandidateVideoControlProps = {
  active: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

function CandidateVideoControl({
  active,
  onClick,
}: CandidateVideoControlProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-9 border-slate-300 bg-white text-xs text-slate-800 sm:h-8 sm:text-sm"
      aria-label="Show candidate video"
    >
      <Video className="size-4 text-blue-600" aria-hidden="true" />
      Video
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
        On
      </span>
      {active ? (
        <Minimize2 className="size-3.5 text-slate-500" aria-hidden="true" />
      ) : (
        <Maximize2 className="size-3.5 text-slate-500" aria-hidden="true" />
      )}
    </Button>
  );
}

type CandidateVideoPreviewProps = {
  candidateName: string;
  position: {
    x: number;
    y: number;
  };
  roleName: string;
};

function CandidateVideoPreview({
  candidateName,
  position,
  roleName,
}: CandidateVideoPreviewProps) {
  return (
    <div
      className="fixed z-50 w-[min(280px,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/80 sm:w-[320px] sm:p-4"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-950 sm:text-sm">
            Candidate video
          </p>
          <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
            Preview remains active during coding
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-[11px] text-emerald-700 sm:text-xs">
            <Video className="size-3" aria-hidden="true" />
            On
          </Badge>
        </div>
      </div>

      <div className="mt-3 aspect-video overflow-hidden rounded-lg bg-slate-950 sm:mt-4">
        <div className="relative flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#1d4ed8_0,#0f172a_48%,#020617_100%)]">
          <div className="absolute left-2 top-2 rounded-full bg-black/35 px-2 py-1 text-[10px] font-medium text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-[11px]">
            Coding round
          </div>
          <div className="flex size-16 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 sm:size-20">
            <Video className="size-7 sm:size-8" aria-hidden="true" />
          </div>
          <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/10 p-2 text-white backdrop-blur sm:bottom-3 sm:left-3 sm:right-3 sm:p-3">
            <p className="truncate text-xs font-semibold sm:text-sm">
              {candidateName}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-white/70 sm:mt-1 sm:text-xs">
              {roleName}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
        <MiniMetric label="Focus" value="Active" />
        <MiniMetric label="Session" value="Live" />
      </div>
    </div>
  );
}

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
