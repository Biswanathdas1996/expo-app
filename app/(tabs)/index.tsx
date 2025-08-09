
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
import * as Speech from 'expo-speech';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [name, setName] = useState('');
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const renderWelcomeStep = () => (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.modernContainer}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.modernAvatarContainer}>
              <View style={styles.avatarGlow} />
              <View style={[styles.modernAvatar, { borderColor: themeColors.tint }]}>
                <ThemedText style={styles.modernAvatarEmoji}>👋</ThemedText>
              </View>
            </View>
            
            <ThemedText style={[styles.modernWelcomeTitle, { color: themeColors.text }]}>
              Welcome to
            </ThemedText>
            
            <View style={styles.brandContainer}>
              <ThemedText style={[styles.brandName, { color: themeColors.tint }]}>
                MindFlow
              </ThemedText>
            </View>
            
            <ThemedText style={[styles.subtitle, { color: themeColors.text }]}>
              Your personal mindfulness companion for a calmer, more focused you
            </ThemedText>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureRow}>
              <View style={[styles.featureCard, { backgroundColor: themeColors.background }]}>
                <View style={[styles.featureIcon, { backgroundColor: `${themeColors.tint}20` }]}>
                  <ThemedText style={styles.featureEmoji}>🧘‍♀️</ThemedText>
                </View>
                <ThemedText style={[styles.featureTitle, { color: themeColors.text }]}>Meditate</ThemedText>
                <ThemedText style={[styles.featureDesc, { color: themeColors.icon }]}>
                  Guided sessions
                </ThemedText>
              </View>
              
              <View style={[styles.featureCard, { backgroundColor: themeColors.background }]}>
                <View style={[styles.featureIcon, { backgroundColor: `${themeColors.tint}20` }]}>
                  <ThemedText style={styles.featureEmoji}>📊</ThemedText>
                </View>
                <ThemedText style={[styles.featureTitle, { color: themeColors.text }]}>Track</ThemedText>
                <ThemedText style={[styles.featureDesc, { color: themeColors.icon }]}>
                  Your progress
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.featureRow}>
              <View style={[styles.featureCard, { backgroundColor: themeColors.background }]}>
                <View style={[styles.featureIcon, { backgroundColor: `${themeColors.tint}20` }]}>
                  <ThemedText style={styles.featureEmoji}>🌱</ThemedText>
                </View>
                <ThemedText style={[styles.featureTitle, { color: themeColors.text }]}>Grow</ThemedText>
                <ThemedText style={[styles.featureDesc, { color: themeColors.icon }]}>
                  Build habits
                </ThemedText>
              </View>
              
              <View style={[styles.featureCard, { backgroundColor: themeColors.background }]}>
                <View style={[styles.featureIcon, { backgroundColor: `${themeColors.tint}20` }]}>
                  <ThemedText style={styles.featureEmoji}>🎯</ThemedText>
                </View>
                <ThemedText style={[styles.featureTitle, { color: themeColors.text }]}>Focus</ThemedText>
                <ThemedText style={[styles.featureDesc, { color: themeColors.icon }]}>
                  Stay present
                </ThemedText>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: themeColors.tint }]}
              onPress={() => setCurrentStep('name')}
            >
              <ThemedText style={styles.primaryButtonText}>Get Started</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => setShowBenefitsModal(true)}
            >
              <ThemedText style={[styles.secondaryButtonText, { color: themeColors.tint }]}>
                Learn More
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );

  const renderNameStep = () => (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.modernContainer}>
          <View style={styles.stepHeader}>
            <View style={[styles.progressBar, { backgroundColor: `${themeColors.tint}20` }]}>
              <View style={[styles.progressFill, { backgroundColor: themeColors.tint, width: '33%' }]} />
            </View>
            
            <ThemedText style={[styles.stepTitle, { color: themeColors.text }]}>
              What's your name?
            </ThemedText>
            <ThemedText style={[styles.stepSubtitle, { color: themeColors.icon }]}>
              We'd love to personalize your experience
            </ThemedText>
          </View>

          <View style={styles.inputSection}>
            <TextInput
              style={[
                styles.modernInput,
                {
                  backgroundColor: themeColors.background,
                  borderColor: name ? themeColors.tint : themeColors.icon,
                  color: themeColors.text,
                }
              ]}
              placeholder="Enter your name"
              placeholderTextColor={themeColors.icon}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: name ? themeColors.tint : themeColors.icon,
                  opacity: name ? 1 : 0.6,
                }
              ]}
              onPress={() => name && setCurrentStep('purpose')}
              disabled={!name}
            >
              <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowSkipPopup(true)}>
              <ThemedText style={[styles.skipText, { color: themeColors.icon }]}>
                Skip for now
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );

  const renderPurposeSelection = () => (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.modernContainer}>
          <View style={styles.stepHeader}>
            <View style={[styles.progressBar, { backgroundColor: `${themeColors.tint}20` }]}>
              <View style={[styles.progressFill, { backgroundColor: themeColors.tint, width: '66%' }]} />
            </View>
            
            <ThemedText style={[styles.stepTitle, { color: themeColors.text }]}>
              What brings you here?
            </ThemedText>
            <ThemedText style={[styles.stepSubtitle, { color: themeColors.icon }]}>
              Choose what resonates with you most
            </ThemedText>
          </View>

          <View style={styles.purposeGrid}>
            {[
              { emoji: '🧘‍♀️', title: 'Reduce Stress', desc: 'Find calm in daily chaos' },
              { emoji: '😴', title: 'Better Sleep', desc: 'Improve sleep quality' },
              { emoji: '🎯', title: 'Focus Better', desc: 'Enhance concentration' },
              { emoji: '❤️', title: 'Self-Care', desc: 'Prioritize wellbeing' },
            ].map((purpose, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.purposeCard, { backgroundColor: themeColors.background }]}
                onPress={() => setCurrentStep('complete')}
              >
                <View style={[styles.purposeIcon, { backgroundColor: `${themeColors.tint}15` }]}>
                  <ThemedText style={styles.purposeEmoji}>{purpose.emoji}</ThemedText>
                </View>
                <ThemedText style={[styles.purposeTitle, { color: themeColors.text }]}>
                  {purpose.title}
                </ThemedText>
                <ThemedText style={[styles.purposeDesc, { color: themeColors.icon }]}>
                  {purpose.desc}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );

  const renderCompleteStep = () => (
    <ThemedView style={styles.container}>
      <View style={styles.modernContainer}>
        <View style={styles.completeSection}>
          <View style={styles.celebrationIcon}>
            <ThemedText style={styles.celebrationEmoji}>🎉</ThemedText>
          </View>
          
          <ThemedText style={[styles.completeTitle, { color: themeColors.text }]}>
            Welcome aboard{name ? `, ${name}` : ''}!
          </ThemedText>
          
          <ThemedText style={[styles.completeSubtitle, { color: themeColors.icon }]}>
            Your mindfulness journey begins now. Ready to find your inner peace?
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: themeColors.tint }]}
            onPress={() => Alert.alert('Welcome!', 'Your journey to mindfulness begins now!')}
          >
            <ThemedText style={styles.primaryButtonText}>Start My Journey</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome': return renderWelcomeStep();
      case 'name': return renderNameStep();
      case 'purpose': return renderPurposeSelection();
      case 'complete': return renderCompleteStep();
      default: return renderWelcomeStep();
    }
  };

  const renderSkipPopup = () => (
    <Modal
      visible={showSkipPopup}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
          <ThemedText style={[styles.modalTitle, { color: themeColors.text }]}>
            Skip personalization?
          </ThemedText>
          <ThemedText style={[styles.modalMessage, { color: themeColors.icon }]}>
            We can provide a better experience if you complete the setup
          </ThemedText>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowSkipPopup(false)}
            >
              <ThemedText style={[styles.modalButtonText, { color: themeColors.tint }]}>
                Continue Setup
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: themeColors.icon }]}
              onPress={() => {
                setShowSkipPopup(false);
                setCurrentStep('complete');
              }}
            >
              <ThemedText style={styles.modalButtonText}>Skip</ThemedText>
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
        <View style={[styles.benefitsModal, { backgroundColor: themeColors.background }]}>
          <ThemedText style={[styles.benefitsTitle, { color: themeColors.text }]}>
            Why MindFlow?
          </ThemedText>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {[
              { icon: '🧠', title: 'Improved Focus', desc: 'Enhance concentration and mental clarity' },
              { icon: '😌', title: 'Reduced Stress', desc: 'Lower cortisol and anxiety levels' },
              { icon: '💤', title: 'Better Sleep', desc: 'Fall asleep faster and sleep deeper' },
              { icon: '❤️', title: 'Emotional Balance', desc: 'Better emotional regulation and resilience' },
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <ThemedText style={styles.benefitIcon}>{benefit.icon}</ThemedText>
                <View style={styles.benefitText}>
                  <ThemedText style={[styles.benefitTitle, { color: themeColors.text }]}>
                    {benefit.title}
                  </ThemedText>
                  <ThemedText style={[styles.benefitDesc, { color: themeColors.icon }]}>
                    {benefit.desc}
                  </ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: themeColors.tint }]}
            onPress={() => {
              setShowBenefitsModal(false);
              setCurrentStep('name');
            }}
          >
            <ThemedText style={styles.primaryButtonText}>Get Started</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowBenefitsModal(false)}
          >
            <ThemedText style={[styles.closeButtonText, { color: themeColors.icon }]}>
              Close
            </ThemedText>
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: height,
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
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresGrid: {
    marginBottom: 40,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    flex: 0.48,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  ctaSection: {
    alignItems: 'center',
  },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 30,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  inputSection: {
    marginBottom: 40,
  },
  modernInput: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonSection: {
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  purposeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  purposeCard: {
    width: '48%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  purposeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  purposeEmoji: {
    fontSize: 28,
  },
  purposeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  purposeDesc: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  completeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  celebrationIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  celebrationEmoji: {
    fontSize: 60,
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  completeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsModal: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  benefitsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 14,
    opacity: 0.8,
  },
  closeButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    fontSize: 14,
  },
});
