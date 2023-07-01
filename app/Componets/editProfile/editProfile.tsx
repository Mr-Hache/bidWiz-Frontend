"use client"

import styles from "./editProfile.module.scss"
import React, { useState, useEffect } from 'react';
import { useUpdateWizardStatusMutation, UpdateUserWizardDto } from '../../redux/services/userApi';
import {useAppSelector} from "../../redux/hooks"
import ImageUpload from "../imageUpload/imageUpload";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import Swal from "sweetalert2";


function EditProfile() {

    const localUid = useAppSelector((state) => state.userAuth.uid)
    const [updateWizardStatus, { isLoading }] = useUpdateWizardStatusMutation();
    const [formState, setFormState] = useState<UpdateUserWizardDto>({} as UpdateUserWizardDto);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const email = useAppSelector((state) => state.userAuth.email)

    const allPossibleLanguages = [
        "Chinese",
        "English",
        "French",
        "German",
        "Italian",
        "Japanese",
        "Portuguese",
        "Russian",
        "Spanish",
      ];
      const allPossibleSubjects = [
        "Accounting",
        "Biology",
        "Business Administration",
        "Chemistry",
        "Computer Science",
        "Economics",
        "Law",
        "Mathematics",
        "Music Theory",
        "Physics",
        "Political Science",
        "Programming",
      ];

      const fetchUserData = () => {
        fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
        .then(response => response.json())
        .then(data => {

            
            setFormState({
            isWizard: data.isWizard,
            languages: data.languages,
            subjects: data.subjects,
            experience: {
                title: data.experience.title[0],
                origin: data.experience.origin[0]
            },
            image: data.image,
            aboutMe: data.aboutMe,
            pricePerOne: data.pricePerOne,
            pricePerTwo: data.pricePerTwo,
            pricePerThree: data.pricePerThree,
            });
            setUserId(data._id)
            setUserName(data.name)
        })
        .catch(error => console.error(error));
    }
    
    useEffect(() => {
        fetchUserData(); 
    }, [localUid]);

    const handleImageUpload = (imageUrl: string) => {
        // Utilizar la URL de la imagen cargada
        console.log("Imagen cargada:", imageUrl);
        setFormState((v) => ({ ...v, image: imageUrl }));
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        if (name === "pricePerOne" || name === "pricePerTwo" || name === "pricePerThree") {
            setFormState(prevState => ({
                ...prevState,
                [name]: parseFloat(value), 
            }));
        } else if (name === "languages" || name === "subjects") {
            const selectElement = e.target as HTMLSelectElement;
            const selectedOptions = Array.from(selectElement.selectedOptions, option => option.value);
            setFormState(prevState => ({
                ...prevState,
                [name]: selectedOptions,
            }));
        } else if (name.startsWith("experience.")) {
            const field = name.split(".")[1]; 
            setFormState(prevState => ({
                ...prevState,
                experience: {
                    ...(prevState.experience || {}),
                    [field]: value
                }
            }));
        } else {
            setFormState(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({
            ...prevState,
            isWizard: e.target.checked,
        }));
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await updateWizardStatus({
            _id: userId, 
            updateUserWizardDto: formState,
            });
            console.log(formState);
            
            console.log(response);
            fetchUserData(); 
            // alert("Info updated")
            Swal.fire('Info', '<b>updated</b>', 'success');
        } catch (error) {
            console.error(error);
        }
    };

    
    if (!formState) return 'Loading...';

    const handleChangePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const auth = getAuth();
        if(email){
            sendPasswordResetEmail(auth, email)
            .then(() => {
            //   alert('Password reset email sent successfully');
             Swal.fire('Password reset', '<b>email sent</b>', 'success');            
            })
            .catch((error) => {
            //   alert(`Error sending password reset email: ${error}`);
             Swal.fire('Error', `<b>Sending password reset email:</b> ${error}`, 'error');          
            });
        }
      
      };

    return (
        <div className={styles.div}>
        <h1>{userName}</h1>
        <button onClick={handleChangePassword}>Change your password</button>
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
                <textarea
                name="aboutMe"
                value={formState.aboutMe || ''}
                onChange={handleChange}
                rows={5}  // puedes ajustar esto para cambiar la altura inicial
                style={{ width: '100%' }} // esto hará que el textarea ocupe todo el espacio disponible
                />

                <br />
                <label htmlFor="languages">I speak</label>
                <select
                    multiple
                    name="languages"
                    value={formState.languages || []}
                    onChange={handleChange}
                >
                    {allPossibleLanguages.map((language, index) => (
                        <option key={index} value={language}>{language}</option>
                    ))}
                </select>

                <br />
                <label htmlFor="subjects">I want to teach</label>
                <select
                    multiple
                    name="subjects"
                    value={formState.subjects || []}
                    onChange={handleChange}
                >
                    {allPossibleSubjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                    ))}
                </select>

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
                <ImageUpload onImageUpload={handleImageUpload} />
                <br />
                <label htmlFor="image">Latest</label>
                <img src={formState.image} alt={userName} width="50" height="50" />
                <br />
                <br />
                <label htmlFor="pricePerOne">My offer for one class is</label> 
                <input
                    type="number"
                    name="pricePerOne"
                    value={formState.pricePerOne || 0}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="pricePerTwo">My offer for two classes is (each)</label> 
                <input
                    type="number"
                    name="pricePerTwo"
                    value={formState.pricePerTwo || 0}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="pricePerThree">My offer for three classes is (each)</label> 
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

        </div>
    );
}

export default EditProfile;

