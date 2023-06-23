import Navbar from "@/app/Componets/navbar/navbar";
import AdminDashboard from "../Componets/adminDashboard/adminDashboard";
import styles from "./admin.module.scss";

export default async function admin() {
  return (
    <div className={styles.adminPage}>
      <Navbar />
      <br />
      <div>
        <div className={styles.title}>
          <h1>Dashboard Admin</h1>
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
}
