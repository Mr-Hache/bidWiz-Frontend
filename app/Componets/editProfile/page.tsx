"use client"

import React, { useState, useEffect } from 'react';
import { useUpdateWizardStatusMutation, UpdateUserWizardDto } from '../../redux/services/userApi';
import {useAppSelector} from "../../redux/hooks"

function EditProfile() {

    const localUid = useAppSelector((state) => state.userAuth.uid)
    const [updateWizardStatus, { isLoading }] = useUpdateWizardStatusMutation();
    const [formState, setFormState] = useState<UpdateUserWizardDto>({} as UpdateUserWizardDto);
    const [userId, setUserId] = useState('');

    const allPossibleLanguages = [
        "English",
        "Spanish",
        "Portuguese",
        "German",
        "French",
        "Chinese",
        "Japanese",
        "Russian",
        "Italian",
      ];
      const allPossibleSubjects = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Business Administration",
        "Accounting",
        "Computer Science",
        "Music Theory",
        "Political Science",
        "Law",
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
            experience: data.experience,
            image: data.image,
            aboutMe: data.aboutMe,
            pricePerOne: data.pricePerOne,
            pricePerTwo: data.pricePerTwo,
            pricePerThree: data.pricePerThree,
            });
            setUserId(data._id)
        })
        .catch(error => console.error(error));
    }
    
    useEffect(() => {
        fetchUserData(); 
    }, [localUid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        } catch (error) {
            console.error(error);
        }
    };

    
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

