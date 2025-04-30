import styles from './EnterGate.module.scss';

interface Props {
  onEnter: () => void; 
}

export default function EnterGate({ onEnter }: Props) {
  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={onEnter}>
        ENTER
      </button>
    </section>
  );
}
