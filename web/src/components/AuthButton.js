"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (session) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            width="32"
            height="32"
            style={{
              borderRadius: "50%",
            }}
          />
        )}

        <span>{session.user?.name}</span>

        <button onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("github")}>
      Sign in with GitHub
    </button>
  );
}