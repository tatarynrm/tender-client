// src/features/settings/ui/profile-tab.tsx
"use client"

import { useState } from "react"

export function ProfileTab() {
  const [name, setName] = useState("Іван")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Профіль</h2>
      <div>
        <label className="block mb-1">Ім’я користувача</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded">
        Зберегти
      </button>
    </div>
  )
}
