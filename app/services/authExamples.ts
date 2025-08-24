import { AuthService } from "@/app/services/authService";
import { ApiService } from "@/app/services/apiService";
import { StorageService } from "@/app/services/storageService";

/**
 * Example usage of the authentication system with stored tokens
 */

export class AuthExamples {
  /**
   * Example: Register a new user and use stored tokens
   */
  static async registerAndUseTokens() {
    try {
      console.log("=== Registration Example ===");

      // Register user
      const registerResult = await AuthService.register({
        fullName: "John Doe",
        mobileNumber: "+1234567890",
      });

      if (registerResult.success) {
        console.log("✅ Registration successful");
        console.log("User:", registerResult.user);
        console.log("Auth Token:", registerResult.token);

        // Get all stored session data
        const sessionInfo = await ApiService.getSessionInfo();
        console.log("📱 Session Info:", sessionInfo);

        // Get individual tokens for manual API calls
        const tokens = await AuthService.getUserTokens();
        console.log("🔑 Individual Tokens:", tokens);

        return registerResult;
      } else {
        console.log("❌ Registration failed:", registerResult.message);
        return null;
      }
    } catch (error) {
      console.error("Registration example error:", error);
      return null;
    }
  }

  /**
   * Example: Make authenticated API calls using stored tokens
   */
  static async makeAuthenticatedCalls() {
    try {
      console.log("=== Authenticated API Calls Example ===");

      // Check if user is logged in
      const isLoggedIn = await AuthService.isLoggedIn();
      if (!isLoggedIn) {
        console.log("❌ User not logged in");
        return;
      }

      console.log("✅ User is logged in");

      // Example 1: GET request with authentication
      try {
        const userProfile = await ApiService.get("/api/user/profile");
        console.log("👤 User Profile:", userProfile);
      } catch (error) {
        console.log("Failed to get user profile:", error);
      }

      // Example 2: POST request with authentication
      try {
        const updateResult = await ApiService.post("/api/user/update", {
          preferences: {
            language: "en",
            theme: "dark",
          },
        });
        console.log("⚙️ Update Result:", updateResult);
      } catch (error) {
        console.log("Failed to update user:", error);
      }

      // Example 3: Manual API call with custom headers
      const authHeaders = await AuthService.getAuthHeaders();
      console.log("🔐 Auth Headers for manual calls:", authHeaders);

      // Example 4: Get current session details
      const session = await AuthService.getCurrentSession();
      console.log("📋 Current Session:", {
        userId: session?.userId,
        userName: session?.userName,
        authToken: session?.authToken?.substring(0, 8) + "...",
        sessionId: session?.sessionId?.substring(0, 8) + "...",
        isNewUser: session?.isNewUser,
        expiresAt: session?.expiresAt
          ? new Date(session.expiresAt).toISOString()
          : null,
      });
    } catch (error) {
      console.error("Authenticated calls example error:", error);
    }
  }

  /**
   * Example: Manual fetch with stored tokens
   */
  static async manualFetchWithTokens() {
    try {
      console.log("=== Manual Fetch Example ===");

      // Get stored tokens
      const authToken = await StorageService.getAuthToken();
      const sessionId = await StorageService.getSessionId();
      const userId = await StorageService.getUserId();

      if (!authToken || !sessionId || !userId) {
        console.log("❌ Missing authentication tokens");
        return;
      }

      // Make manual fetch request
      const response = await fetch(
        "https://55c1e6e5-cc5c-43f8-a6bc-09dbe6a8787c-00-30mdf3t7vv0b7.riker.replit.dev/api/user/data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "X-Session-ID": sessionId,
            "X-User-ID": userId,
          },
        }
      );

      const data = await response.json();
      console.log("📡 Manual Fetch Result:", data);
    } catch (error) {
      console.error("Manual fetch example error:", error);
    }
  }

  /**
   * Example: Sign out and clear tokens
   */
  static async signOutExample() {
    try {
      console.log("=== Sign Out Example ===");

      // Check current status
      const isLoggedInBefore = await AuthService.isLoggedIn();
      console.log("🔐 Logged in before sign out:", isLoggedInBefore);

      // Sign out
      await AuthService.signOut();

      // Check status after sign out
      const isLoggedInAfter = await AuthService.isLoggedIn();
      console.log("🔓 Logged in after sign out:", isLoggedInAfter);

      // Verify tokens are cleared
      const tokens = await AuthService.getUserTokens();
      console.log("🔑 Tokens after sign out:", tokens);
    } catch (error) {
      console.error("Sign out example error:", error);
    }
  }

  /**
   * Example: Check session expiration
   */
  static async checkSessionExpiration() {
    try {
      console.log("=== Session Expiration Check ===");

      const session = await AuthService.getCurrentSession();
      if (!session) {
        console.log("❌ No active session");
        return;
      }

      const now = Date.now();
      const expiresAt = session.expiresAt;
      const timeUntilExpiry = expiresAt - now;

      console.log("⏰ Session Status:", {
        createdAt: new Date(session.createdAt).toISOString(),
        expiresAt: new Date(expiresAt).toISOString(),
        currentTime: new Date(now).toISOString(),
        timeUntilExpiryMs: timeUntilExpiry,
        timeUntilExpiryHours:
          Math.round((timeUntilExpiry / (1000 * 60 * 60)) * 100) / 100,
        isExpired: timeUntilExpiry <= 0,
      });
    } catch (error) {
      console.error("Session expiration check error:", error);
    }
  }
}

/**
 * Usage in components:
 *
 * import { AuthExamples } from '@/app/services/authExamples';
 *
 * // In your component
 * const handleRegister = async () => {
 *   const result = await AuthExamples.registerAndUseTokens();
 *   if (result) {
 *     // Navigate to next screen
 *   }
 * };
 *
 * const handleApiCall = async () => {
 *   await AuthExamples.makeAuthenticatedCalls();
 * };
 */
