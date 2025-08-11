import React from "react";
import { Modal, View, ScrollView, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { modalStyles } from "../shared/SharedStyles";
import { ModernButton } from "../shared/ModernButton";

interface BenefitsModalProps {
  visible: boolean;
  onClose: () => void;
}

const benefits = [
  {
    icon: "💬",
    text: "Unlimited English conversation partners on SpeakEdge Platform",
  },
  { icon: "🎯", text: "Daily English learning with fun" },
  { icon: "♾️", text: "Lifetime membership access" },
  { icon: "🏆", text: "Track progress with badges" },
  { icon: "🔔", text: "Be the first to get SpeakEdge updates" },
];

export const BenefitsModal: React.FC<BenefitsModalProps> = ({
  visible,
  onClose,
}) => {
  const colorScheme = useColorScheme();

  const handleInterestPress = () => {
    onClose();
    Alert.alert(
      "Interest",
      "Thank you for your interest! We will contact you soon."
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={modalStyles.modernModalOverlay}>
        <View
          style={[
            modalStyles.modernBenefitsModalContent,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
          ]}
        >
          <View style={modalStyles.modalHeader}>
            <ThemedText style={modalStyles.modalEmoji}>💎</ThemedText>
            <ThemedText style={modalStyles.modalTitle}>
              Membership Benefits
            </ThemedText>
          </View>

          <ScrollView style={modalStyles.benefitsScrollView}>
            {benefits.map((benefit, index) => (
              <View key={index} style={modalStyles.modernBenefitItem}>
                <View style={modalStyles.benefitIcon}>
                  <ThemedText style={modalStyles.benefitIconText}>
                    {benefit.icon}
                  </ThemedText>
                </View>
                <ThemedText style={modalStyles.modernBenefitText}>
                  {benefit.text}
                </ThemedText>
              </View>
            ))}
          </ScrollView>

          <View style={modalStyles.modernBenefitsButtonContainer}>
            <ModernButton
              title="I'm Interested! ✨"
              onPress={handleInterestPress}
            />

            <ModernButton
              title="Skip for Now"
              onPress={onClose}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
