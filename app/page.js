import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <div>
      <div className="w-24 text-center text-zinc-950 bg-zinc-700 hover:bg-zinc-600 p-2 rounded-md font-bold text-lg">
        <Link href="/signin">Sign In</Link>
      </div>
      <div className="w-24 text-center hover:bg-zinc-600 text-zinc-950 bg-zinc-700 p-2 rounded-md font-bold text-lg">
        <Link href="/signup">Sign Up</Link>
      </div>

      </div>
          </div>
  );
}
