<template>
  <div class="plans-container">
    <h1 class="page-title">Manage Your Plans</h1>

    <div class="image-gallery">
      <!-- Create Plan -->
      <figure class="gallery-item">
        <router-link to="/createplan" class="gallery-link">
          <div class="image-wrapper">
            <img
              src="../assets/image 2.jpg"
              alt="Person writing a plan"
              class="image"
            />
            <div class="overlay">
              <span>Create Plan</span>
            </div>
          </div>
        </router-link>
        <figcaption class="image-caption">Create a Plan</figcaption>
      </figure>

      <!-- Edit Plan -->
      <figure class="gallery-item">
        <router-link to="/editplan/1" class="gallery-link">
          <div class="image-wrapper">
            <img
              src="../assets/image 3.jpg"
              alt="Person editing a plan on a tablet"
              class="image"
            />
            <div class="overlay">
              <span>Edit Plan</span>
            </div>
          </div>
        </router-link>

        <figcaption class="image-caption">Edit Plan</figcaption>
      </figure>

      <!-- Show Plans -->
      <figure class="gallery-item">
        <router-link to="/showplans" class="gallery-link">
          <div class="image-wrapper">
            <img
              src="../assets/image1.jpg"
              alt="Multiple plans laid out on a table"
              class="image"
            />
            <div class="overlay">
              <span>Show Plans</span>
            </div>
          </div>
        </router-link>
        <figcaption class="image-caption">Show Plans</figcaption>
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    editPlan(planId) {
      this.$router.push({ name: "EditPlanPage", params: { planId } });
    },
  },
};
</script>
<style scoped>
/* --- Container Styling --- */
.plans-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #000000, #2c3e50, #111);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

/* --- Title --- */
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 60px;
  letter-spacing: 1.5px;
}

/* --- Gallery --- */
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}

/* --- Each Item --- */
.gallery-item {
  text-align: center;
  transition: transform 0.4s ease;
}

.gallery-item:hover {
  transform: translateY(-10px);
}

/* --- Image Wrapper with Overlay --- */
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  transition: all 0.4s ease-in-out;
}

/* --- Overlay on Hover --- */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.4s ease;
  border-radius: 20px;
}

.overlay span {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.image-wrapper:hover .image {
  transform: scale(1.05);
  filter: brightness(0.8);
}

/* --- Caption --- */
.image-caption {
  font-size: 1.3rem;
  margin-top: 15px;
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .image {
    width: 250px;
    height: 250px;
  }
  .image-caption {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .image {
    width: 200px;
    height: 200px;
  }
  .page-title {
    font-size: 2rem;
  }
  .image-caption {
    font-size: 1rem;
  }
}
</style>
