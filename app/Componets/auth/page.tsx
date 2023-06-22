"use client"
import React, { useState, useEffect } from 'react'
import style from "./auth.module.scss"
import { useRouter } from 'next/navigation'
import { auth } from '../../utils/firebase'  
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


function authent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idAuth, setIdAuth] = useState('');
  const router = useRouter();


useEffect(() =>{
    console.log(idAuth);
},[idAuth])

  const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
     const userCredential =  await signInWithEmailAndPassword(auth, email, password);
      setIdAuth(userCredential.user.uid)
      
      router.push('/'); // redirige al usuario a la página de inicio después del inicio de sesión exitoso
    } catch (error) {
      console.error(error);
      // manejo de errores avaAnder$10
    }
  }

  

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.container}>
        <label htmlFor="email" className={style.label}>Email</label><br />
        <input 
          type="text" 
          name="email"  
          className={style.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <br />
      <div className={style.container}>
        <label htmlFor="password" className={style.label}>Password</label><br />
        <input 
          type="password" 
          name="password" 
          className={style.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" className={style.button}>Login</button>
    </form>
  )
}

export default authent
