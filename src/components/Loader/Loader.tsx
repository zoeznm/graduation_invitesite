import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  onFinish: () => void;
  duration?: number;
}

export default function Loader({ onFinish, duration = 3000 }: LoaderProps) {

  const [isExit, setExit] = useState(false);

  useEffect(() => {

    const endTimer = setTimeout(() => {
      setExit(true);                        
      const cbTimer = setTimeout(onFinish, 800); 
      return () => clearTimeout(cbTimer);
    }, duration);

    return () => clearTimeout(endTimer);
  }, [duration, onFinish]);

  return (
    <section
      className={`${styles.container} ${isExit ? styles.fadeOut : ''}`}
      aria-label="로딩 화면"
    >
      <h1 className={styles.title}>GRDUATION&nbsp;INVITE</h1>
    </section>
  );
}
