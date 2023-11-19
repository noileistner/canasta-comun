<script setup>
import Footer from "./components/AppFooter.vue";
import NavBar from "./components/NavBar.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { useSessionStore } from "./store/session";
import { useUserStore } from "./store/user";

const { setCurrentUser } = useSessionStore();
const { findByEmail } = useUserStore();

async function handleAuthStateChanged(session) {
  // if there is a session the user has authenticated
  if (session) {
    const user = await findByEmail(session.email);
    setCurrentUser(user);
  }
  // otherwise user has signed out
  else {
    setCurrentUser(null);
  }
}

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, handleAuthStateChanged);
});
</script>

<template>
  <NavBar />
  <RouterView></RouterView>
  <Footer></Footer>
</template>
