import React from 'react'
import style from "./auth.module.scss"
import  Link  from 'next/link'

function auth() {
    return (
    
        <form className={style.form}>
            <div  className={style.container}>
                <label htmlFor="username" className={style.label}>Username</label><br />
                <input type="text" name="username"  className={style.input}/>
            </div>
            <br />
            <div className={style.container}>
                <label htmlFor="password" className={style.label}>Password</label><br />
                <input type="password" name="password" className={style.input}/>
            </div>
            <Link href="/not-found" className={style.link}>  
                <button type="submit" className={style.button}>Login</button>
            </Link>
            
        </form>
        
  )
}

export default auth