import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase-server";

export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<any>) {
  console.log("Fetching userdata from firebase...");

  try {
    const userdataRefDoc = await db.ref("userdata").get();

    if (userdataRefDoc.exists()) {
      const value = userdataRefDoc.val();
      res.status(200).json(value);
    } else {
      res.status(500).json({ error: "can't find snapshot for userdata" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
