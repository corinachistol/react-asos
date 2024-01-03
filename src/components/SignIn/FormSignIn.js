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
                <InputGroup
                    label="Email Address:" 
                    name="email"
                    type="email" 
                    onChange={e=>setEmail(e.target.value)} 
                    value={email} required />

                <InputGroup
                    label="Pasword:"
                    name="password" 
                    type="password" 
                    onChange={e=>setPassword(e.target.value)}
                    value={password} required
                    />
                <Button
                    text="SIGN IN"/>
            </form>


            <a href="#"><p>Forgot Password?</p></a>
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

export function InputGroup({label,type,onChange,value,name, pattern}) {
    return(
        <>
            <label>{label}</label>
            <input type={type} 
                onChange={onChange} 
                value={value} 
                name={name} 
                pattern={pattern}
                required/>

        </>
    )
}
