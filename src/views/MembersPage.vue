<template>
  <div class="plans-container">
    <h1 class="page-title">👥 Manage Gym Members</h1>

    <div class="image-gallery">
      <!-- Trainees Management -->
      <figure class="gallery-item">
        <router-link to="/members/trainees" class="gallery-link">
          <div class="image-wrapper">
            <img
              src="https://placehold.co/300x300/69d2e7/000000?text=Trainees"
              alt="People working out"
              class="image"
              onerror="this.onerror=null; this.src='https://placehold.co/300x300/69d2e7/000000?text=Trainees';"
            />
            <div class="overlay">
              <span>View Trainees</span>
            </div>
          </div>
        </router-link>
        <figcaption class="image-caption">Trainees</figcaption>
      </figure>

      <!-- Coaches Management -->
      <figure class="gallery-item">
        <router-link to="/members/coaches" class="gallery-link">
          <div class="image-wrapper">
            <img
              src="https://placehold.co/300x300/fa6900/000000?text=Coaches"
              alt="A fitness coach training a client"
              class="image"
              onerror="this.onerror=null; this.src='https://placehold.co/300x300/fa6900/000000?text=Coaches';"
            />
            <div class="overlay">
              <span>View Coaches</span>
            </div>
          </div>
        </router-link>

        <figcaption class="image-caption">Coaches</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
// No script logic needed for this simple choice page
export default {
  name: "MembersPage",
};
</script>

<style scoped>
/* Use the same styles as your Plans page for consistency */
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
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 60px;
  letter-spacing: 1.5px;
}
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}
.gallery-item {
  text-align: center;
  transition: transform 0.4s ease;
}
.gallery-item:hover {
  transform: translateY(-10px);
}
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
</style>
