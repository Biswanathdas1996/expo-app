import { useState, useCallback } from "react";
import * as Speech from "expo-speech";

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = useCallback(
    async (text: string) => {
      if (isSpeaking) {
        stopSpeaking();
      }

      try {
        setIsSpeaking(true);
        await Speech.speak(text, {
          language: "en-US",
          pitch: 1.1,
          rate: 0.9,
          voice: "com.apple.ttsbundle.Samantha-compact",
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      } catch (error) {
        console.log("Speech error:", error);
        setIsSpeaking(false);
      }
    },
    [isSpeaking]
  );

  const stopSpeaking = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  return {
    isSpeaking,
    speakText,
    stopSpeaking,
  };
};
