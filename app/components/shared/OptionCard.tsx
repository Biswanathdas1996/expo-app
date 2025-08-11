import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { optionStyles } from "../shared/SharedStyles";
import { Option } from "../types";

interface OptionCardProps {
  option: Option;
  isSelected: boolean;
  onPress: () => void;
  isLarge?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onPress,
  isLarge = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        optionStyles.modernOptionCard,
        isLarge && optionStyles.largeOptionCard,
        isSelected && optionStyles.modernSelectedOption,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          optionStyles.optionEmoji,
          isLarge && optionStyles.largeOptionEmoji,
          { backgroundColor: option.color + "20" },
        ]}
      >
        <ThemedText
          style={[
            optionStyles.optionEmojiText,
            isLarge && optionStyles.largeEmojiText,
          ]}
        >
          {option.emoji}
        </ThemedText>
      </View>
      <ThemedText
        style={[
          optionStyles.modernOptionText,
          isLarge && optionStyles.largeOptionText,
          isSelected && optionStyles.modernSelectedOptionText,
        ]}
      >
        {option.name}
      </ThemedText>
      {isSelected && (
        <View style={optionStyles.selectedCheckmark}>
          <ThemedText style={optionStyles.checkmarkText}>✓</ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};
