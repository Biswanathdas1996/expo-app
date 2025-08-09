import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
// import * as Speech from 'expo-speech';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userAnswers, setUserAnswers] = useState({
    level: '',
    purpose: [],
    skills: [],
    partner: '',
    language: 'English'
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const colorScheme = useColorScheme();

  const speakText = async (text: string) => {
    // Temporarily disabled speech functionality
    console.log('Would speak:', text);
  };

  const stopSpeaking = () => {
    // Temporarily disabled speech functionality
    setIsSpeaking(false);
  };

  const handleSignIn = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert('Error', 'Please fill in both name and mobile number');
      return;
    }
    setCurrentStep('intro');
  };

  const handleSignUp = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert('Error', 'Please fill in both name and mobile number');
      return;
    }
    setCurrentStep('intro');
  };

  const renderWelcomeScreen = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <ThemedText style={styles.logoIcon}>🎓</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.title}>SpeakEdge</ThemedText>
          <ThemedText style={styles.subtitle}>AI-Powered English Learning</ThemedText>
        </View>

        <View style={styles.inputSection}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Enter your name"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Mobile Number</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Enter mobile number"
              placeholderTextColor="#94A3B8"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
            <ThemedText style={styles.primaryButtonText}>Get Started</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
            <ThemedText style={styles.secondaryButtonText}>Sign In</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>🎯</ThemedText>
            <ThemedText style={styles.featureText}>CEFR Based</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>🤖</ThemedText>
            <ThemedText style={styles.featureText}>AI Powered</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <ThemedText style={styles.featureIcon}>🇮🇳</ThemedText>
            <ThemedText style={styles.featureText}>Made in India</ThemedText>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderAIIntroduction = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.aiSection}>
          <View style={styles.aiAvatar}>
            <ThemedText style={styles.aiAvatarIcon}>🌹</ThemedText>
          </View>

          <ThemedText style={styles.aiTitle}>Meet Rose</ThemedText>
          <ThemedText style={styles.aiSubtitle}>Your AI English Tutor</ThemedText>

          <View style={styles.speechCard}>
            <ThemedText style={styles.speechText}>
              Hi {name}! I'm Rose, your AI tutor. Let's personalize your English learning journey together.
            </ThemedText>
          </View>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <View style={styles.waveContainer}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
              <ThemedText style={styles.speakingText}>Rose is speaking...</ThemedText>
            </View>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentStep('level')}>
            <ThemedText style={styles.primaryButtonText}>Start Learning</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderLevelSelection = () => {
    const levels = [
      { name: 'Beginner', emoji: '🌱', description: 'Just starting' },
      { name: 'Elementary', emoji: '🌿', description: 'Basic skills' },
      { name: 'Intermediate', emoji: '🌳', description: 'Good foundation' },
      { name: 'Upper Intermediate', emoji: '🏔️', description: 'Strong skills' },
      { name: 'Advanced', emoji: '🚀', description: 'Fluent speaker' },
      { name: 'Proficient', emoji: '👑', description: 'Native-like' }
    ];

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.stepTitle}>Your English Level?</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <View style={styles.waveContainer}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
              <ThemedText style={styles.speakingText}>Rose is speaking...</ThemedText>
            </View>
          )}

          <View style={styles.optionsContainer}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level.name}
                style={[
                  styles.optionCard,
                  userAnswers.level === level.name && styles.selectedCard
                ]}
                onPress={() => setUserAnswers({...userAnswers, level: level.name})}
              >
                <ThemedText style={styles.optionIcon}>{level.emoji}</ThemedText>
                <View style={styles.optionContent}>
                  <ThemedText style={[
                    styles.optionTitle,
                    userAnswers.level === level.name && styles.selectedText
                  ]}>
                    {level.name}
                  </ThemedText>
                  <ThemedText style={styles.optionDescription}>{level.description}</ThemedText>
                </View>
                {userAnswers.level === level.name && (
                  <View style={styles.checkmark}>
                    <ThemedText style={styles.checkmarkIcon}>✓</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.primaryButton,
              !userAnswers.level && styles.disabledButton
            ]} 
            onPress={() => userAnswers.level && setCurrentStep('purpose')}
            disabled={!userAnswers.level}
          >
            <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  const renderPurposeSelection = () => {
    const purposes = [
      { name: 'Job/Business', emoji: '💼' },
      { name: 'Study Abroad', emoji: '✈️' },
      { name: 'Skill Improvement', emoji: '📈' },
      { name: 'Academic', emoji: '🎓' },
      { name: 'Practice', emoji: '🗣️' },
      { name: 'Pronunciation', emoji: '🎤' },
      { name: 'CEFR Test', emoji: '📊' },
      { name: 'Personal Interest', emoji: '💡' }
    ];

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.stepTitle}>Learning Goals?</ThemedText>
          <ThemedText style={styles.stepSubtitle}>Select all that apply</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <View style={styles.waveContainer}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
              <ThemedText style={styles.speakingText}>Rose is speaking...</ThemedText>
            </View>
          )}

          <View style={styles.gridContainer}>
            {purposes.map((purpose) => (
              <TouchableOpacity
                key={purpose.name}
                style={[
                  styles.gridCard,
                  userAnswers.purpose.includes(purpose.name) && styles.selectedCard
                ]}
                onPress={() => {
                  const updatedPurposes = userAnswers.purpose.includes(purpose.name)
                    ? userAnswers.purpose.filter(p => p !== purpose.name)
                    : [...userAnswers.purpose, purpose.name];
                  setUserAnswers({...userAnswers, purpose: updatedPurposes});
                }}
              >
                <ThemedText style={styles.gridIcon}>{purpose.emoji}</ThemedText>
                <ThemedText style={[
                  styles.gridText,
                  userAnswers.purpose.includes(purpose.name) && styles.selectedText
                ]}>
                  {purpose.name}
                </ThemedText>
                {userAnswers.purpose.includes(purpose.name) && (
                  <View style={styles.gridCheckmark}>
                    <ThemedText style={styles.checkmarkIcon}>✓</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.primaryButton,
              userAnswers.purpose.length === 0 && styles.disabledButton
            ]} 
            onPress={() => userAnswers.purpose.length > 0 && setCurrentStep('skills')}
            disabled={userAnswers.purpose.length === 0}
          >
            <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderSkillsSelection = () => {
    const skills = [
      { name: 'Speaking', emoji: '🗣️' },
      { name: 'Writing', emoji: '✍️' },
      { name: 'Reading', emoji: '📖' },
      { name: 'Listening', emoji: '👂' },
      { name: 'Pronunciation', emoji: '🎤' },
      { name: 'All Skills', emoji: '🎯' }
    ];

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.stepTitle}>Focus Areas?</ThemedText>
          <ThemedText style={styles.stepSubtitle}>Select skills to improve</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <View style={styles.waveContainer}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
              <ThemedText style={styles.speakingText}>Rose is speaking...</ThemedText>
            </View>
          )}

          <View style={styles.gridContainer}>
            {skills.map((skill) => (
              <TouchableOpacity
                key={skill.name}
                style={[
                  styles.gridCard,
                  userAnswers.skills.includes(skill.name) && styles.selectedCard
                ]}
                onPress={() => {
                  const updatedSkills = userAnswers.skills.includes(skill.name)
                    ? userAnswers.skills.filter(s => s !== skill.name)
                    : [...userAnswers.skills, skill.name];
                  setUserAnswers({...userAnswers, skills: updatedSkills});
                }}
              >
                <ThemedText style={styles.gridIcon}>{skill.emoji}</ThemedText>
                <ThemedText style={[
                  styles.gridText,
                  userAnswers.skills.includes(skill.name) && styles.selectedText
                ]}>
                  {skill.name}
                </ThemedText>
                {userAnswers.skills.includes(skill.name) && (
                  <View style={styles.gridCheckmark}>
                    <ThemedText style={styles.checkmarkIcon}>✓</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.primaryButton,
              userAnswers.skills.length === 0 && styles.disabledButton
            ]} 
            onPress={() => userAnswers.skills.length > 0 && setCurrentStep('partner')}
            disabled={userAnswers.skills.length === 0}
          >
            <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderPartnerSelection = () => {
    const options = [
      { name: 'Yes', emoji: '👥', description: 'I want a speaking partner' },
      { name: 'No', emoji: '🎯', description: 'Solo learning is fine' },
      { name: 'Maybe Later', emoji: '🤔', description: 'Not sure yet' }
    ];

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.stepTitle}>Speaking Partner?</ThemedText>
          <ThemedText style={styles.stepSubtitle}>Would you like a conversation partner?</ThemedText>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <View style={styles.waveContainer}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
              <ThemedText style={styles.speakingText}>Rose is speaking...</ThemedText>
            </View>
          )}

          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.name}
                style={[
                  styles.optionCard,
                  userAnswers.partner === option.name && styles.selectedCard
                ]}
                onPress={() => setUserAnswers({...userAnswers, partner: option.name})}
              >
                <ThemedText style={styles.optionIcon}>{option.emoji}</ThemedText>
                <View style={styles.optionContent}>
                  <ThemedText style={[
                    styles.optionTitle,
                    userAnswers.partner === option.name && styles.selectedText
                  ]}>
                    {option.name}
                  </ThemedText>
                  <ThemedText style={styles.optionDescription}>{option.description}</ThemedText>
                </View>
                {userAnswers.partner === option.name && (
                  <View style={styles.checkmark}>
                    <ThemedText style={styles.checkmarkIcon}>✓</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.primaryButton,
              !userAnswers.partner && styles.disabledButton
            ]} 
            onPress={() => userAnswers.partner && setCurrentStep('recommendation')}
            disabled={!userAnswers.partner}
          >
            <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderRecommendation = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.stepTitle}>Perfect Match! 🎉</ThemedText>

        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <View style={styles.waveContainer}>
              <View style={[styles.wave, styles.wave1]} />
              <View style={[styles.wave, styles.wave2]} />
              <View style={[styles.wave, styles.wave3]} />
            </View>
            <ThemedText style={styles.speakingText}>Rose is speaking...</ThemedText>
          </View>
        )}

        <View style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <ThemedText style={styles.courseIcon}>🎯</ThemedText>
            <View style={styles.courseInfo}>
              <ThemedText style={styles.courseTitle}>{userAnswers.level} Course</ThemedText>
              <ThemedText style={styles.courseBadge}>Recommended</ThemedText>
            </View>
          </View>

          <View style={styles.courseDetails}>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailIcon}>📋</ThemedText>
              <ThemedText style={styles.detailText}>Skills: {userAnswers.skills.join(', ')}</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailIcon}>🎯</ThemedText>
              <ThemedText style={styles.detailText}>Goals: {userAnswers.purpose.join(', ')}</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailIcon}>👥</ThemedText>
              <ThemedText style={styles.detailText}>Partner: {userAnswers.partner}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.languageSection}>
          <ThemedText style={styles.sectionTitle}>Learning Language</ThemedText>
          <View style={styles.languageOptions}>
            {[
              { name: 'English', flag: '🇺🇸' },
              { name: 'Bengali', flag: '🇧🇩' },
              { name: 'Hindi', flag: '🇮🇳' }
            ].map((lang) => (
              <TouchableOpacity
                key={lang.name}
                style={[
                  styles.languageButton,
                  userAnswers.language === lang.name && styles.selectedLanguage
                ]}
                onPress={() => setUserAnswers({...userAnswers, language: lang.name})}
              >
                <ThemedText style={styles.languageFlag}>{lang.flag}</ThemedText>
                <ThemedText style={[
                  styles.languageText,
                  userAnswers.language === lang.name && styles.selectedText
                ]}>
                  {lang.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.finalButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('Demo', 'Starting your free demo!')}>
            <ThemedText style={styles.primaryButtonText}>Start Free Demo</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => setShowSkipPopup(true)}>
            <ThemedText style={styles.secondaryButtonText}>Skip for Now</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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

  useEffect(() => {
    stopSpeaking();

    switch (currentStep) {
      case 'intro':
        speakText(`Hi ${name}, Welcome to SpeakEdge! I'm Rose, your AI tutor. Let's personalize your learning experience.`);
        break;
      case 'level':
        speakText("What's your English level? Please select from the options.");
        break;
      case 'purpose':
        speakText("Why do you want to learn English? Select all that apply.");
        break;
      case 'skills':
        speakText("Which skills would you like to focus on? Select your preferences.");
        break;
      case 'partner':
        speakText("Would you like a speaking partner for conversation practice?");
        break;
      case 'recommendation':
        speakText(`Perfect! Based on your preferences, we recommend the ${userAnswers.level} English course.`);
        break;
      default:
        break;
    }
  }, [currentStep, name]);

  const renderSkipPopup = () => (
    <Modal
      visible={showSkipPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSkipPopup(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalIcon}>🎁</ThemedText>
            <ThemedText style={styles.modalTitle}>Limited Offer!</ThemedText>
          </View>

          <ThemedText style={styles.modalText}>
            Claim 100% free SpeakEdge lifetime membership. Limited time offer - Save ₹999!
          </ThemedText>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => {
                setShowSkipPopup(false);
                setShowBenefitsModal(true);
              }}
            >
              <ThemedText style={styles.primaryButtonText}>View Benefits</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setShowSkipPopup(false)}
            >
              <ThemedText style={styles.secondaryButtonText}>Skip for Now</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderBenefitsModal = () => (
    <Modal
      visible={showBenefitsModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowBenefitsModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.benefitsModal, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalIcon}>💎</ThemedText>
            <ThemedText style={styles.modalTitle}>Membership Benefits</ThemedText>
          </View>

          <ScrollView style={styles.benefitsList}>
            {[
              { icon: '💬', text: 'Unlimited conversation partners' },
              { icon: '🎯', text: 'Daily learning with fun activities' },
              { icon: '♾️', text: 'Lifetime membership access' },
              { icon: '🏆', text: 'Progress tracking with badges' },
              { icon: '🔔', text: 'Priority updates and features' }
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <ThemedText style={styles.benefitIconText}>{benefit.icon}</ThemedText>
                </View>
                <ThemedText style={styles.benefitText}>{benefit.text}</ThemedText>
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => {
                setShowBenefitsModal(false);
                Alert.alert('Interest', 'Thank you! We will contact you soon.');
              }}
            >
              <ThemedText style={styles.primaryButtonText}>I'm Interested</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setShowBenefitsModal(false)}
            >
              <ThemedText style={styles.secondaryButtonText}>Skip for Now</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      {renderCurrentStep()}
      {renderSkipPopup()}
      {renderBenefitsModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 36,
    color: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonSection: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  aiSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  aiAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EC4899',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  aiAvatarIcon: {
    fontSize: 36,
    color: 'white',
  },
  aiTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#EC4899',
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  speechCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  speechText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#374151',
  },
  speakingIndicator: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  wave: {
    width: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    marginHorizontal: 1,
    opacity: 0.8,
  },
  wave1: {
    height: 16,
  },
  wave2: {
    height: 24,
  },
  wave3: {
    height: 12,
  },
  speakingText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF8FF',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  selectedText: {
    color: '#3B82F6',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  gridCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gridIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  gridCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  courseIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  courseBadge: {
    fontSize: 12,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  courseDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  languageSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedLanguage: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF8FF',
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  finalButtons: {
    gap: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  benefitsModal: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1E293B',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    color: '#374151',
  },
  modalButtons: {
    gap: 12,
  },
  benefitsList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitIconText: {
    fontSize: 16,
  },
  benefitText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    color: '#374151',
  },
});