"use client";

import React, { useEffect, useState } from "react";

import { format, parseISO } from "date-fns";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import api from "@/shared/api/instance.api";


type CabinetData = {
  KP_ALL: number;
  KP_YEAR_PREV: number;
  KP_YEAR_CURR: number;
  KP_MONTH_PREV: number;
  KP_MONTH_CURR: number;
  DATZAV_FIRST: string;
  DATZAV_LAST: string;
};

const CabinetPage = () => {
  const [data, setData] = useState<CabinetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.post("/ict-drivers-cabinet/main");
        console.log(data);

        setData(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!data)
    return (
      <div className="text-center py-20 text-red-500">
        Помилка завантаження даних
      </div>
    );

  // Підготовка даних для графіку
  const chartData = [
    { name: "Попередній рік", value: data.KP_YEAR_PREV },
    { name: "Цей рік", value: data.KP_YEAR_CURR },
    { name: "Попередній місяць", value: data.KP_MONTH_PREV },
    { name: "Цей місяць", value: data.KP_MONTH_CURR },
  ];
  const prepareChartData = (data: any) => {
    // Об'єднуємо останні два роки для одного графіка
    const chartData: { month: string; lastYear?: number; thisYear?: number }[] =
      [];

    const allMonths = new Set([
      ...data.lastYear.map((d: any) => d.MIS),
      ...data.thisYear.map((d: any) => d.MIS),
    ]);

    Array.from(allMonths).forEach((month) => {
      chartData.push({
        month,
        lastYear: data.lastYear.find((d: any) => d.MIS === month)?.KIL || 0,
        thisYear: data.thisYear.find((d: any) => d.MIS === month)?.KIL || 0,
      });
    });

    // Сортуємо за місяцем
    chartData.sort((a, b) => (a.month > b.month ? 1 : -1));
    return chartData;
  };

  const serverData = {
    lastYear: [
      {
        MIS: "2024.10",
        KIL: 28,
      },
      {
        MIS: "2024.11",
        KIL: 37,
      },
      {
        MIS: "2024.12",
        KIL: 32,
      },
    ],
    thisYear: [
      {
        MIS: "2025.01",
        KIL: 42,
      },
      {
        MIS: "2025.02",
        KIL: 49,
      },
      {
        MIS: "2025.03",
        KIL: 44,
      },
      {
        MIS: "2025.04",
        KIL: 25,
      },
      {
        MIS: "2025.05",
        KIL: 20,
      },
      {
        MIS: "2025.06",
        KIL: 20,
      },
      {
        MIS: "2025.07",
        KIL: 22,
      },
      {
        MIS: "2025.08",
        KIL: 19,
      },
      {
        MIS: "2025.09",
        KIL: 28,
      },
      {
        MIS: "2025.10",
        KIL: 12,
      },
    ],
    twoYearsAgo: [],
  };
  return (
    <div className="py-10 space-y-10">
      {/* Дати */}
      <Card className=" text-white">
        <CardHeader>
          <CardTitle>Дати першого та останнього перевезень</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-around">
          <div className="text-center">
            <h3 className="text-xl font-bold">
              {format(parseISO(data.DATZAV_FIRST), "dd.MM.yyyy")}
            </h3>
            <p className="text-gray-400">Перше перевезення</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">
              {format(parseISO(data.DATZAV_LAST), "dd.MM.yyyy")}
            </h3>
            <p className="text-gray-400">Останнє перевезення</p>
          </div>
        </CardContent>
      </Card>
      {/* Загальні показники */}
      <Card className=" text-white">
        <CardHeader>
          <CardTitle>Загальні показники перевезень</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-2xl font-bold">{data.KP_ALL}</h3>
              <p className="text-gray-400">Всього перевезень</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{data.KP_YEAR_CURR}</h3>
              <p className="text-gray-400">Перевезень цього року</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{data.KP_MONTH_CURR}</h3>
              <p className="text-gray-400">Перевезень цього місяця</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{data.KP_YEAR_PREV}</h3>
              <p className="text-gray-400">Перевезень минулого року</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Графік */}
      <Card className=" text-white">
        <CardHeader>
          <CardTitle>Динаміка перевезень</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
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
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Графік по місячно*/}
      <Card className=" text-white">
        <CardHeader>
          <CardTitle>Динаміка перевезень</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={prepareChartData(serverData)}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
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
              <Bar
                dataKey="lastYear"
                fill="#0ea5e9"
                radius={[4, 4, 0, 0]}
                name="Минулого року"
              />
              <Bar
                dataKey="thisYear"
                fill="#facc15"
                radius={[4, 4, 0, 0]}
                name="Цього року"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CabinetPage;
