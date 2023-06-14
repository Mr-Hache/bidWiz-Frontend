import Navbar from "./Componets/notreusable/navbar/navbar";
import styles from "./layout.module.scss";

export const metadata = {
  title: "Bidwiz",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
