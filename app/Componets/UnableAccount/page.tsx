"use client"

import { useDisableUserMutation } from '../../redux/services/userApi';

export default function UnableAccount() {
  const localUid: string = "648e13a5c8489b5c103ee024";
  const [disableUserMutation] = useDisableUserMutation();

  const handleClick = async () => {
    try {
      await disableUserMutation({ _id: localUid });
      // Realiza algo con la respuesta, como redirigir o mostrar un mensaje de éxito.
    } catch (error) {
      console.error(error);
      // Maneja el error aquí
    }
  };

  return (
    <div>
      <button onClick={handleClick}>UNABLE ACCOUNT</button>
    </div>
  );
}
