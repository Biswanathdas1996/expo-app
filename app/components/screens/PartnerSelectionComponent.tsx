import React from "react";
import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { sharedStyles, optionStyles } from "../shared/SharedStyles";
import { SpeakingIndicator } from "../shared/SpeakingIndicator";
import { OptionCard } from "../shared/OptionCard";
import { ModernButton } from "../shared/ModernButton";
import { ScreenProps, Option } from "../types";

const options: Option[] = [
  { name: "Yes", emoji: "👥", color: "#4CAF50" },
  { name: "No", emoji: "🚫", color: "#F44336" },
  { name: "Other", emoji: "🤔", color: "#FF9800" },
];

interface PartnerSelectionComponentProps extends ScreenProps {
  selectedPartner: string;
  onPartnerSelect: (partner: string) => void;
}

export const PartnerSelectionComponent: React.FC<
  PartnerSelectionComponentProps
> = ({ onNext, selectedPartner, onPartnerSelect, isSpeaking = false }) => {
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
            Speaking Partner
          </ThemedText>
          <ThemedText style={sharedStyles.stepSubtitle}>
            Are you interested in having a speaking partner?
          </ThemedText>

          <SpeakingIndicator isVisible={isSpeaking} />

          <View style={optionStyles.optionsGrid}>
            {options.map((option) => (
              <OptionCard
                key={option.name}
                option={option}
                isSelected={selectedPartner === option.name}
                onPress={() => onPartnerSelect(option.name)}
                isLarge={true}
              />
            ))}
          </View>

          <ModernButton
            title="Continue"
            onPress={onNext}
            disabled={!selectedPartner}
          />
        </View>
      </ScrollView>
    </View>
  );
};
