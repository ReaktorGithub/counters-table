import { serviceGet } from '../../api/service.ts';
import { isAddressModelServer, isDataModelServer } from './helpers.ts';
import type { DataModelServer } from './model.ts';

const addressCache = new Map<string, Promise<string>>();

export async function getAddress(id: string): Promise<string> {
  const cached = addressCache.get(id);

  if (cached) {
    return cached;
  }

  console.log('Make address request', id);

  const request = serviceGet(`/address.json`)
    .then((data) => {
      const results = data?.results as unknown;

      // Безопасно сужаем тип

      if (!results || !Array.isArray(results)) {
        console.warn('Invalid address results');
        return '';
      }

      if (results.length === 0) {
        console.warn('Empty address array');
        return '';
      }

      if (!isAddressModelServer(results[0])) {
        console.warn('Wrong address format');
        return '';
      }

      // todo заменить на реальные данные

      return 'г Санкт-Петербург, ул Тарасова, д. 0 корп. 0 лит. А, кв. 1';
    })
    .catch((error) => {
      // Если запрос упал — удаляем его из кэша, чтобы можно было попробовать еще раз.
      addressCache.delete(id);
      throw error;
    });

  addressCache.set(id, request);

  return request;
}

export async function getData() {
  const response = await serviceGet('/config.json');

  const results = response?.results as unknown;

  // Безопасно сужаем тип

  if (!results || !Array.isArray(results)) {
    console.warn('Invalid results');
    return [] as DataModelServer[];
  }

  if (results.length === 0) {
    console.warn('Empty data array');
    return [] as DataModelServer[];
  }

  if (!isDataModelServer(results[0])) {
    console.warn('Wrong data format');
    return [] as DataModelServer[];
  }

  return results as DataModelServer[];
}
