import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./fb";

export async function getDate() {
  const document = await getDoc(doc(db, "period", "dates"));
  const dates = [];
  if (document.exists) {
    document.data().data.forEach((date) => {
      dates.push(date);
    });
  }
  return dates;
}

export async function updateDate(dates) {
  await setDoc(doc(db, "period", "dates"), {
    data: dates,
  });
}
