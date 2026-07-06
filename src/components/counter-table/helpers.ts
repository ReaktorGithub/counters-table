import type {
  AddressModelServer,
  CounterData,
  CounterType,
  DataModelServer,
  TableDataModel,
} from './model.ts';
import iconWaterCold from '../../assets/water-cold.svg';
import iconWaterHot from '../../assets/water-hot.svg';
import { isObject } from '../../helpers.ts';

// Type guards

export function isDataModelServer(parsed: unknown): parsed is DataModelServer {
  if (!isObject(parsed)) {
    return false;
  }

  return (
    typeof parsed.id === 'string' &&
    Array.isArray(parsed._type) &&
    isObject(parsed.area) &&
    typeof parsed.area.id === 'string'
  );
}

export function isAddressModelServer(
  parsed: unknown
): parsed is AddressModelServer {
  if (!isObject(parsed)) {
    return false;
  }

  return (
    typeof parsed.id === 'string' &&
    typeof parsed.str_number === 'string' &&
    isObject(parsed.house) &&
    typeof parsed.house.address === 'string'
  );
}

// Pages control

export function getPages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 0, total - 2, total - 1, total];
  }

  if (current >= total - 2) {
    return [1, 2, 3, 0, total - 2, total - 1, total];
  }

  return [1, 0, current - 1, current, current + 1, 0, total];
}

// Data mapping

export function getCounterData(type: CounterType[]): CounterData {
  if (type.includes('HotWaterAreaMeter')) {
    return {
      iconPath: iconWaterHot,
      iconAlt: 'Гор.',
      counterType: 'ГВС',
    };
  }

  if (type.includes('ColdWaterAreaMeter')) {
    return {
      iconPath: iconWaterCold,
      iconAlt: 'Хол.',
      counterType: 'ХВС',
    };
  }

  return {
    iconPath: '',
    iconAlt: '',
    counterType: '',
  };
}

export function formatUtcToRuDate(utcString: string): string {
  const date = new Date(utcString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function mapTableData(
  data: DataModelServer,
  address: string,
  index: number
): TableDataModel {
  return {
    id: String(index + 1),
    type: getCounterData(data._type),
    installDate: formatUtcToRuDate(data.installation_date),
    isAutomatic: data.is_automatic ? 'да' : 'нет',
    value: String(data.initial_values[0]),
    address,
    note: data.description,
  };
}
