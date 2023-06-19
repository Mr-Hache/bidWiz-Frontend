import React from 'react'
import style from "./auth.module.scss"

function auth() {
    return (
    
        <form className={style.form}>
            <div  className={style.container}>
                <label htmlFor="username" className={style.label}>Username</label><br/>
                <input type="text" name="username"  className={style.input}/>
            </div>
            <div className={style.container}>
                <label htmlFor="password">Password</label><br/>
                <input type="password" name="password" className={style.input}/>
            </div>
            <button type="submit" className={style.button}>Login</button>
        </form>
        
  )
}

export default auth