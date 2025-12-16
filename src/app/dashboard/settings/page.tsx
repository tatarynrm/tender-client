// src/app/settings/page.tsx

import { SettingsTabs } from "@/features/dashboard/settings/ui/SettingsTabs";

export default async function SettingsPage() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-6">Налаштування</h1>
      <SettingsTabs />
    </div>
  );
}
