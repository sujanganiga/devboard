"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setError("");
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            trimmedQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("GitHub search failed");
        }

        const data = await response.json();

        setUsers(data.items || []);
      } catch (err) {
        setUsers([]);
        setError("Unable to search GitHub. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <>
      <Header />

      <main className="container">
        <div className="card">
          <h1>GitHub User Search</h1>

          <p>
            Search GitHub users as you type.
          </p>

          <input
            type="text"
            placeholder="Search GitHub users..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          />
        </div>

        <br />

        {loading && (
          <div className="card">
            <p>Loading...</p>
          </div>
        )}

        {!loading && error && (
          <div className="card">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && query.trim() && users.length === 0 && (
          <div className="card">
            <p>No GitHub users found.</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid">
            {users.map((user) => (
              <div className="card" key={user.id}>
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  width="80"
                  height="80"
                  style={{
                    borderRadius: "50%",
                  }}
                />

                <h2>{user.login}</h2>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub Profile
                </a>
              </div>
            ))}
          </div>
        )}

        {!query.trim() && (
          <div className="card">
            <p>
              Start typing a GitHub username to search.
            </p>
          </div>
        )}

        <br />

        <Link href="/">
          ← Back to Home
        </Link>
      </main>
    </>
  );
}