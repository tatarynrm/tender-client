// components/UserStatsCard.tsx

import { Card } from "@/shared/components/ui";

export function UserStatsCard({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Stat label="Активні вантажі" value={stats.activeCargos} />
      <Stat label="Завершені вантажі" value={stats.completedCargos} />
      <Stat label="Повідомлення" value={stats.messagesReceived} />
      <Stat label="Досвід (років)" value={stats.workExperienceYears} />
    </div>
  );
}

function Stat({ label, value }: { label: string, value: number }) {
  return (
    <Card className="bg-white p-4 rounded-lg shadow text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </Card>
  );
}
