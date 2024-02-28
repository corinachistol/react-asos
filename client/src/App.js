import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

//layout
import RootLayout from './layouts/RegisterLayout';
import RegisterLayout from './layouts/RegisterLayout';
import WomenLayout from './layouts/WomenLayout';
//pages
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Women, { womenProductsLoader }  from './pages/women/Women';
import Register from './components/Register';
import WomenProductDetails, {womenProductDetailsLoader}  from './pages/women/WomenProductDetails';
import ProductError from './pages/women/ProductError';
import { formSignUpAction } from './components/SignUp/FormSignUp';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RegisterLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="register" element={<Register/>} action={formSignUpAction}/>
      </Route>  

        {/* if user exists in the database  */}
      <Route path="/" element={<RootLayout/>}>
        <Route index element ={<Home/>}/>

        <Route path="women" element={<WomenLayout/>} errorElement={<ProductError/>}>
          <Route 
            index 
            element={<Women/>}
            loader={womenProductsLoader}
          />
          <Route
            path=":id"
            element={<WomenProductDetails/>}
            loader={womenProductDetailsLoader}
          >
          </Route>
        </Route>

        {/* <Route path="men" element={<Men/>}/> */}
        {/* <Route path="saved-lists" element={<SavedLists/>} />
        <Route path="your-bag" element={<YourBag/>} /> */}
  
  
      </Route>
      
      <Route path="*" element={<NotFound/>}/>

    </Route>
      


  )
)



function App() {

  return (
    <RouterProvider router={router}/>
  
    )
}

export default App;
