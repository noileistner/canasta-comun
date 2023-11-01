import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import AboutMe from "../views/AboutMe.vue";
import CreateEvent from "../views/CreateEvent.vue";
import ContactUs from "../views/ContactUs.vue";
import CreateAccount from "../views/CreateAccount.vue";
import SignIn from "../views/SignIn.vue";
import ProfilePage from "../views/ProfilePage.vue";
import BasketNegatives from "../views/BasketNegatives.vue";

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
  {
    path: "/perfil",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/blog",
    name: "BasketNegatives",
    component: BasketNegatives,
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
      reject
    );
  });
}

async function handleBeforeEach(to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you dont have access!");
      next("/");
    }
  } else {
    next();
  }
}

router.beforeEach(handleBeforeEach);

export default router;
