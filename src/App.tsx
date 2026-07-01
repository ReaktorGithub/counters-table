import styles from './App.module.css'
import { CountersTable } from './components/counter-table/CounterTable.tsx';

const App = () => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.heading}>Список счётчиков</h1>
      <CountersTable />
    </div>
  );
};

export { App };
