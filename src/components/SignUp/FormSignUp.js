import { useState } from "react";
import { Button } from "../SignIn/FormSignIn";
import '../signup.scss'

export function FormSignUp() {

    const [email,setEmail] = useState("")
    const [lName,setLName] = useState("")
    const [fName,setFName] = useState("")
    const [password,setPassword] = useState("")
    const [dob,setDob] = useState("")

    const [user,setUser] = useState({
        email:"",
        firstName: "",
        lastName: "",
        password: "",
        dateOfBirth: ""
    })

    function handleSubmit(e) {
        setUser({
            email:email,
            firstName: fName,
            lastName: lName,
            password:password,
            dateOfBirth:dob
        })

        e.preventDefault()
    }

    return(
        <form  onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input 
                type="text" 
                onChange={e=>setEmail(e.target.value)} 
                value={email}
                required />
            <p><small>We'll send your order confirmation here</small></p>

            <label>First Name</label>
            <input 
                type="text" 
                onChange={e=>setFName(e.target.value)} 
                value={fName}
                required />

            <label>Last Name</label>
            <input 
                type="text"
                onChange={e=>setLName(e.target.value)} 
                value={lName} 
                required />

            <label>Password</label>
            <input 
                type="password"
                onChange={e=>setPassword(e.target.value)} 
                value={password}  
                required />
            <p><small>Must be 10 or more characters</small></p>

            <label>Date of birth</label>
            <input 
                type="date" 
                onChange={e=>setDob(+e.target.value)} 
                value={dob}  
                required />
            <p><small>You need to be 16 or over to use ASOS</small></p>

            
            <label>Mostly interested in:</label>
            <div className="input-radio">
                <input type="radio" id="womenswear" name="Womenswear" value="Womenswear" defaultChecked />
                <label htmlFor="womenswear">Womenswear</label>
                <input type="radio"  id="menswear" name="Menswear" value="Menswear"  />
                <label htmlFor="menswear">Menswear</label>
            </div>

            <Button
                text="Join Asos"/>

            
            
        </form>
    )
}