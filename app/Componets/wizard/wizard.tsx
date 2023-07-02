import { User } from "../../redux/services/userApi";
import Link from "next/link";
import Image from "next/image";
import style from "./wizard.module.scss";
import Flag from "react-world-flags";
import { flags, subjectsIcons } from "@/app/utils/flagsAndObjectsIcons";
import { IoIosStar } from "react-icons/io";

import {
  FaBook,
  FaMicroscope,
  FaBriefcase,
  FaVial,
  FaCode,
  FaRegChartBar,
  FaBalanceScale,
  FaCalculator,
  FaMusic,
  FaAtom,
  FaUserGraduate,
  FaLaptopCode,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { useTheme } from "next-themes";

interface LanguageFlag {
  name: string;
  flag: string | null;
}

interface WizardProps {
  wizardUser: User;
}

const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
  const imageLoader = ({ src }: { src: string }) => {
    return src;
  };

  const mappedLanguages: (string | null)[] = wizardUser.languages.map(
    (language: string | null) => {
      const flagObject = flags.find(
        (flag: LanguageFlag) => flag.name === language
      );
      return flagObject ? flagObject.flag : null;
    }
  );
  const { theme } = useTheme();

  const getSubjectIcon = (iconName: string): IconType | null => {
    switch (iconName) {
      case "FaBook":
        return FaBook;
      case "FaMicroscope":
        return FaMicroscope;
      case "FaBriefcase":
        return FaBriefcase;
      case "FaVial":
        return FaVial;
      case "FaCode":
        return FaCode;
      case "FaRegChartBar":
        return FaRegChartBar;
      case "FaBalanceScale":
        return FaBalanceScale;
      case "FaCalculator":
        return FaCalculator;
      case "FaMusic":
        return FaMusic;
      case "FaAtom":
        return FaAtom;
      case "FaUserGraduate":
        return FaUserGraduate;
      case "FaLaptopCode":
        return FaLaptopCode;
      default:
        return null;
    }
  };

  const renderStars = (numStars: number) => {
    return Array.from({ length: Math.round(numStars) }, (_, index) => (
      <IoIosStar key={index} />
    ));
  };

  return (
    <div
      className={`${style.contCards} ${
        theme === "dark" ? style.contCardsDark : style.contCardsLight
      }`}
    >
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        href={`/detail/${wizardUser._id}`}
      >
        <div>
          <h2>{`${wizardUser.name} `}</h2>
          <Image
            className={`${style.image} ${
              theme === "dark" ? style.imageDark : style.imageLight
            }`}
            loader={imageLoader}
            src={wizardUser.image}
            alt=""
            width={7}
            height={7}
          />
        </div>

        <div className={style.secondCont}>
          <p className={style.stars}>{renderStars(wizardUser.reviews)}</p>
          <p className={style.experience}>
            <b>{wizardUser.experience.expJobs}</b> class taught
          </p>
          <div className={style.about}>
            {wizardUser.aboutMe.split(" ").slice(0, 23).join(" ")}...
          </div>

          <div className={style.flags}>
            <b>Speack in:</b>
            {mappedLanguages
              .slice()
              .sort((a, b) => (a && b ? a.localeCompare(b) : 0))
              .map((language, index) => (
                <div key={index} className={style.language}>
                  {language && (
                    <Flag
                      code={language.slice(0, 2).toLowerCase()}
                      className={style.flag}
                    />
                  )}
                  <span className={style.languageText}>{language}</span>
                </div>
              ))}
          </div>
          <h3>Teaches</h3>
          <div className={style.subjects}>
            {wizardUser.subjects
              .slice()
              .sort((a, b) => a.localeCompare(b))
              .map((subject, index) => {
                if (index < 5) {
                  const subjectIcon = subjectsIcons.find(
                    (item) => item.name === subject
                  );
                  const Icon = subjectIcon
                    ? getSubjectIcon(subjectIcon.icon)
                    : null;

                  return (
                    <div key={index} className={style.subject}>
                      {Icon && <Icon style={{ color: "#455a64" }} />}
                      <span className={style.subjectText}>{subject}</span>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Wizard;
