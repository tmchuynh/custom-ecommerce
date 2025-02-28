import { NextResponse } from "next/server";
import { data } from "@/lib/constants";

// GET request handler
export async function GET() {
  return NextResponse.json(data, { status: 200 });
}
