"use client"

import { useDisableUserMutation } from '../../redux/services/userApi';
import {useAppSelector} from "../../redux/hooks"
import { useState, useEffect } from 'react';
import styles from "./unableAccount.module.scss"
import { usePathname, useRouter } from "next/navigation";
import { userSignOut } from "../../utils/firebase";

export default function UnableAccount() {
  const localUid = useAppSelector((state) => state.userAuth.uid)
  const [disableUserMutation] = useDisableUserMutation();
  const [userId, setUserId] = useState('');
  const pathname = usePathname()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchUserData = () => {
    fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`)
    .then(response => response.json())
    .then(data => { setUserId(data._id)})
    .catch(error => console.error(error));
}

useEffect(() => {
    fetchUserData();
    const disable = true  
}, [localUid]);


const handleClick = async () => {
  if (showConfirmation) {
    try {
      await disableUserMutation({ _id: userId });
      router.push("/");
      await userSignOut();
    } catch (error) {
      console.error(error);
    }
  } else {
    setShowConfirmation(true); // Al hacer clic en "Unable Account", se muestra la pregunta de confirmación
  }
};

const handleCancel = () => {
  setShowConfirmation(false); // Al hacer clic en "Cancel", se oculta la pregunta de confirmación
};

return (
  <div className={styles.div}>
    {showConfirmation ? (
      <>
        <label>Are You Sure?</label>
        <button onClick={handleClick}>Yes</button>
        <button onClick={handleCancel}>Cancel</button>
      </>
    ) : (
      <button onClick={handleClick}>Unable Account</button>
    )}
  </div>
);
}
