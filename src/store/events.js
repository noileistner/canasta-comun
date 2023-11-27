import { addDoc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFirestore } from "../composables/useFirestore";

const { doc, collection, docSnapToModel } = useFirestore("events");

export const useEventsStore = defineStore("events", () => {
  const events = ref([]);

  async function loadAll() {
    const querySnapshot = await getDocs(collection());
    events.value = querySnapshot.docs.map(docSnapToModel);
  }

  async function findAll(searchTerm) {
    const searchName = searchTerm.toLowerCase();
    const q = query(
      collection(),
      where("searchName", ">=", searchName),
      where("searchName", "<", `${searchName}\uf8ff`),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot?.docs.map(docSnapToModel) ?? [];
  }

  async function find(id) {
    const docRef = doc(id);
    const docSnap = await getDoc(docRef);
    return docSnapToModel(docSnap);
  }

  async function create(attributes) {
    const { name, date, time, location, description, imageUrl, organizer = "" } = attributes;
    const payload = { name, organizer, location, date, time, description, createdAt: Date.now() };

    if (payload.name) {
      payload.searchName = payload.name.toLowerCase();
    }

    if (imageUrl) {
      payload.image = {
        url: imageUrl,
        path: imageUrl.replace("https://firebasestorage.googleapis.com", ""),
      };
    }

    const event = await addDoc(collection(), payload);
    events.value.push(event);
    return event;
  }

  async function update(id, attributes) {
    const docRef = doc(id);

    if (attributes.name) {
      attributes.searchName = attributes.name.toLowerCase();
    }

    await updateDoc(docRef, { ...attributes, updatedAt: Date.now() });
    return await find(id);
  }

  return {
    // state
    events,

    // actions
    loadAll,
    find,
    create,
    update,
    findAll,
  };
});
