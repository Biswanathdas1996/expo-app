import { API_CONFIG } from "@/app/constants/Api";

/**
 * Utility class for testing and debugging CORS configuration
 */
export class CORSTestService {
  /**
   * Test CORS preflight request
   */
  static async testCORSPreflight(): Promise<{
    success: boolean;
    message: string;
    headers?: Record<string, string | null>;
  }> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/user/english-level`,
        {
          method: "OPTIONS",
          headers: {
            Origin: "http://localhost:8081",
            "Access-Control-Request-Method": "PUT",
            "Access-Control-Request-Headers": "Content-Type, Authorization",
          },
        }
      );

      const corsHeaders = {
        "Access-Control-Allow-Origin": response.headers.get(
          "Access-Control-Allow-Origin"
        ),
        "Access-Control-Allow-Methods": response.headers.get(
          "Access-Control-Allow-Methods"
        ),
        "Access-Control-Allow-Headers": response.headers.get(
          "Access-Control-Allow-Headers"
        ),
        "Access-Control-Allow-Credentials": response.headers.get(
          "Access-Control-Allow-Credentials"
        ),
      };

      if (response.ok) {
        return {
          success: true,
          message: "CORS preflight successful",
          headers: corsHeaders,
        };
      } else {
        return {
          success: false,
          message: `CORS preflight failed with status ${response.status}`,
          headers: corsHeaders,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `CORS test error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Test basic API connectivity with CORS headers
   */
  static async testAPIConnectivity(): Promise<{
    success: boolean;
    message: string;
    status?: number;
  }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "http://localhost:8081",
        },
        mode: "cors" as RequestMode,
      });

      const data = await response.json().catch(() => ({}));

      return {
        success: response.ok,
        message: response.ok
          ? "API connectivity successful"
          : `API connectivity failed: ${data.message || "Unknown error"}`,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        message: `API connectivity error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Get comprehensive CORS and API status
   */
  static async getFullStatus() {
    console.log("🔍 Running CORS and API diagnostics...");

    const corsTest = await this.testCORSPreflight();
    console.log("CORS Preflight:", corsTest);

    const apiTest = await this.testAPIConnectivity();
    console.log("API Connectivity:", apiTest);

    return {
      cors: corsTest,
      api: apiTest,
      timestamp: new Date().toISOString(),
    };
  }
}
