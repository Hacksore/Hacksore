import type { NextApiRequest, NextApiResponse } from "next";
import { IPresence } from "types/presence";
import { get, child, ref, getDatabase } from "firebase/database";
import { db } from "pages/firebaseConfig";

export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<any>) {
  const dbRef = ref(db);
  get(child(dbRef, "userdata"))
    .then(snapshot => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        console.log("val", value);
        res.status(200).json({ test: 420, value });
      } else {
        res.status(500).json({ test: 0, error: "missing ref" });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ test: 69 });
    });

  // res.status(500).json(new Error("idk bro"));
}
