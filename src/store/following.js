import { deleteDoc, getCountFromServer, getDoc, getDocs, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirestore } from "../composables/useFirestore";

const { doc, docSnapToModel, collection } = useFirestore("users");

function getDocRef(userId, followingUserId) {
  return doc(userId, "following", followingUserId);
}

export const useFollowingStore = defineStore("following", () => {
  async function find(userId, followingUserId) {
    const docSnap = await getDoc(getDocRef(userId, followingUserId));
    return docSnapToModel(docSnap);
  }

  async function all(userId) {
    const querySnap = await getDocs(collection(userId, "following"));
    return querySnap.docs?.map((docSnap) => docSnapToModel(docSnap));
  }

  async function count(userId) {
    const snap = await getCountFromServer(collection(userId, "following"));
    return snap?.data()?.count ?? 0;
  }

  async function create(userId, followingUser) {
    const docRef = getDocRef(userId, followingUser.id);
    await setDoc(docRef, { id: followingUser.id, name: followingUser.name, createdAt: Date.now() });
  }

  async function remove(userId, followingUser) {
    await deleteDoc(getDocRef(userId, followingUser.id));
  }

  return {
    // actions
    find,
    all,
    create,
    remove,
    count,
  };
});
