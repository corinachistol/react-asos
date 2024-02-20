import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

//layout
import RootLayout from './layouts/RegisterLayout';
import RegisterLayout from './layouts/RegisterLayout';
//pages
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import  Women  from './pages/Women';
import Register from './components/Register';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RegisterLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="women" element={<Women/>}/>
      {/* <Route path="men" element={<Men/>}/> */}
      <Route path="register" element={<Register/>}/>
      {/* <Route path="saved-lists" element={<SavedLists/>} />
      <Route path="your-bag" element={<YourBag/>} /> */}


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
