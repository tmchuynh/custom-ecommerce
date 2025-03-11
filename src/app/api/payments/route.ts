import { NextResponse } from "next/server";
import { generateFakeData } from "@/lib/data/generateData";

/**
 * Handles the GET request to fetch purchase records.
 *
 * This function generates fake data for 10 users and 50 payments,
 * and returns the purchase records in a JSON response with a status of 200.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the purchase records.
 */
export async function GET() {
  const { purchaseRecords } = generateFakeData(10, 50); // Generate 10 users and 50 payments
  return NextResponse.json(purchaseRecords, { status: 200 });
}
