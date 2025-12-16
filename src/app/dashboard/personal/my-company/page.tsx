"use client";

import * as React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import GeneralTab from "@/features/dashboard/personal/my-company/tabs/GeneralTab";
import ContactTab from "@/features/dashboard/personal/my-company/tabs/ContactTab";
import FinanceTab from "@/features/dashboard/personal/my-company/tabs/FinanceTab";

export default function CompanyPage() {
  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Дані компанії</h1>

      <Tabs defaultValue="general" className="space-y-4 flex-wrap flex cursor-pointer">
        <TabsList className="cursor-pointer">
          <TabsTrigger value="general" className="cursor-pointer">Основні</TabsTrigger>
          <TabsTrigger value="finance" className="cursor-pointer">Фінанси</TabsTrigger>

          <TabsTrigger value="routes" className="cursor-pointer">Напрямки</TabsTrigger>
 
          <TabsTrigger value="edoc" className="cursor-pointer">Е-Документообіг</TabsTrigger>
        </TabsList>

        {/* Основні дані */}
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>



        {/* Фінанси */}
        <TabsContent value="finance">
          <FinanceTab />
        </TabsContent>

        {/* Рухомий склад */}
        <TabsContent value="fleet">
          <div className="space-y-4">
            <div>
              <Label>Тип транспорту</Label>
              <Input placeholder="Тип" />
            </div>
            <div>
              <Label>Кількість</Label>
              <Input placeholder="Кількість одиниць" />
            </div>
            <div>
              <Label>Вантажопідйомність</Label>
              <Input placeholder="В кг" />
            </div>
            <div>
              <Label>Об’єм напівпричепа</Label>
              <Input placeholder="В куб.м" />
            </div>
          </div>
        </TabsContent>

        {/* Напрямки слідування */}
        <TabsContent value="routes">
          <div>
            <Label>Перелік країн</Label>
            <Input placeholder="Україна, Польща, Німеччина ..." />
          </div>
        </TabsContent>

        {/* Категорія компанії */}
        <TabsContent value="category">
          <div>
            <Label>Категорія</Label>
            <Input placeholder="Наприклад: Перевізник" />
          </div>
        </TabsContent>

        {/* Електронний документообіг */}
        <TabsContent value="edoc">
          <div className="flex items-center gap-2 mt-2">
            <Switch id="edocUsage" />
            <Label htmlFor="edocUsage" className="text-sm">
              Використовує електронний документообіг (Медок)
            </Label>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Switch id="vchasnoUsage" />
            <Label htmlFor="vchasnoUsage" className="text-sm">
              Використовує електронний документообіг (Вчасно)
            </Label>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
