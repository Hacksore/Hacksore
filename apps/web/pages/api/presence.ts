import type { NextApiRequest, NextApiResponse } from "next";
import { get, child, ref } from "firebase/database";
import { db } from "firebaseConfig";

// not really sure how this is working LUL
export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<any>) {
  console.log("Fetching userdata from firebase...");
  console.time("fetchUserdata");

  const dbRef = ref(db);
  get(child(dbRef, "userdata"))
    .then(snapshot => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        res.status(200).json(value);
      } else {
        res.status(500).json({ error: "can't find snapshot for userdata" });
      }
    })
    .catch((error: Error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });

  console.timeEnd("fetchUserdata");
}
