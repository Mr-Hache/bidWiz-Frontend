import { User } from "../../redux/services/userApi";
import Link from 'next/link';
import Image from 'next/image';
import style from "./wizard.module.scss"

interface WizardProps {
  wizardUser: User;
}

const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
    const imageLoader = ({ src }: { src: string }) => {
        return src; 
      };
  return (
    <div className={style.contCards}>
      <Link style={{textDecoration:'none'}} href={`/detail/${wizardUser._id}` }>
        
          <div>
          <h2>{`${wizardUser.name} `}</h2>
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
            <p>{wizardUser.languages.join(' - ')}</p>
            <hr />
            <h3>Subjects</h3>
            <p>{wizardUser.subjects.join(' - ')}</p>    
            <hr /> 
            <p>⭐⭐⭐⭐⭐</p>       
          </div>      
    </div>
  );
}

export default Wizard;