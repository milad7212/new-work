import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import CallPage from "./pages/CallPage.vue";
import BlogPage from "./pages/BlogPage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/about", name: "AboutPage", component: AboutPage },
  { path: "/connect", name: "CallPage", component: CallPage },
  { path: "/blog", name: "BlogPage", component: BlogPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
