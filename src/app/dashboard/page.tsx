"use client";
import React, { useEffect, useState } from "react";
import api from "@/shared/api/instance.api";
import { Loader2, Users, ShoppingBag, Globe } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import Loading from "@/shared/components/ui/Loading";
import Loader from "@/shared/components/Loaders/MainLoader";

interface StatsData {
  totalTenders: number;
  totalEmployees: number;
  totalClients: number;
  totalCarriers: number;
  monthlyTenders: { month: string; count: number }[];
}

const mockData: StatsData = {
  totalTenders: 24,
  totalEmployees: 15,
  totalClients: 8,
  totalCarriers: 6,
  monthlyTenders: [
    { month: "Січ", count: 2 },
    { month: "Лют", count: 3 },
    { month: "Бер", count: 4 },
    { month: "Квіт", count: 1 },
    { month: "Трав", count: 5 },
    { month: "Черв", count: 3 },
    { month: "Лип", count: 6 },
    { month: "Серп", count: 4 },
  ],
};

const DashboardPage = () => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");

      setData(mockData);
    } catch (err) {
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="px-4 py-6 w-full space-y-6">
      {/* Карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex items-center gap-4">
          <ShoppingBag className="w-8 h-8 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Тендери
            </div>
            <div className="text-xl font-bold">{data?.totalTenders}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex items-center gap-4">
          <Users className="w-8 h-8 text-green-500" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Працівники
            </div>
            <div className="text-xl font-bold">{data?.totalEmployees}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex items-center gap-4">
          <Globe className="w-8 h-8 text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Клієнти
            </div>
            <div className="text-xl font-bold">{data?.totalClients}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex items-center gap-4">
          <Users className="w-8 h-8 text-red-500" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Перевізники
            </div>
            <div className="text-xl font-bold">{data?.totalCarriers}</div>
          </div>
        </div>
      </div>

      {/* Лінійний графік */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Динаміка тендерів по місяцях
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data?.monthlyTenders}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              wrapperStyle={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
              contentStyle={{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              color="red"
              textDecoration={"underline"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Бар графік */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Розподіл ролей співробітників
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Клієнти", value: data?.totalClients },
              { name: "Перевізники", value: data?.totalCarriers },
              { name: "Працівники", value: data?.totalEmployees },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              cursor={{ fill: "transparent" }}
              wrapperStyle={{
                backgroundColor: "gray",
                boxShadow: "none",
                color: "red",
              }}
              contentStyle={{
                backgroundColor: "gray",
                boxShadow: "none",
                border: "none",
                color: "black", // Колір тексту
                fontSize: "14px", // Розмір шрифту
                fontFamily: "Arial, sans-serif", // Шрифт
                padding: "5px 10px", // Відступи
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="#10b981" activeBar={false} />
            {/* Вимикаємо сірий hover */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
