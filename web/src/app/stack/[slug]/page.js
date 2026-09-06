import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import stack from "@/data/stack";

export function generateStaticParams() {
  return stack.map((technology) => ({
    slug: technology.slug,
  }));
}

export default async function StackPage({ params }) {
  const { slug } = await params;

  const technology = stack.find((item) => item.slug === slug);

  if (!technology) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="container">
        <div className="card">
          <h1>{technology.name}</h1>

          <p>{technology.description}</p>

          <p>
            <a
              href={technology.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official website
            </a>
          </p>

          <br />

          <Link href="/stack">← Back</Link>
        </div>
      </main>
    </>
  );
}