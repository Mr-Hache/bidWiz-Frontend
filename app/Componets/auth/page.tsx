"use client"
import React, { useState, useEffect } from 'react'
import style from "./auth.module.scss"
import { useRouter } from 'next/navigation'
import { auth, userSignOut } from '../../utils/firebase'  
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { FcGoogle } from "react-icons/fc";
import { useCreateUserMutation } from "@/app/redux/services/userApi"


function authent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idAuth, setIdAuth] = useState('');
  const router = useRouter();
  const [createUser, { data, error }] = useCreateUserMutation();


useEffect(() =>{
    console.log(idAuth);
},[idAuth])

  const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    setPersistence (auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setIdAuth(user.uid)
        if(!user.emailVerified) {
          router.push("/login")
          userSignOut()
          alert("email not verified")

        }else{
          console.log("usuario autenticado")
          router.push("/offerBoard")
        }
      }) .catch((error) => {
        alert("Unregistered user or incorrect password")
          console.log(error)
      })
    }) .catch((error) => {
      console.log(error)
    })

  }

  const handleGoogleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const googleProvider = new GoogleAuthProvider();
    try {
      const response = await fetch('https://bidwiz-backend-production-db77.up.railway.app/users/emails');
        const data = await response.json();
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
      
        const result = data.includes(user.email);

        if(result){
            alert("el usuario ya tiene una cuenta asociada")
        }else{
        createUser({
            name: user.displayName ? user.displayName : "",
            email: user.email ? user.email : "",
            uidFireBase: user.uid ? user.uid : "",
            isWizard: false,
          });
  
          alert("creando usuario")      
        }
      


    } catch (error) {
      console.log(error);
    }
  };


  

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
      <div>
          <FcGoogle className={style.icon} />
          <button onClick={handleGoogleSignIn}>
            Register with Google
          </button>
        </div>
    </form>
  )
}

export default authent
