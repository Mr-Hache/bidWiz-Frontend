import React, { useState, ChangeEvent, FormEvent } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import styles from "./formChangePassword.module.scss"

const FormChangePassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent successfully');
      
      })
      .catch((error) => {
        alert(`Error sending password reset email: ${error}`);
    
      });
  };

  return (
    <div className={styles.contPassChange}>
      <h2>Recover your password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleChange} required />
        </label>
        <button type="submit">Send password reset email</button>
      </form>
    </div>
  );
};

export default FormChangePassword;