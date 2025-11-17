import axios from "axios";

const API_BASE =
  "https://anubis-subscriptionplan.onrender.com/api/v2/subscription_plans";

export default {
  // Create a new subscription plan
  async createPlan(planData) {
    try {
      const response = await axios.post(API_BASE, planData);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating plan:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get all subscription plans
  async getAllPlans() {
    try {
      const response = await axios.get(API_BASE);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching plans:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get plan by ID (optional)
  async getPlanById(id) {
    try {
      const response = await axios.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching plan:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
