import { User } from "../../redux/services/userApi";
import Link from 'next/link';
import Image from 'next/image';
import style from "./wizard.module.scss"
import Flag from "react-world-flags";
import { flags, subjectsIcons } from "@/app/utils/flagsAndObjectsIcons";
import wizards from "../wizards/page";
import {  FaBook,  FaMicroscope,  FaBriefcase,  FaVial,  FaCode,  FaRegChartBar,  FaBalanceScale,  FaCalculator,  FaMusic,  FaAtom,  FaUserGraduate,  FaLaptopCode,} from 'react-icons/fa';
import { IconType } from 'react-icons';

import  FaIconName  from 'react-icons/fa';

interface LanguageFlag {
  name: string;
  flag: string | null;
}

interface WizardProps {
  wizardUser: User;
}



const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
    const imageLoader = ({ src }: { src: string }) => {
        return src; // Devuelve la ruta original de la imagen sin modificaciones
      };

      const mappedLanguages: (string | null)[] = wizardUser.languages.map((language: string | null) => {
    const flagObject = flags.find((flag: LanguageFlag) => flag.name === language);
    return flagObject ? flagObject.flag : null;
  })

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

  return (
    <div className={style.contCards}>
      <Link style={{textDecoration:'none'}} href={`/detail/${wizardUser.username}` }>
        
          <div>
          <h2>{`${wizardUser.name} ${wizardUser.lastName}`}</h2>
            <Image className={style.imagen}
              loader={imageLoader}
              src={wizardUser.image}
              alt=""
              width={120}
              height={120}
            />            
          </div>
          </Link>
          <div className={style.secondCont}>                                    
            <p className={style.tittle}>{wizardUser.experience.title}</p>
            <hr />
            <h3>Languages</h3>
              <div className={style.flags}>
                {mappedLanguages.map((language, index) => (
                  <div key={index} className={style.language}>
                    {language && (
                      <Flag
                        height={15}
                        width={25}
                        code={language.slice(0, 2).toLowerCase()}
                        className={style.flag}
                      />
                    )}
                    <span className={style.languageText}>{language}</span>
                  </div>
                ))}
              </div>


            {/* <div className={style.flags}>
              {mappedLanguages
                .slice() 
                .sort((a, b) => a.localeCompare(b)) 
                .map((language, index) => (
                  <div key={index} className={style.language}>
                    {language && (
                      <Flag
                        height={15}
                        width={25}
                        code={language.slice(0, 2).toLowerCase()}
                        className={style.flag}
                      />
                    )}
                    <span className={style.languageText}>{language}</span>
                  </div>
                ))}
            </div> */}
            <hr />
            <h3>Subjects</h3>
          <div className={style.subjects}>
            {wizardUser.subjects
              .slice() 
              .sort((a, b) => a.localeCompare(b)) 
              .map((subject, index) => {
                const subjectIcon = subjectsIcons.find((item) => item.name === subject);
                const Icon = subjectIcon ? getSubjectIcon(subjectIcon.icon) : null;
                const colors = ['#E81DF1 ', '#00FF00', '#0000FF', '#DD963B', '#0E18F1' ]; 
                const iconColor = colors[index % colors.length]; 

                return (
                  <div key={index} className={style.subject}>
                    {Icon && <Icon style={{ color: iconColor }} />}
                    <span className={style.siglas}>{subject}</span>
                  </div>
                );
              })}
          </div>
            <hr /> 
            <p>⭐⭐⭐⭐⭐</p>       
          </div>      
    </div>
  );
}

export default Wizard;