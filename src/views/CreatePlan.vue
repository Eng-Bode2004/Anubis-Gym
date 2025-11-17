<template>
  <div class="admin-plan-container">
    <h1 class="page-title">💎 Manage Subscription Plans</h1>
    <!-- <p class="page-subtitle">
      Effortlessly create, edit, or manage gym subscription plans.
    </p> -->

    <!-- 🧾 Plan Form Section -->
    <div class="plan-form-card glass-card">
      <form @submit.prevent="savePlan" class="plan-form">
        <div class="form-group">
          <label class="form-label">Plan Name</label>
          <input
            v-model="currentPlan.name"
            type="text"
            class="form-input"
            placeholder="e.g., Premium Monthly"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group col-half">
            <label class="form-label">Price (EGP)</label>
            <input
              v-model="currentPlan.price"
              type="number"
              class="form-input"
              placeholder="e.g., 299"
              required
            />
          </div>

          <div class="form-group col-half">
            <label class="form-label">Duration (Days)</label>
            <input
              v-model="currentPlan.duration_days"
              type="number"
              class="form-input"
              placeholder="e.g., 30"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea
            v-model="currentPlan.description"
            class="form-textarea"
            placeholder="Briefly describe what this plan offers..."
          ></textarea>
        </div>

        <div class="form-row align-start">
          <div class="form-group col-half">
            <label class="form-label">Support Level</label>
            <select v-model="currentPlan.support_level" class="form-select">
              <option value="basic">Basic Support</option>
              <option value="standard">Standard Support</option>
              <option value="premium">Premium Support</option>
              <option value="24/7">24/7 Support</option>
            </select>
          </div>

          <!-- ✅ Multi-feature input -->
          <div class="form-group col-half">
            <label class="form-label">Add Features</label>
            <div class="feature-input-group">
              <input
                v-model="newFeature"
                type="text"
                class="form-input feature-input"
                placeholder="Enter a feature..."
              />
              <button type="button" @click="addFeature" class="add-feature-btn">
                +
              </button>
            </div>

            <!-- ✅ Fixed length error -->
            <ul
              v-if="currentPlan.features && currentPlan.features.length"
              class="feature-list"
            >
              <li
                v-for="(feature, index) in currentPlan.features"
                :key="index"
                class="feature-item"
              >
                {{ feature }}
                <button
                  type="button"
                  @click="removeFeature(index)"
                  class="remove-feature-btn"
                >
                  ✖
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button type="submit" class="submit-btn">
          <i class="bi bi-save2"></i> Save Plan
        </button>
      </form>
    </div>

    <!-- 📋 Existing Plans Section -->
    <div class="existing-plans-section glass-card mt-5">
      <h2 class="section-title">📦 Existing Plans</h2>

      <div v-if="plans.length === 0" class="empty-state">
        <i class="bi bi-clipboard2-x fs-1"></i>
        <p>No plans created yet. Add your first one above!</p>
      </div>

      <div v-else class="row g-4">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="col-md-6 col-lg-4 d-flex"
        >
          <div class="plan-card">
            <h4 class="plan-name">{{ plan.name }}</h4>
            <p class="plan-price">{{ plan.price }} EGP</p>
            <p class="plan-duration">{{ plan.duration_days }} Days</p>
            <p class="plan-desc">{{ plan.description }}</p>

            <ul v-if="plan.features?.length" class="features-list">
              <li v-for="feature in plan.features" :key="feature">
                {{ feature }}
              </li>
            </ul>

            <div class="plan-buttons">
              <!-- ✅ Fixed edit function -->
              <button
                @click="editPlan(plan.id)"
                class="btn btn-outline-primary btn-sm"
              >
                <i class="bi bi-pencil-square"></i> Edit
              </button>

              <button
                @click="deletePlan(plan.id)"
                class="btn btn-outline-danger btn-sm"
              >
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPlan: {
        id: null,
        name: "",
        price: null,
        description: "",
        duration_days: null,
        support_level: "basic",
        features: [],
      },
      newFeature: "",
      plans: [],
    };
  },
  created() {
    this.loadPlans();
  },
  methods: {
    loadPlans() {
      const stored =
        JSON.parse(localStorage.getItem("subscriptionPlans")) || [];
      this.plans = stored;
    },
    addFeature() {
      const feature = this.newFeature.trim();
      if (feature && !this.currentPlan.features.includes(feature)) {
        this.currentPlan.features.push(feature);
        this.newFeature = "";
      }
    },
    removeFeature(index) {
      this.currentPlan.features.splice(index, 1);
    },
    savePlan() {
      const newPlan = {
        ...this.currentPlan,
        id: this.currentPlan.id || Date.now(),
      };

      const index = this.plans.findIndex((p) => p.id === newPlan.id);
      if (index !== -1) this.plans[index] = newPlan;
      else this.plans.push(newPlan);

      localStorage.setItem("subscriptionPlans", JSON.stringify(this.plans));
      this.resetForm();
      alert("✅ Plan saved successfully!");
    },
    deletePlan(id) {
      if (confirm("Are you sure you want to delete this plan?")) {
        this.plans = this.plans.filter((p) => p.id !== id);
        localStorage.setItem("subscriptionPlans", JSON.stringify(this.plans));
      }
    },
    editPlan(planId) {
      this.$router.push({ name: "EditPlanPage", params: { planId } });
    },
    resetForm() {
      this.currentPlan = {
        id: null,
        name: "",
        price: null,
        description: "",
        duration_days: null,
        support_level: "basic",
        features: [],
      };
      this.newFeature = "";
    },
  },
};
</script>

<style scoped>
/* نفس الألوان والستايل الأصلي */
.admin-plan-container {
  padding: 60px 20px;
  background: linear-gradient(135deg, #000000, #2c3e50, #111);
  min-height: 100vh;
  color: white;
  text-align: center;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #ff3c3c, #ff914d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 18px;
  text-align: left;
}

.form-label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #000000, #2c3e50, #111);

  color: rgb(255, 252, 252);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  background: rgba(0, 0, 0, 0.2);
  background-color: #cfcbcb;
  outline: none;
  color: #000000;
}

.feature-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.add-feature-btn {
  background: linear-gradient(90deg, #ff3c3c, #ff914d);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-feature-btn:hover {
  transform: scale(1.1);
}

.feature-list {
  margin-top: 10px;
  list-style: none;
  padding: 0;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px 12px;
  margin: 5px 0;
  border-radius: 8px;
}

.remove-feature-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn {
  width: 25%;
  background: linear-gradient(90deg, #ff3c3c, #ff914d);
  border: none;
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 100, 100, 0.4);
}

.section-title {
  font-size: 2rem;
  margin-bottom: 25px;
  background: linear-gradient(90deg, #ff3c3c, #ff914d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.plan-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 25px;
  width: 100%;
  text-align: left;
  transition: 0.3s;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(255, 255, 255, 0.1);
}

.plan-name {
  color: #ffb3b3;
  font-size: 1.4rem;
  font-weight: 600;
}

.plan-price,
.plan-duration {
  color: #ddd;
  font-size: 0.95rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.features-list li {
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.plan-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.empty-state {
  color: #aaa;
  margin-top: 20px;
}
</style>
