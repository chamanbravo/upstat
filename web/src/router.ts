import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import Monitors from "./pages/Monitors/Monitors.vue";
import MonitorDetails from "./pages/MonitorDetails/MonitorDetails.vue";
import MonitorEdit from "./pages/MonitorEdit/MonitorEdit.vue";
import Notifications from "./pages/Notifications/Notifications.vue";
import SettingsVue from "./pages/Settings/Settings.vue";

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
    path: "/app/monitors/:id",
    component: MonitorDetails,
  },
  {
    path: "/app/monitors/edit",
    component: MonitorEdit,
  },
  {
    path: "/app/notifications",
    component: Notifications,
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
