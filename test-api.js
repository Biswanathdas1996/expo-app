// Simple test script to verify the API integrations and CORS
// Run this with: node test-api.js

const BASE_URL =
  "https://55c1e6e5-cc5c-43f8-a6bc-09dbe6a8787c-00-30mdf3t7vv0b7.riker.replit.dev";

// Test CORS preflight request
async function testCORS() {
  try {
    console.log("🔍 Testing CORS preflight request...");

    const response = await fetch(`${BASE_URL}/api/user/english-level`, {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:8081",
        "Access-Control-Request-Method": "PUT",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    });

    console.log("CORS Preflight Status:", response.status);
    console.log("CORS Headers:");
    console.log(
      "  Access-Control-Allow-Origin:",
      response.headers.get("Access-Control-Allow-Origin")
    );
    console.log(
      "  Access-Control-Allow-Methods:",
      response.headers.get("Access-Control-Allow-Methods")
    );
    console.log(
      "  Access-Control-Allow-Headers:",
      response.headers.get("Access-Control-Allow-Headers")
    );

    if (response.ok) {
      console.log("✅ CORS preflight successful!");
    } else {
      console.log(
        "❌ CORS preflight failed - Backend needs CORS configuration"
      );
    }
  } catch (error) {
    console.error("❌ CORS test error:", error.message);
  }
}

async function testEnglishLevelAPI() {
  try {
    console.log("\n📚 Testing English Level API...");

    const response = await fetch(`${BASE_URL}/api/user/english-level`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer test_token",
        Origin: "http://localhost:8081",
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
    console.log("\n🎯 Testing Learning Goals API...");

    const response = await fetch(`${BASE_URL}/api/user/learning-goals`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer test_token",
        Origin: "http://localhost:8081",
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

async function testSkillsFocusAPI() {
  try {
    console.log("\n🎨 Testing Skills Focus API...");

    const response = await fetch(`${BASE_URL}/api/user/skills-focus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer test_token",
        Origin: "http://localhost:8081",
      },
      body: JSON.stringify({
        sessionId: "test_session_id",
        skillsFocus: ["speaking", "listening", "reading", "writing"],
      }),
    });

    const data = await response.json();

    console.log("Response Status:", response.status);
    console.log("Response Data:", data);

    if (response.ok) {
      console.log("✅ Skills Focus API call successful!");
    } else {
      console.log(
        "❌ Skills Focus API call failed:",
        data.message || "Unknown error"
      );
    }
  } catch (error) {
    console.error("❌ Skills Focus Network error:", error.message);
  }
}

async function runTests() {
  console.log("🚀 Starting API and CORS tests...\n");

  await testCORS();
  await testEnglishLevelAPI();
  await testLearningGoalsAPI();
  await testSkillsFocusAPI();

  console.log("\n📋 Summary:");
  console.log(
    "If CORS preflight fails, check CORS_SETUP.md for backend configuration"
  );
  console.log("Make sure your backend server includes CORS middleware");
}

runTests();
