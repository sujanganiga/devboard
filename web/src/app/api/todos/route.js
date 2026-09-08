import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        {
          error: "Title is required",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: body.title.trim(),
        completed: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to create todo",
        },
        {
          status: response.status,
        }
      );
    }

    const todo = await response.json();

    revalidatePath("/todos");

    return NextResponse.json(todo, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/todos error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "Todo id is required",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/todos/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to delete todo",
        },
        {
          status: response.status,
        }
      );
    }

    revalidatePath("/todos");

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error("DELETE /api/todos error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}