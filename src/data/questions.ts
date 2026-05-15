export type ScreenStep =
  | "landing"
  | "candidate"
  | "setup"
  | "interview"
  | "coding"
  | "summary";

export type CandidateDetails = {
  fullName: string;
  email: string;
  roleAppliedFor: string;
  experienceLevel: string;
  skills: string;
  resumeFileName: string;
};

export type InterviewQuestion = {
  id: number;
  type: "behavioral" | "technical" | "coding";
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  focusArea: string;
  estimatedTime: string;
};

export type InterviewStats = {
  totalQuestions: number;
  attemptedQuestions: number;
  elapsedMinutes: number;
  confidenceScore: number;
  status: "Not started" | "In progress" | "Submitted for Review";
};

export const initialCandidateDetails: CandidateDetails = {
  fullName: "",
  email: "",
  roleAppliedFor: "",
  experienceLevel: "",
  skills: "",
  resumeFileName: "",
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    type: "behavioral",
    difficulty: "Easy",
    question:
      "Tell me about yourself and how your experience connects to this role.",
    focusArea: "Communication",
    estimatedTime: "2 min",
  },
  {
    id: 2,
    type: "technical",
    difficulty: "Medium",
    question:
      "Describe a recent technical problem you solved and the tradeoffs you considered.",
    focusArea: "Problem solving",
    estimatedTime: "3 min",
  },
  {
    id: 3,
    type: "technical",
    difficulty: "Medium",
    question:
      "How would you design a reliable frontend flow for a time-sensitive interview experience?",
    focusArea: "System thinking",
    estimatedTime: "3 min",
  },
  {
    id: 4,
    type: "coding",
    difficulty: "Medium",
    question:
      "Given a list of interview scores, return the top two unique scores in descending order.",
    focusArea: "Algorithms",
    estimatedTime: "10 min",
  },
];

export const initialInterviewStats: InterviewStats = {
  totalQuestions: interviewQuestions.length,
  attemptedQuestions: 0,
  elapsedMinutes: 0,
  confidenceScore: 86,
  status: "Not started",
};

export const candidateInstructions = [
  "Keep your camera and microphone available before the interview begins.",
  "Answer each question clearly and submit when you are finished.",
  "Use the coding section for technical questions when it appears.",
  "Stay on this tab during the interview to avoid review flags.",
];
