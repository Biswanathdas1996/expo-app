import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { sharedStyles } from "../shared/SharedStyles";
import { ScreenProps } from "../types";

interface WelcomeScreenComponentProps extends ScreenProps {
  setName: (name: string) => void;
  setMobile: (mobile: string) => void;
  name: string;
  mobile: string;
}

export const WelcomeScreenComponent: React.FC<WelcomeScreenComponentProps> = ({
  onNext,
  setName,
  setMobile,
  name,
  mobile,
}) => {
  const colorScheme = useColorScheme();

  const handleSignIn = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert("Error", "Please fill in both name and mobile number");
      return;
    }
    onNext();
  };

  const handleSignUp = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert("Error", "Please fill in both name and mobile number");
      return;
    }
    onNext();
  };

  return (
    <View style={sharedStyles.gradientContainer}>
      <View style={sharedStyles.gradientBackground} />
      <ScrollView contentContainerStyle={sharedStyles.scrollContainer}>
        <View style={sharedStyles.modernContainer}>
          <View style={styles.heroSection}>
            <View style={styles.modernAvatarContainer}>
              <View style={styles.modernAvatar}>
                <ThemedText style={styles.modernAvatarEmoji}>🎓</ThemedText>
              </View>
              <View style={styles.avatarGlow} />
            </View>

            <ThemedText style={styles.modernWelcomeTitle}>
              Welcome to
            </ThemedText>
            <View style={styles.brandContainer}>
              <ThemedText style={styles.brandName}>SpeakEdge</ThemedText>
              <View style={styles.brandAccent} />
            </View>
            <ThemedText style={styles.modernSubtitle}>
              Master English with AI-powered learning
            </ThemedText>
          </View>

          <View style={styles.modernInputContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <ThemedText style={styles.iconText}>👤</ThemedText>
              </View>
              <TextInput
                style={[
                  styles.modernInput,
                  { color: Colors[colorScheme ?? "dark"].text },
                ]}
                placeholder="Enter your name"
                placeholderTextColor="#A0A0A0"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <ThemedText style={styles.iconText}>📱</ThemedText>
              </View>
              <TextInput
                style={[
                  styles.modernInput,
                  { color: Colors[colorScheme ?? "dark"].text },
                ]}
                placeholder="Enter mobile number"
                placeholderTextColor="#A0A0A0"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.modernButtonContainer}>
            <TouchableOpacity
              style={sharedStyles.modernPrimaryButton}
              onPress={handleSignUp}
            >
              <View style={sharedStyles.buttonGradient} />
              <ThemedText style={sharedStyles.modernButtonText}>
                Get Started
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={sharedStyles.modernSecondaryButton}
              onPress={handleSignIn}
            >
              <ThemedText style={sharedStyles.modernSecondaryButtonText}>
                Already have an account?
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <ThemedText style={styles.featureIcon}>🎯</ThemedText>
              <ThemedText style={styles.featureText}>CEFR Based</ThemedText>
            </View>
            <View style={styles.featureCard}>
              <ThemedText style={styles.featureIcon}>🤖</ThemedText>
              <ThemedText style={styles.featureText}>AI Powered</ThemedText>
            </View>
            <View style={styles.featureCard}>
              <ThemedText style={styles.featureIcon}>🇮🇳</ThemedText>
              <ThemedText style={styles.featureText}>Made in India</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  modernAvatarContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  modernAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(103, 126, 234, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#667eea",
    zIndex: 2,
  },
  modernAvatarEmoji: {
    fontSize: 50,
  },
  avatarGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(103, 126, 234, 0.2)",
    zIndex: 1,
  },
  modernWelcomeTitle: {
    fontSize: 24,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 5,
    opacity: 0.8,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  brandName: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "#667eea",
  },
  brandAccent: {
    width: 60,
    height: 4,
    backgroundColor: "#764ba2",
    borderRadius: 2,
    marginTop: 5,
  },
  modernSubtitle: {
    fontSize: 18,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 24,
  },
  modernInputContainer: {
    marginBottom: 32,
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon: {
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  modernInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
  },
  modernButtonContainer: {
    gap: 16,
    marginBottom: 32,
  },
  featureGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  featureCard: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    minWidth: 80,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
