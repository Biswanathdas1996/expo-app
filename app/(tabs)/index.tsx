import React, { useState, useEffect } from "react";
import { ThemedText } from "../../components/ThemedText";
import {
  WelcomeScreenComponent,
  AIIntroductionComponent,
  LevelSelectionComponent,
  PurposeSelectionComponent,
  SkillsSelectionComponent,
  PartnerSelectionComponent,
  RecommendationComponent,
  SkipPopup,
  BenefitsModal,
} from "@/app/components";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useOnboarding } from "@/app/hooks/useOnboarding";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);

  const { isSpeaking, speakText, stopSpeaking } = useSpeech();
  const {
    currentStep,
    userAnswers,
    handleNext,
    handleLevelSelect,
    handlePurposeToggle,
    handleSkillToggle,
    handlePartnerSelect,
    handleLanguageSelect,
  } = useOnboarding();

  // Render the appropriate screen based on current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
        return (
          <WelcomeScreenComponent
            onNext={handleNext}
            setName={setName}
            setMobile={setMobile}
            name={name}
            mobile={mobile}
          />
        );
      case "intro":
        return (
          <AIIntroductionComponent
            onNext={handleNext}
            name={name}
            isSpeaking={isSpeaking}
          />
        );
      case "level":
        return (
          <LevelSelectionComponent
            onNext={handleNext}
            selectedLevel={userAnswers.level}
            onLevelSelect={handleLevelSelect}
            isSpeaking={isSpeaking}
          />
        );
      case "purpose":
        return (
          <PurposeSelectionComponent
            onNext={handleNext}
            selectedPurposes={userAnswers.purpose}
            onPurposeToggle={handlePurposeToggle}
            isSpeaking={isSpeaking}
          />
        );
      case "skills":
        return (
          <SkillsSelectionComponent
            onNext={handleNext}
            selectedSkills={userAnswers.skills}
            onSkillToggle={handleSkillToggle}
            isSpeaking={isSpeaking}
          />
        );
      case "partner":
        return (
          <PartnerSelectionComponent
            onNext={handleNext}
            selectedPartner={userAnswers.partner}
            onPartnerSelect={handlePartnerSelect}
            isSpeaking={isSpeaking}
          />
        );
      case "recommendation":
        return (
          <RecommendationComponent
            userAnswers={userAnswers}
            onLanguageSelect={handleLanguageSelect}
            onSkipPress={() => setShowSkipPopup(true)}
            isSpeaking={isSpeaking}
          />
        );
      default:
        return (
          <WelcomeScreenComponent
            onNext={handleNext}
            setName={setName}
            setMobile={setMobile}
            name={name}
            mobile={mobile}
          />
        );
    }
  };

  // Speech effect - trigger speech when stepping into new screens
  useEffect(() => {
    stopSpeaking();

    switch (currentStep) {
      case "intro":
        speakText(
          `Hi ${name}, Welcome to SpeakEdge! I'm Rose, your AI tutor. I'm here to help you improve your English skills with personalized lessons and practice sessions. Let's get started with some questions to personalize your learning experience.`
        );
        break;
      case "level":
        speakText(
          "What's your English level? Please select from Beginner, Elementary, Intermediate, Upper Intermediate, Advanced, or Proficient."
        );
        break;
      case "purpose":
        speakText(
          "Why do you want to learn English? Please select all that apply."
        );
        break;
      case "skills":
        speakText(
          "Which skills do you want to focus on? Please select all that apply."
        );
        break;
      case "partner":
        speakText(
          "Are you interested in having a speaking partner? Please answer yes or no."
        );
        break;
      case "recommendation":
        speakText(
          `Based on your input, we recommend the ${userAnswers.level} English course. We will now guide you through the joining process.`
        );
        break;
      default:
        break;
    }
  }, [currentStep, name]);

  return (
    <>
      {renderCurrentStep()}

      <SkipPopup
        visible={showSkipPopup}
        onClose={() => setShowSkipPopup(false)}
        onViewBenefits={() => setShowBenefitsModal(true)}
      />

      <BenefitsModal
        visible={showBenefitsModal}
        onClose={() => setShowBenefitsModal(false)}
      />
    </>
  );
}
