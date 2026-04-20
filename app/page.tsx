import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">eBook Reader</h1>
        <p className="text-gray-400 text-sm">Your document is ready to read</p>
        <Link
          href="/reader"
          className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
        >
          View eBook
        </Link>
      </div>
    </main>
  );
}
