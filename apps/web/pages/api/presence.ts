import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { IPresence } from "types/presence";

// this should only have READ access since we init'd the firebase client in pages/index.tsx
const db = admin.database();

export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<IPresence>) {
  const payload = db.ref("userdata").get();

  res.status(200).json((await payload).val());
};
