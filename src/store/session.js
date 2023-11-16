import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  const currentUser = ref(null);

  function setCurrentUser(user) {
    currentUser.value = user;
  }

  const isLoggedIn = computed(() => currentUser.value);

  return {
    // state
    isLoggedIn,
    currentUser,

    // actions
    setCurrentUser,
  };
});
