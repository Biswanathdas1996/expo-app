
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    country: '',
    mobile: '',
    whatsapp: '',
    englishSkill: '',
    qualification: '',
    speakingPartner: '',
    about: '',
  });
  const colorScheme = useColorScheme();

  const englishLevels = [
    { level: 'A1', description: 'Beginner - Can understand basic phrases' },
    { level: 'A2', description: 'Elementary - Can handle simple tasks' },
    { level: 'B1', description: 'Intermediate - Can handle most situations' },
    { level: 'B2', description: 'Upper Intermediate - Can use language flexibly' },
    { level: 'C1', description: 'Advanced - Can use language effectively' },
    { level: 'C2', description: 'Proficient - Near-native level' },
  ];

  const plans = [
    'Starter Plan',
    'Basic English Plan',
    'Complete English Pro Plans: Silver, Gold, Diamond, Super Pro',
    'Freedom Speaking Plan',
    'Pronunciation Training',
    'Professional English-Speaking Plan',
    'Mock Interview Practice',
    'CEFR Test & Certificate',
    'IELTS Mock Test (Academic/General)',
  ];

  const professions = [
    'IT', 'Bank', 'Pharma', 'Real Estate', 'Hospitality',
    'Airlines', 'Restaurants', 'Healthcare', 'Education',
    'Sales', 'Customer Service', 'Marketing', 'Finance',
    'Manufacturing', 'Legal', 'Engineering', 'Retail',
    'Media', 'Government', 'Non-profit'
  ];

  const renderBenefitsPage = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>SpeakEdge Membership Benefits</ThemedText>
        
        <View style={styles.benefitsList}>
          {[
            '1. Unlimited English conversation partner',
            '2. Daily English learning with fun',
            '3. Lifetime membership',
            '4. Track progress with badges',
            '5. First to get updates'
          ].map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <ThemedText style={styles.benefitText}>{benefit}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => setShowMembershipForm(true)}
          >
            <ThemedText style={styles.buttonText}>I am Interested</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => setShowBenefits(false)}
          >
            <ThemedText style={[styles.buttonText, styles.secondaryButtonText]}>Skip for Now</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );

  const renderMembershipForm = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Membership Registration</ThemedText>
        
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Name"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
          
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Age"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.age}
            onChangeText={(text) => setFormData({...formData, age: text})}
            keyboardType="numeric"
          />
          
          <View style={styles.genderContainer}>
            <ThemedText style={styles.label}>Gender:</ThemedText>
            <View style={styles.radioContainer}>
              {['Male', 'Female', 'Other'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.radioButton,
                    formData.gender === gender && styles.selectedRadio
                  ]}
                  onPress={() => setFormData({...formData, gender})}
                >
                  <ThemedText style={[
                    styles.radioText,
                    formData.gender === gender && styles.selectedRadioText
                  ]}>
                    {gender}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Country"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.country}
            onChangeText={(text) => setFormData({...formData, country: text})}
          />
          
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Mobile Number"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.mobile}
            onChangeText={(text) => setFormData({...formData, mobile: text})}
            keyboardType="phone-pad"
          />
          
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="WhatsApp Number (prefilled)"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.whatsapp || formData.mobile}
            onChangeText={(text) => setFormData({...formData, whatsapp: text})}
            keyboardType="phone-pad"
          />

          <View style={styles.skillContainer}>
            <ThemedText style={styles.label}>English Skill Level:</ThemedText>
            {englishLevels.map((skill) => (
              <TouchableOpacity
                key={skill.level}
                style={[
                  styles.skillButton,
                  formData.englishSkill === skill.level && styles.selectedSkill
                ]}
                onPress={() => setFormData({...formData, englishSkill: skill.level})}
              >
                <ThemedText style={[
                  styles.skillText,
                  formData.englishSkill === skill.level && styles.selectedSkillText
                ]}>
                  {skill.level} - {skill.description}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Academic Qualification"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.qualification}
            onChangeText={(text) => setFormData({...formData, qualification: text})}
          />

          <View style={styles.partnerContainer}>
            <ThemedText style={styles.label}>Speaking Partner:</ThemedText>
            <View style={styles.radioContainer}>
              {['Yes', 'No', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.radioButton,
                    formData.speakingPartner === option && styles.selectedRadio
                  ]}
                  onPress={() => setFormData({...formData, speakingPartner: option})}
                >
                  <ThemedText style={[
                    styles.radioText,
                    formData.speakingPartner === option && styles.selectedRadioText
                  ]}>
                    {option}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            style={[styles.textArea, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="About You (Max 300 characters)"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={formData.about}
            onChangeText={(text) => {
              if (text.length <= 300) {
                setFormData({...formData, about: text});
              }
            }}
            multiline
            numberOfLines={4}
          />
          <ThemedText style={styles.charCount}>{formData.about.length}/300</ThemedText>

          <TouchableOpacity style={styles.photoButton}>
            <ThemedText style={styles.photoButtonText}>Upload Profile Photo (Optional)</ThemedText>
            <ThemedText style={styles.photoInfo}>Max 1MB - Will be compressed to 100kb</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => {
              Alert.alert('Success', 'Congratulations! Your SpeakEdge account is activated.', [
                { text: 'OK', onPress: () => setShowDashboard(true) }
              ]);
            }}
          >
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );

  const renderDashboard = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Welcome to Your Dashboard</ThemedText>
        
        <ThemedText style={styles.sectionTitle}>Available Plans</ThemedText>
        
        {plans.map((plan, index) => (
          <TouchableOpacity key={index} style={styles.planCard}>
            <ThemedText style={styles.planText}>{plan}</ThemedText>
            {plan.includes('Professional English-Speaking Plan') && (
              <TouchableOpacity 
                style={styles.professionsButton}
                onPress={() => Alert.alert('Top 20 Professions', professions.join(', '))}
              >
                <ThemedText style={styles.professionsButtonText}>View Top 20 Professions</ThemedText>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );

  if (showDashboard) {
    return renderDashboard();
  }

  if (showMembershipForm) {
    return renderMembershipForm();
  }

  if (showBenefits) {
    return renderBenefitsPage();
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Profile</ThemedText>
        
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setShowBenefits(true)}
          >
            <ThemedText style={styles.buttonText}>View Membership Benefits</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setShowMembershipForm(true)}
          >
            <ThemedText style={[styles.buttonText, styles.secondaryButtonText]}>Join Membership</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tertiaryButton}
            onPress={() => setShowDashboard(true)}
          >
            <ThemedText style={[styles.buttonText, styles.tertiaryButtonText]}>View Dashboard</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  benefitsList: {
    marginBottom: 30,
  },
  benefitItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  benefitText: {
    fontSize: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  tertiaryButton: {
    borderWidth: 1,
    borderColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  tertiaryButtonText: {
    color: '#28A745',
  },
  formContainer: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.6,
    marginTop: -10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  genderContainer: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  selectedRadio: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  radioText: {
    fontSize: 14,
  },
  selectedRadioText: {
    color: 'white',
  },
  skillContainer: {
    marginBottom: 15,
  },
  skillButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  selectedSkill: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  skillText: {
    fontSize: 14,
  },
  selectedSkillText: {
    color: 'white',
  },
  partnerContainer: {
    marginBottom: 15,
  },
  photoButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  photoInfo: {
    fontSize: 12,
    opacity: 0.6,
  },
  profileSection: {
    gap: 15,
  },
  planCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  planText: {
    fontSize: 16,
    fontWeight: '500',
  },
  professionsButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  professionsButtonText: {
    color: 'white',
    fontSize: 12,
  },
});
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ThemedView style={styles.header}>
        <View style={[styles.avatarContainer, { borderColor: Colors[colorScheme ?? 'light'].tint }]}>
          <ThemedText style={styles.avatarText}>👤</ThemedText>
        </View>
        <ThemedText type="title" style={[styles.name, { color: Colors[colorScheme ?? 'light'].text }]}>
          Welcome User
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Complete your profile
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Settings
        </ThemedText>
        
        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          <IconSymbol name="house.fill" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={[styles.menuText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Account Settings
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          <IconSymbol name="house.fill" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={[styles.menuText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Notifications
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          <IconSymbol name="house.fill" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={[styles.menuText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Privacy
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: width * 0.1,
  },
  name: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Math.min(width * 0.04, 16),
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: '600',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    fontSize: Math.min(width * 0.04, 16),
    marginLeft: 12,
  },
});
