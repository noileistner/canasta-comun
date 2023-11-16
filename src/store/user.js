import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirebase } from "../composables/useFirebase";

const COLLECTION = "users";

function getCollectionRef() {
  const { db } = useFirebase();
  return collection(db, COLLECTION);
}

function getDocRef(id) {
  const { db } = useFirebase();
  return doc(db, COLLECTION, id);
}

function docSnapToUser(docSnap) {
  if (docSnap?.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
}

export const useUserStore = defineStore("user", () => {
  async function find(id) {
    const docRef = getDocRef(id);
    const docSnap = await getDoc(docRef);
    return docSnapToUser(docSnap);
  }

  async function findByEmail(email) {
    const q = query(getCollectionRef(), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot?.docs.at(0);
    return docSnapToUser(docSnap);
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

    if (imageUrl) {
      payload.image = {
        url: imageUrl,
        path: imageUrl.replace("https://firebasestorage.googleapis.com", ""),
      };
    }

    const docRef = await addDoc(getCollectionRef(), payload);
    if (docRef) {
      return await find(docRef.id);
    }
  }

  async function update(id, attributes) {
    const docRef = getDocRef(id);
    await updateDoc(docRef, { ...attributes, updatedAt: Date.now() });
    return await find(id);
  }

  return {
    // actions
    create,
    update,
    find,
    findByEmail,
    findOrCreateByEmail,
  };
});
