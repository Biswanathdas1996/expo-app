import React from "react";
import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { sharedStyles, optionStyles } from "../shared/SharedStyles";
import { SpeakingIndicator } from "../shared/SpeakingIndicator";
import { OptionCard } from "../shared/OptionCard";
import { ModernButton } from "../shared/ModernButton";
import { ScreenProps, Option } from "../types";

const purposes: Option[] = [
  { name: "Job/Business", emoji: "💼", color: "#2196F3" },
  { name: "Abroad", emoji: "✈️", color: "#FF5722" },
  { name: "Improve skills", emoji: "📈", color: "#4CAF50" },
  { name: "Academic", emoji: "🎓", color: "#9C27B0" },
  { name: "Practise", emoji: "🗣️", color: "#FF9800" },
  { name: "Pronunciation", emoji: "🎤", color: "#E91E63" },
  { name: "CEFR Test", emoji: "📊", color: "#795548" },
  { name: "Other", emoji: "💡", color: "#607D8B" },
];

interface PurposeSelectionComponentProps extends ScreenProps {
  selectedPurposes: string[];
  onPurposeToggle: (purpose: string) => void;
}

export const PurposeSelectionComponent: React.FC<
  PurposeSelectionComponentProps
> = ({ onNext, selectedPurposes, onPurposeToggle, isSpeaking = false }) => {
  return (
    <View style={sharedStyles.gradientContainer}>
      <View style={sharedStyles.gradientBackground} />
      <ScrollView
        contentContainerStyle={sharedStyles.scrollContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={sharedStyles.modernContainer}>
          <ThemedText style={sharedStyles.modernStepTitle}>
            Why do you want to learn English?
          </ThemedText>
          <ThemedText style={sharedStyles.stepSubtitle}>
            Select all that apply
          </ThemedText>

          <SpeakingIndicator isVisible={isSpeaking} />

          <View style={optionStyles.optionsGrid}>
            {purposes.map((purpose) => (
              <OptionCard
                key={purpose.name}
                option={purpose}
                isSelected={selectedPurposes.includes(purpose.name)}
                onPress={() => onPurposeToggle(purpose.name)}
              />
            ))}
          </View>

          <ModernButton
            title="Continue"
            onPress={onNext}
            disabled={selectedPurposes.length === 0}
          />
        </View>
      </ScrollView>
    </View>
  );
};
