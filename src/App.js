import { useState } from "react";
import Logo from './components/Logo/Logo';
import FormSignIn, { Button, SignInOptions } from './components/SignIn/FormSignIn';
import { Join } from './components/SignUp/Join';


function App() {

  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  return (
    <>
    <Logo/>

    <div className="container-sign">

      {Object.keys(errors).length === 0 && submitting ? 
        (<span className="success">Successfully signed up ✔. Please check your <a href="#">email</a> for confirmation!</span>) 
        : 
        (<div className='grid-container'>
        <Button 
          clas='signin-options'
          text="JOIN"/>

        <Button 
          clas='signin-options'
          text="SIGN IN"/>


        <Join 
          errors={errors}
          onSetErrors={setErrors}
          submitting={submitting}
          onSetSubmitting={setSubmitting}/>
        
        {/* <FormSignIn/> */}
       
         </div>

        )}
      

     
      

    </div>
    </>
  );
}

export default App;
