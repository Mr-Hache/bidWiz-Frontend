"use client";
import React, { useState, useEffect } from "react";
import { useCreateUserMutation } from "@/app/redux/services/userApi";
import { FcGoogle } from "react-icons/fc";
import {
  validatePassword,
  validateEmail,
  validateLanguages,
  validateSubjects,
  validateNotEmpty,
} from "../../utils/functionsValidation";
import style from "./basicForm.module.scss";
import { ImMagicWand } from "react-icons/im";

import { auth, loginWithGoogle, createWithEmailAndPassword,userSignOut } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import ImageUpload from "../imageUpload/imageUpload";
import {setPersistence, browserSessionPersistence, sendEmailVerification, browserLocalPersistence  } from "firebase/auth";
import { setItem, getItem } from "../../utils/localStorage";
import { title, origin } from "../../utils/titleAndOrigin";
import Select from "react-select"

export interface UserFormValues {
  name: string;
  email: string;
  uidFireBase: string;
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
  const router = useRouter();

  type SelectedOptionType = { value: string; label: string } | null;

  const languages = [
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
  const subjects = [
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

  const initialFormValues: UserFormValues = {
    email: getItem("email") || "",
    name: getItem("name") || "",
    uidFireBase: "",
    image: "",
    isWizard: false,
    languages: [],
    subjects: [],
    experience: {
      title: "",
      origin: "",
      expJobs: 0,
    },
  };
  
  const [values, setValues] = useState<UserFormValues>(initialFormValues);
  

  interface Errors {
    name?: string;
    password?: string;
    email?: string;
    languages?: string;
    subjects?: string;
    title?: string;
    origin?: string;
    image?: string;
  }

  const [errors, setErrors] = useState<Errors>({});

  const [authentication, setAuthentication] = useState({
    password: "",
    email: "",
  });

  const titleOptions = title.map(t => ({ value: t.name, label: t.name }));
  const originOptions = origin.map(o => ({ value: o.name, label: o.name }));

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? '1px solid black' : '1px solid black',
      boxShadow: state.isFocused ? '0 0 0 1px black' : 0,
      borderRadius: '5px',
      fontSize: '1em',
      width: '47%',
      color: '#999',
      fontFamily: 'Raleway, sans-serif',
    }),
    option: (base: any) => ({
      ...base,
      color: '#999',
      fontFamily: 'Raleway, sans-serif',
    }),
  };

  const validateForm = () => {
    let formErrors = {};

    if (!validateNotEmpty(values.name)) {
      formErrors = { ...formErrors, name: "Name cannot be empty." };
    }

    if (!validatePassword(authentication.password)) {
      formErrors = {
        ...formErrors,
        password:
          "Password must contain a capital letter, a number and a symbol.",
      };
    }
    if (!validateEmail(values.email)) {
      formErrors = { ...formErrors, email: "Invalid email format." };
    }
    if (values.isWizard) {
      if (!validateLanguages(values.languages)) {
        formErrors = {
          ...formErrors,
          languages: "At least one language must be selected.",
        };
      }
      if (!validateSubjects(values.subjects)) {
        formErrors = {
          ...formErrors,
          subjects: "At least one subject must be selected.",
        };
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
    console.log(values.name);
  
    if (values.name != null) {
      // Guardar los datos en el Local Storage
      setItem("email", values.email);
      setItem("name", values.name);
      setItem("title", values.experience.title);
      setItem("origin", values.experience.origin);
    }
  }, [values, authentication]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == "password") {
      setAuthentication({
        ...authentication,
        password: value,
      });
    } else {
      setValues((v) => ({ ...v, [name]: value }));
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setValues((v) => ({ ...v, [name]: checked }));
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      languages: Array.from(
        event.target.selectedOptions,
        (option) => option.value
      ),
    });
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({
      ...values,
      subjects: Array.from(
        event.target.selectedOptions,
        (option) => option.value
      ),
    });
  };

  const handleSelectChange = (fieldName: string, selectedOption: SelectedOptionType) => {
    if (selectedOption === null) {
      // manejar el caso en que no se selecciona ninguna opción
    } else {
      setValues({
        ...values,
        experience: {
          ...values.experience,
          [fieldName]: selectedOption.value,
        },
      });
    }
  };
  const [createUser, { data, error }] = useCreateUserMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setPersistence(auth, browserSessionPersistence).then(() => {
        try{
          createWithEmailAndPassword(values.email, authentication.password).then((userCreated) => {
            const uid = userCreated.user.uid
            userSignOut()
            sendEmailVerification(userCreated.user)
              values.isWizard? createUser({...values, uidFireBase: uid}) : createUser({name: values.name, uidFireBase: uid, email: values.email, isWizard: values.isWizard})
              setValues({
                        uidFireBase: "",
                        name: "",
                        email: "",
                        image: "",
                        isWizard: false,
                        languages: [],
                        subjects: [],
                        experience: {
                          title: "",
                          origin: "",
                          expJobs: 0,
                        },
                      });

                      setAuthentication({
                        password: "",
                        email: "",
                      });
                    router.push('/login')

                    setItem("email", "");
                    setItem("name", "");
                    setItem("title", values.experience.title);
                    setItem("origin", values.experience.origin);
          })
  }catch (error) {
    console.log(error);
  }
  ;
      }).catch((error) => {
         console.log(error);
      })
  }}

  const handleGoogleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPersistence (auth, browserLocalPersistence).then(() => {
    loginWithGoogle().then((result) => {
      const user = result.user;
     
      fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/emails`)
      .then((response) => response.json())
      .then((data) => {
        const emails = data.map((item: string) => item)
        if(emails.includes(user.email)){
          console.log("usuario solo autenticado")
        }else{
          createUser({email: user.email?user.email: "", name: user.displayName? user.displayName:"", uidFireBase:user.uid, isWizard:false})
          console.log("usuario creado y autenticado")
        }
      })
      router.push("/offerBoard")
    }).catch((error) => {
      console.log(error)
    })
}).catch((error) => {
  console.log(error)
})
  };
 
  const handleImageUpload = (imageUrl: string) => {
    console.log("Imagen cargada:", imageUrl);
    setValues((v) => ({ ...v, image: imageUrl }));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.block}></div>
      <h1>Unleash Your Magic</h1>
      <div className={style.inputcontainer}>
        <label>
          <input
            className={style.input}
            type="text"
            name="name"
            value={values.name}
            placeholder="User name is required"
            onChange={handleChange}
          />
        </label>
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <br />

      <div className={style.inputcontainer}>
        <label>
          <input
            className={style.input}
            type="password"
            name="password"
            value={authentication.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </label>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <br />
      <div className={style.inputcontainer}>
        <label>
          <input
            className={style.input}
            type="email"
            name="email"
            value={values.email}
            placeholder="Enter your email address"
            onChange={handleChange}
          />
        </label>
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <br />

      <label>
        <div className={style.center}>
          <h3 className={style.selectTitle}>Become Wizard</h3>
          <div className={style.magic}>
            <input
              type="checkbox"
              name="isWizard"
              checked={values.isWizard}
              onChange={handleCheckboxChange}
              className={style.agrandar}
            />
            <div className={style.wand}>
              <ImMagicWand className={style.logo} />
            </div>
          </div>
        </div>
      </label>

      {values.isWizard ? (
        <div>
          <br />         
          <div className={style.ImageUpload}>          
          <ImageUpload onImageUpload={handleImageUpload} />       
          </div>
          <br />
           {errors.image && <span className={style.error}>{errors.image}</span>}
          <br />
          <br /> 
          <div className={style.select}>
            <div className={style.selectTitle}>Languages</div>
            <div className={style.selectSelect}>
              <select
                multiple
                value={values.languages}
                onChange={handleLanguageChange}
              >
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <br />
              {errors.languages && (
                <span className="error">{errors.languages}</span>
              )}
            </div>
          </div>
          <br />
          <br />
          <div className={style.inputcontainer}>
            <div className={style.select1}>
              <div className={style.selectTitle1}>Subjects</div>
              <div className={style.selectSelect1}>
                <select
                  multiple
                  value={values.subjects}
                  onChange={handleSubjectChange}
                >
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                <br />

                {errors.subjects && (<span className="error">{errors.subjects}</span>)}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className={style.inputcontainer}>
          <label className={style.exp} htmlFor="experience.title">Title</label>
          <Select
            styles={customStyles}
            options={titleOptions}
            name="title"
            value={titleOptions.find(option => option.value === values.experience.title)}
            onChange={(selectedOption) => handleSelectChange("title", selectedOption)}
          />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <br />
          <div className={style.inputcontainer}>
          <label className={style.exp} htmlFor="experience.origin">Origin</label>
          <Select
            styles={customStyles}
            options={originOptions}
            name="origin"
            value={originOptions.find(option => option.value === values.experience.origin)}
            onChange={(selectedOption) => handleSelectChange("origin", selectedOption)}
          />
            {errors.origin && <span className="error">{errors.origin}</span>}
          </div>
        </div>
      ) : null}

      <div className={style.button}>
        <div className={style.register}>
          <button className={style.boton}>Register</button>
        </div>
        <div className={style.google}>
          <FcGoogle className={style.icon} />
          <button className={style.boton2} onClick={handleGoogleSignIn}>
            Register with Google
          </button>
        </div>
      </div>
    

    </form>
  );
}

export default basicForm;
