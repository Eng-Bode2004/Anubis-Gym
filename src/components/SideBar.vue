<template>
  <aside
    class="anubis-sidebar d-flex flex-column flex-shrink-0 p-3 vh-100 shadow-lg"
  >
    <a
      href="#"
      class="d-flex align-items-center brand-link pb-3 mb-md-0 me-md-auto text-decoration-none"
    >
      <img
        src="../assets/Logo.jpg"
        alt="Anubis Gym Logo"
        width="45"
        class="me-3 rounded-circle border border-secondary"
      />
      <span class="brand-title fs-4 fw-bold">Anubis Gym</span>
    </a>
    <hr class="sidebar-divider" />

    <ul class="nav nav-pills flex-column mb-auto sidebar-nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active">
          <i class="bi bi-speedometer2 me-3 nav-icon"></i>
          Dashboard
        </router-link>
      </li>

      <li>
        <router-link to="/subscription" class="nav-link" active-class="active">
          <i class="bi bi-person-badge me-3 nav-icon"></i> Subscriptions
        </router-link>
      </li>

      <li>
        <router-link to="/activate " class="nav-link" active-class="active">
          <i class="bi bi-person-bounding-box me-3 nav-icon"></i> Activate user
        </router-link>
      </li>

      <li>
        <router-link to="/posts" class="nav-link" active-class="active">
          <i class="bi bi-file-earmark-post-fill me-3 nav-icon"></i> Posts
        </router-link>
      </li>
      <li>
        <router-link to="/inventory" class="nav-link" active-class="active">
          <i class="bi bi-boxes me-3 nav-icon"></i> Equipment Inventory
        </router-link>
      </li>
      <li>
        <!-- UPDATED: Now links to /members index page -->
        <router-link to="/members" class="nav-link" active-class="active">
          <i class="bi bi-people-fill me-3 nav-icon"></i> Members
        </router-link>
      </li>
      <li>
        <router-link to="/delivery" class="nav-link" active-class="active">
          <i class="bi bi-truck-flatbed me-3 nav-icon"></i> Deliveries
        </router-link>
      </li>
      <li>
        <router-link to="/notifications" class="nav-link" active-class="active">
          <i class="bi bi-bell-fill me-3 nav-icon"></i> Alerts
        </router-link>
      </li>
      <li>
        <router-link to="/chats" class="nav-link" active-class="active">
          <i class="bi bi-chat-left-text-fill me-3 nav-icon"></i> Messages
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="nav-link" active-class="active">
          <i class="bi bi-gear-fill me-3 nav-icon"></i> Settings
        </router-link>
      </li>
    </ul>

    <div class="mt-auto pt-3 border-top d-flex align-items-center">
      <img
        src="../assets/Logo.jpg"
        alt="User Avatar"
        width="32"
        class="rounded-circle me-2"
      />
      <small class="text-light">Admin User</small>
      <i
        class="bi bi-box-arrow-right ms-auto text-light logout-icon"
        title="Logout"
      ></i>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");

.anubis-sidebar {
  width: 280px;
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: "Montserrat", sans-serif;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); /* More pronounced shadow */
  border-right: 1px solid rgba(255, 255, 255, 0.05); /* Subtle border */
  position: sticky; /* Keep it in place */
  top: 0;
  left: 0;
  overflow-y: auto; /* Enable scrolling for long lists */
  z-index: 1000; /* Ensure it stays above other content */
}

.anubis-sidebar::-webkit-scrollbar {
  width: 8px;
}
.anubis-sidebar::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 10px;
}
.anubis-sidebar::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 10px;
}
.anubis-sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.brand-link {
  padding-bottom: 1.5rem !important; /* More space below logo */
}

.brand-title {
  font-family: "Montserrat", sans-serif; /* Consistent with body, but bold */
  background: linear-gradient(
    45deg,
    #ff416c,
    #ff4b2b
  ); /* Stronger, energetic gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 1.6rem !important; /* Larger for impact */
  letter-spacing: 0.5px;
}

.sidebar-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Lighter, subtle divider */
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.sidebar-nav {
  padding-top: 0.5rem;
}

.nav-link {
  color: #c0c0c0; /* Slightly darker default text */
  padding: 0.8rem 1rem; /* More vertical padding for comfort */
  margin-bottom: 0.5rem; /* Space between links */
  border-radius: 0.75rem; /* Slightly more rounded corners */
  transition: all 0.2s ease-in-out; /* Smooth transitions */
  display: flex; /* Align icon and text vertically */
  align-items: center;
  font-weight: 500;
}

.nav-icon {
  font-size: 1.2rem; /* Slightly larger icon size */
  color: #888; /* Muted icon color by default */
  transition: color 0.2s ease-in-out;
}

.nav-link:hover {
  background-color: rgba(
    255,
    255,
    255,
    0.08
  ); /* Subtle light background on hover */
  color: #ffffff; /* White text on hover */
  transform: translateX(5px); /* Gentle slide effect */
}

.nav-link:hover .nav-icon {
  color: #ff416c; /* Accent color for icon on hover */
}

.nav-link.active {
  background: linear-gradient(
    90deg,
    #ff416c,
    #ff4b2b
  ); /* Vibrant gradient for active state */
  color: #ffffff !important; /* White text for active */
  box-shadow: 0 4px 15px rgba(255, 65, 108, 0.4); /* Glow effect for active */
  font-weight: 600;
}

.nav-link.active .nav-icon {
  color: #ffffff; /* White icon for active */
}

.logout-icon {
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.logout-icon:hover {
  color: #ff416c !important; /* Highlight on hover */
}
</style>
