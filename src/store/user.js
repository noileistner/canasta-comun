import { addDoc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirestore } from "../composables/useFirestore";

const { doc, collection, docSnapToModel } = useFirestore("users");

export const useUserStore = defineStore("user", () => {
  async function find(id) {
    const docRef = doc(id);
    const docSnap = await getDoc(docRef);
    return docSnapToModel(docSnap);
  }

  async function findByEmail(email) {
    const q = query(collection(), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot?.docs.at(0);
    return docSnapToModel(docSnap);
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

  async function findOrCreateByEmail(email, attributes = {}) {
    const user = await findByEmail(email);
    if (user) {
      return user;
    }
    return await create({ email, ...attributes });
  }

  async function create(attributes) {
    const { imageUrl = "", ...payload } = attributes;
    payload.createdAt = Date.now();
    payload.updatedAt = Date.now();

    if (payload.name) {
      payload.searchName = payload.name?.toLowerCase();
    }

    if (imageUrl) {
      payload.image = {
        url: imageUrl,
        path: imageUrl.replace("https://firebasestorage.googleapis.com", ""),
      };
    }

    const docRef = await addDoc(collection(), payload);
    if (docRef) {
      return await find(docRef.id);
    }
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
    // actions
    create,
    update,
    find,
    findByEmail,
    findAll,
    findOrCreateByEmail,
  };
});
