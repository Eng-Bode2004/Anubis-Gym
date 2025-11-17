<template>
  <div class="container py-5">
    <!-- Header -->
    <div class="text-center mb-5">
      <h2 class="gradient-text fw-bold display-6">Posts&Events</h2>
    </div>

    <!-- Upload Image Form -->
    <div class="card shadow-sm mb-5 rounded-4">
      <div class="card-body p-4">
        <h4 class="fw-semibold mb-4 text-light">Upload Image</h4>
        <form @submit.prevent="addPost">
          <div class="row g-4">
            <div class="col-md-12">
              <label class="form-label fw-semibold text-light"
                >Select Image</label
              >
              <input
                type="file"
                class="form-control custom-input"
                @change="onFileChange"
                required
              />
            </div>

            <div class="col-12 text-center" v-if="newPost.preview">
              <img
                :src="newPost.preview"
                class="img-fluid rounded-4 shadow-sm mt-3"
                style="max-height: 250px; object-fit: cover"
              />
            </div>

            <div class="col-12 text-center mt-4">
              <button
                type="submit"
                class="btn btn-gradient px-5 py-2 fw-semibold"
                :disabled="isLoading"
              >
                {{ isLoading ? "Uploading..." : "Upload" }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Images List -->
    <div>
      <h4 class="fw-semibold mb-4 gradient-text">All Uploaded Images</h4>
      <div
        v-if="posts.length === 0 && !isLoading"
        class="text-center py-4"
        style="color: antiquewhite"
      >
        No images yet — upload one above.
      </div>
      <div v-else-if="isLoading" class="text-center py-4 text-light">
        Loading posts...
      </div>

      <div class="row g-4">
        <div
          v-for="(post, index) in posts"
          :key="post._id || index"
          class="col-md-4 col-sm-6"
        >
          <div class="card border-0 shadow-lg h-100 rounded-4 post-card">
            <img
              :src="post.Post_url"
              class="card-img-top rounded-top-4"
              style="height: 250px; object-fit: cover"
            />
            <div class="card-footer bg-transparent border-0 text-center pb-4">
              <button
                class="btn btn-outline-danger btn-sm px-3"
                @click="deletePost(post._id)"
                :disabled="isLoading"
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

<script setup>
import { ref, onMounted } from "vue";

// --- API Endpoints ---
// API to upload the image file
const IMAGE_UPLOAD_URL =
  "https://anubis-imageservices.onrender.com/api/v1/images/posts";
// API to create the post record with the image URL
const POST_CREATE_URL = "https://anubis-posts.onrender.com/api/v2/posts/upload";
// Base API for fetching and deleting posts
const POSTS_BASE_URL = "https://anubis-posts.onrender.com/api/v2/posts/";

// --- State ---
const posts = ref([]);
const newPost = ref({
  image: null,
  preview: "",
});
const isLoading = ref(false);

// --- Handlers ---

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    newPost.value.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      newPost.value.preview = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    newPost.value.image = null;
    newPost.value.preview = "";
  }
};

const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(POSTS_BASE_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Assuming the posts are an array in the 'data' property of the response
    posts.value = data.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Could not load posts. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};

const addPost = async () => {
  if (!newPost.value.image) {
    alert("Please select an image to upload.");
    return;
  }

  isLoading.value = true;

  try {
    // 1. Upload the image file (multipart/form-data)
    const formData = new FormData();
    formData.append("image", newPost.value.image);

    const imageResponse = await fetch(IMAGE_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!imageResponse.ok) {
      const errorData = await imageResponse.json();
      throw new Error(
        errorData.message || "Failed to upload image to image service."
      );
    }

    const imageData = await imageResponse.json();
    const imageUrl = imageData.data.URL;

    // 2. Create the post with the received image URL (JSON)
    const postData = {
      Post_url: imageUrl,
    };

    const postResponse = await fetch(POST_CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.message || "Failed to create post record.");
    }

    // 3. Success: Reset form and refresh the list
    alert("✅ Post created and image uploaded successfully!");
    newPost.value = { image: null, preview: "" };
    // Reload the list from the API to show the new post
    await fetchPosts();
  } catch (error) {
    console.error("Post upload error:", error);
    alert(`Upload failed: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const deletePost = async (id) => {
  if (!id) {
    console.error("Post ID is missing for deletion.");
    return;
  }
  // Confirmation dialog
  if (!confirm("Are you sure you want to permanently delete this post?"))
    return;

  isLoading.value = true;

  try {
    // Sending DELETE request to the confirmed endpoint:
    // https://anubis-posts.onrender.com/api/v2/posts/{id}
    const response = await fetch(`${POSTS_BASE_URL}${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      // Throw an error if the status code is not 2xx
      throw new Error(`Failed to delete post. Status: ${response.status}`);
    }

    alert("❌ Post deleted successfully!");
    // Reload the list from the API
    await fetchPosts();
  } catch (error) {
    console.error("Delete post error:", error);
    alert(`Deletion failed: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

// --- Lifecycle Hook ---
onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.card {
  background: linear-gradient(135deg, #000000, #2c3e50, #111);
  border: 1px solid #ff3b3b;
}
.gradient-text {
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.btn-gradient {
  background: linear-gradient(90deg, #ff0000, #8b0000);
  color: #fff;
  border: none;
  transition: 0.3s ease;
  border-radius: 50px;
}
.btn-gradient:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
}
.custom-input {
  border-radius: 12px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  transition: 0.3s;
}
.custom-input:focus {
  border-color: #ee0979;
  box-shadow: 0 0 0 0.2rem rgba(238, 9, 121, 0.1);
}
.post-card {
  transition: all 0.3s ease;
}
.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(238, 9, 121, 0.2);
}
</style>
