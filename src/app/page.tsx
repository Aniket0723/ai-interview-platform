"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CandidateForm } from "@/components/candidate-form";
import { CodingScreen } from "@/components/coding-screen";
import { InterviewScreen } from "@/components/interview-screen";
import { LandingScreen } from "@/components/landing-screen";
import { SetupScreen } from "@/components/setup-screen";
import { SummaryScreen } from "@/components/summary-screen";
import {
  initialCandidateDetails,
  initialInterviewStats,
  interviewQuestions,
  type CandidateDetails,
  type InterviewStats,
  type ScreenStep,
} from "@/data/questions";

export default function Home() {
  const [screen, setScreen] = useState<ScreenStep>("landing");
  const [candidateDetails, setCandidateDetails] = useState<CandidateDetails>(
    initialCandidateDetails,
  );
  const [interviewStats, setInterviewStats] = useState<InterviewStats>(
    initialInterviewStats,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Global interview timer (30 minutes = 1800 seconds)
  const INTERVIEW_DURATION = 1800;
  const [remainingSeconds, setRemainingSeconds] = useState(INTERVIEW_DURATION);
  const [timerStarted, setTimerStarted] = useState(false);

  const codingQuestionIndex = useMemo(
    () =>
      Math.max(
        interviewQuestions.findIndex((question) => question.type === "coding"),
        0,
      ),
    [],
  );
  const codingQuestion =
    interviewQuestions[codingQuestionIndex] ??
    interviewQuestions[interviewQuestions.length - 1];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [screen]);

  const goToScreen = useCallback(
    (nextScreen: ScreenStep) => {
      // Start timer when entering interview screen for the first time
      if (nextScreen === "interview" && !timerStarted) {
        setTimerStarted(true);
      }

      setScreen(nextScreen);
      setInterviewStats((currentStats) => ({
        ...currentStats,
        status:
          nextScreen === "summary"
            ? "Submitted for Review"
            : nextScreen === "interview" || nextScreen === "coding"
              ? "In progress"
              : currentStats.status,
        submittedAt:
          nextScreen === "summary" && !currentStats.submittedAt
            ? new Date().toISOString()
            : currentStats.submittedAt,
        interviewStartedAt:
          nextScreen === "interview" && !currentStats.interviewStartedAt
            ? new Date().toISOString()
            : currentStats.interviewStartedAt,
      }));
    },
    [timerStarted],
  );

  const finishInterview = useCallback(() => {
    setInterviewStats((currentStats) => ({
      ...currentStats,
      attemptedQuestions:
        currentStats.attemptedQuestions > 0
          ? currentStats.attemptedQuestions
          : Math.min(currentQuestionIndex + 1, currentStats.totalQuestions),
      elapsedMinutes: Math.max(currentStats.elapsedMinutes, 18),
      status: "Submitted for Review",
    }));
    goToScreen("summary");
  }, [currentQuestionIndex, goToScreen]);

  // Global countdown timer - starts when interview begins
  useEffect(() => {
    if (!timerStarted) return;

    const countdownTimer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          clearInterval(countdownTimer);
          finishInterview();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdownTimer);
  }, [finishInterview, timerStarted]);

  function moveToNextQuestion(markAttempted: boolean) {
    if (markAttempted) {
      setInterviewStats((currentStats) => ({
        ...currentStats,
        attemptedQuestions: Math.min(
          currentStats.attemptedQuestions + 1,
          currentStats.totalQuestions,
        ),
        elapsedMinutes: Math.max(currentStats.elapsedMinutes, 12),
        status: "In progress",
      }));
    }

    const nextQuestionIndex = Math.min(
      currentQuestionIndex + 1,
      interviewQuestions.length - 1,
    );
    const nextQuestion = interviewQuestions[nextQuestionIndex];

    setCurrentQuestionIndex(nextQuestionIndex);

    // If next question is coding type, go to coding screen
    if (nextQuestion?.type === "coding") {
      goToScreen("coding");
    }
    // If the flow reaches the final non-coding prompt, still offer the coding round.
    else if (nextQuestionIndex === interviewQuestions.length - 1) {
      openCodingRound();
    }
  }

  function openCodingRound() {
    setCurrentQuestionIndex(codingQuestionIndex);
    goToScreen("coding");
  }

  function submitCode() {
    setInterviewStats((currentStats) => ({
      ...currentStats,
      attemptedQuestions: Math.min(
        currentStats.attemptedQuestions + 1,
        currentStats.totalQuestions,
      ),
      elapsedMinutes: Math.max(currentStats.elapsedMinutes, 28),
      status: "Submitted for Review",
    }));
    goToScreen("summary");
  }

  function startNewInterview() {
    setCandidateDetails(initialCandidateDetails);
    setInterviewStats(initialInterviewStats);
    setCurrentQuestionIndex(0);
    goToScreen("landing");
  }

  if (screen === "landing") {
    return <LandingScreen onStart={() => goToScreen("candidate")} />;
  }

  if (screen === "candidate") {
    return (
      <CandidateForm
        candidateDetails={candidateDetails}
        onBack={() => goToScreen("landing")}
        onChange={setCandidateDetails}
        onContinue={() => goToScreen("setup")}
      />
    );
  }

  if (screen === "setup") {
    return (
      <SetupScreen
        candidateDetails={candidateDetails}
        onBack={() => goToScreen("candidate")}
        onStartInterview={() => {
          setCurrentQuestionIndex(0);
          goToScreen("interview");
        }}
      />
    );
  }

  if (screen === "interview") {
    return (
      <InterviewScreen
        candidateDetails={candidateDetails}
        currentQuestionIndex={currentQuestionIndex}
        interviewStats={interviewStats}
        onBack={() => goToScreen("setup")}
        onEndInterview={finishInterview}
        onOpenCoding={openCodingRound}
        onSkipQuestion={() => moveToNextQuestion(false)}
        onSubmitAnswer={() => moveToNextQuestion(true)}
        onPreviousQuestion={() =>
          setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
        }
        onNextQuestion={() =>
          setCurrentQuestionIndex(
            Math.min(interviewQuestions.length - 1, currentQuestionIndex + 1),
          )
        }
        questions={interviewQuestions}
        remainingSeconds={remainingSeconds}
      />
    );
  }

  if (screen === "coding") {
    return (
      <CodingScreen
        candidateDetails={candidateDetails}
        onBackToInterview={() => {
          setCurrentQuestionIndex(Math.max(codingQuestionIndex - 1, 0));
          goToScreen("interview");
        }}
        onSubmitCode={submitCode}
        question={codingQuestion}
        remainingSeconds={remainingSeconds}
      />
    );
  }

  if (screen === "summary") {
    return (
      <SummaryScreen
        candidateDetails={candidateDetails}
        interviewStats={interviewStats}
        onRestart={startNewInterview}
      />
    );
  }

  return null;
}
