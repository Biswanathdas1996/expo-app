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
  isCompact?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onPress,
  isLarge = false,
  isCompact = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        optionStyles.modernOptionCard,
        isLarge && optionStyles.largeOptionCard,
        isCompact && optionStyles.compactOptionCard,
        isSelected && optionStyles.modernSelectedOption,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          optionStyles.optionEmoji,
          isLarge && optionStyles.largeOptionEmoji,
          isCompact && optionStyles.compactOptionEmoji,
          { backgroundColor: option.color + "20" },
        ]}
      >
        <ThemedText
          style={[
            optionStyles.optionEmojiText,
            isLarge && optionStyles.largeEmojiText,
            isCompact && optionStyles.compactEmojiText,
          ]}
        >
          {option.emoji}
        </ThemedText>
      </View>
      <ThemedText
        style={[
          optionStyles.modernOptionText,
          isLarge && optionStyles.largeOptionText,
          isCompact && optionStyles.compactOptionText,
          isSelected && optionStyles.modernSelectedOptionText,
          !isSelected && { color: "#333333" }, // Ensure good contrast for unselected text
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
