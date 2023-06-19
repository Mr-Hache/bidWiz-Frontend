"use client"
import React, { useState, useEffect } from 'react'
import { useCreateUserMutation } from '@/app/redux/services/userApi';
import {validatePassword, validatePhoneNumber, validateEmail, validateLanguages, validateSubjects, validateNotEmpty} from "../../utils/functionsValidation"
import style from './basicForm.module.scss'
import { ImMagicWand  } from "react-icons/im";
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
        
        
        <form className={style.form} onSubmit={handleSubmit} >
            <div className={style.block}></div>
            <div className={style.inputcontainer}>
            <label>
                <input className={style.input} type="text" name="username" value={values.username} placeholder='Username:' onChange={handleChange} />
            </label>
                {errors.username && <span className="error">{errors.username}</span>}

            </div>

            <br />
            <div className={style.inputcontainer}>
            <label>
                
                <input className={style.input} type="text" name="name" value={values.name} placeholder='Name:' onChange={handleChange} />
            </label>
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <br />
            <div className={style.inputcontainer}>
            <label>
                
                <input className={style.input} type="text" name="lastName" value={values.lastName} placeholder='Last Name:' onChange={handleChange} />
            </label>
                {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <br />
            <div className={style.inputcontainer}>
            <label>
                
                <input className={style.input} type="password" name="password" value={values.password} placeholder='Password:' onChange={handleChange} />
            </label>
                {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <br />
            <div className={style.inputcontainer}>
            <label>
                
                <input className={style.input} type="email" name="email" value={values.email} placeholder='Email:' onChange={handleChange} />
            </label>
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <br />
            <div className={style.inputcontainer}>
            <label>
                
                <input className={style.input} type="text" name="phoneNumber" value={values.phoneNumber} placeholder='Phone Number:' onChange={handleChange} />
            </label>
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>

            <br />
            <div className={style.inputcontainer}>
            <label>
                
                <input className={style.input} type="text" name="image" value={values.image} placeholder='Image:' onChange={handleChange} />
            </label>
                {errors.image && <span className="error">{errors.image}</span>}
            </div>

            <br />
            <label>
            <div >Unleash your magic 
            <div className={style.magic}>
                <input type="checkbox" name="isWizard" checked={values.isWizard} onChange={handleCheckboxChange} />
                <ImMagicWand className={style.logo} />
                </div>
                </div>
            </label>


            {
                values.isWizard ? <div>
                    <br />                                   
                    <div className={style.select}>
                       <div className={style.selectTitle}>Languages</div> 
                        <div className={style.selectSelect}>
                        <select  multiple value={values.languages} onChange={handleLanguageChange}>
                            {languages.map((language, index) => (
                                <option key={index} value={language}>{language}</option>
                            ))}
                        </select>
                        {errors.languages && <span className="error">{errors.languages}</span>}
                        </div>
                    </div>                    
                      <br />                 
                    <div className={style.inputcontainer}>
                    <div className={style.select}>
                    <div className={style.selectTitle}>Subjects</div>
                    <div className={style.selectSelect}>                        
                        <select multiple value={values.subjects} onChange={handleSubjectChange}>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject}>{subject}</option>
                            ))}
                        </select>
                        {errors.subjects && <span className="error">{errors.subjects}</span>}
                        </div>    
                    </div>
                    </div>

                    <br />
                    <div className={style.inputcontainer}>
                    <label>
                        
                        <input className={style.input} type="text" name="title" value={values.experience.title} placeholder='Title:' onChange={handleExperienceChange} />
                    </label>
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>

                    <br />
                    <div className={style.inputcontainer}>
                    <label>
                        
                        <input className={style.input} type="text" name="origin" value={values.experience.origin} placeholder='Origin:' onChange={handleExperienceChange} />
                    </label>
                        {errors.origin && <span className="error">{errors.origin}</span>}
                    </div>


                </div> : null

            }
            <br />
            <br />
                      

            

            <input className={style.boton} type="submit" value="Submit" />

        </form>
    )
}

export default basicForm