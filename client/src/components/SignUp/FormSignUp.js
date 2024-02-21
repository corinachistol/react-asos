import { useEffect, useState } from "react";
import { Button,InputGroup } from "../SignIn/FormSignIn";
import './signup.scss'


export function FormSignUp({ errors, onSetErrors,submitting, onSetSubmitting}) {
    // validarea formularului prin js

    const [user,setUser] = useState({
        email:"",
        firstName: "",
        lastName: "",
        password: "",
        address: "" ,
    })

    function handleChange(e) {
        e.preventDefault()

        const {validationMessage,validity, value,name } = e.target;
        //avem access la aceste obiecte doar prin e.target
        console.log(validationMessage)
        console.log(validity)
        console.log(value)
        console.log(name)
       
        if(name === "email" && validity.patternMismatch){
            errors.email="I expect an email address"
        }else{
            errors.email = ""
        }

        if(name === "firstName" && validity.patternMismatch) {
            errors.firstName = "Please enter only alphabetical characters!"
        }else{
            errors.firstName = ""
        }

        if(name === "lastName" && validity.patternMismatch) {
            errors.lastName = "Please enter only alphabetical characters!"
        }else{
            errors.lastName = ""
        }

        if(name === "password" && validity.patternMismatch) {
            errors.password = "The password must contain at least one capital letter, one lowercase letter, numbers and symbols"
        }else{
            errors.password = ""
        }

        if(name === "address" && validity.patternMismatch) {
            errors.address = "Please enter only alphabetical characters and numbers! No zip code needed"
        }else{
            errors.address = ""
        }
        
        setUser(prevValue=>{
            return {
                ...prevValue,
                [name]:value
            }
        })
        console.log(user)
        console.log(errors)
    }


    function handleSubmit(user) {
        console.log(user)
        // onSetErrors(validateInputs(user))
        onSetSubmitting(true)
    }

    // function finishSubmit() {
        
    // }

    // useEffect(()=>{
    //     if(Object.keys(errors).length === 0 && submitting){
    //         finishSubmit()
    //     }
    // },[errors])

    return(
        
        <form onSubmit={handleSubmit} noValidate action="/signup" method="POST" >
            <InputGroup
                label="Email Address"
                type="email" 
                name="email"
                onChange={handleChange} 
                value={user.email}
                required
                pattern="[a-zA-Z0-9._\-]+[@][a-z]+\.[a-z]{2,3}" />

            {errors.email ? 
                (<p className="error">{errors.email}</p>) : 
                (<p>We'll send your order confirmation here</p> )}

            

            <InputGroup
                label="First Name"
                type="text"
                name="firstName" 
                onChange={handleChange} 
                value={user.firstName}
                required
                pattern="[A-Za-z]+" 
            />

             {errors.firstName ? 
                (<p className="error">{errors.firstName}</p>) : null }

            <InputGroup 
                label="Last Name" 
                type="text"
                name="lastName"
                onChange={handleChange} 
                value={user.lastName}
                pattern="[A-Za-z]+"  
                required
            />

            {errors.lastName ? 
                (<p className="error">{errors.lastName}</p>) : null }

            <InputGroup
                label="Password" 
                type="password"
                name="password"
                onChange={handleChange} 
                value={user.password}
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
            />

            {errors.password ? 
                (<p className="error">{errors.password}</p>) 
                : null}
            

            <InputGroup
                label="Address" 
                type="address"
                name="address" 
                onChange={handleChange} 
                value={user.address}
                required
                pattern="^[0-9A-Za-z\s\-.,#]+$"
            />

            {errors.address ? 
                (<p className="error">{errors.address}</p>) : null }
            

            
            <label>Mostly interested in:</label>
            <div className="input-radio">
                <input className="checkbox" type="checkbox" id="womenswear" name="Womenswear" value="Womenswear" defaultChecked />
                <label htmlFor="womenswear">Womenswear</label>
                <input className="checkbox" type="checkbox"  id="menswear" name="Menswear" value="Menswear"  />
                <label htmlFor="menswear">Menswear</label>
            </div>

            <Button
                text="Join Asos"
                onClick={()=>{}}
            />

        </form>
    
    )
}