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

export function Button({children}) {
    return(
        <button>
            {children}
        </button>
    )
}

export function SocialIcons() {
    return (
        <div className='social-buttons'>
            <SocialButton>
                <img src="images/google.svg" alt="google icon" />
                Google
            </SocialButton>

            <SocialButton>
                <img src="images/apple.svg" alt="apple icon" />
                Apple
            </SocialButton>
            
            <SocialButton>
                <img src="images/facebook.svg" alt="facebook icon" />
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