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

export default function CompanyPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Дані компанії</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Основні</TabsTrigger>
          <TabsTrigger value="contacts">Контакти</TabsTrigger>
          <TabsTrigger value="finance">Фінанси</TabsTrigger>
          <TabsTrigger value="fleet">Рухомий склад</TabsTrigger>
          <TabsTrigger value="routes">Напрямки</TabsTrigger>
          <TabsTrigger value="category">Категорія</TabsTrigger>
          <TabsTrigger value="edoc">Е-Документообіг</TabsTrigger>
        </TabsList>

        {/* Основні дані */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Назва (повна)</Label>
              <Input placeholder="Повна назва компанії" />
            </div>
            <div>
              <Label>ОПФ</Label>
              <Input placeholder="Організаційно-правова форма" />
            </div>
            <div>
              <Label>Юридична адреса</Label>
              <Input placeholder="Юридична адреса" />
            </div>
            <div>
              <Label>Поштова адреса</Label>
              <Input placeholder="Поштова адреса" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch id="sameAddress" />
              <Label htmlFor="sameAddress" className="text-sm">
                Поштова адреса співпадає
              </Label>
            </div>
            <div>
              <Label>Сайт</Label>
              <Input placeholder="https://example.com" />
            </div>
          </div>
        </TabsContent>

        {/* Контакти */}
        <TabsContent value="contacts">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Директор (ПІБ)</Label>
              <Input placeholder="ПІБ директора" />
            </div>
            <div>
              <Label>Email директора</Label>
              <Input placeholder="director@example.com" />
            </div>
            <div>
              <Label>Телефон директора</Label>
              <Input placeholder="+380 50 123 4567" />
            </div>
            <div>
              <Label>Головний бухгалтер (ПІБ)</Label>
              <Input placeholder="ПІБ бухгалтера" />
            </div>
            <div>
              <Label>Email головного бухгалтера</Label>
              <Input placeholder="accountant@example.com" />
            </div>
            <div>
              <Label>Телефон головного бухгалтера</Label>
              <Input placeholder="+380 50 987 6543" />
            </div>
          </div>
        </TabsContent>

        {/* Фінанси */}
        <TabsContent value="finance">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>ЄДРПОУ / ІПН</Label>
              <Input placeholder="12345678" />
            </div>

          </div>
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
              Використовує електронний документообіг (Медок, Вчасно)
            </Label>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
