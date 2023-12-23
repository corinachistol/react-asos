import { useState } from 'react'
import './signin.scss'

export default function FormSignIn() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // cu variabila user ar trebui de verificat in database daca exista

    function handleSignIn(e){
        setUser({
            email:email,
            password:password
        })


        e.preventDefault()
    }

    return (
        <div className="signin">
            <form onSubmit={handleSignIn}>
                <label>Email Address:</label>
                <input 
                    type="email" 
                    onChange={e=>setEmail(e.target.value)} 
                    value={email} 
                    required/>

                <label>Password:</label>
                <input 
                    type="password" 
                    onChange={e=>setPassword(e.target.value)}
                    value={password}
                    required/>
            </form>

            <Button 
                text="SIGN IN"/>

            <p>Forgot Password?</p>
            <h3>Or Sign In with...</h3>

            <SocialIcons/>

        </div>
    )
}


export function SocialIcons() {
    return (
        <div className='social-buttons'>
            <Button 
                clas="social-button"
                text="GOOGLE"
                icon="images/google.svg"
                title="google icon"
            />
            <Button 
                clas="social-button"
                text="APPLE"
                icon="images/apple.svg"
                title="apple icon"
            />
            <Button 
                clas="social-button"
                text="FACEBOOK"
                icon="images/facebook.svg"
                title="facebook icon"
            />
        </div>
    )
}

export function Button({text,icon,title,clickHandler,clas}){
    return(
        <button onClick={clickHandler} className={clas}>
            <img src={icon} alt={title} />
            {text}
        </button>
    )
}

