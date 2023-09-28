import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "../../../../constants";

export async function POST() {
  cookies().delete(COOKIE_NAME);
  return NextResponse.json("DeletedToken");
}
