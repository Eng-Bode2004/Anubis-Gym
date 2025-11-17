<template>
  <div class="trainees-container py-5">
    <h2 class="page-title fw-bold display-6">🏋️ All Trainee Profiles</h2>
    <p class="text-muted mb-5">
      Review detailed profiles of all active gym members.
    </p>

    <div v-if="isLoading" class="text-center py-5 text-light">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Fetching trainee data...</p>
    </div>

    <div v-else-if="error" class="text-center py-5 text-danger">
      <i class="bi bi-exclamation-triangle-fill fs-1"></i>
      <p class="mt-3">Error loading data: {{ error }}</p>
    </div>

    <div v-else-if="trainees.length === 0" class="text-center py-5 text-muted">
      <i class="bi bi-person-x fs-1"></i>
      <p class="mt-3">No trainee profiles found.</p>
    </div>

    <div v-else class="row g-4 justify-content-center">
      <div
        v-for="trainee in trainees"
        :key="trainee._id"
        class="col-md-6 col-lg-4 d-flex"
      >
        <div class="card trainee-card h-100 shadow-lg p-3">
          <div class="d-flex align-items-center mb-3">
            <img
              :src="
                trainee.profile_Image ||
                'https://via.placeholder.com/100/1e2b34/ffffff?text=User'
              "
              alt="Profile Image"
              class="rounded-circle profile-img me-3"
            />
            <div>
              <h5 class="card-title mb-0 gradient-text">
                {{ trainee.name.first_name }} {{ trainee.name.last_name }}
              </h5>
              <span class="text-light small"
                >{{ trainee.gender }} | Age: {{ trainee.age }}</span
              >
            </div>
          </div>

          <div class="card-body p-0">
            <ul class="list-unstyled detail-list">
              <li>
                <i class="bi bi-star-fill me-2 text-warning"></i>
                Effort Level: <strong>{{ trainee.effort_level }}</strong>
              </li>
              <li>
                <i class="bi bi-calendar-check me-2 text-info"></i>
                Attendance: <strong>{{ trainee.gone_Days || 0 }} days</strong>
              </li>
              <li v-if="trainee.SubscriptionPlan">
                <i class="bi bi-lightning-charge-fill me-2 text-danger"></i>
                Plan: <strong>{{ trainee.SubscriptionPlan.name }}</strong>
              </li>
              <li v-else>
                <i class="bi bi-slash-circle me-2 text-secondary"></i>
                Plan: <span class="text-danger">Not Assigned</span>
              </li>
            </ul>
          </div>
          <div class="card-footer bg-transparent border-0 pt-3 text-end">
            <button class="btn btn-sm btn-outline-light me-2">
              <i class="bi bi-pencil"></i> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL =
  "https://anubis-traineeprofile-services.onrender.com/api/v2/trainee_profile/";

const trainees = ref([]);
const isLoading = ref(false);
const error = ref(null);

const fetchTrainees = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data (Status: ${response.status})`);
    }
    const data = await response.json();

    // Assuming the profiles are in the 'data' property
    trainees.value = data.data || [];
  } catch (err) {
    console.error("Fetch Error:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTrainees();
});
</script>

<style scoped>
.trainees-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000, #2c3e50, #111);
  color: #fff;
}
.page-title {
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.trainee-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.trainee-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}
.profile-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 3px solid #ff416c;
}
.detail-list li {
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
}
.gradient-text {
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
