"use client";

import { useState } from "react";

export default function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function addTodo(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add todo");
      }

      setTodos((currentTodos) => [
        ...currentTodos,
        data,
      ]);

      setTitle("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTodo(id) {
    try {
      setError("");

      const response = await fetch("/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete todo"
        );
      }

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <form
        onSubmit={addTodo}
        className="card"
        style={{
          marginBottom: "20px",
        }}
      >
        <h2>Add Todo</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Enter todo..."
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            style={{
              flex: 1,
            }}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>

      {error && (
        <div
          className="card"
          style={{
            marginBottom: "20px",
          }}
        >
          <p>{error}</p>
        </div>
      )}

      <div className="card">
        <h2>Todo List</h2>

        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 0",
                borderBottom:
                  "1px solid #e5e7eb",
              }}
            >
              <div>
                <strong>{todo.title}</strong>

                <p>
                  Status:{" "}
                  {todo.completed
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}