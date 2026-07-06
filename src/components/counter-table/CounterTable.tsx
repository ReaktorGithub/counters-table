import styles from './CounterTable.module.css';
import { useEffect, useState } from 'react';
import { PageButton } from '../page-button/PageButton.tsx';
import { CounterRow } from './CounterRow.tsx';
import { getPages, mapTableData } from './helpers.ts';
import { MAX_ITEMS_PER_PAGE } from './constants.ts';
import type { TableDataModel } from './model.ts';
import { getAddress, getData } from './api.ts';

const CountersTable = () => {
  const [data, setData] = useState<TableDataModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function load() {
      try {
        const response = await getData();

        // Мапим данные в формат, приемлемый для таблицы. Попутно добываем адрес.

        const mappedData = await Promise.all(
          response.map(async (item, index) => {
            const address = await getAddress(item.area.id);
            return mapTableData(item, address, index);
          })
        );

        // Устанавливаем новые значения

        setData(mappedData);
        setCurrentPage(1);
        setTotalPages(Math.ceil(mappedData.length / MAX_ITEMS_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    }

    void load();
  }, []);

  console.log({
    currentPage,
    totalPages,
  });

  const paginatedData = data.slice(
    (currentPage - 1) * MAX_ITEMS_PER_PAGE,
    currentPage * MAX_ITEMS_PER_PAGE
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th className={styles.headCellAddress}>Адрес</th>
            <th className={styles.headCellNote}>Примечание</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {paginatedData.map((item) => (
            <CounterRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <div className={styles.paginator}>
          {getPages(currentPage, totalPages).map((item) =>
            !item ? (
              <span key={item}>...</span>
            ) : (
              <PageButton
                key={item}
                text={String(item)}
                isDisabled={item === currentPage}
                onClick={() => setCurrentPage(item)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export { CountersTable };
