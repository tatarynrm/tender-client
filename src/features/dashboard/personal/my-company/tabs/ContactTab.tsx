import { Input, Label } from "@/shared/components/ui";
import React from "react";

const ContactTab = () => {
  return (
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
  );
};

export default ContactTab;
