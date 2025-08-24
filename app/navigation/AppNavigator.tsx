import React, { useState } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { WelcomeScreenComponent } from "../components/screens/WelcomeScreenComponent";
import { AIIntroductionComponent } from "../components/screens/AIIntroductionComponent";
import { LevelSelectionComponent } from "../components/screens/LevelSelectionComponent";
import { PartnerSelectionComponent } from "../components/screens/PartnerSelectionComponent";
import { PurposeSelectionComponent } from "../components/screens/PurposeSelectionComponent";
import { RecommendationComponent } from "../components/screens/RecommendationComponent";
import { SkillsSelectionComponent } from "../components/screens/SkillsSelectionComponent";
import { UserProfileComponent } from "../components/screens/UserProfileComponent";
import { UserAnswers } from "../components/types";
import { useSpeech } from "../hooks/useSpeech";
import { ApiService } from "../services/apiService";

type RootStackParamList = {
  WelcomeScreen: undefined;
  AIIntroduction: { name: string };
  LevelSelection: { name: string };
  PurposeSelection: { name: string; level: string };
  SkillsSelection: { name: string; level: string; purposes: string[] };
  PartnerSelection: {
    name: string;
    level: string;
    purposes: string[];
    skills: string[];
  };
  Recommendation: { name: string; userAnswers: UserAnswers };
  UserProfile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Navigation wrapper components
function WelcomeScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "WelcomeScreen">;
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleNext = () => {
    // Only navigate after successful authentication
    // The WelcomeScreenComponent handles the authentication internally
    navigation.navigate("AIIntroduction", { name });
  };

  return (
    <WelcomeScreenComponent
      onNext={handleNext}
      setName={setName}
      setMobile={setMobile}
      name={name}
      mobile={mobile}
    />
  );
}

function AIIntroduction({
  route,
  navigation,
}: {
  route: { params: { name: string } };
  navigation: StackNavigationProp<RootStackParamList, "AIIntroduction">;
}) {
  const { name } = route.params;
  const { isSpeaking, speakText, stopSpeaking } = useSpeech();

  const handleNext = () => {
    stopSpeaking();
    navigation.navigate("LevelSelection", { name });
  };

  return (
    <AIIntroductionComponent
      name={name}
      onNext={handleNext}
      isSpeaking={isSpeaking}
    />
  );
}

