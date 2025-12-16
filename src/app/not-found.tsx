import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 text-center">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight">
        Сторінку не знайдено
      </h2>

      <p className="mt-2 text-gray-400 max-w-md">
        Вибач, але запитана сторінку не існує або вона була переміщена.
      </p>

      <Link
        href="/dashboard"
        className="mt-8 inline-flex items-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-lg font-medium text-white transition hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
      >
        Повернутися на головну
      </Link>

      <div className="absolute bottom-6 text-sm text-gray-600">
        © {new Date().getFullYear()} ІСТендер
      </div>
    </main>
  );
}
