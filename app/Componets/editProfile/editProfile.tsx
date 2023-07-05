"use client";

import styles from "./editProfile.module.scss";
import React, { useState, useEffect } from "react";
import {
  useUpdateWizardStatusMutation,
  UpdateUserWizardDto,
} from "../../redux/services/userApi";
import { useAppSelector } from "../../redux/hooks";
import ImageUpload from "../imageUpload/imageUpload";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ImMagicWand } from "react-icons/im";
import Select from 'react-select';
import Swal from "sweetalert2";
import { title, origin } from "@/app/utils/titleAndOrigin";


function EditProfile() {
  const localUid = useAppSelector((state) => state.userAuth.uid);
  const [updateWizardStatus, { isLoading }] = useUpdateWizardStatusMutation();
  const [formState, setFormState] = useState<UpdateUserWizardDto>(
    {} as UpdateUserWizardDto
  );
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const email = useAppSelector((state) => state.userAuth.email);
  const [imageState, setImageState] = useState("");
  const titleOptions = title.map(t => ({ value: t.name, label: t.name }));
  const originOptions = origin.map(o => ({ value: o.name, label: o.name }));

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? '1px solid black' : '1px solid black',
      boxShadow: state.isFocused ? '0 0 0 1px black' : 0,
      borderRadius: '5px',
      fontSize: '1em',
      width: '100%',
      color: '#999',
      fontFamily: 'Raleway, sans-serif',
    }),
    option: (base: any) => ({
      ...base,
      color: '#999',
      fontFamily: 'Raleway, sans-serif',
    }),
  };
  

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
    fetch(
      `https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFormState({
          isWizard: data.isWizard,
          languages: data.languages,
          subjects: data.subjects,
          experience: {
            title: data.experience.title[0],
            origin: data.experience.origin[0],
          },
          aboutMe: data.aboutMe,
          pricePerOne: data.pricePerOne,
          pricePerTwo: data.pricePerTwo,
          pricePerThree: data.pricePerThree,
        });
        setUserId(data._id);
        setUserName(data.name);
        setImageState(data.image); 
      })
      .catch((error) => console.error(error));
  };
  

  useEffect(() => {
    fetchUserData();
  }, [localUid]);

  const handleImageUpload = (imageUrl: string) => {
    console.log("Imagen cargada:", imageUrl);
    setImageState(imageUrl);
  };

  const handleSelectChange = (name: string, selectedOption: any) => {
    setFormState((prevState) => ({
      ...prevState,
      experience: {
        ...(prevState.experience || {}),
        [name]: selectedOption.value,
      },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      name === "pricePerOne" ||
      name === "pricePerTwo" ||
      name === "pricePerThree"
    ) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: parseFloat(value),
      }));
    } else if (name === "languages" || name === "subjects") {
      const selectElement = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(
        selectElement.selectedOptions,
        (option) => option.value
      );
      setFormState((prevState) => ({
        ...prevState,
        [name]: selectedOptions,
      }));
    } else if (name.startsWith("experience.")) {
      const field = name.split(".")[1];
      setFormState((prevState) => ({
        ...prevState,
        experience: {
          ...(prevState.experience || {}),
          [field]: value,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      isWizard: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let newFormState;
      
      // If the user is not a wizard, we only send the image
      if (!formState.isWizard) {
        newFormState = { image: imageState };
      } else {
        newFormState = {...formState, image: imageState};
      }
      
      await updateWizardStatus({
        _id: userId,
        updateUserWizardDto: newFormState,
      });
  
      console.log(newFormState);
  
      fetchUserData();
      Swal.fire("Info", "<b>updated</b>", "success");
    } catch (error) {
      console.error(error);
    }
  };
  


  if (!formState) return "Loading...";

  const handleChangePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const auth = getAuth();
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          //   alert('Password reset email sent successfully');
          Swal.fire("Password reset", "<b>email sent</b>", "success");
        })
        .catch((error) => {
          //   alert(`Error sending password reset email: ${error}`);
          Swal.fire(
            "Error",
            `<b>Sending password reset email:</b> ${error}`,
            "error"
          );
        });
    }

  };

  return (
    <div className={styles.div}>
      <h1>{userName}</h1>

      <button className={styles.change} onClick={handleChangePassword}>
        Change your password
      </button>

      <form onSubmit={handleSubmit}>

      <br />
            <ImageUpload onImageUpload={handleImageUpload} />
            <br />
            <label htmlFor="image">Latest</label>
            <img src={imageState} alt={userName} width="50" height="50" />
            <br />
        <div className={styles.isWizard}>
          <label htmlFor="isWIzard">Be a Wizard?</label>
          <div className={styles.magic}>
            <input
              type="checkbox"
              name="isWizard"
              checked={formState.isWizard || false}
              onChange={handleCheckboxChange}
            />

            <div className={styles.wand}>
              <ImMagicWand className={styles.logo} />
            </div>
          </div>
        </div>
        {formState.isWizard && (
          <div>
            <br />
            <label htmlFor="aboutMe">Tell something about you</label>
            <textarea
              name="aboutMe"
              value={formState.aboutMe || ""}
              onChange={handleChange}
              rows={5} 
              style={{ width: "100%" }} 
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
                <option key={index} value={language}>
                  {language}
                </option>
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
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <br />
            <label htmlFor="experience.title">I am</label>
            <Select
              styles={customStyles}
              options={titleOptions}
              name="title"
              value={titleOptions.find(option => option.value === formState.experience?.title)}
              onChange={(selectedOption) => handleSelectChange("title", selectedOption)}
            />

            <br />
            <label htmlFor="experience.origin">I am from</label>
            <Select
              styles={customStyles}
              options={originOptions}
              name="origin"
              value={originOptions.find(option => option.value === formState.experience?.origin)}
              onChange={(selectedOption) => handleSelectChange("origin", selectedOption)}
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
            <label htmlFor="pricePerTwo">
              My offer for two classes is (each)
            </label>
            <input
              type="number"
              name="pricePerTwo"
              value={formState.pricePerTwo || 0}
              onChange={handleChange}
            />

            <br />
            <label htmlFor="pricePerThree">
              My offer for three classes is (each)
            </label>
            <input
              type="number"
              name="pricePerThree"
              value={formState.pricePerThree || 0}
              onChange={handleChange}
            />
          </div>
        )}
        <button
          className={styles.update}
          type="submit"
          disabled={isLoading}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
