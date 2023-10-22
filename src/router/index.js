// Composables
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutMe from "../views/AboutMe.vue";
import CreateEvent from "../views/CreateEvent.vue";
import ContactUs from "../views/ContactUs.vue";
import CreateAccount from "../views/CreateAccount.vue";
import SignIn from "../views/SignIn.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  {
    path: "/sobre",
    name: "AboutMe",
    component: AboutMe,
  },
  {
    path: "/crear-partido",
    name: "CreateEvent",
    component: CreateEvent,
  },
  {
    path: "/contactanos",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/crear-cuenta",
    name: "CreateAccount",
    component: CreateAccount,
  },
  {
    path: "/iniciar-sesion",
    name: "SignIn",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
