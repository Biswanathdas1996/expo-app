import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { modalStyles } from "../shared/SharedStyles";
import { ModernButton } from "../shared/ModernButton";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { AuthService } from "@/app/services/authService";
import { ApiService } from "@/app/services/apiService";

interface MembershipFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  age: string;
  gender: string;
  country: string;
  mobileNumber: string;
  whatsappNumber: string;
  englishSkills: string[];
  highestQualification: string;
  speakingPartnerInterest: string;
  speakingPartnerOther: string;
  aboutYou: string;
  profilePhotoBase64: string;
}

const englishLevels = [
  {
    code: "A1",
    level: "A1- Beginner",
    description: "I know very little",
  },
  {
    code: "A2",
    level: "A2-Elementary",
    description: "I understand simple phrases",
  },
  {
    code: "B1",
    level: "B1-Intermediate",
    description: "I can speak basic English",
  },
  {
    code: "B2",
    level: "B2-Upper Intermediate",
    description: "I can talk fluently",
  },
  {
    code: "C1",
    level: "C1-Advanced",
    description: "I speak confidently and clearly",
  },
  {
    code: "C2",
    level: "C2-Proficient",
    description: "I use near-native English",
  },
];

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

export const MembershipFormModal: React.FC<MembershipFormModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    country: "",
    mobileNumber: "",
    whatsappNumber: "",
    englishSkills: [],
    highestQualification: "",
    speakingPartnerInterest: "",
    speakingPartnerOther: "",
    aboutYou: "",
    profilePhotoBase64: "",
  });

  // Load WhatsApp number from auth service
  useEffect(() => {
    if (visible) {
      loadUserData();
    }
  }, [visible]);

  const loadUserData = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      if (user && user.mobileNumber) {
        setFormData((prev) => ({
          ...prev,
          whatsappNumber: user.mobileNumber,
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEnglishSkill = (skillCode: string) => {
    setFormData((prev) => ({
      ...prev,
      englishSkills: prev.englishSkills.includes(skillCode)
        ? prev.englishSkills.filter((skill) => skill !== skillCode)
        : [...prev.englishSkills, skillCode],
    }));
  };

  const handleSpeakingPartnerChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      speakingPartnerInterest: value,
      speakingPartnerOther: value === "Other" ? prev.speakingPartnerOther : "",
    }));
  };

  const compressImage = async (uri: string): Promise<string> => {
    try {
      // Use expo-image-manipulator to resize and compress the image
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [
          { resize: { width: 400, height: 400 } }, // Resize to 400x400
        ],
        {
          compress: 0.7, // Compress to 70% quality
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      // Convert to base64 data URL format
      const base64String = `data:image/jpeg;base64,${manipulatedImage.base64}`;

      // Check if image is under 100KB (roughly 137000 characters in base64)
      if (base64String.length > 137000) {
        // If still too large, compress more
        const moreCompressed = await ImageManipulator.manipulateAsync(
          uri,
          [
            { resize: { width: 300, height: 300 } }, // Smaller size
          ],
          {
            compress: 0.5, // Lower quality
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );
        return `data:image/jpeg;base64,${moreCompressed.base64}`;
      }

      return base64String;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to your photo library to upload a profile photo."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        try {
          const compressedImage = await compressImage(result.assets[0].uri);
          setFormData((prev) => ({
            ...prev,
            profilePhotoBase64: compressedImage,
          }));
          Alert.alert(
            "Photo uploaded",
            "It may take up to 48 hours to get your profile image approved."
          );
        } catch (error) {
          console.error("Error processing image:", error);
          Alert.alert(
            "Error",
            "Failed to process the image. Please try again."
          );
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return false;
    }
    if (!formData.age.trim() || isNaN(Number(formData.age))) {
      Alert.alert("Validation Error", "Please enter a valid age.");
      return false;
    }
    if (!formData.gender) {
      Alert.alert("Validation Error", "Please select your gender.");
      return false;
    }
    if (!formData.country.trim()) {
      Alert.alert("Validation Error", "Please enter your country.");
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      Alert.alert("Validation Error", "Please enter your mobile number.");
      return false;
    }
    if (!formData.whatsappNumber.trim()) {
      Alert.alert("Validation Error", "WhatsApp number is required.");
      return false;
    }
    if (formData.englishSkills.length === 0) {
      Alert.alert(
        "Validation Error",
        "Please select at least one English skill level."
      );
      return false;
    }
    if (!formData.highestQualification.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter your highest qualification."
      );
      return false;
    }
    if (!formData.speakingPartnerInterest) {
      Alert.alert(
        "Validation Error",
        "Please select your speaking partner interest."
      );
      return false;
    }
    if (
      formData.speakingPartnerInterest === "Other" &&
      !formData.speakingPartnerOther.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "Please specify your speaking partner interest."
      );
      return false;
    }
    if (!formData.aboutYou.trim()) {
      Alert.alert("Validation Error", "Please write something about yourself.");
      return false;
    }
    if (formData.aboutYou.length > 300) {
      Alert.alert(
        "Validation Error",
        "About you section must be 300 characters or less."
      );
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const submitData = {
        name: formData.name.trim(),
        age: formData.age.trim(),
        gender: formData.gender,
        country: formData.country.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        whatsappNumber:
          formData.whatsappNumber.trim() || formData.mobileNumber.trim(),
        englishSkills: formData.englishSkills,
        highestQualification: formData.highestQualification.trim(),
        speakingPartnerInterest:
          formData.speakingPartnerInterest === "Other"
            ? formData.speakingPartnerOther.trim()
            : formData.speakingPartnerInterest,
        aboutYou: formData.aboutYou.trim(),
        profilePhotoBase64: formData.profilePhotoBase64 || "",
      };

      // Additional validation for API requirements
      if (!submitData.name || submitData.name.length === 0) {
        throw new Error("Name is required");
      }
      if (!submitData.age || isNaN(Number(submitData.age))) {
        throw new Error("Valid age is required");
      }
      if (!submitData.gender) {
        throw new Error("Gender is required");
      }
      if (!submitData.country || submitData.country.length === 0) {
        throw new Error("Country is required");
      }
      if (!submitData.mobileNumber || submitData.mobileNumber.length === 0) {
        throw new Error("Mobile number is required");
      }
      if (
        !submitData.whatsappNumber ||
        submitData.whatsappNumber.length === 0
      ) {
        throw new Error("WhatsApp number is required");
      }
      if (!submitData.englishSkills || submitData.englishSkills.length === 0) {
        throw new Error("English skills are required");
      }
      if (
        !submitData.highestQualification ||
        submitData.highestQualification.length === 0
      ) {
        throw new Error("Highest qualification is required");
      }
      if (
        !submitData.speakingPartnerInterest ||
        submitData.speakingPartnerInterest.length === 0
      ) {
        throw new Error("Speaking partner interest is required");
      }
      if (!submitData.aboutYou || submitData.aboutYou.length === 0) {
        throw new Error("About you is required");
      }

      console.log("Submitting form data:", JSON.stringify(submitData, null, 2));
      console.log("Form validation passed, calling API...");

      const response = await ApiService.submitMembershipRegistration(
        submitData
      );

      if (response.success) {
        Alert.alert(
          "Success!",
          "Your membership application has been submitted successfully. We will contact you soon.",
          [
            {
              text: "OK",
              onPress: () => {
                onClose();
                if (onSuccess) {
                  onSuccess();
                }
              },
            },
          ]
        );
      } else {
        throw new Error(response.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    multiline: boolean = false,
    editable: boolean = true,
    keyboardType: any = "default"
  ) => (
    <View style={{ marginBottom: 16 }}>
      <ThemedText style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
        {label}
      </ThemedText>
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? "light"].tabIconDefault,
            borderRadius: 8,
            padding: 12,
            backgroundColor: editable
              ? Colors[colorScheme ?? "light"].background
              : Colors[colorScheme ?? "light"].tabIconDefault + "30",
            color: Colors[colorScheme ?? "light"].text,
            fontSize: 16,
            minHeight: multiline ? 80 : 44,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={label.includes("About you") ? 300 : undefined}
      />
      {label.includes("About you") && (
        <ThemedText
          style={{
            fontSize: 12,
            color: Colors[colorScheme ?? "light"].tabIconDefault,
            marginTop: 4,
          }}
        >
          {value.length}/300 characters
        </ThemedText>
      )}
    </View>
  );

  const renderCheckboxGroup = (
    label: string,
    options: any[],
    selectedValues: string[],
    onToggle: (value: string) => void,
    showDescription: boolean = false
  ) => (
    <View style={{ marginBottom: 16 }}>
      <ThemedText style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
        {label}
      </ThemedText>
      {options.map((option) => (
        <TouchableOpacity
          key={showDescription ? option.code : option}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 12,
            padding: 12,
            backgroundColor: selectedValues.includes(
              showDescription ? option.code : option
            )
              ? Colors.light.primary + "20"
              : "transparent",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: selectedValues.includes(
              showDescription ? option.code : option
            )
              ? Colors.light.primary
              : Colors[colorScheme ?? "light"].tabIconDefault,
          }}
          onPress={() => onToggle(showDescription ? option.code : option)}
        >
          <MaterialIcons
            name={
              selectedValues.includes(showDescription ? option.code : option)
                ? "check-box"
                : "check-box-outline-blank"
            }
            size={24}
            color={
              selectedValues.includes(showDescription ? option.code : option)
                ? Colors.light.primary
                : Colors[colorScheme ?? "light"].tabIconDefault
            }
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <ThemedText style={{ fontSize: 14, fontWeight: "500" }}>
              {showDescription ? option.level : option}
            </ThemedText>
            {showDescription && (
              <ThemedText
                style={{
                  fontSize: 12,
                  color: Colors[colorScheme ?? "light"].tabIconDefault,
                  marginTop: 2,
                }}
              >
                {option.description}
              </ThemedText>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRadioGroup = (
    label: string,
    options: string[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <View style={{ marginBottom: 16 }}>
      <ThemedText style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
        {label}
      </ThemedText>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            padding: 8,
          }}
          onPress={() => onSelect(option)}
        >
          <MaterialIcons
            name={
              selectedValue === option
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color={
              selectedValue === option
                ? Colors.light.primary
                : Colors[colorScheme ?? "light"].tabIconDefault
            }
            style={{ marginRight: 12 }}
          />
          <ThemedText style={{ fontSize: 14 }}>{option}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={modalStyles.modernModalOverlay}>
        <View
          style={[
            modalStyles.modernBenefitsModalContent,
            {
              backgroundColor: Colors[colorScheme ?? "light"].background,
              padding: 20,
              maxWidth: 400,
              maxHeight: "90%",
              width: "95%",
            },
          ]}
        >
          <View style={[modalStyles.modalHeader, { marginBottom: 16 }]}>
            <MaterialIcons
              name="person-add"
              size={28}
              color={Colors.light.primary}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <ThemedText
                style={[
                  modalStyles.modalTitle,
                  { fontSize: 20, marginBottom: 4 },
                ]}
              >
                SpeakEdge Membership
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 12,
                  color: Colors[colorScheme ?? "light"].tabIconDefault,
                }}
              >
                Please fill the form to activate your membership
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 10,
                  color: Colors[colorScheme ?? "light"].tabIconDefault,
                  marginTop: 2,
                }}
              >
                (Your contact information eg. mobile/email will never be shared
                without your consent)
              </ThemedText>
            </View>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons
                name="close"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {renderInputField(
              "Name",
              formData.name,
              (text) => handleInputChange("name", text),
              "Enter your full name"
            )}

            {renderInputField(
              "Age",
              formData.age,
              (text) => handleInputChange("age", text),
              "Enter your age",
              false,
              true,
              "numeric"
            )}

            {renderRadioGroup(
              "Gender",
              genderOptions,
              formData.gender,
              (value) => handleInputChange("gender", value)
            )}

            {renderInputField(
              "Country",
              formData.country,
              (text) => handleInputChange("country", text),
              "Enter your country"
            )}

            {renderInputField(
              "Mobile/Phone no",
              formData.mobileNumber,
              (text) => handleInputChange("mobileNumber", text),
              "Enter your mobile number",
              false,
              true,
              "phone-pad"
            )}

            {renderInputField(
              "WhatsApp number",
              formData.whatsappNumber,
              () => {},
              "Auto-filled from login",
              false,
              false
            )}

            {renderCheckboxGroup(
              "English skill (Tick anyone)",
              englishLevels,
              formData.englishSkills,
              toggleEnglishSkill,
              true
            )}

            {renderInputField(
              "Highest academic qualification",
              formData.highestQualification,
              (text) => handleInputChange("highestQualification", text),
              "Enter your highest qualification"
            )}

            {renderRadioGroup(
              "Are you interested to get speaking partner?",
              ["Yes", "No", "Other"],
              formData.speakingPartnerInterest,
              handleSpeakingPartnerChange
            )}

            {formData.speakingPartnerInterest === "Other" &&
              renderInputField(
                "Please specify",
                formData.speakingPartnerOther,
                (text) => handleInputChange("speakingPartnerOther", text),
                "Please specify your interest"
              )}

            {renderInputField(
              "Please write about you or your interest which will be publicly shown",
              formData.aboutYou,
              (text) => handleInputChange("aboutYou", text),
              "Tell us about yourself...",
              true
            )}

            {/* Profile Photo Upload */}
            <View style={{ marginBottom: 16 }}>
              <ThemedText
                style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}
              >
                Please upload your profile photo (Optional)
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 12,
                  color: Colors[colorScheme ?? "light"].tabIconDefault,
                  marginBottom: 8,
                }}
              >
                Less than 1 MB
              </ThemedText>

              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: Colors[colorScheme ?? "light"].tabIconDefault,
                  borderStyle: "dashed",
                  borderRadius: 8,
                  padding: 20,
                  alignItems: "center",
                  backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
                onPress={pickImage}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={Colors.light.primary}
                  />
                ) : formData.profilePhotoBase64 ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={{ uri: formData.profilePhotoBase64 }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        marginBottom: 8,
                      }}
                    />
                    <ThemedText style={{ fontSize: 12, textAlign: "center" }}>
                      Tap to change photo
                    </ThemedText>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <MaterialIcons
                      name="add-photo-alternate"
                      size={48}
                      color={Colors[colorScheme ?? "light"].tabIconDefault}
                    />
                    <ThemedText
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        marginTop: 8,
                      }}
                    >
                      Upload your photo
                    </ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12, marginTop: 20 }}>
              <ModernButton
                title={isLoading ? "Submitting..." : "Submit"}
                onPress={submitForm}
                disabled={isLoading}
              />

              <ModernButton
                title="Cancel"
                onPress={onClose}
                variant="secondary"
                disabled={isLoading}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
