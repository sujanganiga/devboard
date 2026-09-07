import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const username = session.user?.githubUsername;

  if (!username) {
    return (
      <>
        <Header />

        <main className="container">
          <div className="card">
            <h1>Profile</h1>

            <p>
              Your GitHub username is not available in the current
              session.
            </p>
          </div>
        </main>
      </>
    );
  }

  const [profileResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      cache: "no-store",
    }),

    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
      {
        cache: "no-store",
      }
    ),
  ]);

  if (!profileResponse.ok || !reposResponse.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }

  const profile = await profileResponse.json();
  const repositories = await reposResponse.json();

  const renderedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return (
    <>
      <Header />

      <main className="container">
        <div className="card">
          <h1>GitHub Profile</h1>

          <img
            src={profile.avatar_url}
            alt={`${profile.login} avatar`}
            width="120"
            height="120"
            style={{
              borderRadius: "50%",
            }}
          />

          <h2>{profile.name || profile.login}</h2>

          <p>
            <strong>Username:</strong> {profile.login}
          </p>

          <p>
            <strong>Bio:</strong>{" "}
            {profile.bio || "No bio available."}
          </p>

          <p>
            <strong>Followers:</strong> {profile.followers}
          </p>

          <p>
            <strong>Following:</strong> {profile.following}
          </p>

          <p>
            <strong>Public repositories:</strong>{" "}
            {profile.public_repos}
          </p>

          <p>
            <strong>Server rendered at:</strong> {renderedAt}
          </p>
        </div>

        <br />

        <div className="card">
          <h2>Recent Repositories</h2>

          {repositories.length === 0 ? (
            <p>No public repositories found.</p>
          ) : (
            <div>
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  style={{
                    padding: "15px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <h3>{repo.name}</h3>

                  <p>
                    {repo.description ||
                      "No description available."}
                  </p>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View repository
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}