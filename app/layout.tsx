"use client"

import styles from "./layout.module.scss";
import { Providers } from "./redux/providers";
import { ThemeProvider } from "next-themes";

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
      
        <Providers>
          <body className={styles.body}>{children}</body>
        </Providers>
     
    </html>
  );
}
