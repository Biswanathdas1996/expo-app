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
import { Audio } from 'expo-av';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const colorScheme = useColorScheme();

  const steps = [
    { title: 'Welcome', subtitle: 'Let\'s get started' },
    { title: 'Your Name', subtitle: 'What should we call you?' },
    { title: 'Learning Goals', subtitle: 'Why do you want to learn?' },
    { title: 'Complete', subtitle: 'You\'re all set!' }
  ];

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      // Text-to-speech would go here
      setTimeout(() => setIsSpeaking(false), 2000);
    } catch (error) {
      console.log('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  const renderWelcomeStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.heroSection}>
        <View style={styles.modernAvatarContainer}>
          <View style={styles.avatarGlow} />
          <View style={[styles.modernAvatar, { borderColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.modernAvatarEmoji}>🎯</ThemedText>
          </View>
        </View>

        <ThemedText style={[styles.modernWelcomeTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Welcome to
        </ThemedText>

        <View style={styles.brandContainer}>
          <ThemedText style={[styles.brandName, { color: Colors[colorScheme ?? 'light'].tint }]}>
            LearnApp
          </ThemedText>
        </View>

        <ThemedText style={[styles.tagline, { color: Colors[colorScheme ?? 'light'].text }]}>
          Your personalized learning journey starts here
        </ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={() => setCurrentStep(1)}
        >
          <ThemedText style={styles.primaryButtonText}>Get Started</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setShowSkipPopup(true)}
        >
          <ThemedText style={[styles.secondaryButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Skip Setup
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNameStep = () => (
    <View style={styles.stepContainer}>
      <ThemedText style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        What's your name?
      </ThemedText>
      <ThemedText style={[styles.stepSubtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        We'd love to personalize your experience
      </ThemedText>

      <TextInput
        style={[styles.nameInput, { 
          borderColor: Colors[colorScheme ?? 'light'].tint,
          color: Colors[colorScheme ?? 'light'].text,
          backgroundColor: Colors[colorScheme ?? 'light'].background
        }]}
        placeholder="Enter your name"
        placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.primaryButton, { 
            backgroundColor: name ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].tabIconDefault 
          }]}
          onPress={() => name && setCurrentStep(2)}
          disabled={!name}
        >
          <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGoalsStep = () => {
    const goals = [
      { name: 'Career', emoji: '💼', color: '#4CAF50' },
      { name: 'Travel', emoji: '✈️', color: '#2196F3' },
      { name: 'Education', emoji: '📚', color: '#FF9800' },
      { name: 'Personal', emoji: '🌟', color: '#9C27B0' },
      { name: 'Business', emoji: '🏢', color: '#F44336' },
      { name: 'Other', emoji: '💡', color: '#607D8B' }
    ];

    const toggleGoal = (goalName: string) => {
      setSelectedGoals(prev => 
        prev.includes(goalName) 
          ? prev.filter(g => g !== goalName)
          : [...prev, goalName]
      );
    };

    return (
      <View style={styles.stepContainer}>
        <ThemedText style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Why do you want to learn?
        </ThemedText>
        <ThemedText style={[styles.stepSubtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Select all that apply
        </ThemedText>

        {isSpeaking && (
          <View style={styles.modernSpeakingIndicator}>
            <View style={styles.soundWave}>
              <View style={[styles.wave, styles.wave1]} />
              <View style={[styles.wave, styles.wave2]} />
              <View style={[styles.wave, styles.wave3]} />
            </View>
            <ThemedText style={[styles.modernSpeakingText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Speaking...
            </ThemedText>
          </View>
        )}

        <View style={styles.goalsGrid}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.name}
              style={[
                styles.goalCard,
                selectedGoals.includes(goal.name) && { 
                  backgroundColor: Colors[colorScheme ?? 'light'].tint + '20',
                  borderColor: Colors[colorScheme ?? 'light'].tint 
                }
              ]}
              onPress={() => toggleGoal(goal.name)}
            >
              <ThemedText style={styles.goalEmoji}>{goal.emoji}</ThemedText>
              <ThemedText style={[styles.goalText, { color: Colors[colorScheme ?? 'light'].text }]}>
                {goal.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { 
              backgroundColor: selectedGoals.length > 0 ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].tabIconDefault 
            }]}
            onPress={() => selectedGoals.length > 0 && setCurrentStep(3)}
            disabled={selectedGoals.length === 0}
          >
            <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCompleteStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.heroSection}>
        <View style={styles.modernAvatarContainer}>
          <View style={styles.avatarGlow} />
          <View style={[styles.modernAvatar, { borderColor: Colors[colorScheme ?? 'light'].tint }]}>
            <ThemedText style={styles.modernAvatarEmoji}>🎉</ThemedText>
          </View>
        </View>

        <ThemedText style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Welcome, {name}!
        </ThemedText>
        <ThemedText style={[styles.stepSubtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Your learning journey is ready to begin
        </ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={() => setShowBenefitsModal(true)}
        >
          <ThemedText style={styles.primaryButtonText}>Start Learning</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    return (
      <View style={[styles.gradientContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.modernContainer}>
            {currentStep === 0 && renderWelcomeStep()}
            {currentStep === 1 && renderNameStep()}
            {currentStep === 2 && renderGoalsStep()}
            {currentStep === 3 && renderCompleteStep()}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderSkipPopup = () => (
    <Modal
      visible={showSkipPopup}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.popupContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <ThemedText style={[styles.popupTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Skip Setup?
          </ThemedText>
          <ThemedText style={[styles.popupText, { color: Colors[colorScheme ?? 'light'].text }]}>
            You can always complete your profile later in settings.
          </ThemedText>

          <View style={styles.popupButtons}>
            <TouchableOpacity 
              style={[styles.popupButton, styles.cancelButton]}
              onPress={() => setShowSkipPopup(false)}
            >
              <ThemedText style={[styles.popupButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Cancel
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.popupButton, styles.confirmButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
              onPress={() => {
                setShowSkipPopup(false);
                setCurrentStep(3);
              }}
            >
              <ThemedText style={styles.popupButtonText}>Skip</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderBenefitsModal = () => (
    <Modal
      visible={showBenefitsModal}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.benefitsContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <ThemedText style={[styles.benefitsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            🎯 Your Learning Benefits
          </ThemedText>

          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <ThemedText style={styles.benefitEmoji}>📚</ThemedText>
              <ThemedText style={[styles.benefitText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Personalized lessons
              </ThemedText>
            </View>

            <View style={styles.benefitItem}>
              <ThemedText style={styles.benefitEmoji}>🏆</ThemedText>
              <ThemedText style={[styles.benefitText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Track your progress
              </ThemedText>
            </View>

            <View style={styles.benefitItem}>
              <ThemedText style={styles.benefitEmoji}>🌟</ThemedText>
              <ThemedText style={[styles.benefitText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Achieve your goals
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={() => setShowBenefitsModal(false)}
          >
            <ThemedText style={styles.primaryButtonText}>Let's Go!</ThemedText>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  modernContainer: {
    flex: 1,
    padding: Math.min(width * 0.06, 24),
    minHeight: height,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: height * 0.1,
  },
  modernAvatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  modernAvatar: {
    width: Math.min(width * 0.3, 120),
    height: Math.min(width * 0.3, 120),
    borderRadius: Math.min(width * 0.15, 60),
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    zIndex: 2,
  },
  modernAvatarEmoji: {
    fontSize: Math.min(width * 0.12, 50),
  },
  avatarGlow: {
    position: 'absolute',
    width: Math.min(width * 0.35, 140),
    height: Math.min(width * 0.35, 140),
    borderRadius: Math.min(width * 0.175, 70),
    backgroundColor: 'rgba(103, 126, 234, 0.2)',
    zIndex: 1,
  },
  modernWelcomeTitle: {
    fontSize: Math.min(width * 0.06, 24),
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
    fontSize: Math.min(width * 0.1, 42),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagline: {
    fontSize: Math.min(width * 0.04, 16),
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: Math.min(width * 0.07, 28),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  stepSubtitle: {
    fontSize: Math.min(width * 0.04, 16),
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 30,
  },
  nameInput: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: Math.min(width * 0.04, 16),
    marginBottom: 30,
    textAlign: 'center',
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  goalCard: {
    width: width * 0.28,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  goalEmoji: {
    fontSize: Math.min(width * 0.08, 32),
    marginBottom: 8,
  },
  goalText: {
    fontSize: Math.min(width * 0.03, 12),
    fontWeight: '600',
    textAlign: 'center',
  },
  modernSpeakingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  soundWave: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  wave: {
    width: 4,
    backgroundColor: '#667eea',
    marginHorizontal: 1,
    borderRadius: 2,
  },
  wave1: {
    height: 20,
  },
  wave2: {
    height: 30,
  },
  wave3: {
    height: 25,
  },
  modernSpeakingText: {
    fontSize: Math.min(width * 0.035, 14),
    opacity: 0.8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: Math.min(width * 0.04, 16),
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: width * 0.85,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: 'bold',
    marginBottom: 12,
  },
  popupText: {
    fontSize: Math.min(width * 0.04, 16),
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
  },
  popupButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  popupButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    // backgroundColor set dynamically
  },
  popupButtonText: {
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: '600',
  },
  benefitsContainer: {
    width: width * 0.9,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  benefitsTitle: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  benefitsList: {
    width: '100%',
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitEmoji: {
    fontSize: Math.min(width * 0.06, 24),
    marginRight: 12,
  },
  benefitText: {
    fontSize: Math.min(width * 0.04, 16),
    flex: 1,
  },
});