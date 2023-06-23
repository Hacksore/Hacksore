import { NextResponse } from "next/server";
import { db } from "../../../firebase-server";

// we make this an API that is forever dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const userdataRefDoc = await db.ref("userdata").get();

    if (userdataRefDoc.exists()) {
      const value = userdataRefDoc.val();
      return NextResponse.json(value);
    } else {
      return NextResponse.json({ error: "can't find snapshot for userdata" }, { status: 200 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
