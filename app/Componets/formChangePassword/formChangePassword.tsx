import React, { useState, ChangeEvent, FormEvent } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import styles from "./formChangePassword.module.scss"
import Swal from "sweetalert2";

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
        // alert('Password reset email sent successfully');
        Swal.fire('Password', 'reset email sent <b>successfully</b>', 'success');
      
      })
      .catch((error) => {
        // alert(`Error sending password reset email: ${error}`);
        Swal.fire('Error', `<b>Sending password reset email:</b> ${error}`, 'error');
    
      });
  };

  return (
    <div className={styles.contPassChange}>
      <h2>Recover your password</h2>
      <form onSubmit={handleSubmit}>      
        <label>          
          <input type="email" value={email} onChange={handleChange} placeholder='Enter your mail' required />
        </label>
        <button type="submit">Send password reset email</button>
      </form>
    </div>
  );
};

export default FormChangePassword;