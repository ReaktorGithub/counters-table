import styles from './PageButton.module.css';
import clsx from 'clsx';

interface Props {
  onClick?: () => void;
  isDisabled?: boolean;
  text: string;
}

const PageButton = ({ onClick, isDisabled, text }: Props) => {
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
      {text}
    </button>
  );
};

export { PageButton };
