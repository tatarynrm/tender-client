export interface ITender {
  id: number;
  step: number | null;
  cargo: string;
  notes: string | null;
  author: string;
  id_usr: number;
  volume: number | null;
  weight: number | null;
  id_valut: number;
  ids_type: "GENERAL" | string;
  car_count: number;
  cost_start: number | null;
  ids_status: string | null;
  time_start: string | null;
  valut_name: string;
  tender_load: any[]; // Якщо треба — зроблю точний тип
  tender_type: string;
  without_vat: boolean | null;
  company_name: string;
  tender_route: ITenderRoute[];
  car_count_add: number | null;
  price_request: number | null;
  tender_status: string | null;
  time_end: string | null;
  tender_trailer: ITenderTrailer[];
  car_count_actual: number | null;
  car_count_closed: number | null;
  id_owner_company: number;
  duration_continue: number | null;
  tender_permission: any[]; // Якщо треба — зроблю тип
  car_count_canceled: number | null;
  city?:string
  ids_country?:string
}

export interface ITenderRoute {
  id: number;
  notes: string | null;
  country: string;
  customs: boolean;
  locality: string;
  id_parent: number;
  id_region: number;
  ids_point: "LOAD_FROM" | "LOAD_TO" | string;
  order_num: number;
  date_point: string | null;
  id_country: number;
  point_name: string;
  date_point2: string | null;
  region_name: string;
  city?:string;
    ids_country?:string
}

export interface ITenderTrailer {
  id: number;
  id_parent: number;
  order_num: number;
  ids_trailer_type: "TENT" | "REF" | string;
  trailer_type_name: string;
}
