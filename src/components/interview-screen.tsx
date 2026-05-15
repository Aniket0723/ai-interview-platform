"use client";

import type { ElementType } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Gauge,
  Pause,
  Mic,
  StopCircle,
  RotateCcw,
  Radio,
  SkipForward,
  Sparkles,
  Timer,
  Video,
  XCircle,
} from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { ScreenShell } from "@/components/screen-shell";
import { Waveform } from "@/components/waveform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  CandidateDetails,
  InterviewQuestion,
  InterviewStats,
} from "@/data/questions";

type InterviewScreenProps = {
  candidateDetails: CandidateDetails;
  currentQuestionIndex: number;
  interviewStats: InterviewStats;
  onBack: () => void;
  onEndInterview: () => void;
  onOpenCoding: () => void;
  onSkipQuestion: () => void;
  onSubmitAnswer: () => void;
  onPreviousQuestion?: () => void;
  onNextQuestion?: () => void;
  questions: InterviewQuestion[];
  remainingSeconds: number;
};

const transcriptLines = [
  {
    speaker: "AI Interviewer",
    text: "Welcome. I will ask structured questions and track your responses.",
  },
  {
    speaker: "AI Interviewer",
    text: "Please answer naturally. You can submit whenever your answer is complete.",
  },
  {
    speaker: "Candidate",
    text: "Ready to begin.",
  },
];

const difficultyClass: Record<InterviewQuestion["difficulty"], string> = {
  Easy: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-blue-200 bg-blue-50 text-blue-700",
  Hard: "border-rose-200 bg-rose-50 text-rose-700",
};

