import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import CallPage from "./pages/CallPage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/about", name: "AboutPage", component: AboutPage },
  { path: "/connect", name: "CallPage", component: CallPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
