import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SubscriptionPage from "@/views/SubscriptionPage.vue";
import CreatePlan from "@/views/CreatePlan.vue";
import EditPlan from "@/views/EditPlan.vue";
import ShowPlans from "@/views/ShowPlans.vue";
import PostsPage from "@/views/PostsPage.vue";
import ActivateUser from "@/views/ActivateUser.vue";

// NEW: Imports for Members pages
import MembersPage from "@/views/MembersPage.vue";
import TraineesList from "@/views/TraineesList.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/subscription",
    name: "subscription",
    component: SubscriptionPage,
  },
  {
    path: "/createplan",
    name: "createPlan",
    component: CreatePlan,
  },
  {
    path: "/posts",
    name: "PostsPage",
    component: PostsPage,
  },
  {
    path: "/activate",
    name: "ActivateUser",
    component: ActivateUser,
  },
  {
    path: "/showplans",
    name: "showPlans",
    component: ShowPlans,
  },

  {
    path: "/editplan/:planId",
    name: "EditPlanPage",
    component: EditPlan,
    props: true,
  },

  // --- NEW MEMBERS ROUTES ---

  // 1. Members Index (Choice Page)
  {
    path: "/members",
    name: "members",
    component: MembersPage,
  },
  // 2. Trainees List (Connects to API)
  {
    path: "/members/trainees",
    name: "traineesList",
    component: TraineesList,
  },
  // 3. Coaches List (Placeholder fixed to use HomeView)
  {
    path: "/members/coaches",
    name: "coachesList",
    component: HomeView, // Using HomeView as a guaranteed existing component
  },

  // --- END NEW MEMBERS ROUTES ---

  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
