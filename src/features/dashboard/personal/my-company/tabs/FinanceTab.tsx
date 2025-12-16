import { Input, Label } from "@/shared/components/ui";
import React from "react";

const FinanceTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label>ЄДРПОУ</Label>
        <Input placeholder="12345678" />
      </div>
      <div>
        <Label>ІПН</Label>
        <Input placeholder="1234567890" />
      </div>
    </div>
  );
};

export default FinanceTab;
