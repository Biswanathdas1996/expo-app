
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Modal,
  LinearGradient,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
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
    if (isSpeaking) {
      stopSpeaking();
    }
    
    try {
      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1.1,
        rate: 0.9,
        voice: 'com.apple.ttsbundle.Samantha-compact',
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

            <ThemedText style={styles.modernWelcomeTitle}>Welcome to</ThemedText>
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
                style={[styles.modernInput, { color: Colors[colorScheme ?? 'light'].text }]}
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
                style={[styles.modernInput, { color: Colors[colorScheme ?? 'light'].text }]}
                placeholder="Enter mobile number"
                placeholderTextColor="#A0A0A0"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.modernButtonContainer}>
            <TouchableOpacity style={styles.modernPrimaryButton} onPress={handleSignUp}>
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Get Started</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modernSecondaryButton} onPress={handleSignIn}>
              <ThemedText style={styles.modernSecondaryButtonText}>Already have an account?</ThemedText>
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

  const renderAIIntroduction = () => (
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
            <ThemedText style={styles.aiSubtitle}>Your AI English Tutor</ThemedText>
            
            <View style={styles.speechBubble}>
              <ThemedText style={styles.speechText}>
                Hi {name}! I'm Rose, your personal AI tutor. I'll help you master English with personalized lessons and practice sessions. Ready to begin your journey?
              </ThemedText>
            </View>

            {isSpeaking && (
              <View style={styles.modernSpeakingIndicator}>
                <View style={styles.soundWave}>
                  <View style={[styles.wave, styles.wave1]} />
                  <View style={[styles.wave, styles.wave2]} />
                  <View style={[styles.wave, styles.wave3]} />
                </View>
                <ThemedText style={styles.modernSpeakingText}>Rose is speaking...</ThemedText>
              </View>
            )}

            <TouchableOpacity style={styles.modernPrimaryButton} onPress={() => setCurrentStep('level')}>
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Let's Begin! 🚀</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderLevelSelection = () => {
    const levels = [
      { name: 'Beginner', emoji: '🌱', color: '#4CAF50' },
      { name: 'Elementary', emoji: '🌿', color: '#8BC34A' },
      { name: 'Intermediate', emoji: '🌳', color: '#FF9800' },
      { name: 'Upper Intermediate', emoji: '🏔️', color: '#FF5722' },
      { name: 'Advanced', emoji: '🚀', color: '#9C27B0' },
      { name: 'Proficient', emoji: '👑', color: '#673AB7' }
    ];

    return (
      <View style={styles.gradientContainer}>
        <View style={styles.gradientBackground} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modernContainer}>
            <ThemedText style={styles.modernStepTitle}>What's your English level?</ThemedText>

            {isSpeaking && (
              <View style={styles.modernSpeakingIndicator}>
                <View style={styles.soundWave}>
                  <View style={[styles.wave, styles.wave1]} />
                  <View style={[styles.wave, styles.wave2]} />
                  <View style={[styles.wave, styles.wave3]} />
                </View>
                <ThemedText style={styles.modernSpeakingText}>Rose is speaking...</ThemedText>
              </View>
            )}

            <View style={styles.optionsGrid}>
              {levels.map((level) => (
                <TouchableOpacity
                  key={level.name}
                  style={[
                    styles.modernOptionCard,
                    userAnswers.level === level.name && styles.modernSelectedOption
                  ]}
                  onPress={() => setUserAnswers({...userAnswers, level: level.name})}
                >
                  <View style={[styles.optionEmoji, { backgroundColor: level.color + '20' }]}>
                    <ThemedText style={styles.optionEmojiText}>{level.emoji}</ThemedText>
                  </View>
                  <ThemedText style={[
                    styles.modernOptionText,
                    userAnswers.level === level.name && styles.modernSelectedOptionText
                  ]}>
                    {level.name}
                  </ThemedText>
                  {userAnswers.level === level.name && (
                    <View style={styles.selectedCheckmark}>
                      <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.modernPrimaryButton,
                !userAnswers.level && styles.modernDisabledButton
              ]} 
              onPress={() => userAnswers.level && setCurrentStep('purpose')}
              disabled={!userAnswers.level}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Continue</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderPurposeSelection = () => {
    const purposes = [
      { name: 'Job/Business', emoji: '💼', color: '#2196F3' },
      { name: 'Abroad', emoji: '✈️', color: '#FF5722' },
      { name: 'Improve skills', emoji: '📈', color: '#4CAF50' },
      { name: 'Academic', emoji: '🎓', color: '#9C27B0' },
      { name: 'Practise', emoji: '🗣️', color: '#FF9800' },
      { name: 'Pronunciation', emoji: '🎤', color: '#E91E63' },
      { name: 'CEFR Test', emoji: '📊', color: '#795548' },
      { name: 'Other', emoji: '💡', color: '#607D8B' }
    ];

    return (
      <View style={styles.gradientContainer}>
        <View style={styles.gradientBackground} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modernContainer}>
            <ThemedText style={styles.modernStepTitle}>Why do you want to learn English?</ThemedText>
            <ThemedText style={styles.stepSubtitle}>Select all that apply</ThemedText>

            {isSpeaking && (
              <View style={styles.modernSpeakingIndicator}>
                <View style={styles.soundWave}>
                  <View style={[styles.wave, styles.wave1]} />
                  <View style={[styles.wave, styles.wave2]} />
                  <View style={[styles.wave, styles.wave3]} />
                </View>
                <ThemedText style={styles.modernSpeakingText}>Rose is speaking...</ThemedText>
              </View>
            )}

            <View style={styles.optionsGrid}>
              {purposes.map((purpose) => (
                <TouchableOpacity
                  key={purpose.name}
                  style={[
                    styles.modernOptionCard,
                    userAnswers.purpose.includes(purpose.name) && styles.modernSelectedOption
                  ]}
                  onPress={() => {
                    const updatedPurposes = userAnswers.purpose.includes(purpose.name)
                      ? userAnswers.purpose.filter(p => p !== purpose.name)
                      : [...userAnswers.purpose, purpose.name];
                    setUserAnswers({...userAnswers, purpose: updatedPurposes});
                  }}
                >
                  <View style={[styles.optionEmoji, { backgroundColor: purpose.color + '20' }]}>
                    <ThemedText style={styles.optionEmojiText}>{purpose.emoji}</ThemedText>
                  </View>
                  <ThemedText style={[
                    styles.modernOptionText,
                    userAnswers.purpose.includes(purpose.name) && styles.modernSelectedOptionText
                  ]}>
                    {purpose.name}
                  </ThemedText>
                  {userAnswers.purpose.includes(purpose.name) && (
                    <View style={styles.selectedCheckmark}>
                      <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.modernPrimaryButton,
                userAnswers.purpose.length === 0 && styles.modernDisabledButton
              ]} 
              onPress={() => userAnswers.purpose.length > 0 && setCurrentStep('skills')}
              disabled={userAnswers.purpose.length === 0}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Continue</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderSkillsSelection = () => {
    const skills = [
      { name: 'Speaking', emoji: '🗣️', color: '#FF5722' },
      { name: 'Writing', emoji: '✍️', color: '#2196F3' },
      { name: 'Reading', emoji: '📖', color: '#4CAF50' },
      { name: 'Listening', emoji: '👂', color: '#FF9800' },
      { name: 'Pronunciation', emoji: '🎤', color: '#E91E63' },
      { name: 'All', emoji: '🎯', color: '#9C27B0' },
      { name: 'Other', emoji: '💡', color: '#607D8B' }
    ];

    return (
      <View style={styles.gradientContainer}>
        <View style={styles.gradientBackground} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modernContainer}>
            <ThemedText style={styles.modernStepTitle}>Which skills do you want to focus on?</ThemedText>
            <ThemedText style={styles.stepSubtitle}>Select all that apply</ThemedText>

            {isSpeaking && (
              <View style={styles.modernSpeakingIndicator}>
                <View style={styles.soundWave}>
                  <View style={[styles.wave, styles.wave1]} />
                  <View style={[styles.wave, styles.wave2]} />
                  <View style={[styles.wave, styles.wave3]} />
                </View>
                <ThemedText style={styles.modernSpeakingText}>Rose is speaking...</ThemedText>
              </View>
            )}

            <View style={styles.optionsGrid}>
              {skills.map((skill) => (
                <TouchableOpacity
                  key={skill.name}
                  style={[
                    styles.modernOptionCard,
                    userAnswers.skills.includes(skill.name) && styles.modernSelectedOption
                  ]}
                  onPress={() => {
                    const updatedSkills = userAnswers.skills.includes(skill.name)
                      ? userAnswers.skills.filter(s => s !== skill.name)
                      : [...userAnswers.skills, skill.name];
                    setUserAnswers({...userAnswers, skills: updatedSkills});
                  }}
                >
                  <View style={[styles.optionEmoji, { backgroundColor: skill.color + '20' }]}>
                    <ThemedText style={styles.optionEmojiText}>{skill.emoji}</ThemedText>
                  </View>
                  <ThemedText style={[
                    styles.modernOptionText,
                    userAnswers.skills.includes(skill.name) && styles.modernSelectedOptionText
                  ]}>
                    {skill.name}
                  </ThemedText>
                  {userAnswers.skills.includes(skill.name) && (
                    <View style={styles.selectedCheckmark}>
                      <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.modernPrimaryButton,
                userAnswers.skills.length === 0 && styles.modernDisabledButton
              ]} 
              onPress={() => userAnswers.skills.length > 0 && setCurrentStep('partner')}
              disabled={userAnswers.skills.length === 0}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Continue</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderPartnerSelection = () => {
    const options = [
      { name: 'Yes', emoji: '👥', color: '#4CAF50' },
      { name: 'No', emoji: '🚫', color: '#F44336' },
      { name: 'Other', emoji: '🤔', color: '#FF9800' }
    ];

    return (
      <View style={styles.gradientContainer}>
        <View style={styles.gradientBackground} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modernContainer}>
            <ThemedText style={styles.modernStepTitle}>Speaking Partner</ThemedText>
            <ThemedText style={styles.stepSubtitle}>Are you interested in having a speaking partner?</ThemedText>

            {isSpeaking && (
              <View style={styles.modernSpeakingIndicator}>
                <View style={styles.soundWave}>
                  <View style={[styles.wave, styles.wave1]} />
                  <View style={[styles.wave, styles.wave2]} />
                  <View style={[styles.wave, styles.wave3]} />
                </View>
                <ThemedText style={styles.modernSpeakingText}>Rose is speaking...</ThemedText>
              </View>
            )}

            <View style={styles.optionsGrid}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.name}
                  style={[
                    styles.modernOptionCard,
                    styles.largeOptionCard,
                    userAnswers.partner === option.name && styles.modernSelectedOption
                  ]}
                  onPress={() => setUserAnswers({...userAnswers, partner: option.name})}
                >
                  <View style={[styles.optionEmoji, styles.largeOptionEmoji, { backgroundColor: option.color + '20' }]}>
                    <ThemedText style={[styles.optionEmojiText, styles.largeEmojiText]}>{option.emoji}</ThemedText>
                  </View>
                  <ThemedText style={[
                    styles.modernOptionText,
                    styles.largeOptionText,
                    userAnswers.partner === option.name && styles.modernSelectedOptionText
                  ]}>
                    {option.name}
                  </ThemedText>
                  {userAnswers.partner === option.name && (
                    <View style={styles.selectedCheckmark}>
                      <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.modernPrimaryButton,
                !userAnswers.partner && styles.modernDisabledButton
              ]} 
              onPress={() => userAnswers.partner && setCurrentStep('recommendation')}
              disabled={!userAnswers.partner}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Continue</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderRecommendation = () => (
    <View style={styles.gradientContainer}>
      <View style={styles.gradientBackground} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.modernContainer}>
          <ThemedText style={styles.modernStepTitle}>Perfect Match Found! 🎉</ThemedText>

          {isSpeaking && (
            <View style={styles.modernSpeakingIndicator}>
              <View style={styles.soundWave}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
              <ThemedText style={styles.modernSpeakingText}>Rose is speaking...</ThemedText>
            </View>
          )}

          <View style={styles.modernCourseCard}>
            <View style={styles.courseHeader}>
              <ThemedText style={styles.courseEmoji}>🎯</ThemedText>
              <View>
                <ThemedText style={styles.modernCourseTitle}>
                  {userAnswers.level} English Course
                </ThemedText>
                <ThemedText style={styles.courseBadge}>Recommended for you</ThemedText>
              </View>
            </View>
            
            <View style={styles.courseDetails}>
              <View style={styles.courseDetailItem}>
                <ThemedText style={styles.detailIcon}>📋</ThemedText>
                <ThemedText style={styles.detailText}>Focus: {userAnswers.skills.join(', ')}</ThemedText>
              </View>
              <View style={styles.courseDetailItem}>
                <ThemedText style={styles.detailIcon}>🎯</ThemedText>
                <ThemedText style={styles.detailText}>Goal: {userAnswers.purpose.join(', ')}</ThemedText>
              </View>
              <View style={styles.courseDetailItem}>
                <ThemedText style={styles.detailIcon}>👥</ThemedText>
                <ThemedText style={styles.detailText}>Speaking Partner: {userAnswers.partner}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.languageSection}>
            <ThemedText style={styles.languageTitle}>Choose your learning language:</ThemedText>
            <View style={styles.modernLanguageContainer}>
              {[
                { name: 'English', flag: '🇺🇸' },
                { name: 'Bengali', flag: '🇧🇩' },
                { name: 'Hindi', flag: '🇮🇳' }
              ].map((lang) => (
                <TouchableOpacity
                  key={lang.name}
                  style={[
                    styles.modernLanguageButton,
                    userAnswers.language === lang.name && styles.selectedLanguageButton
                  ]}
                  onPress={() => setUserAnswers({...userAnswers, language: lang.name})}
                >
                  <ThemedText style={styles.languageFlag}>{lang.flag}</ThemedText>
                  <ThemedText style={[
                    styles.modernLanguageText,
                    userAnswers.language === lang.name && styles.selectedLanguageText
                  ]}>
                    {lang.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.finalActions}>
            <TouchableOpacity style={styles.modernPrimaryButton} onPress={() => Alert.alert('Demo', 'Free demo starting!')}>
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>Start Free Demo 🚀</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modernSecondaryButton} onPress={() => setShowSkipPopup(true)}>
              <ThemedText style={styles.modernSecondaryButtonText}>Skip for Now</ThemedText>
            </TouchableOpacity>
          </View>
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
  }, [currentStep, name]);

  const renderSkipPopup = () => (
    <Modal
      visible={showSkipPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSkipPopup(false)}
    >
      <View style={styles.modernModalOverlay}>
        <View style={[styles.modernModalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalEmoji}>🎁</ThemedText>
            <ThemedText style={styles.modalTitle}>Limited Time Offer!</ThemedText>
          </View>
          
          <ThemedText style={styles.modernPopupText}>
            Claim 100% free SpeakEdge lifetime membership – Limited time offer – Grab it now. Save ₹999 with 100% free.
          </ThemedText>
          
          <View style={styles.modernPopupButtonContainer}>
            <TouchableOpacity 
              style={styles.modernPrimaryButton} 
              onPress={() => {
                setShowSkipPopup(false);
                setShowBenefitsModal(true);
              }}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>View Benefits</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modernSecondaryButton} 
              onPress={() => setShowSkipPopup(false)}
            >
              <ThemedText style={styles.modernSecondaryButtonText}>Skip for Now</ThemedText>
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
      <View style={styles.modernModalOverlay}>
        <View style={[styles.modernBenefitsModalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalEmoji}>💎</ThemedText>
            <ThemedText style={styles.modalTitle}>Membership Benefits</ThemedText>
          </View>
          
          <ScrollView style={styles.benefitsScrollView}>
            {[
              { icon: '💬', text: 'Unlimited English conversation partners on SpeakEdge Platform' },
              { icon: '🎯', text: 'Daily English learning with fun' },
              { icon: '♾️', text: 'Lifetime membership access' },
              { icon: '🏆', text: 'Track progress with badges' },
              { icon: '🔔', text: 'Be the first to get SpeakEdge updates' }
            ].map((benefit, index) => (
              <View key={index} style={styles.modernBenefitItem}>
                <View style={styles.benefitIcon}>
                  <ThemedText style={styles.benefitIconText}>{benefit.icon}</ThemedText>
                </View>
                <ThemedText style={styles.modernBenefitText}>{benefit.text}</ThemedText>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.modernBenefitsButtonContainer}>
            <TouchableOpacity 
              style={styles.modernPrimaryButton} 
              onPress={() => {
                setShowBenefitsModal(false);
                Alert.alert('Interest', 'Thank you for your interest! We will contact you soon.');
              }}
            >
              <View style={styles.buttonGradient} />
              <ThemedText style={styles.modernButtonText}>I'm Interested! ✨</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modernSecondaryButton} 
              onPress={() => setShowBenefitsModal(false)}
            >
              <ThemedText style={styles.modernSecondaryButtonText}>Skip for Now</ThemedText>
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
  gradientContainer: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modernContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  modernAvatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  modernAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#667eea',
    zIndex: 2,
  },
  modernAvatarEmoji: {
    fontSize: 50,
  },
  avatarGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(103, 126, 234, 0.2)',
    zIndex: 1,
  },
  modernWelcomeTitle: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 5,
    opacity: 0.8,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#667eea',
  },
  brandAccent: {
    width: 60,
    height: 4,
    backgroundColor: '#764ba2',
    borderRadius: 2,
    marginTop: 5,
  },
  modernSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  modernInputContainer: {
    marginBottom: 32,
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
    shadowColor: '#000',
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
  modernPrimaryButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  modernButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    zIndex: 1,
  },
  modernSecondaryButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  modernSecondaryButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '500',
  },
  modernDisabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  featureCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    minWidth: 80,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  aiIntroSection: {
    alignItems: 'center',
  },
  aiAvatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  aiAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E91E63',
    zIndex: 2,
  },
  aiAvatarEmoji: {
    fontSize: 40,
  },
  aiAvatarGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(233, 30, 99, 0.2)',
    zIndex: 1,
  },
  aiIntroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#E91E63',
  },
  aiSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  speechBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  speechText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  modernStepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#667eea',
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.7,
  },
  optionsGrid: {
    gap: 12,
    marginBottom: 32,
  },
  modernOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  largeOptionCard: {
    justifyContent: 'center',
    paddingVertical: 24,
  },
  modernSelectedOption: {
    borderColor: '#667eea',
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
  },
  optionEmoji: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  largeOptionEmoji: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 0,
    marginBottom: 12,
  },
  optionEmojiText: {
    fontSize: 24,
  },
  largeEmojiText: {
    fontSize: 30,
  },
  modernOptionText: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  largeOptionText: {
    textAlign: 'center',
    flex: 0,
    fontSize: 20,
  },
  modernSelectedOptionText: {
    color: '#667eea',
    fontWeight: '600',
  },
  selectedCheckmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modernSpeakingIndicator: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  soundWave: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  wave: {
    width: 4,
    backgroundColor: '#667eea',
    borderRadius: 2,
    marginHorizontal: 2,
  },
  wave1: {
    height: 20,
  },
  wave2: {
    height: 35,
  },
  wave3: {
    height: 15,
  },
  modernSpeakingText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  modernCourseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  courseEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  modernCourseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  courseBadge: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  courseDetails: {
    gap: 12,
  },
  courseDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#667eea',
  },
  modernLanguageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modernLanguageButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLanguageButton: {
    borderColor: '#667eea',
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  modernLanguageText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedLanguageText: {
    color: '#667eea',
    fontWeight: '600',
  },
  finalActions: {
    gap: 16,
  },
  modernModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modernModalContent: {
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modernBenefitsModalContent: {
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
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
  modalEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#667eea',
  },
  modernPopupText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 26,
  },
  modernPopupButtonContainer: {
    gap: 16,
  },
  modernBenefitsButtonContainer: {
    gap: 16,
    marginTop: 20,
  },
  benefitsScrollView: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modernBenefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
    borderRadius: 12,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitIconText: {
    fontSize: 20,
  },
  modernBenefitText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
});
