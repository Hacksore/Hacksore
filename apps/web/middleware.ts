import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.time("backendReq");
  const response = NextResponse.next();
  console.timeEnd("backendReq");
  return response;
}
