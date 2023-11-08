<script setup>
import Footer from "./components/AppFooter.vue";
import NavBar from "./components/NavBar.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { useSessionStore } from "./store/session";

const { setIsLoggedIn } = useSessionStore();

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
});
</script>

<template>
  <NavBar />
  <RouterView></RouterView>
  <Footer></Footer>
</template>