export function InterviewScreen({
  candidateDetails,
  currentQuestionIndex,
  interviewStats,
  onBack,
  onEndInterview,
  onOpenCoding,
  onSkipQuestion,
  onSubmitAnswer,
  onPreviousQuestion,
  onNextQuestion,
  questions,
  remainingSeconds,
}: InterviewScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);

  const question = questions[currentQuestionIndex] ?? questions[0];
  const progressPercentage = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100,
  );
  const candidateName = candidateDetails.fullName || "Candidate";
  const roleName = candidateDetails.roleAppliedFor || "Interview role";

  const timerLabel = useMemo(
    () => formatTimer(elapsedSeconds),
    [elapsedSeconds],
  );

  const countdownLabel = useMemo(
    () => formatTimer(remainingSeconds),
    [remainingSeconds],
  );

  useEffect(() => {
    if (!isRecording) return;

    const timerId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRecording]);

  function handleSubmitAnswer() {
    // If currently recording, stop and submit. If there's a finished
    // recording (hasRecording), submit it.
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(false);
      setElapsedSeconds(0);
      onSubmitAnswer();
      return;
    }

    if (hasRecording) {
      setHasRecording(false);
      setElapsedSeconds(0);
      onSubmitAnswer();
    }
  }

  function handleSkipQuestion() {
    setIsRecording(false);
    setHasRecording(false);
    setElapsedSeconds(0);
    onSkipQuestion();
  }

  function endRecording() {
    setIsRecording(false);
    setHasRecording(true);
  }

  function retryRecording() {
    setIsRecording(false);
    setHasRecording(false);
    setElapsedSeconds(0);
  }

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
            Setup
          </Button>
        }
        description="Answer the current prompt while the AI interviewer tracks progress, clarity, timing, and transcript quality."
        descriptionClassName="max-w-4xl xl:whitespace-nowrap"
        title="AI Interview"
      />

      <section className="grid flex-1 gap-4 pb-5 pt-1 sm:gap-5 sm:pb-7 sm:pt-2 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4 sm:space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              <SessionMetric
                icon={Timer}
                label="Time Remaining"
                value={countdownLabel}
                isWarning={remainingSeconds < 300}
              />
              <SessionMetric
                icon={Radio}
                label="Recording"
                value={
                  isRecording ? "Active" : hasRecording ? "Recorded" : "Idle"
                }
              />
              <SessionMetric
                icon={Gauge}
                label="Confidence"
                value={`${interviewStats.confidenceScore}%`}
              />
              <SessionMetric
                icon={CheckCircle2}
                label="Question"
                value={`${currentQuestionIndex + 1} of ${questions.length}`}
              />
            </div>

            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-slate-500 sm:text-xs">
                <span>Progress</span>
                <span>{progressPercentage}% complete</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid min-w-0 items-stretch gap-4 sm:gap-5 xl:grid-cols-[0.75fr_1.25fr]">
            <div className="flex min-h-[300px] flex-col rounded-lg border border-slate-200 bg-slate-950 p-3 text-white shadow-sm sm:min-h-[420px] sm:p-6 md:min-h-[500px] xl:min-h-[600px]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold sm:text-sm">
                    AI interviewer
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                    Adaptive conversation engine
                  </p>
                </div>
                <Badge className="bg-emerald-400/15 text-[11px] text-emerald-300 sm:text-xs">
                  Online
                </Badge>
              </div>

              <div className="mt-5 flex flex-1 flex-col items-center justify-center text-center sm:mt-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />
                  <div className="relative flex size-24 items-center justify-center rounded-full border border-white/15 bg-white/10 sm:size-32">
                    <BrainCircuit
                      className="size-10 text-blue-200 sm:size-14"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute bottom-1.5 right-2.5 size-3 rounded-full border-2 border-slate-950 bg-emerald-400 sm:bottom-2 sm:right-3 sm:size-3.5" />
                </div>

                <p className="mt-4 text-base font-semibold sm:mt-6 sm:text-lg">
                  Ava
                </p>
                <p className="mt-2 max-w-xs text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6">
                  I am listening for relevant examples, clear reasoning, and
                  concise communication.
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 sm:mt-6 sm:p-4">
                <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
                  <Sparkles
                    className="size-4 text-blue-300"
                    aria-hidden="true"
                  />
                  AI typing
                  <span className="flex gap-1">
                    <span className="size-1.5 rounded-full bg-blue-300 animate-pulse" />
                    <span className="size-1.5 rounded-full bg-blue-300 animate-pulse" />
                    <span className="size-1.5 rounded-full bg-blue-300 animate-pulse" />
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-5 text-slate-400 sm:mt-2 sm:text-xs">
                  Follow-up prompts will appear after each submitted answer.
                </p>
              </div>
            </div>

            <div className="flex min-h-0 flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:min-h-[520px] sm:p-6 xl:min-h-[600px]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                    Current question
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Focus area: {question.focusArea}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge
                    variant="outline"
                    className={`${difficultyClass[question.difficulty]} text-[11px] sm:text-xs`}
                  >
                    {question.difficulty}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-slate-50 text-[11px] text-slate-600 sm:text-xs"
                  >
                    <Clock3 className="size-3" aria-hidden="true" />
                    {question.estimatedTime}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 flex min-h-[190px] flex-col justify-start rounded-lg border border-blue-100 bg-blue-50 p-3 shadow-md sm:mt-5 sm:min-h-[280px] sm:p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium uppercase text-blue-700 sm:text-xs">
                    Question {currentQuestionIndex + 1}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onPreviousQuestion || (() => {})}
                      disabled={
                        currentQuestionIndex === 0 || !onPreviousQuestion
                      }
                      className="h-7 w-7 border-blue-300 bg-white p-0 text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowLeft className="size-3.5" aria-hidden="true" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={onNextQuestion || onSkipQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      className="h-7 w-7 border-blue-300 bg-white p-0 text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowLeft
                        className="size-3.5 rotate-180"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </div>
                <h2 className="mt-3 text-sm font-semibold leading-6 text-blue-950 sm:text-lg sm:leading-snug">
                  {question.question}
                </h2>
                <div className="mt-auto flex justify-end pt-4 sm:pt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSkipQuestion}
                    className="h-8 border-blue-200 bg-white px-2.5 text-[11px] text-blue-700 hover:bg-blue-50 sm:px-3 sm:text-xs"
                  >
                    <SkipForward className="size-3.5" aria-hidden="true" />
                    Skip Question
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                <StatusChip label="Type" value={question.type} />
                <StatusChip
                  label="Attempted"
                  value={`${interviewStats.attemptedQuestions}/${questions.length}`}
                />
                <StatusChip
                  label="Autosave"
                  value={isRecording ? "Listening" : "Ready"}
                />
              </div>

              <Waveform active={isRecording} className="mt-4 sm:mt-5" />

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:mt-5 sm:p-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                        Recording status
                      </p>
                      <Badge
                        className={
                          isRecording
                            ? "bg-red-100 text-[11px] text-red-700 sm:text-xs"
                            : hasRecording
                              ? "bg-blue-100 text-[11px] text-blue-700 sm:text-xs"
                              : "bg-slate-200 text-[11px] text-slate-700 sm:text-xs"
                        }
                      >
                        {isRecording
                          ? "Recording"
                          : hasRecording
                            ? "Recorded"
                            : "Idle"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-xs">
                      {isRecording
                        ? "Answer recording is in progress."
                        : hasRecording
                          ? "Recording complete - play it back, submit, or retry."
                          : "Click Start when you are ready."}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 2xl:grid-cols-5">
                    <Button
                      type="button"
                      onClick={() => {
                        setElapsedSeconds(0);
                        setIsRecording(true);
                      }}
                      className="h-9 bg-blue-600 px-2 text-xs text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:text-sm"
                      disabled={isRecording || hasRecording}
                    >
                      <Mic className="size-4" aria-hidden="true" />
                      Start
                    </Button>

                    <Button
                      type="button"
                      onClick={endRecording}
                      className="h-9 bg-red-600 px-2 text-xs text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:text-sm"
                      disabled={!isRecording}
                    >
                      <StopCircle className="size-4" aria-hidden="true" />
                      Stop
                    </Button>

                    <Button
                      type="button"
                      onClick={retryRecording}
                      variant="outline"
                      className="h-9 border-slate-300 bg-white px-2 text-xs text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:text-sm"
                      disabled={!isRecording && !hasRecording}
                    >
                      <RotateCcw className="size-4" aria-hidden="true" />
                      Retry
                    </Button>

                    <Button
                      type="button"
                      onClick={handleSubmitAnswer}
                      className="h-9 bg-emerald-600 px-2 text-xs text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:text-sm"
                      disabled={!hasRecording}
                    >
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex h-full min-w-0 flex-col gap-4 sm:gap-5">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                  Candidate video
                </p>
                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Preview only for this frontend task
                </p>
              </div>
              <Badge className="shrink-0 bg-emerald-100 text-[11px] text-emerald-700 sm:text-xs">
                <Video className="size-3" aria-hidden="true" />
                On
              </Badge>
            </div>

            <div className="mt-3 aspect-video overflow-hidden rounded-lg bg-slate-950 sm:mt-4">
              <div className="relative flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#1d4ed8_0,#0f172a_48%,#020617_100%)]">
                <div className="absolute left-2 top-2 rounded-full bg-black/35 px-2 py-1 text-[10px] font-medium text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-[11px]">
                  {isRecording ? "Recording" : "Preview"}
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
              <MiniMetric label="Attention" value="94%" />
              <MiniMetric label="Clarity" value="Good" />
            </div>
          </div>

          <div className="flex min-h-[260px] flex-1 flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:min-h-[360px] sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-950 sm:text-sm">
                  Transcript
                </p>
                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Live transcription placeholder
                </p>
              </div>
              <Badge
                className={
                  isRecording
                    ? "bg-blue-100 text-[11px] text-blue-700 sm:text-xs"
                    : "bg-slate-100 text-[11px] text-slate-600 sm:text-xs"
                }
              >
                {isRecording ? "Updating" : "Ready"}
              </Badge>
            </div>

            <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 sm:mt-4 sm:space-y-3">
              {transcriptLines.map((line) => (
                <div
                  key={`${line.speaker}-${line.text}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3"
                >
                  <p className="text-[11px] font-semibold text-slate-950 sm:text-xs">
                    {line.speaker}
                  </p>
                  <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:text-xs sm:leading-5">
                    {line.text}
                  </p>
                </div>
              ))}
              {isRecording ? (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-2.5 sm:p-3">
                  <p className="text-[11px] font-semibold text-blue-950 sm:text-xs">
                    {candidateName}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[11px] leading-5 text-blue-700 sm:text-xs">
                    Speaking
                    <Pause
                      className="size-3 animate-pulse"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              ) : hasRecording ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
                  <p className="text-[11px] font-semibold text-slate-950 sm:text-xs">
                    Recorded
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[11px] leading-5 text-slate-700 sm:text-xs">
                    {timerLabel} recorded
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-1 grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
        <Button
          type="button"
          onClick={onOpenCoding}
          className="h-10 px-4 text-xs sm:px-5 sm:text-sm"
        >
          <Code2 className="size-4" aria-hidden="true" />
          Open Coding Round
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={onEndInterview}
          className="h-10 px-4 text-xs sm:px-5 sm:text-sm"
        >
          <XCircle className="size-4" aria-hidden="true" />
          End Interview
        </Button>
      </div>
    </ScreenShell>
  );
}

type SessionMetricProps = {
  icon: ElementType;
  label: string;
  value: string;
  isWarning?: boolean;
};

function SessionMetric({
  icon: Icon,
  label,
  value,
  isWarning,
}: SessionMetricProps) {
  return (
    <div
      className={`rounded-lg border p-2.5 sm:p-3 ${
        isWarning ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 text-[11px] font-medium sm:gap-2 sm:text-xs ${
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

type StatusChipProps = {
  label: string;
  value: string;
};

function StatusChip({ label, value }: StatusChipProps) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 sm:px-3">
      <p className="truncate text-[10px] font-medium uppercase text-slate-400 sm:text-[11px]">
        {label}
      </p>
      <p className="mt-1 truncate text-[11px] font-semibold capitalize text-slate-800 sm:text-xs">
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

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}
