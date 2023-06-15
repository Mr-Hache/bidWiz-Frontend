import style from "./login.module.css"


export default function login() {
    return (
        <form className={style.formSubmit}>
            <div className={style.userName}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
            </div>

            <div className={style.userName}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
            </div>
            <button className={style.login} type="submit">Login</button>
        </form>
 
    )
}