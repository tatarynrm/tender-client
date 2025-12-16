// src/features/settings/ui/notifications-tab.tsx
"use client"

import { useState } from "react"

export function NotificationsTab() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Сповіщення</h2>
      <div className="flex items-center space-x-2">
        <input
          id="email"
          type="checkbox"
          checked={emailNotif}
          onChange={() => setEmailNotif(!emailNotif)}
        />
        <label htmlFor="email">Email сповіщення</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="sms"
          type="checkbox"
          checked={smsNotif}
          onChange={() => setSmsNotif(!smsNotif)}
        />
        <label htmlFor="sms">SMS сповіщення</label>
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded">
        Зберегти зміни
      </button>
    </div>
  )
}
