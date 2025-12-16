// components/UserProfileCard.tsx
import { Card, CardContent } from "@/shared/components/ui";
import Image from "next/image";

export function UserProfileCard({ user }: { user: any }) {
  return (
    <Card className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <CardContent className="flex justify-between  w-full items-center text-center">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p>
          {user.position} @ {user.company}
        </p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </CardContent>
    </Card>
  );
}
