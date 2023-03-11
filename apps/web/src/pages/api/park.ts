import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleRoute(_: NextApiRequest, res: NextApiResponse<any>) {
  console.log("Registering parking user");

  res.status(200).json({ todo: 1 });

}
