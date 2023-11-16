import { addDoc, collection, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFirebase } from "../composables/useFirebase";

function getCollection() {
  const { db } = useFirebase();
  return collection(db, "events");
}

export const useEventsStore = defineStore("events", () => {
  const events = ref([]);

  async function loadAll() {
    const querySnapshot = await getDocs(getCollection());
    events.value = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }

  async function create(attributes) {
    const { name, date, time, location, description, imageUrl, organizer = "" } = attributes;
    const payload = { name, organizer, location, date, time, description, createdAt: Date.now() };

    if (imageUrl) {
      payload.image = {
        url: imageUrl,
        path: imageUrl.replace("https://firebasestorage.googleapis.com", ""),
      };
    }

    const event = await addDoc(getCollection(), payload);
    events.value.push(event);
    return event;
  }

  // async function findById(id) {}

  return {
    // state
    events,

    // actions
    loadAll,
    create,
  };
});
