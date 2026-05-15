"use client";

import type { ElementType, ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileUp,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { ScreenShell } from "@/components/screen-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CandidateDetails } from "@/data/questions";

type CandidateFormProps = {
  candidateDetails: CandidateDetails;
  onBack: () => void;
  onChange: (details: CandidateDetails) => void;
  onContinue: () => void;
};

const experienceLevels = [
  "Fresher",
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5+ years",
];

const roleSuggestions = [
  "Frontend Developer",
  "Full Stack Developer",
  "React Developer",
  "UI Engineer",
];

const skillSuggestions = ["React", "Next.js", "TypeScript", "Tailwind CSS"];

export function CandidateForm({
  candidateDetails,
  onBack,
  onChange,
  onContinue,
}: CandidateFormProps) {
  const [roleSuggestionsOpen, setRoleSuggestionsOpen] = useState(false);
  const completedFields = [
    candidateDetails.fullName,
    candidateDetails.email,
    candidateDetails.roleAppliedFor,
    candidateDetails.experienceLevel,
    candidateDetails.skills,
  ].filter(Boolean).length;
  const completionPercentage = Math.round((completedFields / 5) * 100);
  const canContinue = completedFields === 5;
  const roleSearchValue = candidateDetails.roleAppliedFor.trim().toLowerCase();
  const filteredRoleSuggestions = roleSuggestions.filter((role) =>
    role.toLowerCase().includes(roleSearchValue),
  );

  function updateField(field: keyof CandidateDetails, value: string) {
    onChange({
      ...candidateDetails,
      [field]: value,
    });
  }

  function appendSkill(skill: string) {
    const skills = candidateDetails.skills
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    if (skills.includes(skill.toLowerCase())) {
      return;
    }

    updateField(
      "skills",
      candidateDetails.skills ? `${candidateDetails.skills}, ${skill}` : skill,
    );
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
            Landing
          </Button>
        }
        description="Share the basic context the AI interviewer will use to tailor the first few questions."
        descriptionClassName="max-w-4xl xl:whitespace-nowrap"
        title="Candidate Details"
      />

      <section className="grid flex-1 gap-4 pb-5 pt-1 sm:gap-5 sm:pb-7 sm:pt-2 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <form
          className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (canContinue) {
              onContinue();
            }
          }}
        >
          <div className="grid items-start gap-4 sm:gap-5 md:grid-cols-2">
            <FieldGroup icon={UserRound} label="Full Name" htmlFor="fullName">
              <Input
                id="fullName"
                value={candidateDetails.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                placeholder="Enter your full name"
                className="h-10 md:h-9 bg-white text-sm md:text-xs placeholder:text-xs md:placeholder:text-[10px] focus-visible:border-blue-400 focus-visible:ring-blue-100 sm:h-11"
              />
            </FieldGroup>

            <FieldGroup icon={Mail} label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                value={candidateDetails.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="name@example.com"
                className="h-10 md:h-9 bg-white text-sm md:text-xs placeholder:text-xs md:placeholder:text-[10px] focus-visible:border-blue-400 focus-visible:ring-blue-100 sm:h-11"
              />
            </FieldGroup>

            <FieldGroup
              icon={BriefcaseBusiness}
              label="Role Applied For"
              htmlFor="roleAppliedFor"
            >
              <div className="relative">
                <Input
                  id="roleAppliedFor"
                  value={candidateDetails.roleAppliedFor}
                  onBlur={() => setRoleSuggestionsOpen(false)}
                  onChange={(event) => {
                    updateField("roleAppliedFor", event.target.value);
                    setRoleSuggestionsOpen(true);
                  }}
                  onFocus={() => {
                    if (candidateDetails.roleAppliedFor.trim()) {
                      setRoleSuggestionsOpen(true);
                    }
                  }}
                  placeholder="Frontend Developer"
                  className="h-10 md:h-9 bg-white text-sm md:text-xs placeholder:text-xs md:placeholder:text-[10px] focus-visible:border-blue-400 focus-visible:ring-blue-100 sm:h-11"
                />
                {roleSuggestionsOpen &&
                roleSearchValue &&
                filteredRoleSuggestions.length > 0 ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.25rem)] z-50 overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg shadow-slate-200/80 md:hidden">
                    {filteredRoleSuggestions.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          updateField("roleAppliedFor", role);
                          setRoleSuggestionsOpen(false);
                        }}
                        className="block w-full px-3 py-2 text-left text-xs md:text-[10px] font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </FieldGroup>

            <FieldGroup
              icon={TrendingUp}
              label="Experience Level"
              htmlFor="experienceLevel"
            >
              <Select
                value={candidateDetails.experienceLevel}
                onValueChange={(value) => updateField("experienceLevel", value)}
              >
                <SelectTrigger
                  id="experienceLevel"
                  className="h-10 md:h-9 w-full bg-white text-sm md:text-xs focus-visible:border-blue-400 focus-visible:ring-blue-100 sm:h-11"
                >
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  className="z-[80] w-[var(--radix-select-trigger-width)] border border-slate-200 bg-white shadow-lg"
                  position="popper"
                  side="bottom"
                >
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldGroup>

            <div className="hidden gap-2 md:col-span-2 md:flex md:flex-wrap">
              {roleSuggestions.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => updateField("roleAppliedFor", role)}
                  className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] md:text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-3 sm:text-xs"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <FieldGroup label="Skills / Technologies" htmlFor="skills">
              <Textarea
                id="skills"
                value={candidateDetails.skills}
                onChange={(event) => updateField("skills", event.target.value)}
                placeholder="Example: React, Next.js, TypeScript, REST APIs"
                className="min-h-16 md:min-h-14 resize-none bg-white text-sm md:text-xs placeholder:text-xs md:placeholder:text-[10px] focus-visible:border-blue-400 focus-visible:ring-blue-100 sm:min-h-20"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {skillSuggestions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => appendSkill(skill)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] md:text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-3 sm:text-xs"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </FieldGroup>
          </div>

          <div className="mt-5">
            <Label className="text-xs md:text-[11px] text-slate-800 sm:text-sm">
              Upload Resume
            </Label>
            <label
              htmlFor="resumeFile"
              className="mt-2 flex cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-left transition hover:border-blue-300 hover:bg-blue-50 sm:gap-3 sm:px-4 sm:py-4"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200 sm:size-10">
                <FileUp className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs md:text-[11px] font-medium text-slate-950 sm:text-sm">
                  {candidateDetails.resumeFileName || "Upload resume"}
                </span>
                <span className="mt-1 block text-[11px] md:text-[10px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
                  PDF, DOC, or DOCX. UI placeholder only.
                </span>
              </span>
              <Input
                id="resumeFile"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) =>
                  updateField(
                    "resumeFileName",
                    event.target.files?.[0]?.name ?? "",
                  )
                }
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
            <p className="text-[11px] md:text-[10px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
              Resume upload is optional. All required fields above must be
              completed before setup.
            </p>
            <Button
              type="submit"
              disabled={!canContinue}
              className="h-10 md:h-9 w-full bg-blue-600 px-5 md:px-4 text-sm md:text-xs text-white hover:bg-blue-700 sm:h-11 sm:w-auto"
            >
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </form>

        <aside className="min-w-0 space-y-3 sm:space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] md:text-[10px] font-semibold uppercase text-slate-950 sm:text-xs">
                  Profile completion
                </p>
                <p className="mt-1 text-[11px] md:text-[10px] text-slate-500">
                  Required candidate fields
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm md:text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                {completionPercentage}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="mt-4 space-y-3">
              <ChecklistItem
                complete={Boolean(candidateDetails.fullName)}
                label="Identity details"
              />
              <ChecklistItem
                complete={Boolean(candidateDetails.email)}
                label="Contact email"
              />
              <ChecklistItem
                complete={Boolean(candidateDetails.roleAppliedFor)}
                label="Applied role"
              />
              <ChecklistItem
                complete={Boolean(candidateDetails.experienceLevel)}
                label="Experience level"
              />
              <ChecklistItem
                complete={Boolean(candidateDetails.skills)}
                label="Skills context"
              />
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-blue-100">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm md:text-xs font-semibold text-blue-950">
                  AI personalization
                </p>
                <p className="mt-2 text-sm md:text-xs md:leading-5 leading-6 text-blue-800">
                  The interview can adapt question wording to the selected role,
                  experience level, and skills once the real AI layer is
                  connected.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm md:text-xs font-semibold text-emerald-800">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Candidate privacy
            </div>
            <p className="mt-2 text-sm md:text-xs md:leading-5 leading-6 text-emerald-800">
              This prototype keeps details in local React state only. No backend
              submission is performed.
            </p>
          </div>
        </aside>
      </section>
    </ScreenShell>
  );
}

type FieldGroupProps = {
  children: ReactNode;
  htmlFor: string;
  icon?: ElementType;
  label: string;
};

function FieldGroup({ children, htmlFor, icon: Icon, label }: FieldGroupProps) {
  return (
    <div className="min-w-0">
      <Label
        htmlFor={htmlFor}
        className="h-5 text-xs md:text-[11px] text-slate-800 sm:text-sm"
      >
        {Icon ? (
          <Icon className="size-4 text-slate-400" aria-hidden="true" />
        ) : null}
        {label}
      </Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

type ChecklistItemProps = {
  complete: boolean;
  label: string;
};

function ChecklistItem({ complete, label }: ChecklistItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm md:text-xs">
      <span className={complete ? "text-slate-700" : "text-slate-400"}>
        {label}
      </span>
      <CheckCircle2
        className={
          complete
            ? "size-4 md:size-3 text-emerald-600"
            : "size-4 md:size-3 text-slate-300"
        }
        aria-hidden="true"
      />
    </div>
  );
}
