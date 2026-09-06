import Link from "next/link";
import Header from "@/components/Header";

const buildTimestamp = new Date().toLocaleString("en-IN", {
  dateStyle: "full",
  timeStyle: "long",
});

export default function HomePage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Devboard";

  return (
    <>
      <Header />

      <main className="container">
        <div className="card">
          <h1>{appName}</h1>

          <p>
            Devboard is a small developer dashboard demonstrating different
            Next.js rendering strategies.
          </p>

          <p>
            <strong>Build timestamp:</strong> {buildTimestamp}
          </p>
        </div>

        <br />

        <div className="grid">
          <Link href="/stack/nextjs" className="card">
            <h2>Stack</h2>
            <p>Explore the technologies used in development.</p>
          </Link>

          <Link href="/search" className="card">
            <h2>Search</h2>
            <p>Search GitHub users.</p>
          </Link>

          <Link href="/profile" className="card">
            <h2>Profile</h2>
            <p>View your GitHub profile.</p>
          </Link>

          <Link href="/todos" className="card">
            <h2>Todos</h2>
            <p>Manage your todo list.</p>
          </Link>
        </div>
      </main>
    </>
  );
}