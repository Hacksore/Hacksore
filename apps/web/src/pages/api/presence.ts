import type { NextApiRequest, NextApiResponse } from "next";
import { get, child, ref } from "firebase/database";
import { db } from "../../firebase-config";

/* i did some debug and found this in the logs:
[GET] /api/presence
15:15:06:31
initFirebase: 0.671ms
Fetching userdata from firebase...
fetchUserdata: 13.419ms
*/

// so it has to be connecting to firebase in the serverless func 
// then doing its work then commiting sideways (RIP)
// Working so im not changing it :P
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
