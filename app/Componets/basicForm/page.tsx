"use client"
import React, { useState, useEffect } from 'react'
import { useCreateUserMutation } from '@/app/redux/services/userApi';
import {validatePassword, validatePhoneNumber, validateEmail, validateLanguages, validateSubjects, validateNotEmpty} from "../../utils/functionsValidation"

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

    interface Errors {
        username?: string;
        name?: string;
        lastName?: string;
        password?: string;
        email?: string;
        phoneNumber?: string;
        image?: string;
        languages?: string;
        subjects?: string;
        title?: string;
        origin?: string;
    }

    const [errors, setErrors] = useState<Errors>({}); 

    const validateForm = () => {
    let formErrors = {};

    if (!validateNotEmpty(values.username)) {
      formErrors = { ...formErrors, username: "Username cannot be empty." };
    }
    if (!validateNotEmpty(values.name)) {
      formErrors = { ...formErrors, name: "Name cannot be empty." };
    }
    if (!validateNotEmpty(values.lastName)) {
      formErrors = { ...formErrors, lastName: "Last Name cannot be empty." };
    }
    if (!validatePassword(values.password)) {
      formErrors = { ...formErrors, password: "Password must contain a capital letter, a number and a symbol." };
    }
    if (!validateEmail(values.email)) {
      formErrors = { ...formErrors, email: "Invalid email format." };
    }
    if (!validatePhoneNumber(values.phoneNumber)) {
      formErrors = { ...formErrors, phoneNumber: "Phone number must start with '+' and contain only digits." };
    }
    if (!validateNotEmpty(values.image)) {
      formErrors = { ...formErrors, image: "Image cannot be empty." };
    }
    if (values.isWizard) {
      if (!validateLanguages(values.languages)) {
        formErrors = { ...formErrors, languages: "At least one language must be selected." };
      }
      if (!validateSubjects(values.subjects)) {
        formErrors = { ...formErrors, subjects: "At least one subject must be selected." };
      }
      if (!validateNotEmpty(values.experience.title)) {
        formErrors = { ...formErrors, title: "Title cannot be empty." };
      }
      if (!validateNotEmpty(values.experience.origin)) {
        formErrors = { ...formErrors, origin: "Origin cannot be empty." };
      }

      if (!validateNotEmpty(values.image)) {
        formErrors = { ...formErrors, image: "Image cannot be empty." };
    }
    }

    setErrors(formErrors);
        return Object.keys(formErrors).length === 0; 
    };

  useEffect(() => {
    validateForm();
  }, [values]);



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

            
        if (validateForm()) {
            createUser(values);
        }
    }

    useEffect(() => {
        if (error) {
            if ('message' in error) {
                alert(`Error: ${error.message}`);
            } else if ('status' in error) {
                alert(`Error: ${error.status}`);
            }
        }
    }, [error]);
    
      

    return (
        <form onSubmit={handleSubmit} >
            <br />
            <br />
            <br />
            <br />
            <label>
                Username:
                <input type="text" name="username" value={values.username} onChange={handleChange} />
                {errors.username && <p className="error">{errors.username}</p>}
            </label>
            <br />
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleChange} />
                {errors.name && <p className="error">{errors.name}</p>}
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={values.password} onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={values.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
            </label>
            <br />
            <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </label>
            <br />
            <label>
                Image:
                <input type="text" name="image" value={values.image} onChange={handleChange} />
                {errors.image && <p className="error">{errors.image}</p>}
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
                        {errors.languages && <p className="error">{errors.languages}</p>}
                    </label>
                    <label>
                        Subjects:
                        <select multiple value={values.subjects} onChange={handleSubjectChange}>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject}>{subject}</option>
                            ))}
                        </select>
                        {errors.subjects && <p className="error">{errors.subjects}</p>}
                    </label>
                    <label>
                        Title:
                        <input type="text" name="title" value={values.experience.title} onChange={handleExperienceChange} />
                        {errors.title && <p className="error">{errors.title}</p>}
                    </label>
                    <label>
                        Origin:
                        <input type="text" name="origin" value={values.experience.origin} onChange={handleExperienceChange} />
                        {errors.origin && <p className="error">{errors.origin}</p>}
                    </label>


                </div> : null

            }
            <input type="submit" value="Submit" />

        </form>
    )
}

export default basicForm