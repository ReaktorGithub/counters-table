import clsx from 'clsx';
import styles from './CounterTable.module.css';
import { RemoveButton } from '../remove-button/RemoveButton.tsx';
import { useState } from 'react';
import type { TableDataModel } from './model.ts';

interface Props {
  item: TableDataModel;
}

const CounterRow = ({ item }: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  const { id, note, type, address, value, isAutomatic, installDate } = item;

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <td>
        <div className={clsx(styles.cell, styles.cellCentered)}>
          <p className={styles.cellText}>{id}</p>
        </div>
      </td>
      <td>
        <div className={styles.cell}>
          <img src={type.iconPath} alt={type.iconAlt} />
          <p className={styles.cellText}>{type.counterType}</p>
        </div>
      </td>
      <td>
        <div className={styles.cell}>
          <p className={styles.cellText}>{installDate}</p>
        </div>
      </td>
      <td>
        <div className={styles.cell}>
          <p className={styles.cellText}>{isAutomatic}</p>
        </div>
      </td>
      <td>
        <div className={styles.cell}>
          <p className={styles.cellText}>{value}</p>
        </div>
      </td>
      <td>
        <div className={styles.cell}>
          <p className={styles.cellText}>{address}</p>
        </div>
      </td>
      <td>
        <div className={clsx(styles.cell, styles.cellSpaceBetween)}>
          <p className={styles.cellText}>{note}</p>
          {hover && <RemoveButton />}
        </div>
      </td>
    </tr>
  );
};

export { CounterRow };
