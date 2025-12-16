// src/features/settings/ui/security-tab.tsx
"use client"

import { useState } from "react"

export function SecurityTab() {
  const [password, setPassword] = useState("")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Безпека</h2>
      <div>
        <label className="block mb-1">Новий пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded">
        Оновити пароль
      </button>
    </div>
  )
}
