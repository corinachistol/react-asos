import Logo from './components/Logo/Logo';
import FormSignIn, { Button, SignInOptions } from './components/SignIn/FormSignIn';
import { Join } from './components/SignUp/Join';


function App() {
  return (
    <>
    <Logo/>

    <div className="container-sign">

      <div className='grid-container'>
        <Button 
          clas='signin-options'
          text="JOIN"/>

        <Button 
          clas='signin-options'
          text="SIGN IN"/>
       
      </div>

      {/* <FormSignIn/> */}
      <Join/>

    </div>
    </>
  );
}

export default App;
