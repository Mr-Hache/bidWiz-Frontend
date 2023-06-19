import styles from "./footer.module.scss";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.containerMedium}>
        <div className={styles.title}>
          <h2>You can study</h2>
        </div>
        <div className={styles.subject}>
          <Link href="/not-found" className={styles.link}>
            <h4>Mathematics</h4>
          </Link>

          <Link href="/not-found" className={styles.link}>
            <h4>Physics</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Law</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Chemistry</h4>
          </Link>
        </div>
        <div className={styles.subject}>
          <Link href="/not-found" className={styles.link}>
            <h4>Biology</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Programming</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Economics</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Business Administration</h4>
          </Link>
        </div>
        <div className={styles.subject}>
          <Link href="/not-found" className={styles.link}>
            <h4>Accounting</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Computer Science</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Political Science</h4>
          </Link>
          <Link href="/not-found" className={styles.link}>
            <h4>Music Theory</h4>
          </Link>
        </div>
      </div>
      <div className={styles.containerSmall}>
        <div className={styles.icons}>
          <Link href="/not-found" className={styles.link}>
            <BsFacebook className={styles.face} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsInstagram className={styles.inst} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsTwitter className={styles.twit} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsYoutube className={styles.yout} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsLinkedin className={styles.lin} />
          </Link>
        </div>
        <div className={styles.containerCopy}>
          <small>Copyright &copy; BidWiz Company</small>
        </div>
      </div>
    </section>
  );
}
