import styles from './Main.module.scss';

export default function MainPage() {
  return (
    <main className={styles.wrapper}>
      {/* 섹션 1 */}
      <section className={styles.section}>
        <h2 className={styles.headline}>당신은 화가 나는 순간이 있는가?</h2>
      </section>

      {/* 섹션 2 */}
      <section className={styles.section}>
        <h2 className={styles.headline}>SECTION 02</h2>
      </section>

      {/* 섹션 3 */}
      <section className={styles.section}>
        <h2 className={styles.headline}>SECTION 03</h2>
      </section>

      {/* 필요하면 더 추가 */}
      <section className={styles.section}>
        <h2 className={styles.headline}>SECTION 04</h2>
      </section>
    </main>
  );
}
