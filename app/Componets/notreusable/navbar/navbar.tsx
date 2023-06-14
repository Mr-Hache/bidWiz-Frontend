import Link from "next/link";

export default function Navbar() {
    return (
    <nav className="container">
        <Link href="/" >LANDING</Link>
        <Link href="/wizards" >WIZARDS</Link>
        <Link href="/login" >LOGIN</Link>
        <Link href="/register" >REGISTER</Link>
    </nav>
    )
}
