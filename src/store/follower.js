import { deleteDoc, getCountFromServer, getDoc, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirestore } from "../composables/useFirestore";

const { doc, docSnapToModel, collection } = useFirestore("users");

function getDocRef(userId, followerUserId) {
  return doc(userId, "follower", followerUserId);
}

export const useFollowerStore = defineStore("follower", () => {
  async function find(userId, followerUserId) {
    const docSnap = await getDoc(getDocRef(userId, followerUserId));
    return docSnapToModel(docSnap);
  }

  async function count(userId) {
    const snap = await getCountFromServer(collection(userId, "follower"));
    return snap?.data()?.count ?? 0;
  }

  async function create(userId, followerUser) {
    console.log("create", userId, followerUser);
    const docRef = getDocRef(userId, followerUser.id);
    await setDoc(docRef, { id: followerUser.id, name: followerUser.name, createdAt: Date.now() });
  }

  async function remove(userId, followerUser) {
    await deleteDoc(getDocRef(userId, followerUser.id));
  }

  return {
    // actions
    find,
    create,
    remove,
    count,
  };
});
