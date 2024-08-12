import { doc, setDoc } from "firebase/firestore";
import { db } from "./fb";

export async function createCity() {
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  });
}
