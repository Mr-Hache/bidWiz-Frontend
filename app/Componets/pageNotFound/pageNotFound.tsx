import styles from "./pageNotFound.module.scss";
import Image from "next/image";
import ImageError from "../../src/imageError.png";

export default function pageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.containerText}>
        <div className={styles.container1}>
          <h1>Sorry!!!</h1>
          <h1>404 - Page Not Found</h1>
        </div>
        <div className={styles.container2}>
          <h2>We continue to work to improve </h2>
        </div>

        <div>
          <img
            src="https://img.freepik.com/free-vector/process-concept-illustration_114360-4229.jpg?w=996&t=st=1687037097~exp=1687037697~hmac=d551804b0ce0f72df4e9f3601d7a19698572ab72b64611563e3a991b6146d1e0"
            alt=""
            width={500}
            height={400}
          />
        </div>

        <div className={styles.container3}>
          <a href="/">
            <h3>Go back</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
