import Navbar from "@/app/Componets/navbar/navbar";
import AdminDashboard from "../Componets/adminDashboard/adminDashboard";

export default async function admin() {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>DASHBOARD</h1>
        <AdminDashboard />
      </div>
    </div>
  );
}
