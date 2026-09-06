import "./globals.css";

export const metadata = {
  title: "Devboard",
  description: "Next.js rendering strategies dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}