"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import api from "@/shared/api/instance.api";
import Loading from "@/shared/components/ui/Loading";
import Loader from "@/shared/components/Loaders/MainLoader";
import { Info } from "lucide-react";
import GridColumnSelector from "@/shared/components/GridColumnSelector/GridColumnSelector";
import { useGridColumns } from "@/shared/hooks/useGridColumns";

interface TransportData {
  KOD: number;
  LINE1: string;
  LINE2: string;
  LINE3: string;
  BORGP: number;
  PERSUMA: number;
  IDV: string;
  DATDOCP: string | null;
  DATPOPLPLAN: string | null;
  DATPOPLFAKT: string | null;
  PERNEKOMPLEKT: any;
  PERAKTPRET: any;
}
const TransData: TransportData[] = [
  {
    KOD: 4856011,
    LINE1: "25/09 Моршин - 26/09 Миргород",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 33500,
    PERSUMA: 33500,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4860251,
    LINE1: "28/09 Миргород - 29/09 Київ",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ3729ЕО Сергієнко Олександр Петрович",
    BORGP: 9000,
    PERSUMA: 9000,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4861861,
    LINE1: "29/09 Київ - 29/09 Бровари",
    LINE2: "тара 21 т.",
    LINE3: "ВІ3729ЕО Сергієнко Олександр Петрович",
    BORGP: 1300,
    PERSUMA: 1300,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4860271,
    LINE1: "29/09 Моршин - 01/10 Миргород",
    LINE2: "вода мінеральна 21.8 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 33500,
    PERSUMA: 33500,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4861131,
    LINE1: "29/09 Миргород - 30/09 Київ",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "КА1406ІМ Ішов Ігор Миколайович",
    BORGP: 9000,
    PERSUMA: 9000,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4860261,
    LINE1: "29/09 Миргород - 30/09 Київ",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ6608СХ Апостол Леонід Борисович",
    BORGP: 9000,
    PERSUMA: 9000,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4861951,
    LINE1: "01/10 Моршин - 02/10 Миргород",
    LINE2: "вода мінеральна 21.8 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 33700,
    PERSUMA: 33700,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4863801,
    LINE1: "04/10 Миргород - 05/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: "2025-10-09T21:00:00.000Z",
    DATPOPLPLAN: "2025-10-23T21:00:00.000Z",
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4867481,
    LINE1: "08/10 Миргород - 09/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4868661,
    LINE1: "10/10 Миргород - 11/10 Київ",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ8877СЕ Марченко Володимир Володимирович",
    BORGP: 8750,
    PERSUMA: 8750,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4869921,
    LINE1: "11/10 Київ - 11/10 Миргород",
    LINE2: "тара 21 т.",
    LINE3: "ВІ8877СЕ Марченко Володимир Володимирович",
    BORGP: 8250,
    PERSUMA: 8250,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4869011,
    LINE1: "12/10 Миргород - 13/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4870831,
    LINE1: "15/10 Миргород - 17/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4871781,
    LINE1: "19/10 Миргород - 20/10 Київ",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ8877СЕ Марченко Володимир Володимирович",
    BORGP: 8750,
    PERSUMA: 8750,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4872931,
    LINE1: "20/10 Київ - 20/10 Миргород",
    LINE2: "тара 21 т.",
    LINE3: "ВІ8877СЕ Марченко Володимир Володимирович",
    BORGP: 8250,
    PERSUMA: 8250,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4872511,
    LINE1: "20/10 Миргород - 21/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4876961,
    LINE1: "24/10 Миргород - 25/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
  {
    KOD: 4877521,
    LINE1: "26/10 Миргород - 27/10 Моршин",
    LINE2: "вода мінеральна Аляска 21 т.",
    LINE3: "ВІ7520ІО Ільїн Олег Васильович",
    BORGP: 21000,
    PERSUMA: 21000,
    IDV: "грн",
    DATDOCP: null,
    DATPOPLPLAN: null,
    DATPOPLFAKT: null,
    PERNEKOMPLEKT: null,
    PERAKTPRET: null,
  },
];
export default function CabinetPage() {
  const [data, setData] = useState<TransportData[]>(TransData || []);
  const [loading, setLoading] = useState(true);
  const [gridCols, setGridCols, gridClass, columnOptions] = useGridColumns(
    "dashboardGridCols",
    3
  );
  useEffect(() => {
    api
      .post<TransportData[]>("http://localhost:4000/ict-drivers-cabinet")
      //   .then((res) => setData(res.data))
      .then((res) => setData(TransData))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return format(d, "dd.MM.yyyy");
  };

  return (
    <div className="p-2 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Панель вантажів
        </h2>
        <div className="flex gap-2">
          <GridColumnSelector
            gridCols={gridCols}
            setGridCols={setGridCols}
            columnOptions={columnOptions}
          />
        </div>
      </div>
 
        <div
          className={`grid ${gridClass} gap-3 transition-all duration-300 ease-in-out`}
        >
          {data.map((item) => (
            <Card
              key={item.KOD}
              className="bg-gray-50 dark:bg-gray-900 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {item.LINE1}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Продукт:</span> {item.LINE2}
                </p>
                <p>
                  <span className="font-semibold">Водій:</span> {item.LINE3}
                </p>
                <p>
                  <span className="font-semibold">Сума:</span>{" "}
                  {item.PERSUMA.toLocaleString()} {item.IDV}
                </p>
                <p>
                  <span className="font-semibold">Дата документа:</span>{" "}
                  {formatDate(item.DATDOCP)}
                </p>
                <p>
                  <span className="font-semibold">Планована дата:</span>{" "}
                  {formatDate(item.DATPOPLPLAN)}
                </p>
                <p>
                  <span className="font-semibold">Фактична дата:</span>{" "}
                  {formatDate(item.DATPOPLFAKT)}
                </p>
                <div className="mt-2 flex justify-end">
                  <Button size="icon" className="bg-transparent">
                    <Info color="teal" size={30} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
     
    </div>
  );
}
