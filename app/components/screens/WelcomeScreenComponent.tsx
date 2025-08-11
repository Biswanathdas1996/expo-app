import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { sharedStyles } from "../shared/SharedStyles";
import { ScreenProps } from "../types";

const { width, height } = Dimensions.get("window");

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
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
    <View style={styles.container}>
      {/* Modern gradient background */}
      <View
        style={[
          styles.backgroundGradient,
          {
            backgroundColor: colorScheme === "dark" ? "#0a0a1a" : "#fafbff",
          },
        ]}
      />
      <View style={styles.backgroundAccent} />
      <View style={styles.backgroundAccent2} />
      <View style={styles.floatingOrbs} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View
              style={[
                styles.compactHeroContainer,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(139, 69, 255, 0.08)"
                      : "rgba(139, 69, 255, 0.06)",
                  borderColor:
                    colorScheme === "dark"
                      ? "rgba(139, 69, 255, 0.2)"
                      : "rgba(139, 69, 255, 0.15)",
                },
              ]}
            >
              <View
                style={[
                  styles.compactLogoCircle,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "rgba(139, 69, 255, 0.2)"
                        : "rgba(139, 69, 255, 0.15)",
                  },
                ]}
              >
                <ThemedText style={styles.compactLogoEmoji}>🎓</ThemedText>
                <View style={styles.logoRipple} />
              </View>

              <View style={styles.compactTitleContainer}>
                <View style={styles.brandRow}>
                  <ThemedText
                    style={[
                      styles.compactWelcomeText,
                      {
                        color: colorScheme === "dark" ? "#9ca3af" : "#6b7280",
                      },
                    ]}
                  >
                    Welcome to{" "}
                  </ThemedText>
                  <ThemedText style={styles.compactBrandText}>
                    SpeakEdge
                  </ThemedText>
                </View>
                <ThemedText
                  style={[
                    styles.compactTaglineText,
                    {
                      color: colorScheme === "dark" ? "#e5e7eb" : "#1f2937",
                    },
                  ]}
                >
                  Master English with AI-powered learning ✨
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View
              style={[
                styles.inputCard,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(17, 24, 39, 0.95)"
                      : "rgba(255, 255, 255, 0.95)",
                  shadowColor: colorScheme === "dark" ? "#8B45FF" : "#000000",
                  borderColor:
                    colorScheme === "dark"
                      ? "rgba(139, 69, 255, 0.15)"
                      : "rgba(139, 69, 255, 0.1)",
                },
              ]}
            >
              <View style={styles.inputHeader}>
                <ThemedText
                  style={[
                    styles.inputHeaderText,
                    {
                      color: colorScheme === "dark" ? "#e5e7eb" : "#374151",
                    },
                  ]}
                >
                  Let's get started 🚀
                </ThemedText>
              </View>

              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor:
                        colorScheme === "dark"
                          ? "rgba(139, 69, 255, 0.3)"
                          : "rgba(139, 69, 255, 0.25)",
                      backgroundColor:
                        colorScheme === "dark"
                          ? "rgba(31, 41, 55, 0.5)"
                          : "rgba(248, 250, 252, 0.8)",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.inputIconWrapper,
                      {
                        backgroundColor:
                          colorScheme === "dark"
                            ? "rgba(139, 69, 255, 0.25)"
                            : "rgba(139, 69, 255, 0.15)",
                      },
                    ]}
                  >
                    <ThemedText style={styles.inputIcon}>👤</ThemedText>
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        color: colorScheme === "dark" ? "#f9fafb" : "#111827",
                      },
                    ]}
                    placeholder="Enter your full name"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                    }
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor:
                        colorScheme === "dark"
                          ? "rgba(139, 69, 255, 0.3)"
                          : "rgba(139, 69, 255, 0.25)",
                      backgroundColor:
                        colorScheme === "dark"
                          ? "rgba(31, 41, 55, 0.5)"
                          : "rgba(248, 250, 252, 0.8)",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.inputIconWrapper,
                      {
                        backgroundColor:
                          colorScheme === "dark"
                            ? "rgba(139, 69, 255, 0.25)"
                            : "rgba(139, 69, 255, 0.15)",
                      },
                    ]}
                  >
                    <ThemedText style={styles.inputIcon}>📱</ThemedText>
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        color: colorScheme === "dark" ? "#f9fafb" : "#111827",
                      },
                    ]}
                    placeholder="Enter mobile number"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#9ca3af" : "#6b7280"
                    }
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  shadowColor: "#8B45FF",
                },
              ]}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <View style={styles.buttonGradient} />
              <View style={styles.buttonContent}>
                <ThemedText style={styles.primaryButtonText}>
                  Get Started
                </ThemedText>
                <ThemedText style={styles.buttonEmoji}>🚀</ThemedText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? "rgba(107, 114, 128, 0.15)"
                      : "rgba(139, 69, 255, 0.08)",
                  borderColor:
                    colorScheme === "dark"
                      ? "rgba(139, 69, 255, 0.25)"
                      : "rgba(139, 69, 255, 0.2)",
                },
              ]}
              onPress={handleSignIn}
              activeOpacity={0.7}
            >
              <ThemedText
                style={[
                  styles.secondaryButtonText,
                  {
                    color: colorScheme === "dark" ? "#a78bfa" : "#7c3aed",
                  },
                ]}
              >
                Already have an account? Sign In
              </ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundAccent: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(139, 69, 255, 0.08)",
  },
  backgroundAccent2: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(59, 130, 246, 0.06)",
  },
  floatingOrbs: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(236, 72, 153, 0.04)",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 3,
    borderColor: "#8B45FF",
    shadowColor: "#8B45FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 60,
    zIndex: 2,
  },
  logoGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(139, 69, 255, 0.15)",
    zIndex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "300",
    marginBottom: 8,
    textAlign: "center",
  },
  brandWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  brandText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#8B45FF",
    textAlign: "center",
    textShadowColor: "rgba(139, 69, 255, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  brandUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#8B45FF",
    borderRadius: 2,
    marginTop: 8,
    shadowColor: "#8B45FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  taglineText: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "400",
  },
  inputSection: {
    marginBottom: 40,
  },
  inputCard: {
    borderRadius: 24,
    padding: 32,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(139, 69, 255, 0.1)",
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  inputIcon: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
    fontWeight: "500",
  },
  buttonSection: {
    marginBottom: 50,
  },
  primaryButton: {
    backgroundColor: "#8B45FF",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  buttonGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "linear-gradient(135deg, #8B45FF, #6B2FD6)",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    zIndex: 1,
  },
  secondaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  featuresSection: {
    alignItems: "center",
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  featureCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    minWidth: width * 0.25,
    maxWidth: width * 0.28,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(139, 69, 255, 0.1)",
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
    fontWeight: "400",
  },
  // Compact Hero Styles
  compactHeroContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 28,
    marginHorizontal: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  compactLogoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#8B45FF",
    marginRight: 20,
    position: "relative",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoRipple: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(139, 69, 255, 0.1)",
    top: -8,
    left: -8,
  },
  compactLogoEmoji: {
    fontSize: 32,
    zIndex: 2,
  },
  compactTitleContainer: {
    flex: 1,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  compactWelcomeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  compactBrandText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#8B45FF",
    textShadowColor: "rgba(139, 69, 255, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  compactTaglineText: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
  // Input Styles
  inputHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  inputHeaderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  // Button Styles
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  buttonEmoji: {
    fontSize: 18,
    marginLeft: 8,
  },
});
