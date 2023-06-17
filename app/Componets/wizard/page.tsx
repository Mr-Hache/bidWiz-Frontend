import { User } from "../../redux/services/userApi";
import Link from 'next/link';
import Image from 'next/image';

interface WizardProps {
  wizardUser: User;
}

const Wizard: React.FC<WizardProps> = ({ wizardUser }) => {
    const imageLoader = ({ src }: { src: string }) => {
        return src; // Devuelve la ruta original de la imagen sin modificaciones
      };
  return (
    <div>
      <Link href={`/detail/${wizardUser.username}`}>
        
          <div>
            <Image
              loader={imageLoader}
              src={wizardUser.image}
              alt=""
              width={200}
              height={200}
            />
          </div>
          <h3>{`${wizardUser.name} ${wizardUser.lastName}`}</h3>
        
      </Link>

      <h4>{wizardUser.experience.title}</h4>
      <h4>{wizardUser.languages.join(', ')}</h4>
      <h4>{wizardUser.subjects.join(', ')}</h4>
    </div>
  );
}

export default Wizard;