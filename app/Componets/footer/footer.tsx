import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.containerMedium}>
        <h3>Study</h3>
        <div className={styles.subject}>
          <h4>Mathematics</h4>
          <h4>Physics</h4>
          <h4>Law</h4>

          <h4>Chemistry</h4>
        </div>
        <div className={styles.subject}>
          <h4>Biology</h4>
          <h4>Programming</h4>
          <h4>Economics</h4>
          <h4>Business Administration</h4>
        </div>
        <div className={styles.subject}>
          <h4>Accounting</h4>
          <h4>Computer Science</h4>
          <h4>Political Science</h4>
          <h4>Music Theory</h4>
        </div>
      </div>
      <div className={styles.containerSmall}>
        <h1>contenedor2</h1>
      </div>
    </section>
  );
}
