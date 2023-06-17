import React, { useState, ChangeEvent } from 'react';
import {useAppDispatch } from '@/app/redux/hooks';
import { setLanguages, setSubjects } from '@/app/redux/services/filtersSlice';


const languagesList = ['English', 'Spanish', 'Portuguese', 'German', 'French', 'Chinese', 'Japanese', 'Russian', 'Italian'];
const subjectsList = ["Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Business Administration", "Accounting", "Computer Science", "Music Theory", "Political Science", "Law", "Programming"];

function FilterBar() {

  const dispatch = useAppDispatch();

  const [stateLanguagesCheckbox, setStateLanguagesCheckbox] = useState(
    languagesList.map((language) => ({
      name: language,
      checked: false
    }))
  );

  const [stateSubjectsCheckbox, setStateSubjectsCheckbox] = useState(
    subjectsList.map((subject) => ({
      name: subject,
      checked: false
    }))
  );



  const handleLanguageCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedLanguagesCheckbox = [...stateLanguagesCheckbox];
    updatedLanguagesCheckbox[index].checked = event.target.checked;
    setStateLanguagesCheckbox(updatedLanguagesCheckbox);

    const selectedLanguages = updatedLanguagesCheckbox
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.name);
    dispatch(setLanguages(selectedLanguages));
  };

  const handleSubjectCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedSubjectsCheckbox = [...stateSubjectsCheckbox];
    updatedSubjectsCheckbox[index].checked = event.target.checked;
    setStateSubjectsCheckbox(updatedSubjectsCheckbox);

    const selectedSubjects = updatedSubjectsCheckbox
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.name);
    dispatch(setSubjects(selectedSubjects));
  };

  return (
    <aside>
      <h2>Languages</h2>
      {stateLanguagesCheckbox.map((language, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              name="language"
              value={language.name}
              checked={language.checked}
              onChange={(event) => handleLanguageCheckboxChange(event, index)}
            />
            {language.name}
          </label>
        </div>
      ))}

      <h2>Subjects</h2>
      {stateSubjectsCheckbox.map((subject, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              name="subject"
              value={subject.name}
              checked={subject.checked}
              onChange={(event) => handleSubjectCheckboxChange(event, index)}
            />
            {subject.name}
          </label>
        </div>
      ))}
    </aside>
  );
}

export default FilterBar;