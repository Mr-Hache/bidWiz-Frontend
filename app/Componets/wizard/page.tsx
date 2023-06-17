import { User } from "../../redux/services/userApi";
import Link from 'next/link';
interface WizardProps {
    wizardUser: User;
}

const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
    

    return (

    <div>
        <Link href={`/user/${wizardUser.username}`}>
            <img src={wizardUser.image} alt="" width={200} height={200} />
            <h3>{`${wizardUser.name} ${wizardUser.lastName}`}</h3>
        </Link>
        
        <h4>{wizardUser.experience.title}</h4>
        <h4>{wizardUser.languages.join(', ')}</h4>
        <h4>{wizardUser.subjects.join(', ')}</h4>
    </div>
    );
}

export default Wizard;

