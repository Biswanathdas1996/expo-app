import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
// Placeholder for styles import
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

const styles = StyleSheet.create({
  gradientContainer: {},
  gradientBackground: {},
  scrollContainer: {},
  modernContainer: {},
  heroSection: {},
  modernAvatarContainer: {},
  modernAvatar: {},
  modernAvatarEmoji: {},
  avatarGlow: {},
  modernWelcomeTitle: {},
  brandContainer: {},
  brandName: {},
  brandAccent: {},
  modernSubtitle: {},
  modernInputContainer: {},
  inputWrapper: {},
  inputIcon: {},
  modernInput: {},
  modernButtonContainer: {},
  modernPrimaryButton: {},
  buttonGradient: {},
  modernButtonText: {},
  modernSecondaryButton: {},
  modernSecondaryButtonText: {},
  iconText: {},
});

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "WelcomeScreen">;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const colorScheme = useColorScheme();

  const handleSignIn = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert("Error", "Please fill in both name and mobile number");
      return;
    }
    navigation.navigate("AIIntroduction");
  };

  const handleSignUp = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert("Error", "Please fill in both name and mobile number");
      return;
    }
    navigation.navigate("AIIntroduction");
  };

  return (
    <View style={styles.gradientContainer}>
      <View style={styles.gradientBackground} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.modernContainer}>
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
              style={styles.modernPrimaryButton}
              onPress={handleSignUp}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>
                Get Started
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modernSecondaryButton}
              onPress={handleSignIn}
            >
              <ThemedText style={styles.modernSecondaryButtonText}>
                Already have an account?
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
