"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,

  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieLabelRenderProps,
} from "recharts";

export default function AdminDashboard() {
  // 🔹 Дані для різних графіків
  const usersGrowth = [
    { month: "Січ", users: 100 },
    { month: "Лют", users: 230 },
    { month: "Бер", users: 420 },
    { month: "Кві", users: 600 },
    { month: "Тра", users: 720 },
    { month: "Чер", users: 900 },
  ];

  const companyStats = [
    { name: "Перевізники", value: 300 },
    { name: "Експедитори", value: 200 },
    { name: "Вантажовідправники", value: 150 },
  ];

  const monthlyRevenue = [
    { name: "Січ", value: 12000 },
    { name: "Лют", value: 15000 },
    { name: "Бер", value: 18000 },
    { name: "Кві", value: 21000 },
    { name: "Тра", value: 19000 },
    { name: "Чер", value: 25000 },
  ];

  const COLORS = ["#0ea5e9", "#22c55e", "#f59e0b"];

  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* 📊 Зростання користувачів */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Зростання користувачів</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usersGrowth}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 🍩 Типи компаній */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Типи компаній</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={companyStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: PieLabelRenderProps) => {
                    const { name, percent } = props;
                    // ✅ перетворюємо percent на число і перевіряємо на null/undefined
                    const pct = typeof percent === "number" ? percent : 0;
                    return name ? `${name}: ${(pct * 100).toFixed(0)}%` : null;
                  }}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {companyStats.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 💸 Прибуток по місяцях */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Прибуток по місяцях</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 📈 Порівняльний графік компаній і користувачів */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Порівняння компаній та користувачів</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { month: "Січ", users: 200, companies: 50 },
                { month: "Лют", users: 350, companies: 70 },
                { month: "Бер", users: 500, companies: 100 },
                { month: "Кві", users: 600, companies: 120 },
                { month: "Тра", users: 720, companies: 160 },
              ]}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCompanies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
              <Area
                type="monotone"
                dataKey="companies"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorCompanies)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
