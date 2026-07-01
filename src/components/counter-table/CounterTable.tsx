import styles from './CounterTable.module.css';
import { RemoveButton } from '../remove-button/RemoveButton.tsx';

const CountersTable = () => {
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
          <tr>
            <td>1</td>
            <td>ТПЛ</td>
            <td>12.01.2023</td>
            <td>да</td>
            <td>33335.67</td>
            <td>г Санкт-Петербург, ул Тарасова, д. 0 корп. 0 лит. А, кв. 1</td>
            <td>
              Подвал, парадная 1 <RemoveButton />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>ТПЛ</td>
            <td>12.01.2023</td>
            <td>да</td>
            <td>33335.67</td>
            <td>г Санкт-Петербург, ул Тарасова, д. 0 корп. 0 лит. А, кв. 1</td>
            <td>Подвал, парадная 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ТПЛ</td>
            <td>12.01.2023</td>
            <td>да</td>
            <td>33335.67</td>
            <td>г Санкт-Петербург, ул Тарасова, д. 0 корп. 0 лит. А, кв. 1</td>
            <td>Подвал, парадная 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ТПЛ</td>
            <td>12.01.2023</td>
            <td>да</td>
            <td>33335.67</td>
            <td>г Санкт-Петербург, ул Тарасова, д. 0 корп. 0 лит. А, кв. 1</td>
            <td>Подвал, парадная 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ТПЛ</td>
            <td>12.01.2023</td>
            <td>да</td>
            <td>33335.67</td>
            <td>г Санкт-Петербург, ул Тарасова, д. 0 корп. 0 лит. А, кв. 1</td>
            <td>Подвал, парадная 1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { CountersTable };
