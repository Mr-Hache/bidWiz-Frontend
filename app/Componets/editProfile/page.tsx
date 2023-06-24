"use client"

import React, { useState, useEffect } from 'react';
import { useUpdateWizardStatusMutation, UpdateUserWizardDto } from '../../redux/services/userApi';

function EditProfile() {
    const localUid = "dDQ6nhCDlMRyl0UUpETKTJNANhA2"; // reemplaza esto con el uid real
    const [updateWizardStatus, { isLoading }] = useUpdateWizardStatusMutation();
    const [formState, setFormState] = useState<UpdateUserWizardDto>({} as UpdateUserWizardDto);

    useEffect(() => {
        fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
        .then(response => response.json())
        .then(data => {
            setFormState({
            isWizard: data.isWizard,
            languages: data.languages,
            subjects: data.subjects,
            experience: data.experience,
            image: data.image,
            aboutMe: data.aboutMe,
            pricePerOne: data.pricePerOne,
            pricePerTwo: data.pricePerTwo,
            pricePerThree: data.pricePerThree,
            });
        })
        .catch(error => console.error(error));
    }, [localUid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
        ...formState,
        isWizard: e.target.checked,
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

    // Si el estado del formulario aún no se ha inicializado, renderiza un mensaje de carga o un componente de carga.
    if (!formState) return 'Loading...';

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="isWIzard">Are you a Wizard?</label>
        <input
            type="checkbox"
            name="isWizard"
            checked={formState.isWizard || false}
            onChange={handleCheckboxChange}
        />

        {formState.isWizard && (
            <div>
                <br />
                <label htmlFor="aboutMe">Tell something about you</label>
                <input
                    type="text"
                    name="aboutMe"
                    value={formState.aboutMe || ''}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="languages">I speak</label>
                <input
                    type="text"
                    name="languages"
                    value={formState.languages?.join(', ') || ''}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="subjects">I want to teach</label>  
                <input
                    type="text"
                    name="subjects"
                    value={formState.subjects?.join(', ') || ''}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="experience.title">I am</label>  
                <input
                    type="text"
                    name="experience.title"
                    value={formState.experience?.title || ''}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="experience.origin">I am from</label> 
                <input
                    type="text"
                    name="experience.origin"
                    value={formState.experience?.origin || ''}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="image">This is me</label> 
                <input
                    type="text"
                    name="image"
                    value={formState.image || ''}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="pricePerOne">My offer for one class is</label> 
                <input
                    type="number"
                    name="pricePerOne"
                    value={formState.pricePerOne || 0}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="pricePerTwo">My offer for two classes is</label> 
                <input
                    type="number"
                    name="pricePerTwo"
                    value={formState.pricePerTwo || 0}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="pricePerThree">My offer for three classes is</label> 
                <input
                    type="number"
                    name="pricePerThree"
                    value={formState.pricePerThree || 0}
                    onChange={handleChange}
                />
            </div>
        )}

        <button type="submit" disabled={isLoading || !formState.isWizard}>Update</button>
        </form>
    );
}

export default EditProfile;

