// app/blocked/page.tsx

import { Home } from "lucide-react"; // Можна додати іконку додатково

export default function BlockedPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900 py-10 px-4">
      {/* Контейнер для повідомлення */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-12 w-full max-w-lg text-center">
        {/* Іконка або зображення */}
        <div className="text-4xl text-red-500 mb-6">
          <Home className="mx-auto mb-4" size={40} />
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Ваш акаунт заблокований
        </h1>

        {/* Опис */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          На жаль, ваш акаунт заблокований. Якщо це помилка або вам потрібна
          додаткова інформація, будь ласка, зверніться до адміністратора.
        </p>

        {/* Кнопка для звернення */}
        <a
          href="mailto:support@yourcompany.com" // Контактний email
          className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Зв'язатися з адміністрацією
        </a>

        {/* Можна додати додаткову інформацію */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Якщо у вас є питання, ми завжди готові допомогти!
        </p>
      </div>
    </div>
  );
}
