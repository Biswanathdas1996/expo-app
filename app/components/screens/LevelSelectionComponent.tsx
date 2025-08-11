import React from "react";
import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { sharedStyles, optionStyles } from "../shared/SharedStyles";
import { SpeakingIndicator } from "../shared/SpeakingIndicator";
import { OptionCard } from "../shared/OptionCard";
import { ModernButton } from "../shared/ModernButton";
import { ScreenProps, Option } from "../types";

const levels: Option[] = [
  { name: "Beginner", emoji: "🌱", color: "#C4B5FD" },
  { name: "Elementary", emoji: "🌿", color: "#B794F6" },
  { name: "Intermediate", emoji: "🌳", color: "#A78BFA" },
  { name: "Upper Intermediate", emoji: "🏔️", color: "#9F67FF" },
  { name: "Advanced", emoji: "🚀", color: "#8B45FF" },
  { name: "Proficient", emoji: "👑", color: "#6B2FD6" },
];

interface LevelSelectionComponentProps extends ScreenProps {
  selectedLevel: string;
  onLevelSelect: (level: string) => void;
}

export const LevelSelectionComponent: React.FC<
  LevelSelectionComponentProps
> = ({ onNext, selectedLevel, onLevelSelect, isSpeaking = false }) => {
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
            What's your English level?
          </ThemedText>

          <SpeakingIndicator isVisible={isSpeaking} />

          <View style={optionStyles.optionsGrid}>
            {levels.map((level) => (
              <OptionCard
                key={level.name}
                option={level}
                isSelected={selectedLevel === level.name}
                onPress={() => onLevelSelect(level.name)}
              />
            ))}
          </View>

          <ModernButton
            title="Continue"
            onPress={onNext}
            disabled={!selectedLevel}
          />
        </View>
      </ScrollView>
    </View>
  );
};
