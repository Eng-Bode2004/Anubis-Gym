<template>
  <div class="plans-container py-5">
    <h2 class="text-center mb-5 gradient-text fw-bold">Subscription Plans</h2>

    <!-- 🔍 Filter Section -->
    <div class="card shadow-sm mb-5 p-4 filter-card">
      <div class="row g-3 align-items-center">
        <div class="col-md-4">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control search-input shadow-sm"
            placeholder="Search by plan name..."
          />
        </div>

        <div class="col-md-3">
          <select
            v-model="selectedPriceFilter"
            class="form-select filter-select shadow-sm"
          >
            <option value="">Filter by Price</option>
            <option value="low">Low (&lt; 200)</option>
            <option value="medium">Medium (200 - 500)</option>
            <option value="high">High (&gt; 500)</option>
          </select>
        </div>

        <div class="col-md-3">
          <select
            v-model="selectedDurationFilter"
            class="form-select filter-select shadow-sm"
          >
            <option value="">Filter by Duration</option>
            <option value="short">Short (&lt; 15 days)</option>
            <option value="medium">Medium (15 - 30 days)</option>
            <option value="long">Long (&gt; 30 days)</option>
          </select>
        </div>

        <div class="col-md-2 text-end">
          <router-link to="/createplan" class="btn btn-gradient w-100">
            + Add Plan
          </router-link>
        </div>
      </div>
    </div>

    <!-- 💎 Plans -->
    <div class="row g-4" v-if="filteredPlans.length">
      <div
        v-for="plan in filteredPlans"
        :key="plan._id"
        class="col-md-6 col-lg-4"
      >
        <div class="card plan-card h-100">
          <div class="card-body text-center">
            <h4 class="plan-title mb-3">{{ plan.name }}</h4>
            <p class="price-tag">{{ plan.price }} {{ plan.currency }}</p>
            <p class="text-light small mb-3">
              Duration: <strong>{{ plan.duration_days }} days</strong>
            </p>

            <ul class="list-unstyled text-secondary small text-start mt-3">
              <li
                v-for="(feature, i) in plan.features"
                :key="i"
                class="mb-1 border-bottom border-dark pb-1"
              >
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 🚫 No plans -->
    <div v-else class="text-center text-muted mt-5">
      <i class="bi bi-box2-heart fs-1 text-danger"></i>
      <p class="mt-3 fs-5 text-light">No subscription plans found.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowPlans",
  data() {
    return {
      plans: [],
      searchQuery: "",
      selectedPriceFilter: "",
      selectedDurationFilter: "",
    };
  },
  async created() {
    await this.fetchPlans();
  },
  computed: {
    filteredPlans() {
      return this.plans.filter((plan) => {
        const matchesSearch = plan.name
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        const matchesPrice =
          this.selectedPriceFilter === "" ||
          (this.selectedPriceFilter === "low" && plan.price < 200) ||
          (this.selectedPriceFilter === "medium" &&
            plan.price >= 200 &&
            plan.price <= 500) ||
          (this.selectedPriceFilter === "high" && plan.price > 500);

        const matchesDuration =
          this.selectedDurationFilter === "" ||
          (this.selectedDurationFilter === "short" &&
            plan.duration_days < 15) ||
          (this.selectedDurationFilter === "medium" &&
            plan.duration_days >= 15 &&
            plan.duration_days <= 30) ||
          (this.selectedDurationFilter === "long" && plan.duration_days > 30);

        return matchesSearch && matchesPrice && matchesDuration;
      });
    },
  },
  methods: {
    async fetchPlans() {
      try {
        const response = await axios.get(
          "https://anubis-subscriptionplan.onrender.com/api/v2/subscription_plans/"
        );
        this.plans = response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    },
  },
};
</script>

<style scoped>
/* keep your existing styles */
</style>
