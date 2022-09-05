import type { NextApiRequest, NextApiResponse } from "next";
import { get, child, ref } from "firebase/database";
import { db } from "firebaseConfig";

export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<any>) {
  const dbRef = ref(db);
  get(child(dbRef, "userdata"))
    .then(snapshot => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        res.status(200).json(value);
      } else {
        res.status(500).json({ error: "can't find snapshot" });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ test: 69 });
    });
}
