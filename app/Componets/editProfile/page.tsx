"use client"

import React, { useState } from 'react'
import { useUpdateWizardStatusMutation, UpdateUserWizardDto } from '../../redux/services/userApi'

function EditProfile() {
  const [updateWizardStatus, { isLoading }] = useUpdateWizardStatusMutation();
  const [formState, setFormState] = useState<UpdateUserWizardDto>({
    // Inicializa con valores por defecto o con los valores actuales del usuario
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateWizardStatus({
        _id: 'userId', // Actualiza con el ID real del usuario
        updateUserWizardDto: formState,
      });
      console.log(response);
      // Realiza algo con la respuesta, como redirigir o mostrar un mensaje de éxito.
    } catch (error) {
      console.error(error);
      // Maneja el error aquí
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aquí deberías tener los inputs correspondientes para cada propiedad que quieras actualizar, por ejemplo: */}
      <input
        type="text"
        name="aboutMe"
        value={formState.aboutMe || ''}
        onChange={handleChange}
      />
      <button type="submit" disabled={isLoading}>Actualizar</button>
    </form>
  );
}

export default EditProfile;
