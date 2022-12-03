import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase-server";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handleRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const userId = session?.user?.id;
  const body = req.body;
  const { slug } = req.query;

  if (!userId) return res.status(401).send({ error: "unauthorized" });

  // get all the vehicles
  if (req.method === "GET") {
    if (slug === "me") {
      const ref = await db.ref("vehicles").child(userId).get();
      if (ref.exists()) {
        return res.send(ref.val());
      }

      return res.status(500).json({ error: "no data found" });
    }

    if (slug === "all") {
      // check if admin
      const adminRef = await db.ref("admins").child(userId).get();
      if (!adminRef.exists()) {
        res.status(401).json({ error: "access denined" });
      }

      // give all
      const ref = await db.ref("vehicles").get();
      const allUsersVehiclesEntries = Object.entries(ref.val());
      const allUsersVehicles: any[] = [];
      allUsersVehiclesEntries.forEach(([userId, vehicles]: any) => {
        Object.entries(vehicles).forEach(([_, props]: any) => {
          const vehiclePayload = {
            ...props,
            userId,
          };
          console.log(vehiclePayload);
          allUsersVehicles.push(vehiclePayload);

        });
      });

      return res.send(allUsersVehicles);
      
    }
  }

  if (req.method === "POST") {
    db.ref("vehicles").child(userId).child(body.licensePlate).set({
      ...req.body,
      name: session.user.name
    });
    res.status(500).json({ error: "not done yet" });
  }
}
