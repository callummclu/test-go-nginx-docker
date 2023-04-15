import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 style={{ fontSize: 20 }}>This site is under construction</h1>
      <p>Check back soon :)</p>
    </main>
  );
}
