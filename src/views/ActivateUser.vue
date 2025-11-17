<template>
  <div class="container py-5">
    <!-- Header -->
    <div class="text-center mb-5">
      <h2 class="gradient-text fw-bold display-6">User Activation Panel</h2>
      <!-- <p class="text-muted">
        Review user payment receipts and activate or deactivate subscriptions.
      </p> -->
    </div>

    <!-- Users Table -->
    <div class="card glass-card border-0 shadow-lg p-4 rounded-4">
      <h4 class="fw-semibold mb-4">Pending User Requests</h4>

      <div v-if="users.length === 0" class="text-center text-muted py-4">
        No pending requests yet.
      </div>

      <div v-else class="table-responsive">
        <table class="table align-middle table-hover text-center text-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID Number</th>
              <th>Receipt</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.idNumber }}</td>
              <td>
                <a
                  :href="user.receipt"
                  target="_blank"
                  class="text-info fw-semibold"
                  >View Receipt</a
                >
              </td>
              <td>
                <span
                  class="badge rounded-pill px-3 py-2"
                  :class="user.active ? 'bg-success' : 'bg-secondary'"
                >
                  {{ user.active ? "Active" : "Inactive" }}
                </span>
              </td>
              <td>
                <button
                  class="btn btn-outline-success btn-sm me-2"
                  @click="toggleStatus(index, true)"
                  :disabled="user.active"
                >
                  <i class="bi bi-check-circle"></i> Activate
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="toggleStatus(index, false)"
                  :disabled="!user.active"
                >
                  <i class="bi bi-x-circle"></i> Deactivate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card glass-card border-0 shadow-lg p-4 mt-5 rounded-4">
      <h4 class="fw-semibold mb-4">Add User manually</h4>
      <form @submit.prevent="addUser">
        <div class="row g-3">
          <div class="col-md-4">
            <input
              v-model="newUser.name"
              class="form-control custom-input"
              placeholder="User Name"
              required
            />
          </div>
          <div class="col-md-4">
            <input
              v-model="newUser.idNumber"
              class="form-control custom-input"
              placeholder="National ID"
              required
            />
          </div>
          <div class="col-md-4">
            <input
              type="file"
              class="form-control custom-input"
              @change="onReceiptUpload"
              required
            />
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-gradient px-5 py-2 fw-semibold">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);
const newUser = ref({
  name: "",
  idNumber: "",
  receipt: "",
  active: false,
});

const onReceiptUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      newUser.value.receipt = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const addUser = () => {
  const newEntry = {
    id: Date.now(),
    ...newUser.value,
    active: false,
  };
  users.value.push(newEntry);
  localStorage.setItem("usersList", JSON.stringify(users.value));
  newUser.value = { name: "", idNumber: "", receipt: "", active: false };
  alert("User added successfully!");
};

const toggleStatus = (index, activate) => {
  users.value[index].active = activate;
  localStorage.setItem("usersList", JSON.stringify(users.value));
};

onMounted(() => {
  const stored = localStorage.getItem("usersList");
  if (stored) users.value = JSON.parse(stored);
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-gradient {
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  color: white;
  border: none;
  border-radius: 50px;
  transition: all 0.3s ease;
}
.btn-gradient:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  color: white;
}

.custom-input {
  border-radius: 12px;
  border: none;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
.custom-input:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  color: white;
}

.table {
  color: #fff;
}
.table thead {
  background: rgba(255, 255, 255, 0.1);
}
</style>
