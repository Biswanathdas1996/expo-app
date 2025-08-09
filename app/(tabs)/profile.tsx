import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: `${themeColors.tint}20` }]}>
            <ThemedText style={styles.avatarText}>👤</ThemedText>
          </View>
          <ThemedText style={[styles.name, { color: themeColors.text }]}>
            Welcome Back!
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: themeColors.icon }]}>
            Your mindfulness journey continues
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          {[
            { label: 'Days Active', value: '7', emoji: '🔥' },
            { label: 'Total Sessions', value: '23', emoji: '🧘‍♀️' },
            { label: 'Minutes Meditated', value: '345', emoji: '⏰' },
          ].map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: themeColors.background }]}>
              <ThemedText style={styles.statEmoji}>{stat.emoji}</ThemedText>
              <ThemedText style={[styles.statValue, { color: themeColors.tint }]}>
                {stat.value}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.icon }]}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.menuContainer}>
          {[
            { title: 'Settings', icon: '⚙️', desc: 'Customize your experience' },
            { title: 'Progress', icon: '📈', desc: 'View detailed analytics' },
            { title: 'Reminders', icon: '🔔', desc: 'Set meditation reminders' },
            { title: 'Support', icon: '💬', desc: 'Get help and feedback' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: themeColors.background }]}
            >
              <View style={styles.menuLeft}>
                <ThemedText style={styles.menuIcon}>{item.icon}</ThemedText>
                <View style={styles.menuText}>
                  <ThemedText style={[styles.menuTitle, { color: themeColors.text }]}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={[styles.menuDesc, { color: themeColors.icon }]}>
                    {item.desc}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.chevron, { color: themeColors.icon }]}>›</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuDesc: {
    fontSize: 14,
    opacity: 0.7,
  },
  chevron: {
    fontSize: 20,
    opacity: 0.5,
  },
});