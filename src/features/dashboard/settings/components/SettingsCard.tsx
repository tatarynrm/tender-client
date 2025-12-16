import { Card } from "@/shared/components/ui";
import { ReactNode } from "react";

export const SettingsCard = ({
  title,
  children,
  width
}: {
  title: string;
  children: ReactNode;
  width?:string
}) => (
  <Card className={`dark:bg-gray-900 bg-gray-200 border border-gray-700 rounded-2xl p-6 shadow-lg ${width}`}>
    <h2 className="text-xl font-semibold mb-4 text-purple-400">{title}</h2>
    {children}
  </Card>
);
