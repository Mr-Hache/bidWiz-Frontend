import Link from "next/link";
import style from "./navbar.module.css"

export default function Navbar() {

    return (
        <div className={style.navCont}>
            <nav>
                <ul className={style.navUl}>
                    <li><Link href="/" >LANDING</Link></li>
                    <li><Link href="/wizards" >WIZARDS</Link></li>
                    <li><Link href="/login" >LOGIN</Link></li>
                    <li><Link href="/register" >REGISTER</Link></li>
                </ul>            
            </nav>
        </div>
    )

}
