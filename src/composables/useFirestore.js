import { collection, doc, getFirestore } from "firebase/firestore";
import { useFirebase } from "./useFirebase";

const { app } = useFirebase();

function docSnapToModel(docSnap) {
  if (docSnap?.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
}

export function useFirestore(path) {
  const db = getFirestore(app);

  return {
    db,
    collection: (...args) => collection(db, path, ...args),
    doc: (id, ...args) => {
      return doc(db, path, id, ...args);
    },
    docSnapToModel,
  };
}
