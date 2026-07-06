/*
Модель данных, приходящих с сервера. Требует проверки с помощью Type Guard.
 */

export type CounterType =
  | 'ColdWaterAreaMeter'
  | 'HotWaterAreaMeter'
  | 'AreaMeter';

export interface DataModelServer {
  id: string;
  _type: CounterType[];
  area: {
    id: string;
  };
  is_automatic: boolean | null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
}

export interface AddressModelServer {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
    fias_addrobjs: string[];
  };
}

/*
Модель данных, которую принимает таблица. Требует маппинга данных.
 */

export interface CounterData {
  iconPath: string;
  iconAlt: string;
  counterType: string;
}

export interface TableDataModel {
  id: string;
  type: CounterData;
  installDate: string;
  isAutomatic: string;
  value: string;
  address: string;
  note: string;
}
