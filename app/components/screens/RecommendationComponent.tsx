import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { sharedStyles } from "../shared/SharedStyles";
import { SpeakingIndicator } from "../shared/SpeakingIndicator";
import { ModernButton } from "../shared/ModernButton";
import { ScreenProps, UserAnswers } from "../types";
import { Colors } from "@/constants/Colors";

interface RecommendationComponentProps {
  userAnswers: UserAnswers;
  onLanguageSelect: (language: string) => void;
  onSkipPress: () => void;
  isSpeaking?: boolean;
}

export const RecommendationComponent: React.FC<
  RecommendationComponentProps
> = ({ userAnswers, onLanguageSelect, onSkipPress, isSpeaking = false }) => {
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
            Perfect Match Found! 🎉
          </ThemedText>

          <SpeakingIndicator isVisible={isSpeaking} />

          <View style={styles.modernCourseCard}>
            <View style={styles.courseHeader}>
              <ThemedText style={styles.courseEmoji}>🎯</ThemedText>
              <View>
                <ThemedText style={styles.modernCourseTitle}>
                  {userAnswers.level} English Course
                </ThemedText>
                <ThemedText style={styles.courseBadge}>
                  Recommended for you
                </ThemedText>
              </View>
            </View>

            <View style={styles.courseDetails}>
              <View style={styles.courseDetailItem}>
                <ThemedText style={styles.detailIcon}>📋</ThemedText>
                <ThemedText style={styles.detailText}>
                  Focus: {userAnswers.skills.join(", ")}
                </ThemedText>
              </View>
              <View style={styles.courseDetailItem}>
                <ThemedText style={styles.detailIcon}>🎯</ThemedText>
                <ThemedText style={styles.detailText}>
                  Goal: {userAnswers.purpose.join(", ")}
                </ThemedText>
              </View>
              <View style={styles.courseDetailItem}>
                <ThemedText style={styles.detailIcon}>👥</ThemedText>
                <ThemedText style={styles.detailText}>
                  Speaking Partner: {userAnswers.partner}
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.languageSection}>
            <ThemedText style={styles.languageTitle}>
              Choose your learning language:
            </ThemedText>
            <View style={styles.modernLanguageContainer}>
              {[
                { name: "English", flag: "🇺🇸" },
                { name: "Bengali", flag: "🇧🇩" },
                { name: "Hindi", flag: "🇮🇳" },
              ].map((lang) => (
                <TouchableOpacity
                  key={lang.name}
                  style={[
                    styles.modernLanguageButton,
                    userAnswers.language === lang.name &&
                      styles.selectedLanguageButton,
                  ]}
                  onPress={() => onLanguageSelect(lang.name)}
                >
                  <ThemedText style={styles.languageFlag}>
                    {lang.flag}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.modernLanguageText,
                      userAnswers.language === lang.name &&
                        styles.selectedLanguageText,
                    ]}
                  >
                    {lang.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.finalActions}>
            <ModernButton
              title="Start Free Demo 🚀"
              onPress={() => Alert.alert("Demo", "Free demo starting!")}
            />

            <ModernButton
              title="Skip for Now"
              onPress={onSkipPress}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modernCourseCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  courseEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  modernCourseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 4,
  },
  courseBadge: {
    fontSize: 14,
    color: Colors.light.success,
    fontWeight: "600",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  courseDetails: {
    gap: 12,
  },
  courseDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  detailText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  languageSection: {
    marginBottom: 32,
  },
  languageTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: Colors.light.primary,
  },
  modernLanguageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modernLanguageButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedLanguageButton: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.backgroundAccent,
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  modernLanguageText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedLanguageText: {
    color: Colors.light.primary,
    fontWeight: "600",
  },
  finalActions: {
    gap: 16,
  },
});
