import { ref } from "vue";
import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", () => {
  const isLoggedIn = ref(false);

  function setIsLoggedIn(loggedIn) {
    isLoggedIn.value = loggedIn;
  }

  return {
    // state
    isLoggedIn,

    // actions
    setIsLoggedIn,
  };
});
