import Link from "next/link";
import Header from "@/components/Header";
import stack from "@/data/stack";

export default function StackIndexPage() {
  return (
    <>
      <Header />

      <main className="container">
        <h1>Technology Stack</h1>

        <div className="grid">
          {stack.map((technology) => (
            <Link
              key={technology.slug}
              href={`/stack/${technology.slug}`}
              className="card"
            >
              <h2>{technology.name}</h2>
              <p>{technology.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}