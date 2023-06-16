import styles from "./footer.module.scss";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.containerMedium}>
        <div className={styles.title}>
          <h2>You can study</h2>
        </div>
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
        <div className={styles.icons}>
          <BsFacebook className={styles.face} />
          <BsInstagram className={styles.inst} />
          <BsTwitter className={styles.twit} />
          <BsYoutube className={styles.yout} />
          <BsLinkedin className={styles.link} />
        </div>
        <div className={styles.containerCopy}>
          <small>Copyright &copy; BidWiz Company</small>
        </div>
      </div>
    </section>
  );
}
