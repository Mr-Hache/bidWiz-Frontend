import React, { useState, useEffect } from 'react'
import { useCreateUserMutation } from '@/app/redux/services/userApi';
import {User} from '../../redux/services/userApi'

export interface UserFormValues {
    username: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: string;
    image: string;
    isWizard: boolean;
    languages: string[];
    subjects: string[];
    experience: {
        title: string;
        origin: string;
        expJobs: number;
    };
}






function basicForm() {

    const languages = ['English', 'Spanish', 'Portuguese', 'German', 'French', 'Chinese', 'Japanese', 'Russian', 'Italian'] ;
    const subjects=["Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Business Administration", "Accounting", "Computer Science", "Music Theory", "Political Science", "Law", "Programming"] 

    const [values, setValues] = useState<UserFormValues>({
        username: '',
        name: '',
        lastName: '',
        password: '',
        email: '',
        phoneNumber: '',
        image: '',
        isWizard: false,
        languages: [],
        subjects: [],
        experience: {
            title: '',
            origin: '',
            expJobs: 0,
        },
    });

    // const [valuesWizard, setValuesWizard] = useState<WizardFormValues>({
    //     languages: ['Spanish'],
    //     subjects: ["Physics"],
    //     experience: {
    //         title: '',
    //         origin: '',
    //     },
    // });




    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((v) => ({ ...v, [name]: value }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setValues((v) => ({ ...v, [name]: checked }));
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValues({
            ...values,
            languages: Array.from(event.target.selectedOptions, option => option.value)
        });
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValues({
            ...values,
            subjects: Array.from(event.target.selectedOptions, option => option.value)
        });
    };

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            experience: {
                ...values.experience,
                [event.target.name]: event.target.value
            }
        });
    };
    const [createUser, { data, error }] = useCreateUserMutation();

    const handleSubmit = (event:  React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

            
        createUser(values)
    }

    return (
        <form onSubmit={handleSubmit} >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <label>
                Username:
                <input type="text" name="username" value={values.username} onChange={handleChange} />
            </label>
            <br />
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={values.password} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={values.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
            </label>
            <br />
            <label>
                Image:
                <input type="text" name="image" value={values.image} onChange={handleChange} />
            </label>
            <br />
            <label>
                Is a Wizard?
                <input type="checkbox" name="isWizard" checked={values.isWizard} onChange={handleCheckboxChange} />
            </label>


            {
                values.isWizard ? <div>
                    <label>
                        Languages:
                        <select multiple value={values.languages} onChange={handleLanguageChange}>
                            {languages.map((language, index) => (
                                <option key={index} value={language}>{language}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Subjects:
                        <select multiple value={values.subjects} onChange={handleSubjectChange}>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Title:
                        <input type="text" name="title" value={values.experience.title} onChange={handleExperienceChange} />
                    </label>
                    <label>
                        Origin:
                        <input type="text" name="origin" value={values.experience.origin} onChange={handleExperienceChange} />
                    </label>


                </div> : null

            }
            <input type="submit" value="Submit" />

        </form>
    )
}

export default basicForm