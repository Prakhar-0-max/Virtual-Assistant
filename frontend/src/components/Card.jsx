import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

const Card = ({ image }) => {
  const { serverUrl,
        userData,
        setUserData,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage}=useContext(userDataContext)
    return (
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[200px] bg-[#0b0c10] border-2 border-[#00ffd5] rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl hover:border-4 hover:border-[#ff00c8] hover:shadow-[#00ffd5] cursor-pointer ${selectedImage==image?"border-4 border-[#ff00c8] hover:shadow-2xl hover:shadow-[#00ffd5]":null}`} onClick={()=>{ 
            setSelectedImage(image)
            setBackendImage(null)
            setFrontendImage(null)
            }}>
            <img src={image} className=' h-full w-full object-cover ' />
        </div>
    )
}
   

export default Card