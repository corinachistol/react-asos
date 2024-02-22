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
        // e.preventDefault()

        const {value,name } = e.target;
        
        // console.log(value)
        // console.log(name)       
        
        setUser(prevValue=>{
            return {
                ...prevValue,
                [name]:value
            }
        })
        // console.log(user)
    }

    function validateInputs(userValues) {  //userValues este obiectul care represinta valorile curente din input
        let errors = {}
        let email_pattern = /[a-zA-Z0-9._\-]+[@][a-z]+\.[a-z]{2,3}/
        let name_pattern = /[A-Za-z]+$/
        let password_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        let address_pattern = /^[0-9A-Za-z\s\-.,#]+$/

        

        if(!userValues.email ){
            errors.email = "Email is required"
        }else if(userValues.email.length < 10){
            errors.email = "Email is too short!"
        }else if(!userValues.email.match(email_pattern)){
            errors.email = "You need to enter a valid email address"
        }else{
            errors.email = ""
        }

        if(!userValues.firstName || !userValues.lastName ){
            errors.name = "Name is required"
        }else if(!userValues.firstName.match(name_pattern) || !userValues.lastName.match(name_pattern)){
            errors.name = "Please enter only alphabetical characters"
        }else{
            errors.name = ""
        }

        if(!userValues.password ){
            errors.password = "Password is required"
        }else if(userValues.password.length < 8){
            errors.password = "Password must be at least 8 characters"
        } else if (!userValues.password.trim().match(password_pattern)){
            errors.password = "Password must contain at least one capital letter, one lowercase letter, numbers and symbols"
        }else {
            errors.password = ""
        }

        if(!userValues.address ){
            errors.address = "Address is required"
        }else if (!userValues.address.trim().match(address_pattern)){
            errors.address = "Please enter only alphabetical characters and numbers! No zip code needed"
        }else {
            errors.address = ""
        }
        console.log(errors)
        return errors

    }


    function handleSubmit(e) {
        e.preventDefault()
        onSetErrors(validateInputs(user))

        if(Object.keys(errors).length !== 0){
            onSetSubmitting(false)
        }else{
            onSetSubmitting(true)

        }
        console.log(Object.keys(errors).length)
        console.log(submitting)
    }

    function finishSubmit() {
        console.log(user)
    }

    useEffect(()=>{
        if(Object.keys(errors).length == 0 && submitting){
            finishSubmit()
        }
    },[errors])

    return(
        
        <form onSubmit={handleSubmit} noValidate  > 
        {/* action="/signup" method="POST" */}
            <InputGroup
                label="Email Address"
                type="email" 
                name="email"
                onChange={handleChange} 
                value={user.email}
            />
            {errors.email ? 
                (<p className="error">{errors.email}</p>) : 
                (<p>We'll send your order confirmation here</p> )}

            <InputGroup
                label="First Name"
                type="text"
                name="firstName" 
                onChange={handleChange} 
                value={user.firstName}
            />
             {errors.name ? 
                (<p className="error">{errors.name}</p>) : null }

            <InputGroup 
                label="Last Name" 
                type="text"
                name="lastName"
                onChange={handleChange} 
                value={user.lastName}
            />
            {errors.name ? 
                (<p className="error">{errors.name}</p>) : null }

            <InputGroup
                label="Password" 
                type="password"
                name="password"
                onChange={handleChange} 
                value={user.password}
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