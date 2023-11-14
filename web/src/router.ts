import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import Monitors from "./pages/Monitors/Monitors.vue";
import SettingsVue from "./pages/Settings.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/app/monitors",
    component: Monitors,
  },
  {
    path: "/app/settings",
    component: SettingsVue,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

export const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(),
  routes,
});
