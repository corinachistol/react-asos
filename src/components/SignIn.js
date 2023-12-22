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

            <Button>Sign In</Button>
            <p>Forgot Password?</p>
            <p>Or Sign In with...</p>
            <SocialIcons/>


        </div>
    )
}

function Button({children}) {
    return(
        <button>
            {children}
        </button>
    )
}

function SocialIcons() {
    return (
        <div className='social-buttons'>
            <SocialButton>
                <img src="../images/google.png" alt="" />
                Google
            </SocialButton>
            <SocialButton>
                Apple
            </SocialButton>
            <SocialButton>
                Facebook
            </SocialButton>
        </div>
    )
}

function SocialButton({children}) {
    return(
        <button className='social-button'>
            {children}
        </button>
    )
}

export function SignInOptions({children}) {
    return (
        <button className='signin-options'>
            {children}
        </button>
    )
   
}