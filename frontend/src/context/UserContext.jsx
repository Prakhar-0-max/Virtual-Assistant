import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userDataContext = createContext()

const UserContext = ({ children }) => {
  const serverUrl = "https://virtual-assistant-k0so.onrender.com"

  const [userData, setUserData] = useState(undefined) // Important: start with undefined
//   const [loading, setLoading] = useState(true)        // Loading state

  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      })
      setUserData(result.data)
      console.log("User data:", result.data)
    } catch (error) {
      setUserData(null) 
      console.log("User fetch error:", error)
      }
    //  finally {
    //   setLoading(false) // Done loading
    // }
  }

   const  getGeminiResponse = async(command)=>{
    try {
      const result  = await axios.post(`${serverUrl}/api/user/asktoassistant`,
        {command},{withCredentials:true})
        return result.data 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleCurrentUser()
  }, [])

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse
    // loading,
  }

 

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}



export default UserContext
