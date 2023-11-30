import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

import AboutMe from "../views/AboutMe.vue";
import CreateAccount from "../views/CreateAccount.vue";
import CreateEvent from "../views/CreateEvent.vue";
import EditEvent from "../views/EditEvent.vue";
import EditProfile from "../views/EditProfile.vue";
import EventDetails from "../views/EventDetails.vue";
import HomePage from "../views/HomePage.vue";
import PageNotFound from "../views/PageNotFound.vue";
import ProfilePage from "../views/ProfilePage.vue";
import SignIn from "../views/SignIn.vue";

const eventRoutes = [
  {
    path: "/crear-partido",
    name: "CreateEvent",
    component: CreateEvent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/eventos/:id",
    name: "EventDetails",
    component: EventDetails,
  },
  {
    path: "/eventos/:id/editar",
    name: "EditEvent",
    component: EditEvent,
    meta: {
      requiresAuth: true,
    },
  },
];

const accountRoutes = [
  {
    path: "/perfil-editar",
    name: "EditProfile",
    component: EditProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/crear-cuenta",
    name: "CreateAccount",
    component: CreateAccount,
  },
];

const userRoutes = [
  {
    path: "/usuarios/:id",
    name: "ProfilePage",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
];

const sessionRoutes = [
  {
    path: "/iniciar-sesion",
    name: "SignIn",
    component: SignIn,
  },
];

const routes = [
  ...eventRoutes,
  ...accountRoutes,
  ...userRoutes,
  ...sessionRoutes,

  { path: "/", name: "HomePage", component: HomePage },
  {
    path: "/sobre",
    name: "AboutMe",
    component: AboutMe,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
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
