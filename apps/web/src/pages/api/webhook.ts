import type { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_MAP = {
  "react-skinview3d": {
    "url": "",
    "body": "Testing a ping via MITM <@378293909610037252>"
  }
}

export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<any>) {

  console.log(WEBHOOK_MAP);
  
  console.log("Fetching userdata from firebase...");
  console.time("fetchUserdata");


  res.status(500).json({ error: "test" });
}
