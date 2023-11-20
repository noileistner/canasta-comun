import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  const currentUser = ref(null);

  function setCurrentUser(user) {
    if (user) {
      currentUser.value = {
        ...user,
        toJSON() {
          const { id, name, image } = user;
          const json = { id, name };
          if (image) {
            json.image = image;
          }
          return json;
        },
      };
    } else {
      currentUser.value = user;
    }
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
