import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  revalidatePath("/todos");

  return NextResponse.json({
    success: true,
    message: "Todos page revalidated",
  });
}