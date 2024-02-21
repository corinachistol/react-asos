import { useState } from "react";
import Logo from './Logo/Logo';
import FormSignIn, { Button } from './SignIn/FormSignIn';
import { Join } from './SignUp/Join';


export default function Register() {

  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const [buttonSelected, setButtonSelected] = useState("")

  function handleClick(e){
    setButtonSelected(e.target.innerText)
  }

  return (
    <>
      <Logo/>

      <div className="container-sign">

        {Object.keys(errors).length === 0 && submitting ? 
          (<span className="success">Successfully signed up ✔. Please check your <a href="#">email</a> for confirmation!</span>) 
          : (
            <>
              <div className='container-signin__header'>
                <Button 
                  clas='signin-options'
                  text="JOIN"
                  clickHandler={handleClick}/>

                <Button 
                  clas='signin-options'
                  text="SIGN IN"
                  clickHandler={handleClick}/>

              </div>

              <div className="container-signin__main">
                {buttonSelected === "JOIN" && <Join 
                    errors={errors}
                    onSetErrors={setErrors}
                    submitting={submitting}
                    onSetSubmitting={setSubmitting} />
                }

                {buttonSelected === "SIGN IN" && <FormSignIn/>}
               
                
              </div>  
            </>
          )}
      </div>
    </>
  );
}
