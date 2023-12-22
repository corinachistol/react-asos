import Logo from './components/Logo';
import FormSignIn, { SignInOptions } from './components/SignIn';


function App() {
  return (
    <>
    {/* <h1>ASOS</h1> */}
    <Logo/>

    

    <div className="container-sign">

      <div className='grid-container'>
       <SignInOptions>
        JOIN
       </SignInOptions>

       <SignInOptions>
        SIGN IN
       </SignInOptions>
      </div>

      <FormSignIn/>

    </div>
    </>
  );
}

export default App;
