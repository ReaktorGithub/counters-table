import styles from './RemoveButton.module.css';
import { TrashIcon } from '../../assets/TrashIcon.tsx';
import clsx from 'clsx';

interface Props {
  onClick?: () => void;
  isDisabled?: boolean;
}

const RemoveButton = ({ onClick, isDisabled }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={clsx(styles.button, {
        [styles.disabled]: isDisabled,
      })}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <TrashIcon />
    </button>
  );
};

export { RemoveButton };
