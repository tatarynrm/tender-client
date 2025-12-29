// export interface ITender {
//   id: number;
//   step: number | null;
//   cargo: string;
//   notes: string | null;
//   author: string;
//   id_usr: number;
//   volume: number | null;
//   weight: number | null;
//   id_valut: number;
//   ids_type: "GENERAL" | string;
//   car_count: number;
//   cost_start: number | null;
//   ids_status: string | null;
//   time_start: string | null;
//   valut_name: string;
//   tender_load: any[]; // Якщо треба — зроблю точний тип
//   tender_type: string;
//   without_vat: boolean | null;
//   company_name: string;
//   tender_route: ITenderRoute[];
//   car_count_add: number | null;
//   price_request: number | null;
//   tender_status: string | null;
//   time_end: string | null;
//   tender_trailer: ITenderTrailer[];
//   car_count_actual: number | null;
//   car_count_closed: number | null;
//   id_owner_company: number;
//   duration_continue: number | null;
//   tender_permission: any[]; // Якщо треба — зроблю тип
//   car_count_canceled: number | null;
//   city?:string
//   ids_country?:string
 
// }

// export interface ITenderRoute {
//   id: number;
//   notes: string | null;
//   country: string;
//   customs: boolean;
//   locality: string;
//   id_parent: number;
//   id_region: number;
//   ids_point: "LOAD_FROM" | "LOAD_TO" | string;
//   order_num: number;
//   date_point: string | null;
//   id_country: number;
//   point_name: string;
//   date_point2: string | null;
//   region_name: string;
//   city?:string;
//     ids_country?:string
// }

// export interface ITenderTrailer {
//   id: number;
//   id_parent: number;
//   order_num: number;
//   ids_trailer_type: "TENT" | "REF" | string;
//   trailer_type_name: string;
// }



export interface ITender {
  id: number;

  cargo: string;
  email: string;
  notes: string | null;
  author: string;

  volume: number | null;
  weight: number | null;

  ids_type: "GENERAL" | string;
  ids_status: "WAITING" | string;
  ids_valut: "UAH" | "USD" | "EUR" | string;

  time_start: string | null;
  time_end: string | null;

  price_start: number | null;
  price_next: number | null;
  price_step: number | null;
  request_price: number | null;
  price_proposed: number | null;
  price_redemption: number | null;

  without_vat: boolean;
  duration_continue: boolean;

  car_count:number;
  car_count_actual: number;
  car_count_closed:number;
  car_count_canceled:number;


  company_name:string;

  cost_start:number;

  tender_status:string;
  valut_name?:string;

  tender_type?:string;

  usr_phone: any[]; // якщо зʼявиться структура — типізуємо
  rate_company: IRateCompany[];

  tender_load: ITenderLoad[];
  tender_route: ITenderRoute[];
  tender_trailer: ITenderTrailer[];
  tender_permission: ITenderPermission[];
}
export interface ITenderLoad {
  id: number;
  ids_load_type: "UP" | "BACK" | string;
  load_type_name: string;
}
export interface ITenderRoute {
  id: number;

  locality?:string;

  lat: number | null;
  lon: number | null;

  city: string;
  address: string;

  customs: boolean;

  ids_point:
    | "LOAD_FROM"
    | "LOAD_TO"
    | "BORDER"
    | "CUSTOM_UP"
    | "CUSTOM_DOWN"
    | string;

  point_name: string;

  date_point: string | null;
  date_point2: string | null;

  ids_country: string;
}
export interface ITenderTrailer {
  id: number;
  ids_trailer_type: "TENT" | "REF" | "CILNOMET" | "ZERNO" | string;
  trailer_type_name: string;
}
export interface ITenderPermission {
  id: number;
  ids_permission_type: "CMR" | "CUSTOM" | "CMR_INSHURANCE" | string;
  load_type_name: string;
}
export interface IRateCompany {
  author: string;
  price_proposed: number | null;
  redemption_price: string;
}
