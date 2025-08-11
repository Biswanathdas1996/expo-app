import React, { useState } from "react";
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
import { UserAnswers } from "../components/types";

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

  const handleNext = () => {
    navigation.navigate("LevelSelection", { name });
  };

  return <AIIntroductionComponent name={name} onNext={handleNext} />;
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

  const handleNext = () => {
    navigation.navigate("PurposeSelection", { name, level: selectedLevel });
  };

  return (
    <LevelSelectionComponent
      selectedLevel={selectedLevel}
      onLevelSelect={setSelectedLevel}
      onNext={handleNext}
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
}: {
  route: { params: { name: string; userAnswers: UserAnswers } };
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
