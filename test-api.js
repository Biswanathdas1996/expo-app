// Simple test script to verify the English level API integration
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
      console.log("✅ API call successful!");
    } else {
      console.log("❌ API call failed:", data.message || "Unknown error");
    }
  } catch (error) {
    console.error("❌ Network error:", error.message);
  }
}

testEnglishLevelAPI();
