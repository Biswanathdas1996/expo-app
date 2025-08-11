import React from "react";
import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { sharedStyles, optionStyles } from "../shared/SharedStyles";
import { SpeakingIndicator } from "../shared/SpeakingIndicator";
import { OptionCard } from "../shared/OptionCard";
import { ModernButton } from "../shared/ModernButton";
import { ScreenProps, Option } from "../types";

const skills: Option[] = [
  { name: "Speaking", emoji: "🗣️", color: "#FF5722" },
  { name: "Writing", emoji: "✍️", color: "#2196F3" },
  { name: "Reading", emoji: "📖", color: "#4CAF50" },
  { name: "Listening", emoji: "👂", color: "#FF9800" },
  { name: "Pronunciation", emoji: "🎤", color: "#E91E63" },
  { name: "All", emoji: "🎯", color: "#9C27B0" },
  { name: "Other", emoji: "💡", color: "#607D8B" },
];

interface SkillsSelectionComponentProps extends ScreenProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

export const SkillsSelectionComponent: React.FC<
  SkillsSelectionComponentProps
> = ({ onNext, selectedSkills, onSkillToggle, isSpeaking = false }) => {
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
            Which skills do you want to focus on?
          </ThemedText>
          <ThemedText style={sharedStyles.stepSubtitle}>
            Select all that apply
          </ThemedText>

          <SpeakingIndicator isVisible={isSpeaking} />

          <View style={optionStyles.optionsGrid}>
            {skills.map((skill) => (
              <OptionCard
                key={skill.name}
                option={skill}
                isSelected={selectedSkills.includes(skill.name)}
                onPress={() => onSkillToggle(skill.name)}
              />
            ))}
          </View>

          <ModernButton
            title="Continue"
            onPress={onNext}
            disabled={selectedSkills.length === 0}
          />
        </View>
      </ScrollView>
    </View>
  );
};
