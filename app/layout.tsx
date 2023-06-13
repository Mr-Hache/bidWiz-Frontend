import Navbar from "./Componets/navbar/navbar"

export const metadata = {
  title: 'Bidwiz',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
      <Navbar/>
        {children}</body>
    </html>
  )
}
