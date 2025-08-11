import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

const styles = StyleSheet.create({
  gradientContainer: {},
  gradientBackground: {},
  scrollContainer: {},
  modernContainer: {},
  aiIntroSection: {},
  aiAvatarContainer: {},
  aiAvatar: {},
  aiAvatarEmoji: {},
  aiAvatarGlow: {},
  aiIntroTitle: {},
  aiSubtitle: {},
  speechBubble: {},
  speechText: {},
  modernSpeakingIndicator: {},
  soundWave: {},
  wave: {},
  wave1: {},
  wave2: {},
  wave3: {},
  modernPrimaryButton: {},
  buttonGradient: {},
  modernButtonText: {},
  modernSpeakingText: {},
});

type AIIntroductionProps = {
  navigation: StackNavigationProp<RootStackParamList, "AIIntroduction">;
};

export default function AIIntroduction({ navigation }: AIIntroductionProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <View style={styles.gradientContainer}>
      <View style={styles.gradientBackground} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.modernContainer}>
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
                Hi! I'm Rose, your personal AI tutor. I'll help you master
                English with personalized lessons and practice sessions. Ready
                to begin your journey?
              </ThemedText>
            </View>

            {isSpeaking && (
              <View style={styles.modernSpeakingIndicator}>
                <View style={styles.soundWave}>
                  <View style={[styles.wave, styles.wave1]} />
                  <View style={[styles.wave, styles.wave2]} />
                  <View style={[styles.wave, styles.wave3]} />
                </View>
                <ThemedText style={styles.modernSpeakingText}>
                  Rose is speaking...
                </ThemedText>
              </View>
            )}

            <TouchableOpacity
              style={styles.modernPrimaryButton}
              onPress={() =>
                navigation.navigate("LevelSelection", { name: "User" })
              }
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>
                Let's Begin! 🚀
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
