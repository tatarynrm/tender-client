// types/transport.ts
export type TransportCount = {
  count_truck: number;
  count_trailer: number;
};

export type DropdownItem = {
  id: string | number;
  name: string;
};

export type TransportPageInfo = {
  transport_count: TransportCount;
  trailer_type_dropdown: DropdownItem[];
  vehicle_type_dropdown: DropdownItem[];
};


export type Transport = {
    id:number | string;
  vin: string;                 // VIN-код транспортного засобу
  bort: number | null;         // Номер борту, може бути null
  euro: number;                // Євро-клас
  carnum: string | null;       // Номер авто, може бути null
  brand_name: string;          // Бренд/виробник
  model_name: string;          // Модель
  trailer_type: string | null; // Тип причепа, може бути null
  vehicle_type: string;        // Людський тип: 'Тягач', 'Причіп', тощо
  ids_trailer_type: string;    // ID типу причепа (може бути порожнім рядком)
  ids_vehicle_type: 'TRUCK' | 'TRAILER' | string; // Технічний ідентифікатор
};