function LevelSelection({
  route,
  navigation,
}: {
  route: { params: { name: string } };
  navigation: StackNavigationProp<RootStackParamList, "LevelSelection">;
}) {
  const { name } = route.params;
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSpeaking, speakText, stopSpeaking } = useSpeech();

  const handleNext = async () => {
    if (!selectedLevel) return;

    setIsLoading(true);
    stopSpeaking();

    try {
      // Check if user is authenticated first
      const sessionInfo = await ApiService.getSessionInfo();
      console.log("Current session info:", sessionInfo);

      if (!sessionInfo || !sessionInfo.isLoggedIn) {
        console.error("User is not authenticated");
        Alert.alert(
          "Authentication Error",
          "Please go back and sign in again.",
          [
            {
              text: "Go Back",
              onPress: () => navigation.goBack(),
            },
          ]
        );
        return;
      }

      // Update English level via API
      const result = await ApiService.updateEnglishLevel(selectedLevel);
      console.log("English level update result:", result);

      if (!result.success) {
        console.error("Failed to update English level:", result.message);
        Alert.alert(
          "Update Failed",
          `Failed to save your English level: ${result.message}. Continue anyway?`,
          [
            {
              text: "Retry",
              onPress: () => handleNext(),
            },
            {
              text: "Continue",
              onPress: () =>
                navigation.navigate("PurposeSelection", {
                  name,
                  level: selectedLevel,
                }),
            },
          ]
        );
        return;
      }

      // Success - navigate to next screen
      navigation.navigate("PurposeSelection", { name, level: selectedLevel });
    } catch (error) {
      console.error("Error updating English level:", error);
      Alert.alert(
        "Network Error",
        `An error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Continue anyway?`,
        [
          {
            text: "Retry",
            onPress: () => handleNext(),
          },
          {
            text: "Continue",
            onPress: () =>
              navigation.navigate("PurposeSelection", {
                name,
                level: selectedLevel,
              }),
          },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-speak welcome message when component loads
  React.useEffect(() => {
    const welcomeText = `Hello ${name}! I hope you're having a wonderful day. Let's talk about your English proficiency level. Could you please take a moment to select the level that best describes your current abilities? You can choose from the options displayed below, and please don't worry - there's no pressure to be perfect. This will simply help me provide you with the most suitable learning experience.`;
    speakText(welcomeText);
  }, [name, speakText]);

  return (
    <LevelSelectionComponent
      selectedLevel={selectedLevel}
      onLevelSelect={setSelectedLevel}
      onNext={handleNext}
      isSpeaking={isSpeaking}
      isLoading={isLoading}
    />
  );
}

function PurposeSelection({
  route,
  navigation,
}: {
  route: { params: { name: string; level: string } };
  navigation: StackNavigationProp<RootStackParamList, "PurposeSelection">;
}) {
  const { name, level } = route.params;
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);

  const handlePurposeToggle = (purpose: string) => {
    setSelectedPurposes((prev) =>
      prev.includes(purpose)
        ? prev.filter((p) => p !== purpose)
        : [...prev, purpose]
    );
  };

  const handleNext = () => {
    navigation.navigate("SkillsSelection", {
      name,
      level,
      purposes: selectedPurposes,
    });
  };

  return (
    <PurposeSelectionComponent
      selectedPurposes={selectedPurposes}
      onPurposeToggle={handlePurposeToggle}
      onNext={handleNext}
    />
  );
}

function SkillsSelection({
  route,
  navigation,
}: {
  route: { params: { name: string; level: string; purposes: string[] } };
  navigation: StackNavigationProp<RootStackParamList, "SkillsSelection">;
}) {
  const { name, level, purposes } = route.params;
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    navigation.navigate("PartnerSelection", {
      name,
      level,
      purposes,
      skills: selectedSkills,
    });
  };

  return (
    <SkillsSelectionComponent
      selectedSkills={selectedSkills}
      onSkillToggle={handleSkillToggle}
      onNext={handleNext}
    />
  );
}

function PartnerSelection({
  route,
  navigation,
}: {
  route: {
    params: {
      name: string;
      level: string;
      purposes: string[];
      skills: string[];
    };
  };
  navigation: StackNavigationProp<RootStackParamList, "PartnerSelection">;
}) {
  const { name, level, purposes, skills } = route.params;
  const [selectedPartner, setSelectedPartner] = useState("");

  const handleNext = () => {
    const userAnswers: UserAnswers = {
      level,
      purpose: purposes,
      skills,
      partner: selectedPartner,
      language: "English", // Default language
    };
    navigation.navigate("Recommendation", { name, userAnswers });
  };

  return (
    <PartnerSelectionComponent
      selectedPartner={selectedPartner}
      onPartnerSelect={setSelectedPartner}
      onNext={handleNext}
    />
  );
}

function Recommendation({
  route,
  navigation,
}: {
  route: { params: { name: string; userAnswers: UserAnswers } };
  navigation: StackNavigationProp<RootStackParamList, "Recommendation">;
}) {
  const { name, userAnswers } = route.params;

  const handleLanguageSelect = (language: string) => {
    // Handle language selection
  };

  const handleSkipPress = () => {
    // Handle skip
  };

  return (
    <RecommendationComponent
      userAnswers={userAnswers}
      onLanguageSelect={handleLanguageSelect}
      onSkipPress={handleSkipPress}
    />
  );
}

function UserProfile({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "UserProfile">;
}) {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen or show edit modal
    Alert.alert("Edit Profile", "Edit profile functionality coming soon!");
  };

  return (
    <UserProfileComponent
      onBack={handleBack}
      onEditProfile={handleEditProfile}
    />
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="AIIntroduction" component={AIIntroduction} />
        <Stack.Screen name="LevelSelection" component={LevelSelection} />
        <Stack.Screen name="PurposeSelection" component={PurposeSelection} />
        <Stack.Screen name="SkillsSelection" component={SkillsSelection} />
        <Stack.Screen name="PartnerSelection" component={PartnerSelection} />
        <Stack.Screen name="Recommendation" component={Recommendation} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
