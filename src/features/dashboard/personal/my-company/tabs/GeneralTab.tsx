import { Input, Label, Switch } from "@/shared/components/ui";
import React from "react";

const GeneralTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm">Назва (повна)</Label>
        <Input placeholder="Повна назва компанії" />
      </div>
      <div>
        <Label className="text-sm">ОПФ</Label>
        <Input placeholder="Організаційно-правова форма" />
      </div>
      <div>
        <Label className="text-sm">Юридична адреса</Label>
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
  );
};

export default GeneralTab;
