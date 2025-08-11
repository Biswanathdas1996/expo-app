import { useState, useCallback } from "react";
import { UserAnswers, StepType } from "@/app/components";

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState<StepType>("welcome");
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    level: "",
    purpose: [],
    skills: [],
    partner: "",
    language: "English",
  });

  const handleNext = useCallback(() => {
    const steps: StepType[] = [
      "welcome",
      "intro",
      "level",
      "purpose",
      "skills",
      "partner",
      "recommendation",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

  const handleLevelSelect = useCallback((level: string) => {
    setUserAnswers((prev) => ({ ...prev, level }));
  }, []);

  const handlePurposeToggle = useCallback((purpose: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      purpose: prev.purpose.includes(purpose)
        ? prev.purpose.filter((p) => p !== purpose)
        : [...prev.purpose, purpose],
    }));
  }, []);

  const handleSkillToggle = useCallback((skill: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  }, []);

  const handlePartnerSelect = useCallback((partner: string) => {
    setUserAnswers((prev) => ({ ...prev, partner }));
  }, []);

  const handleLanguageSelect = useCallback((language: string) => {
    setUserAnswers((prev) => ({ ...prev, language }));
  }, []);

  return {
    currentStep,
    setCurrentStep,
    userAnswers,
    setUserAnswers,
    handleNext,
    handleLevelSelect,
    handlePurposeToggle,
    handleSkillToggle,
    handlePartnerSelect,
    handleLanguageSelect,
  };
};
