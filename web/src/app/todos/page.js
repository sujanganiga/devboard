import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

const API_URL = process.env.API_BASE_URL;

export const revalidate = 60;

async function getTodos() {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export default async function TodosPage() {
  const todos = await getTodos();

  const renderedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return (
    <>
      <Header />

      <main className="container">
        <div className="card">
          <h1>Todos</h1>

          <p>
            <strong>Rendered at:</strong>{" "}
            {renderedAt}
          </p>

          <p>
            This page uses Incremental Static
            Regeneration with a 60 second interval.
          </p>
        </div>

        <br />

        <TodoList initialTodos={todos} />
      </main>
    </>
  );
}