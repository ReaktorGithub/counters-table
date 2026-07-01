import styles from './CounterTable.module.css';
import { RemoveButton } from '../remove-button/RemoveButton.tsx';
import { useEffect, useState } from 'react';
import { PageButton } from '../page-button/PageButton.tsx';

interface DataModel {
  percent: string;
  type: string;
  date: string;
  isAuto: boolean;
  currentValue: string;
  address: string;
  note: string;
}

const mockData: DataModel[] = [
  {
    percent: '1',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '2',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '3',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '4',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '5',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '6',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '7',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '8',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
  {
    percent: '9',
    type: 'NCV',
    date: '12.45.13',
    isAuto: true,
    currentValue: '13424.35',
    address: 'address',
    note: 'note',
  },
];

function getPages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, '...', total - 2, total - 1, total];
  }

  if (current >= total - 2) {
    return [1, 2, 3, '...', total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
}

const MAX_ITEMS_PER_PAGE = 20;

const CountersTable = () => {
  const [data, setData] = useState<DataModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // fetch('http://showroom.eis24.me/c300/api/v4/test/meters/?limit=20&offset=0')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка:', error);
    //   });

    setData(mockData);
    setCurrentPage(1);
    setTotalPages(Math.ceil(mockData.length / MAX_ITEMS_PER_PAGE));
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
            <th>%</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th>Адрес</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {paginatedData.map((item) => (
            <tr key={item.percent}>
              <td>{item.percent}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>
              <td>{item.isAuto ? 'Да' : 'Нет'}</td>
              <td>{item.currentValue}</td>
              <td>{item.address}</td>
              <td>
                {item.note} <RemoveButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <div className={styles.paginator}>
          {getPages(currentPage, totalPages).map((item, index) =>
            item === '...' ? (
              <span key={item}>...</span>
            ) : (
              <PageButton
                key={item}
                text={String(item)}
                isDisabled={item === currentPage}
                onClick={() => setCurrentPage(Number(item))}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export { CountersTable };
