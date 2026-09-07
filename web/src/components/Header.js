import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Devboard";

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/">
          <strong>{appName}</strong>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/stack">Stack</Link>
          <Link href="/search">Search</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/todos">Todos</Link>
        </nav>

        <AuthButton />
      </div>
    </header>
  );
}