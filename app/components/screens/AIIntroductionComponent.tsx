import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { sharedStyles } from "../shared/SharedStyles";
import { SpeakingIndicator } from "../shared/SpeakingIndicator";
import { ScreenProps } from "../types";

interface AIIntroductionComponentProps extends ScreenProps {
  name: string;
}

export const AIIntroductionComponent: React.FC<
  AIIntroductionComponentProps
> = ({ onNext, name, isSpeaking = false }) => {
  return (
    <View style={sharedStyles.gradientContainer}>
      <View style={sharedStyles.gradientBackground} />
      <ScrollView contentContainerStyle={sharedStyles.scrollContainer}>
        <View style={sharedStyles.modernContainer}>
          <View style={styles.aiIntroSection}>
            <View style={styles.aiAvatarContainer}>
              <View style={styles.aiAvatar}>
                <ThemedText style={styles.aiAvatarEmoji}>🌹</ThemedText>
              </View>
              <View style={styles.aiAvatarGlow} />
            </View>

            <ThemedText style={styles.aiIntroTitle}>Meet Rose</ThemedText>
            <ThemedText style={styles.aiSubtitle}>
              Your AI English Tutor
            </ThemedText>

            <View style={styles.speechBubble}>
              <ThemedText style={styles.speechText}>
                Hi {name}! I'm Rose, your personal AI tutor. I'll help you
                master English with personalized lessons and practice sessions.
                Ready to begin your journey?
              </ThemedText>
            </View>

            <SpeakingIndicator isVisible={isSpeaking} />

            <TouchableOpacity
              style={sharedStyles.modernPrimaryButton}
              onPress={onNext}
            >
              <View style={sharedStyles.buttonGradient} />
              <ThemedText style={sharedStyles.modernButtonText}>
                Let's Begin! 🚀
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  aiIntroSection: {
    alignItems: "center",
  },
  aiAvatarContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  aiAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(233, 30, 99, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#E91E63",
    zIndex: 2,
  },
  aiAvatarEmoji: {
    fontSize: 40,
  },
  aiAvatarGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(233, 30, 99, 0.2)",
    zIndex: 1,
  },
  aiIntroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#E91E63",
  },
  aiSubtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.8,
  },
  speechBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
  },
  speechText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
