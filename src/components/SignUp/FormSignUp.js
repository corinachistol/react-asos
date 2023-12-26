import { useEffect, useState } from "react";
import { Button,InputGroup } from "../SignIn/FormSignIn";
import './signup.scss'

export function FormSignUp({errors, onSetErrors,submitting, onSetSubmitting}) {

    const [user,setUser] = useState({
        email:"",
        firstName: "",
        lastName: "",
        password: "",
        dateOfBirth: ""
    })
    console.log(user.dateOfBirth)

    function handleChange(e) {
        const { value, name } = e.target;
        setUser(prevValue=>{
            return {
                ...prevValue,
                // [name]:value
                [name]: name === "dateOfBirth" ? Date.parse(value) : value
            }
        })
    }

    // function calculateAge(userInput){
    //    let dob = new Date(userInput)
    //    let month_diff = Date.now() - dob.getTime()
    //    let age_dt = new Date(month_diff)
    //    let year = age_dt.getUTCFullYear()
    //    let age = Math.abs(new Date().getFullYear() - year)
    //    return age
    // }

      function calculateAge(dobTimestamp){
        const today = new Date();
        const dobDate= new Date(dobTimestamp)
        const age = today.getFullYear() - dobDate.getFullYear()

        if (today.getMonth() < dobDate.getMonth() || 
        (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())){
            age--
        }
  
        return age 
    }
    
    function validateInputs(inputValue) {
        console.log(inputValue)
        let errors = {};

        // console.log(inputValue.dateOfBirth)

        let userAge= calculateAge(inputValue.dateOfBirth)
        console.log(userAge)

        if(inputValue.email.length < 15){
            errors.email = "Email is too short!"
        }
        if(inputValue.password.length < 10){
            errors.password = "Password must be 10 or more characters"
        }
        if(!inputValue.lastName || !inputValue.lastName ){
            errors.name = "This field cannot be empty"
        }
        if(!inputValue.dateOfBirth){
            errors.dateOfBirth = "This field cannot be empty"
        }
        if(userAge < 16){
            errors.dateOfBirth = "You need to be 16 or over to use ASOS"
        }
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSetErrors(validateInputs(user))
        onSetSubmitting(true)
    }

    function finishSubmit() {
        console.log(user)
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && submitting){
            finishSubmit()
        }
    },[errors])

    return(
        
        <form onSubmit={handleSubmit}  >
            <InputGroup
                label="Email Address"
                type="email" 
                name="email"
                onChange={handleChange} 
                value={user.email}
                pattern="[a-zA-Z0-9._\-]+[@][a-z]+\.[a-z]{2,3}" />

            {errors.email ? 
                (<p className="error">Email should be at least 15 characters long</p>) : 
                (<p><small>We'll send your order confirmation here</small></p> )}

            

            <InputGroup
                label="First Name"
                type="text"
                name="firstName" 
                onChange={handleChange} 
                value={user.firstName}
                pattern="[A-Za-z]+" />

            <InputGroup 
                label="Last Name" 
                type="text"
                name="lastName"
                onChange={handleChange} 
                value={user.lastName}
                pattern="[A-Za-z]+"  />

            <InputGroup
                label="Password" 
                type="password"
                name="password"
                onChange={handleChange} 
                value={user.password}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"  />

            {errors.password ? 
                (<p className="error">Must be 10 or more characters</p>) 
                : null}
            

            <InputGroup
                label="Date of birth" 
                type="date"
                name="dateOfBirth" 
                onChange={handleChange} 
                value={user.dateOfBirth} />

            {errors.dateOfBirth ? 
                (<p className="error">You need to be {calculateAge(user.dateOfBirth)} or over to use ASOS</p>) : null }
            

            
            <label>Mostly interested in:</label>
            <div className="input-radio">
                <input className="checkbox" type="checkbox" id="womenswear" name="Womenswear" value="Womenswear" defaultChecked />
                <label htmlFor="womenswear">Womenswear</label>
                <input className="checkbox" type="checkbox"  id="menswear" name="Menswear" value="Menswear"  />
                <label htmlFor="menswear">Menswear</label>
            </div>

            <Button
                text="Join Asos"
                onClick={()=>{validateInputs(user)}}/>


            
            
        </form>
    
    )
}