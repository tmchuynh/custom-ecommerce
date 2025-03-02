import { NextResponse } from "next/server";
import { generateFakeData } from "@/lib/data/generateData";

// GET request handler
export async function GET() {
  const { purchaseRecords } = generateFakeData(10, 50); // Generate 10 users and 50 payments
  return NextResponse.json(purchaseRecords, { status: 200 });
}
