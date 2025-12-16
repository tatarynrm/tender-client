// app/dashboard/page.tsx
"use client";

import { ActivityChart } from "@/features/log/main/page/ActivityChart";
import { UserProfileCard } from "@/features/log/main/page/UserProfileCard";
import { UserStatsCard } from "@/features/log/main/page/UserStatsCard";
import { Card } from "@/shared/components/ui";

const user = {
  name: "Бойко В.М.",
  position: "Логіст",
  company: "ДТЕП ІСТ-Захід",
  email: "bv@ict.lviv.ua",
};

const userStats = {
  activeCargos: 5,
  completedCargos: 124,
  messagesReceived: 42,
  workExperienceYears: 4,
};

const activityData = [
  { month: "Трав", cargos: 12 },
  { month: "Черв", cargos: 18 },
  { month: "Лип", cargos: 10 },
  { month: "Серп", cargos: 22 },
  { month: "Вер", cargos: 15 },
  { month: "Жовт", cargos: 19 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <UserProfileCard user={user} />
      <UserStatsCard stats={userStats} />
      <Card className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Активність за останні місяці
          {/* dsds */}
        </h2>
        <ActivityChart data={activityData} />
      </Card>
    </div>
  );
}
