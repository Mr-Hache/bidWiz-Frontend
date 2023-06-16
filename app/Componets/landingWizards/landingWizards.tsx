"use client";

import styles from "./landingWizards.module.scss";

import { useGetWizardsQuery } from "@/app/redux/services/userApi";

export default function landingWizards() {
  const { data } = useGetWizardsQuery({});

  return (
    <section className={styles.wizards}>
      <div className={styles.title}>
        <h1>Want to learn from the best in bidWiz?</h1>
      </div>
      <div>
        <div className={styles.containerW}>
          {data?.slice(0, 4).map((user) => (
            <div className={styles.cardw} key={user._id}>
              <div className={styles.containerImg}>
                <img src={user.image} alt="" width={200} height={200} />
              </div>
              <div className={styles.text}>
                <h3>{`${user.name} ${user.lastName}`}</h3>
                <h4>Gives {user.languages} classes</h4>
                <h4>in {user.languages}</h4>
                <h4>OnLine</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
