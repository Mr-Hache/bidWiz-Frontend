"use client";
import React, { useState, useEffect } from "react";
import style from "./auth.module.scss";
import { useRouter } from "next/navigation";
import { auth, userSignOut, loginWithGoogle } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useCreateUserMutation } from "@/app/redux/services/userApi";
import { useTheme } from "next-themes";

import Swal from "sweetalert2";

function authent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const router = useRouter();
  const [createUser, { data, error }] = useCreateUserMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            if (!user.emailVerified) {
              router.push("/login");
              userSignOut();
              Swal.fire("Email not verified");
            } else {
              console.log("usuario autenticado");
              router.push("/offerBoard");
            }
          })
          .catch((error) => {
            // Swal.fire("Unregistered user or incorrect password");
            Swal.fire(
              "Unregistered",
              "<b>user or incorrect</b> password",
              "error"
            );
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        loginWithGoogle()
          .then((result) => {
            const user = result.user;

            fetch(
              `https://bidwiz-backend-production-db77.up.railway.app/users/emails`
            )
              .then((response) => response.json())
              .then((data) => {
                const userEmail = data.map(
                  (item: { email: string; isDisabled: boolean }) => item.email
                );
                if (userEmail.includes(user.email)) {
                  data.forEach(
                    (item: { email: string; isDisabled: boolean }) => {
                      if (
                        item.email === user.email &&
                        item.isDisabled === true
                      ) {
                        Swal.fire("User", "disabled", "success");

                        userSignOut();
                      } else {
                        console.log("usuario solo autenticado");
                        router.push("/offerBoard");
                      }
                    }
                  );
                } else {
                  createUser({
                    email: user.email ? user.email : "",
                    name: user.displayName ? user.displayName : "",
                    uidFireBase: user.uid,
                    isWizard: false,
                  });
                  console.log("usuario creado y autenticado");
                  router.push("/offerBoard");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePassword = () => {
    router.push("/changePassword");
  };

  return (
    <form
      className={`${style.form} ${
        theme === "dark" ? style.formDark : style.formLight
      }`}
      onSubmit={handleSubmit}
    >
      <h1>Sign in to BidWiz</h1>
      <div className={style.container}>
        <input
          type="text"
          name="email"
          className={style.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className={style.container}>
        <input
          type="password"
          name="password"
          className={style.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <a className={style.forgot} onClick={handleChangePassword}>
        Forgot your password?
      </a>

      <button type="submit" className={style.button}>
        Sign In
      </button>
      <br />
      <div>
        <button className={style.google} onClick={handleGoogleSignIn}>
          <FcGoogle className={style.icon} /> Continue Whit Google
        </button>
      </div>
    </form>
  );
}

export default authent;
