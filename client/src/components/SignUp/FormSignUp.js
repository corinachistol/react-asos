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
        address: ""
    })

    function handleChange(e) {
        e.preventDefault()

        // let errors = {}
       
        const {validity,value,name } = e;
        
        

        // if(validity.valueMissing){
        //     console.log("This field cannot be empty!")
        // }

        // if(validity.patternMismatch){
        //     console.log("Please respect the pattern field")
        // }
        // if(name === "email" && validity.patternMismatch){
        //     // errors.email="something"
        //     console.log("doesn't match")
        // } else{
        //     console.log(validity)
        //     console.log("math") 
        // }

        if (validity.patternMismatch) {
            name.setCustomValidity("You gotta fill this out, yo!");
            console.log("1")
          } else if (validity.rangeUnderflow) {
            console.log("2")
            name.setCustomValidity("We need a higher number!");
          } else if (validity.rangeOverflow) {
            console.log("3")
            name.setCustomValidity("Thats too high!");
          } else {
            name.setCustomValidity("");
          }
        
          name.reportValidity();


        setUser(prevValue=>{
            return {
                ...prevValue,
                [name]:value
                // [name]: name === "dateOfBirth" ? Date.parse(value) : value
            }
        })

         
    }

      function calculateAge(dob){
        const today = new Date();
        // console.log(today)
        const dobDate= new Date(dob)
        // console.log(dobDate)
        const age = today.getFullYear() - dobDate.getFullYear()
        // console.log(age)

        if (today.getMonth() < dobDate.getMonth() || 
        (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())){
            age--
        }
  
        return(age) 
    }
    
    // function validateInputs(inputValue) {
    
    //     console.log(inputValue)
    //     // let errors = {};

    //     let userAge= calculateAge(inputValue.dateOfBirth)
    //     console.log(userAge)

    //     if(inputValue.email.length < 15){
    //         errors.email = "Email is too short!"
    //     }
    //     if(inputValue.password.length < 10){
    //         errors.password = "Password must be 10 or more characters"
    //     }
    //     if(!inputValue.lastName || !inputValue.lastName ){
    //         errors.name = "This field cannot be empty"
    //     }
    //     if(!userAge){
    //         errors.dateOfBirth = "This field cannot be empty"
    //     }else if(userAge < 16){
    //         errors.dateOfBirth = "You need to be 16 or over to use ASOS"
    //     }
    //     return errors;
    // }

    function handleSubmit(e) {
        // e.preventDefault()
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
                pattern="[A-Za-z]+" />
             {errors.name ? 
                (<p className="error">{errors.name}</p>) : null }

            <InputGroup 
                label="Last Name" 
                type="text"
                name="lastName"
                onChange={handleChange} 
                value={user.lastName}
                pattern="[A-Za-z]+"  />

            {errors.name ? 
                (<p className="error">{errors.name}</p>) : null }

            <InputGroup
                label="Password" 
                type="password"
                name="password"
                onChange={handleChange} 
                value={user.password}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"  />

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