import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

export const sharedStyles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#f0f4ff",
    opacity: 0.1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  modernContainer: {
    flex: 1,
    padding: 24,
    minHeight: height,
  },
  modernPrimaryButton: {
    backgroundColor: "#8B45FF",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#8B45FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#8B45FF",
  },
  modernButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    zIndex: 1,
  },
  modernSecondaryButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  modernSecondaryButtonText: {
    color: "#8B45FF",
    fontSize: 16,
    fontWeight: "500",
  },
  modernDisabledButton: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
  },
  modernStepTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#8B45FF",
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.7,
  },
  modernSpeakingIndicator: {
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
  },
  soundWave: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  wave: {
    width: 4,
    backgroundColor: "#8B45FF",
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
    color: "#8B45FF",
    fontWeight: "500",
  },
});

export const optionStyles = StyleSheet.create({
  optionsGrid: {
    gap: 12,
    marginBottom: 32,
  },
  modernOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: "rgba(139, 69, 255, 0.1)",
    position: "relative",
    minHeight: 70,
  },
  compactOptionCard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    minHeight: 110,
  },
  largeOptionCard: {
    justifyContent: "center",
    paddingVertical: 24,
  },
  modernSelectedOption: {
    borderColor: "#8B45FF",
    backgroundColor: "rgba(139, 69, 255, 0.15)",
    shadowColor: "#8B45FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  optionEmoji: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  compactOptionEmoji: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 0,
    marginBottom: 10,
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
  compactEmojiText: {
    fontSize: 22,
  },
  largeEmojiText: {
    fontSize: 30,
  },
  modernOptionText: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
  },
  compactOptionText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    flex: 0,
    lineHeight: 20,
    color: "#333333",
  },
  largeOptionText: {
    textAlign: "center",
    flex: 0,
    fontSize: 20,
  },
  modernSelectedOptionText: {
    color: "#8B45FF",
    fontWeight: "700",
  },
  selectedCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#8B45FF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 8,
    right: 8,
  },
  checkmarkText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const modalStyles = StyleSheet.create({
  modernModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modernModalContent: {
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 380,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modernBenefitsModalContent: {
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 420,
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B45FF",
  },
  modernPopupText: {
    fontSize: 18,
    textAlign: "center",
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
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    padding: 16,
    backgroundColor: "rgba(139, 69, 255, 0.05)",
    borderRadius: 12,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(139, 69, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
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
