import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Explicitly define the app instance to satisfy the "app is not defined" lint rule.
const app = createApp(App);

app.use(router);

app.mount("#app");
