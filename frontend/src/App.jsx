import React, { useContext } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import { Toaster } from 'react-hot-toast'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import Customize2 from './pages/Customize2'


const App = () => {
   const { userData, setUserData} = useContext(userDataContext)
//    const {  loading } = useContext(userDataContext)

// if (loading) {
//   return <div className='text-white p-4'>Loading...</div> 
// }

  return (
    <>
    <Routes>
      <Route path='/signup' element={!userData?<SignUp/> :<Navigate to={"/"}/>}/>

      <Route path='/' element={(userData?.assistantImage && userData?.assistantName )?<Home/> : <Navigate to={"/customize"}/>}/>
 
      <Route path='/signin' element={!userData?<SignIn/> :<Navigate to={"/"}/>}/>

      <Route path='/customize' element={userData?<Customize/> : <Navigate to ={"/signup"}/>}/>

      <Route path='/customize2' element={userData?<Customize2/> : <Navigate to ={"/signup"}/>}/>
    </Routes>
      <Toaster position="top-center" reverseOrder={false} />
      </>
    
  )
}

export default App