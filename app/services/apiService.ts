import { AuthService } from "./authService";
import { API_CONFIG, ERROR_MESSAGES } from "@/app/constants/Api";
import {
  SkillsFocusUpdateRequest,
  SkillsFocusUpdateResponse,
  LearningGoalsUpdateRequest,
  EnglishLevelUpdateRequest,
  SpeakingPartnerUpdateRequest,
  SpeakingPartnerUpdateResponse,
} from "@/app/types/api";

export interface ApiCallOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
  timeout?: number;
}

export class ApiService {
  /**
   * Make an authenticated API call with stored user tokens
   */
  static async makeAuthenticatedCall(
    endpoint: string,
    options: ApiCallOptions = {}
  ): Promise<any> {
    try {
      const {
        method = "GET",
        body,
        headers: customHeaders = {},
        requireAuth = true,
        timeout = API_CONFIG.TIMEOUT,
      } = options;

      // Get auth headers if required
      let authHeaders = {};
      if (requireAuth) {
        authHeaders = await AuthService.getAuthHeaders();

        // Check if user is logged in
        const isLoggedIn = await AuthService.isLoggedIn();
        if (!isLoggedIn) {
          throw new Error("User is not authenticated");
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const fetchOptions: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
          ...authHeaders,
          ...customHeaders,
        },
        signal: controller.signal,
        mode: "cors" as RequestMode,
      };

      if (
        body &&
        (method === "POST" || method === "PUT" || method === "PATCH")
      ) {
        fetchOptions.body = JSON.stringify(body);
      }

      console.log(`Making ${method} request to ${endpoint}`, {
        headers: fetchOptions.headers,
        body: body || "No body",
      });

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${endpoint}`,
        fetchOptions
      );

      clearTimeout(timeoutId);

      const data = await response.json();

      console.log(`${method} ${endpoint} response:`, data);

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error(`API call error for ${endpoint}:`, error);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
        }
        throw error;
      }

      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  }

  /**
   * Make a GET request with authentication
   */
  static async get(
    endpoint: string,
    options: Omit<ApiCallOptions, "method"> = {}
  ) {
    return this.makeAuthenticatedCall(endpoint, { ...options, method: "GET" });
  }

  /**
   * Make a POST request with authentication
   */
  static async post(
    endpoint: string,
    body: any,
    options: Omit<ApiCallOptions, "method" | "body"> = {}
  ) {
    return this.makeAuthenticatedCall(endpoint, {
      ...options,
      method: "POST",
      body,
    });
  }

  /**
   * Make a PUT request with authentication
   */
  static async put(
    endpoint: string,
    body: any,
    options: Omit<ApiCallOptions, "method" | "body"> = {}
  ) {
    return this.makeAuthenticatedCall(endpoint, {
      ...options,
      method: "PUT",
      body,
    });
  }

  /**
   * Make a DELETE request with authentication
   */
  static async delete(
    endpoint: string,
    options: Omit<ApiCallOptions, "method"> = {}
  ) {
    return this.makeAuthenticatedCall(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  /**
   * Get current user session info for debugging
   */
  static async getSessionInfo() {
    try {
      const session = await AuthService.getCurrentSession();
      const tokens = await AuthService.getUserTokens();

      return {
        isLoggedIn: await AuthService.isLoggedIn(),
        user: session?.user || null,
        tokens: {
          authToken: tokens.authToken
            ? `${tokens.authToken.substring(0, 8)}...`
            : null,
          sessionId: tokens.sessionId
            ? `${tokens.sessionId.substring(0, 8)}...`
            : null,
          userId: tokens.userId,
        },
        sessionExpiresAt: session?.expiresAt
          ? new Date(session.expiresAt).toISOString()
          : null,
      };
    } catch (error) {
      console.error("Error getting session info:", error);
      return null;
    }
  }

  /**
   * Update user's English level
   */
  static async updateEnglishLevel(englishLevel: string) {
    try {
      // Get current user session and tokens
      const tokens = await AuthService.getUserTokens();

      if (!tokens.sessionId) {
        throw new Error("No session ID found. Please log in again.");
      }

      // Map frontend level names to API-compatible format
      const levelMapping: Record<string, string> = {
        Beginner: "beginner",
        Elementary: "elementary",
        Intermediate: "intermediate",
        "Upper Intermediate": "upper_intermediate",
        Advanced: "advanced",
        Proficient: "proficient",
      };

      const mappedLevel =
        levelMapping[englishLevel] ||
        englishLevel.toLowerCase().replace(/\s+/g, "_");

      const requestBody: EnglishLevelUpdateRequest = {
        sessionId: tokens.sessionId,
        englishLevel: mappedLevel,
      };

      console.log("Updating English level:", requestBody);
      console.log(
        "Original level:",
        englishLevel,
        "Mapped level:",
        mappedLevel
      );

      const response = await this.put("/api/user/english-level", requestBody);

      console.log("English level update response:", response);

      return {
        success: true,
        message: response.message || "English level updated successfully",
        data: response,
      };
    } catch (error) {
      console.error("English level update error:", error);

      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: ERROR_MESSAGES.UNKNOWN_ERROR,
      };
    }
  }

  /**
   * Update user's learning goals
   */
  static async updateLearningGoals(learningGoals: string[]) {
    try {
      // Get current user session and tokens
      const tokens = await AuthService.getUserTokens();

      if (!tokens.sessionId) {
        throw new Error("No session ID found. Please log in again.");
      }

      // Map purpose names to API-compatible format
      const goalMapping: Record<string, string> = {
        "Job/Business": "career_advancement",
        Abroad: "travel",
        "Improve skills": "skill_improvement",
        Academic: "education",
        Practise: "practice",
        Pronunciation: "pronunciation",
        "CEFR Test": "test_preparation",
        Other: "other",
      };

      const mappedGoals = learningGoals.map(
        (goal) => goalMapping[goal] || goal.toLowerCase().replace(/\s+/g, "_")
      );

      const requestBody: LearningGoalsUpdateRequest = {
        sessionId: tokens.sessionId,
        learningGoals: mappedGoals,
      };

      console.log("Updating learning goals:", requestBody);

      const response = await this.put("/api/user/learning-goals", requestBody);

      console.log("Learning goals update response:", response);

      return {
        success: true,
        message: response.message || "Learning goals updated successfully",
        data: response,
      };
    } catch (error) {
      console.error("Learning goals update error:", error);

      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: ERROR_MESSAGES.UNKNOWN_ERROR,
      };
    }
  }

  /**
   * Update user's skills focus
   */
  static async updateSkillsFocus(skillsFocus: string[]) {
    try {
      // Get current user session and tokens
      const tokens = await AuthService.getUserTokens();

      if (!tokens.sessionId) {
        throw new Error("No session ID found. Please log in again.");
      }

      // Map skill names to API-compatible format
      const skillMapping: Record<string, string> = {
        Speaking: "speaking",
        Writing: "writing",
        Reading: "reading",
        Listening: "listening",
        Pronunciation: "pronunciation",
        All: "all",
        Other: "other",
      };

      const mappedSkills = skillsFocus.map(
        (skill) =>
          skillMapping[skill] || skill.toLowerCase().replace(/\s+/g, "_")
      );

      const requestBody: SkillsFocusUpdateRequest = {
        sessionId: tokens.sessionId,
        skillsFocus: mappedSkills,
      };

      console.log("Updating skills focus:", requestBody);

      const response: SkillsFocusUpdateResponse = await this.put(
        "/api/user/skills-focus",
        requestBody
      );

      console.log("Skills focus update response:", response);

      return {
        success: true,
        message: response.message || "Skills focus updated successfully",
        data: response,
      };
    } catch (error) {
      console.error("Skills focus update error:", error);

      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: ERROR_MESSAGES.UNKNOWN_ERROR,
      };
    }
  }

  /**
   * Update user's speaking partner preference
   */
  static async updateSpeakingPartner(partnerSelection: string) {
    try {
      // Get current user session and tokens
      const tokens = await AuthService.getUserTokens();

      if (!tokens.sessionId) {
        throw new Error("No session ID found. Please log in again.");
      }

      // Map partner selection to boolean
      const needsSpeakingPartner = partnerSelection.toLowerCase() === "yes";

      const requestBody: SpeakingPartnerUpdateRequest = {
        sessionId: tokens.sessionId,
        needsSpeakingPartner,
      };

      console.log("Updating speaking partner preference:", requestBody);

      const response: SpeakingPartnerUpdateResponse = await this.put(
        "/api/user/speaking-partner",
        requestBody
      );

      console.log("Speaking partner update response:", response);

      return {
        success: true,
        message:
          response.message ||
          "Speaking partner preference updated successfully",
        data: response,
      };
    } catch (error) {
      console.error("Speaking partner update error:", error);

      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: ERROR_MESSAGES.UNKNOWN_ERROR,
      };
    }
  }
}
