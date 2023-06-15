"use client";

import styles from "./landingWizards.module.scss";

import { useGetWizardsQuery } from "@/app/redux/services/userApi";

export default function landingWizards() {
 
const { data } = useGetWizardsQuery(null);

  return (
    <section className={styles.why}>
      <div className={styles.containerWhy}>
       <div className="grid grid-cols-3">
        {
          data?.map((user) => (
            <div key={user._id}>
              <h1>{user.name}</h1>
              <img src={user.image} alt="" width={300} height={300} />
              <div className={styles.text}>
              <h4>{user.languages}</h4>
              <h4>{user.subjects}</h4>
              <h4>{user.experience.expJobs}</h4>
              </div>
            </div>
          ))
        }
      </div>
      </div>
    </section>
  );
}
