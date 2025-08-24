// Simple test script to verify the API integrations
// Run this with: node test-api.js

const BASE_URL =
  "https://55c1e6e5-cc5c-43f8-a6bc-09dbe6a8787c-00-30mdf3t7vv0b7.riker.replit.dev";

async function testEnglishLevelAPI() {
  try {
    console.log("Testing English Level API...");

    const response = await fetch(`${BASE_URL}/api/user/english-level`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test_token",
      },
      body: JSON.stringify({
        sessionId: "test_session_id",
        englishLevel: "intermediate",
      }),
    });

    const data = await response.json();

    console.log("Response Status:", response.status);
    console.log("Response Data:", data);

    if (response.ok) {
      console.log("✅ English Level API call successful!");
    } else {
      console.log(
        "❌ English Level API call failed:",
        data.message || "Unknown error"
      );
    }
  } catch (error) {
    console.error("❌ English Level Network error:", error.message);
  }
}

async function testLearningGoalsAPI() {
  try {
    console.log("\nTesting Learning Goals API...");

    const response = await fetch(`${BASE_URL}/api/user/learning-goals`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test_token",
      },
      body: JSON.stringify({
        sessionId: "test_session_id",
        learningGoals: ["career_advancement", "travel", "education"],
      }),
    });

    const data = await response.json();

    console.log("Response Status:", response.status);
    console.log("Response Data:", data);

    if (response.ok) {
      console.log("✅ Learning Goals API call successful!");
    } else {
      console.log(
        "❌ Learning Goals API call failed:",
        data.message || "Unknown error"
      );
    }
  } catch (error) {
    console.error("❌ Learning Goals Network error:", error.message);
  }
}

async function runTests() {
  await testEnglishLevelAPI();
  await testLearningGoalsAPI();
}

runTests();
