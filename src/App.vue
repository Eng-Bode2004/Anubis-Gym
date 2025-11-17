<template>
  <div class="d-flex">
    <SideBar />
    <div class="flex-grow-1">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  components: { SideBar },
};
</script>

<style>
body {
  margin: 0;
  background: linear-gradient(135deg, #000000, #2c3e50, #111);
}
</style>
