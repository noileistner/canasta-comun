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
    collection: collection(db, path),
    doc: (id) => doc(db, path, id),
    docSnapToModel,
  };
}
