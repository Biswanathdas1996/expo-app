import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, otp, intro, level, purpose, skills, partner, recommendation
  const [userAnswers, setUserAnswers] = useState({
    level: '',
    purpose: [],
    skills: [],
    partner: '',
    language: 'English'
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const colorScheme = useColorScheme();

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1.1,
        rate: 0.9,
        voice: 'com.apple.ttsbundle.Samantha-compact', // Female voice on iOS
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.log('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const handleSignIn = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert('Error', 'Please fill in both name and mobile number');
      return;
    }
    // Skip OTP for now - direct to intro
    setCurrentStep('intro');
  };

  const handleSignUp = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert('Error', 'Please fill in both name and mobile number');
      return;
    }
    // Skip OTP for now - direct to intro
    setCurrentStep('intro');
  };

  const renderWelcomeScreen = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <ThemedText style={styles.avatarText}>👩‍🎓</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.welcomeTitle}>Welcome to SpeakEdge</ThemedText>
        <ThemedText style={styles.welcomeSubtitle}>
          India's most trusted CEFR-based English learning app powered by AI
        </ThemedText>

        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Enter your name"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Enter mobile number"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
            <ThemedText style={[styles.buttonText, styles.secondaryButtonText]}>Sign In</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.otpInfo}>OTP verification skipped for development</ThemedText>
      </ThemedView>
    </ScrollView>
  );

  const renderAIIntroduction = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <ThemedText style={styles.avatarText}>🤖</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.introTitle}>Meet Rose, Your AI Tutor</ThemedText>
        <ThemedText style={styles.introText}>
          Hi {name}, Welcome to SpeakEdge! I'm Rose, your AI tutor. I'm here to help you improve your English skills with personalized lessons and practice sessions.
        </ThemedText>

        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
          </View>
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentStep('level')}>
          <ThemedText style={styles.buttonText}>Let's Get Started</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );

  const renderLevelSelection = () => {
    const levels = ['Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced', 'Proficient'];

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.stepTitle}>What's your English level?</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
            </View>
          )}

          {levels.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                userAnswers.level === level && styles.selectedOption
              ]}
              onPress={() => setUserAnswers({...userAnswers, level})}
            >
              <ThemedText style={[
                styles.optionText,
                userAnswers.level === level && styles.selectedOptionText
              ]}>
                {level}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={[styles.primaryButton, !userAnswers.level && styles.disabledButton]} 
            onPress={() => userAnswers.level && setCurrentStep('purpose')}
            disabled={!userAnswers.level}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  };

  const renderPurposeSelection = () => {
    const purposes = ['Job/Business', 'Abroad', 'Improve skills', 'Academic', 'Practise', 'Pronunciation', 'CEFR Test', 'Other'];

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.stepTitle}>Why do you want to learn English?</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
            </View>
          )}

          {purposes.map((purpose) => (
            <TouchableOpacity
              key={purpose}
              style={[
                styles.optionButton,
                userAnswers.purpose.includes(purpose) && styles.selectedOption
              ]}
              onPress={() => {
                const updatedPurposes = userAnswers.purpose.includes(purpose)
                  ? userAnswers.purpose.filter(p => p !== purpose)
                  : [...userAnswers.purpose, purpose];
                setUserAnswers({...userAnswers, purpose: updatedPurposes});
              }}
            >
              <ThemedText style={[
                styles.optionText,
                userAnswers.purpose.includes(purpose) && styles.selectedOptionText
              ]}>
                {purpose}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={[styles.primaryButton, userAnswers.purpose.length === 0 && styles.disabledButton]} 
            onPress={() => userAnswers.purpose.length > 0 && setCurrentStep('skills')}
            disabled={userAnswers.purpose.length === 0}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  };

  const renderSkillsSelection = () => {
    const skills = ['Speaking', 'Writing', 'Reading', 'Listening', 'Pronunciation', 'All', 'Other'];

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.stepTitle}>Which skills do you want to focus on?</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
            </View>
          )}

          {skills.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.optionButton,
                userAnswers.skills.includes(skill) && styles.selectedOption
              ]}
              onPress={() => {
                const updatedSkills = userAnswers.skills.includes(skill)
                  ? userAnswers.skills.filter(s => s !== skill)
                  : [...userAnswers.skills, skill];
                setUserAnswers({...userAnswers, skills: updatedSkills});
              }}
            >
              <ThemedText style={[
                styles.optionText,
                userAnswers.skills.includes(skill) && styles.selectedOptionText
              ]}>
                {skill}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={[styles.primaryButton, userAnswers.skills.length === 0 && styles.disabledButton]} 
            onPress={() => userAnswers.skills.length > 0 && setCurrentStep('partner')}
            disabled={userAnswers.skills.length === 0}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  };

  const renderPartnerSelection = () => {
    const options = ['Yes', 'No', 'Other'];

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.stepTitle}>Are you interested in having a speaking partner?</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
            </View>
          )}

          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                userAnswers.partner === option && styles.selectedOption
              ]}
              onPress={() => setUserAnswers({...userAnswers, partner: option})}
            >
              <ThemedText style={[
                styles.optionText,
                userAnswers.partner === option && styles.selectedOptionText
              ]}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={[styles.primaryButton, !userAnswers.partner && styles.disabledButton]} 
            onPress={() => userAnswers.partner && setCurrentStep('recommendation')}
            disabled={!userAnswers.partner}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  };

  const renderRecommendation = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.stepTitle}>Personalized Course Recommendation</ThemedText>

        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <ThemedText style={styles.speakingText}>🎙️ Rose is speaking...</ThemedText>
          </View>
        )}

        <View style={styles.courseCard}>
          <ThemedText style={styles.courseTitle}>
            {userAnswers.level} English Course
          </ThemedText>
          <ThemedText style={styles.courseDescription}>
            Based on your preferences for {userAnswers.purpose.join(', ')} and focus on {userAnswers.skills.join(', ')}.
          </ThemedText>
        </View>

        <ThemedText style={styles.languageTitle}>Choose your learning language:</ThemedText>
        <View style={styles.languageContainer}>
          {['English', 'Bengali', 'Hindi'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageButton,
                userAnswers.language === lang && styles.selectedLanguage
              ]}
              onPress={() => setUserAnswers({...userAnswers, language: lang})}
            >
              <ThemedText style={[
                styles.languageText,
                userAnswers.language === lang && styles.selectedLanguageText
              ]}>
                {lang}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.finalButtonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('Demo', 'Free demo starting!')}>
            <ThemedText style={styles.buttonText}>Join Free Demo</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert('Skip', 'Claim 100% free SpeakEdge lifetime membership...')}>
            <ThemedText style={[styles.buttonText, styles.secondaryButtonText]}>Skip</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome': return renderWelcomeScreen();
      case 'intro': return renderAIIntroduction();
      case 'level': return renderLevelSelection();
      case 'purpose': return renderPurposeSelection();
      case 'skills': return renderSkillsSelection();
      case 'partner': return renderPartnerSelection();
      case 'recommendation': return renderRecommendation();
      default: return renderWelcomeScreen();
    }
  };

  // Effect to auto-play speech on screen load
  useEffect(() => {
    switch (currentStep) {
      case 'welcome':
        speakText("Welcome to SpeakEdge - India's most trusted CEFR-based English learning app powered by AI. Please enter your name and mobile number to get started.");
        break;
      case 'intro':
        speakText(`Hi ${name}, Welcome to SpeakEdge! I'm Rose, your AI tutor. I'm here to help you improve your English skills with personalized lessons and practice sessions. Let's get started with some questions to personalize your learning experience.`);
        break;
      case 'level':
        speakText("What's your English level? Please select from Beginner, Elementary, Intermediate, Upper Intermediate, Advanced, or Proficient.");
        break;
      case 'purpose':
        speakText("Why do you want to learn English? Please select all that apply.");
        break;
      case 'skills':
        speakText("Which skills do you want to focus on? Please select all that apply.");
        break;
      case 'partner':
        speakText("Are you interested in having a speaking partner? Please answer yes or no.");
        break;
      case 'recommendation':
        speakText(`Based on your input, we recommend the ${userAnswers.level} English course. We will now guide you through the joining process.`);
        break;
      default:
        break;
    }
  }, [currentStep, name, userAnswers.level, userAnswers.purpose, userAnswers.skills]);


  return renderCurrentStep();
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  otpInfo: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: 'white',
  },
  courseCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  languageButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedLanguage: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageText: {
    fontSize: 14,
  },
  selectedLanguageText: {
    color: 'white',
  },
  finalButtonContainer: {
    gap: 15,
  },
  speechButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  speechButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  speakingIndicator: {
    alignItems: 'center',
    marginBottom: 15,
  },
  speakingText: {
    fontSize: 14,
    color: '#888',
  },
});