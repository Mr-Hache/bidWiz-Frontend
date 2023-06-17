import React from 'react'

function auth() {
    return (
    
        <form >
            <div >
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
            </div>
                <button type="submit">Login</button>
        </form>
        
  )
}

export default auth