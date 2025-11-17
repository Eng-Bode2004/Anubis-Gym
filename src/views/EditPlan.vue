<template>
  <div v-if="currentPlan" class="edit-plan-wrapper">
    <div class="edit-card shadow">
      <h2 class="title">
        <i class="fas fa-pen-to-square me-2"></i> Edit Subscription Plan
      </h2>
      <p class="subtitle">
        Update your plan details and click save to confirm changes.
      </p>

      <form @submit.prevent="updatePlan" class="form-area">
        <div class="form-group">
          <label>Plan Name</label>
          <input
            v-model="currentPlan.name"
            type="text"
            class="form-control"
            placeholder="Enter plan name"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Price ($)</label>
            <input
              v-model.number="currentPlan.price"
              type="number"
              class="form-control"
              placeholder="Enter price"
            />
          </div>

          <div class="form-group">
            <label>Duration (Days)</label>
            <input
              v-model.number="currentPlan.duration"
              type="number"
              class="form-control"
              placeholder="Enter duration"
            />
          </div>
        </div>

        <!-- Multiple Features Section -->
        <div class="form-group">
          <label>Features</label>
          <div class="features-list">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="feature-item"
            >
              <input
                v-model="features[index]"
                type="text"
                class="form-control"
                placeholder="Enter feature"
              />
              <button
                type="button"
                class="btn remove-feature"
                @click="removeFeature(index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <button type="button" class="btn add-feature" @click="addFeature">
              <i class="fas fa-plus"></i> Add Feature
            </button>
          </div>
        </div>

        <div class="buttons">
          <button type="submit" class="btn save-btn">
            <i class="fas fa-save me-2"></i> Save Changes
          </button>
          <button type="button" class="btn cancel-btn" @click="goBack">
            <i class="fas fa-arrow-left me-2"></i> Back
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Loading plan details...</p>
  </div>
</template>

<script>
export default {
  name: "EditPlan",
  props: ["planId"],
  data() {
    return {
      currentPlan: null,
      features: [],
    };
  },
  created() {
    const storedPlans =
      JSON.parse(localStorage.getItem("subscriptionPlans")) || [];
    const foundPlan = storedPlans.find((p) => p.id === this.planId);

    if (!foundPlan) {
      alert("Plan not found!");
      this.$router.push({ name: "createPlan" });
      return;
    }

    this.currentPlan = { ...foundPlan };
    this.features = [...(foundPlan.features || [])];
  },
  methods: {
    addFeature() {
      this.features.push("");
    },
    removeFeature(index) {
      this.features.splice(index, 1);
    },
    updatePlan() {
      const storedPlans =
        JSON.parse(localStorage.getItem("subscriptionPlans")) || [];
      const index = storedPlans.findIndex((p) => p.id === this.currentPlan.id);

      if (index !== -1) {
        storedPlans[index] = {
          ...this.currentPlan,
          features: this.features.filter((f) => f.trim() !== ""),
        };

        localStorage.setItem("subscriptionPlans", JSON.stringify(storedPlans));

        alert("✅ Plan updated successfully!");
        this.$router.push({ name: "subscription" });
      }
    },
    goBack() {
      this.$router.push({ name: "subscription" });
    },
  },
};
</script>

<style scoped>
/* نفس التنسيق القديم بالضبط */
.edit-plan-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #000000, #2c3e50, #111);
  padding: 40px 20px;
}

.edit-card {
  background: #fff;
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  padding: 30px 40px;
  transition: all 0.3s ease;
  position: relative;
}

.edit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 1.7rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ff0000, #8b0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #6c757d;
  margin-bottom: 25px;
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 5px;
}

.form-control {
  border-radius: 10px;
  padding: 10px 14px;
  border: 1px solid #ced4da;
  transition: 0.2s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.15);
  outline: none;
}

.form-row {
  display: flex;
  gap: 15px;
}

textarea.form-control {
  resize: none;
}

/* Feature Section */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.add-feature {
  background: linear-gradient(90deg, #ff0000, #8b0000);
  color: white;
  margin-top: 8px;
  width: 25%;
}

.add-feature:hover {
  transform: scale(1.03);
}

.remove-feature {
  background: #b30202;
  color: #000000;
  padding: 10px;
  border-radius: 8px;
}

.remove-feature:hover {
  transform: scale(1.05);
}

/* Buttons */
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.btn {
  flex: 1;
  margin: 0 5px;
  border: none;
  border-radius: 10px;
  padding: 12px 15px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.save-btn {
  background: linear-gradient(90deg, #ff0000, #8b0000);
  color: #fff;
}

.save-btn:hover {
  transform: scale(1.02);
}

.cancel-btn {
  background: #dee2e6;
  color: #000000;
}

.cancel-btn:hover {
  transform: scale(1.02);
  color: #ff0000;
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 45px;
  height: 45px;
  border: 4px solid #dee2e6;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading p {
  margin-top: 15px;
  color: #6c757d;
}
</style>
