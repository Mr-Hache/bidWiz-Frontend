import { User } from "../../redux/services/userApi";
import style from "./wizard.module.scss"

interface WizardProps {
    wizardUser: User;
}

const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
    return (
        <div className={style.contCards}>
            <img src={wizardUser.image} alt="" width={200} height={200} />
            <h3>{wizardUser.name}</h3>
            <h3>{wizardUser.lastName}</h3>
            <h4>{wizardUser.experience.title}</h4>
            <h4>{wizardUser.languages.join(', ')}</h4>
            <h4>{wizardUser.subjects.join(', ')}</h4>
        </div>
    );
}

export default Wizard;

