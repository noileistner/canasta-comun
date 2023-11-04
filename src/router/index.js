import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

import AboutMe from "../views/AboutMe.vue";
import BasketNegatives from "../views/BasketNegatives.vue";
import ContactUs from "../views/ContactUs.vue";
import CreateAccount from "../views/CreateAccount.vue";
import CreateEvent from "../views/CreateEvent.vue";
import EventDetails from "../views/EventDetails.vue";
import HomePage from "../views/HomePage.vue";
import ProfilePage from "../views/ProfilePage.vue";
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
    meta: {
      requiresAuth: true,
    },
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
  {
    path: "/perfil",
    name: "ProfilePage",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blog",
    name: "BasketNegatives",
    component: BasketNegatives,
  },
  {
    path: "/detalles-evento/:id",
    name: "EventDetails",
    component: EventDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
}

async function handleBeforeEach(to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next({
        name: "SignIn",
      });
    }
  } else {
    next();
  }
}

router.beforeEach(handleBeforeEach);

export default router;
