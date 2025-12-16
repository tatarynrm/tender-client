"use client";

import { SettingsCard } from "./SettingsCard";


export const ApiTab = () => (
  <SettingsCard title="Інтеграції / API">
    <p className="text-gray-400 text-sm mb-4">
      Керуйте доступом до API та інтеграціями з CRM чи ERP системами.
    </p>
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg px-4 py-3">
        <span className="text-gray-300 text-sm font-mono">api_key_0x934AF12</span>
        <button className="text-xs text-teal-400 hover:text-teal-300 transition">🔁 Перегенерувати</button>
      </div>
      <button className="mt-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-indigo-600 rounded-lg text-white font-medium hover:scale-105 transition">
        ➕ Додати інтеграцію
      </button>
    </div>
  </SettingsCard>
);
