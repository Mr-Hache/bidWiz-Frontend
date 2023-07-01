import styles from "./pageNotFound.module.scss";
import Image from "next/image";
import sombrero from "../../src/sombrero.png";
import Link from "next/link";

export default function pageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.containerText}>
        <div className={styles.container1}>
          <h1>Sorry!!!</h1>
          <h1 className={styles.text}>404 - Page Not Found</h1>
        </div>
        <div className={styles.container2}>
          <h2>We continue to work to improve </h2>
        </div>

        <div>
          <Image src={sombrero} alt="" width={300} height={200} />
        </div>

        <div className={styles.container3}>
          <Link href="/">
            <h1>Go back</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
