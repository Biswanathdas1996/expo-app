
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
  const [currentStep, setCurrentStep] = useState(1);
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? 'light'];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderWelcomeStep();
      case 2:
        return renderInterestsStep();
      case 3:
        return renderGoalsStep();
      default:
        return renderWelcomeStep();
    }
  };

  const renderWelcomeStep = () => (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e'] : ['#f8f9ff', '#e8f0ff']}
        style={styles.gradientBackground}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarGlow} />
            <View style={[styles.avatar, { backgroundColor: currentColors.tint + '20' }]}>
              <ThemedText style={styles.avatarEmoji}>👋</ThemedText>
            </View>
          </View>
          
          <ThemedText style={styles.welcomeTitle}>Welcome to</ThemedText>
          <View style={styles.brandContainer}>
            <ThemedText style={[styles.brandName, { color: currentColors.tint }]}>
              SpeakEasy
            </ThemedText>
            <View style={[styles.brandUnderline, { backgroundColor: currentColors.tint }]} />
          </View>
          <ThemedText style={styles.subtitle}>
            Your AI-powered English speaking companion
          </ThemedText>
        </View>

        <View style={styles.featureGrid}>
          <View style={[styles.featureCard, { backgroundColor: currentColors.background, borderColor: currentColors.tint + '30' }]}>
            <ThemedText style={styles.featureEmoji}>🎯</ThemedText>
            <ThemedText style={styles.featureTitle}>Personalized Learning</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Tailored lessons based on your level and goals
            </ThemedText>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: currentColors.background, borderColor: currentColors.tint + '30' }]}>
            <ThemedText style={styles.featureEmoji}>🗣️</ThemedText>
            <ThemedText style={styles.featureTitle}>Real Conversations</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Practice with AI that understands context
            </ThemedText>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: currentColors.background, borderColor: currentColors.tint + '30' }]}>
            <ThemedText style={styles.featureEmoji}>📈</ThemedText>
            <ThemedText style={styles.featureTitle}>Track Progress</ThemedText>
            <ThemedText style={styles.featureDescription}>
              See your improvement over time
            </ThemedText>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: currentColors.background, borderColor: currentColors.tint + '30' }]}>
            <ThemedText style={styles.featureEmoji}>🌍</ThemedText>
            <ThemedText style={styles.featureTitle}>Global Community</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Connect with learners worldwide
            </ThemedText>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: currentColors.tint }]}
            onPress={() => setCurrentStep(2)}
          >
            <ThemedText style={styles.primaryButtonText}>Get Started</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setShowBenefitsModal(true)}
          >
            <ThemedText style={[styles.secondaryButtonText, { color: currentColors.tint }]}>
              Learn More
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );

  const renderInterestsStep = () => (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e'] : ['#f8f9ff', '#e8f0ff']}
        style={styles.gradientBackground}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.stepHeader}>
          <ThemedText style={styles.stepTitle}>What interests you?</ThemedText>
          <ThemedText style={styles.stepSubtitle}>
            Select topics you'd like to practice speaking about
          </ThemedText>
        </View>

        <View style={styles.interestGrid}>
          {['Business', 'Travel', 'Technology', 'Culture', 'Sports', 'Food'].map((interest) => (
            <TouchableOpacity 
              key={interest}
              style={[styles.interestCard, { borderColor: currentColors.tint + '50' }]}
            >
              <ThemedText style={styles.interestText}>{interest}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.backButton, { borderColor: currentColors.tint }]}
            onPress={() => setCurrentStep(1)}
          >
            <ThemedText style={[styles.backButtonText, { color: currentColors.tint }]}>
              Back
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: currentColors.tint }]}
            onPress={() => setCurrentStep(3)}
          >
            <ThemedText style={styles.primaryButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );

  const renderGoalsStep = () => (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e'] : ['#f8f9ff', '#e8f0ff']}
        style={styles.gradientBackground}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.stepHeader}>
          <ThemedText style={styles.stepTitle}>Your Goals</ThemedText>
          <ThemedText style={styles.stepSubtitle}>
            What would you like to achieve?
          </ThemedText>
        </View>

        <View style={styles.goalsList}>
          {[
            'Improve pronunciation',
            'Build confidence in speaking',
            'Expand vocabulary',
            'Practice conversations',
            'Prepare for exams'
          ].map((goal) => (
            <TouchableOpacity 
              key={goal}
              style={[styles.goalCard, { backgroundColor: currentColors.background, borderColor: currentColors.tint + '30' }]}
            >
              <View style={styles.goalContent}>
                <ThemedText style={styles.goalText}>{goal}</ThemedText>
                <View style={[styles.checkbox, { borderColor: currentColors.tint }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.backButton, { borderColor: currentColors.tint }]}
            onPress={() => setCurrentStep(2)}
          >
            <ThemedText style={[styles.backButtonText, { color: currentColors.tint }]}>
              Back
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: currentColors.tint }]}
            onPress={() => Alert.alert('Welcome!', 'Setup complete!')}
          >
            <ThemedText style={styles.primaryButtonText}>Start Learning</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );

  const renderBenefitsModal = () => (
    <Modal
      visible={showBenefitsModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ThemedView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <ThemedText style={styles.modalTitle}>Why SpeakEasy?</ThemedText>
          <TouchableOpacity onPress={() => setShowBenefitsModal(false)}>
            <ThemedText style={[styles.closeButton, { color: currentColors.tint }]}>✕</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          {[
            { icon: '🚀', title: 'Fast Progress', desc: 'See results in just 30 days' },
            { icon: '🎯', title: 'Personalized', desc: 'AI adapts to your learning style' },
            { icon: '🌟', title: 'Fun & Engaging', desc: 'Interactive lessons that keep you motivated' },
            { icon: '📱', title: 'Learn Anywhere', desc: 'Practice on-the-go with mobile app' }
          ].map((benefit, index) => (
            <View key={index} style={[styles.benefitCard, { backgroundColor: currentColors.background }]}>
              <ThemedText style={styles.benefitIcon}>{benefit.icon}</ThemedText>
              <View style={styles.benefitTextContainer}>
                <ThemedText style={styles.benefitTitle}>{benefit.title}</ThemedText>
                <ThemedText style={styles.benefitDesc}>{benefit.desc}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </Modal>
  );

  return (
    <>
      {renderCurrentStep()}
      {renderBenefitsModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(103, 126, 234, 0.3)',
    zIndex: 2,
  },
  avatarEmoji: {
    fontSize: 50,
  },
  avatarGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(103, 126, 234, 0.1)',
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.8,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brandUnderline: {
    width: 80,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 16,
  },
  actionContainer: {
    gap: 16,
    marginTop: 20,
  },
  primaryButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  stepHeader: {
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  interestCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    alignItems: 'center',
  },
  interestText: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalsList: {
    marginBottom: 40,
  },
  goalCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
  },
  modalContent: {
    flex: 1,
  },
  benefitCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
});
