import styles from "./about.module.scss";
import Image from "next/image";
import Hernan from "../../src/Hernan.png";
import Joaquin from "../../src/Joaquin.png";
import Gerald from "../../src/Gerald.jpg";
import Juan from "../../src/Juan.png";
import Francisco from "../../src/Francisco.png";
import Nixon from "../../src/Nixon.jpg";
import linkeginlogo from "../../src/images/LILOG1.png";

const nombres = [
  "Hernan Castillo",
  "Gerald Mickelsen",
  "Joaquin Ruiz Diaz",
  "Francisco Insaurralde",
  "Juan Tirado",
  "Nixon Batallas",
];

const About = () => {
  return (
    <div className={styles.contAbout}>
      <h1>BidWiz</h1>
      <span style={{ fontSize: "27px" }}>
        This project is dedicated to promoting online education and was created
        by a group of fellow programming enthusiasts
      </span>

      <div className={styles.contImage}>
        <div>
          <Image
            src={Hernan}
            alt="hernan"
            width={160}
            height={160}
            className={styles.image}
          />
          <h2>{nombres[0]}</h2>
          <hr />
          <h3>Full Stack Developer</h3>
          <hr />
          <Image src={linkeginlogo} alt="logo" className={styles.logos} />
        </div>

        <div>
          <Image
            src={Gerald}
            alt="gerald"
            width={160}
            height={160}
            className={styles.image}
          />
          <h2>{nombres[1]}</h2>
          <hr />
          <h3>Full Stack Developer</h3>
          <hr />
          <a
            href="https://www.linkedin.com/in/geraldmickelsen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={linkeginlogo} alt="logo" className={styles.logos} />
          </a>
        </div>

        <div>
          <Image
            src={Joaquin}
            alt="joaquin"
            width={160}
            height={160}
            className={styles.image}
          />
          <h2>{nombres[2]}</h2>
          <hr />
          <h3>Full Stack Developer</h3>
          <hr />
          <a
            href=" https://www.linkedin.com/in/joaquindev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={linkeginlogo} alt="logo" className={styles.logos} />
          </a>
        </div>

        <div>
          <Image
            src={Francisco}
            alt="francisco"
            width={160}
            height={160}
            className={styles.image}
          />
          <h2>{nombres[3]}</h2>
          <hr />
          <h3>Full Stack Developer</h3>
          <hr />
          <a
            href="https://www.linkedin.com/in/francisco-insaurralde-539109220/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={linkeginlogo} alt="logo" className={styles.logos} />
          </a>
        </div>

        <div>
          <Image
            src={Juan}
            alt="juan"
            width={160}
            height={160}
            className={styles.image}
          />
          <h2>{nombres[4]}</h2>
          <hr />
          <h3>Full Stack Developer</h3>
          <hr />
          <a
            href="https://www.linkedin.com/in/juan-antonio-tirado-corales-a4a634153/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={linkeginlogo} alt="logo" className={styles.logos} />
          </a>
        </div>

        <div>
          <Image
            src={Nixon}
            alt="nixon"
            width={160}
            height={160}
            className={styles.image}
          />
          <h2>{nombres[5]}</h2>
          <hr />
          <h3>Full Stack Developer</h3>
          <hr />
          <a
            href="https://www.linkedin.com/in/nixon-batallas-b91353257/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={linkeginlogo} alt="logo" className={styles.logos} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
