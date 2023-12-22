import Logo from './components/Logo';
import FormSignIn, { SignInOptions } from './components/FormSignIn';
import { Join } from './components/Join';


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

      {/* <FormSignIn/> */}
      <Join/>

    </div>
    </>
  );
}

export default App;
