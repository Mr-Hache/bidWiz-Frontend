import styles from "./searchBar.module.scss";

export default function searchBar() {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Find your Wizards"
      />
      <button className={styles.button} type="submit">
        <div className={styles.lupa}>🔍︎</div>
      </button>
    </div>
  );
}
