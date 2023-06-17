import { User } from "../../redux/services/userApi";
import style from "./wizard.module.scss"

interface WizardProps {
    wizardUser: User;
}

const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
    return (
        <div className={style.contCards}>
            <h2>{wizardUser.name} {wizardUser.lastName}</h2>            
            <img src={wizardUser.image} alt="persons" className={style.imagen} />
            <p>⭐⭐⭐⭐⭐</p>
            <div className={style.secondCont}>
            <p>{wizardUser.experience.title}</p>
            <hr />
            <p>{wizardUser.languages.join(' - ')}</p>
            <hr />
            <p>{wizardUser.subjects.join(' - ')}</p>
            </div>
        </div>
    );
}

export default Wizard;

