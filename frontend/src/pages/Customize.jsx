import React, { useContext, useRef, useState } from 'react'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.webp"
import image7 from "../assets/image7.jpeg"
import authBg from "../assets/authBg.png"
import Card from '../components/Card'
import { PiUploadSimpleLight } from "react-icons/pi";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

const Customize = () => {
  const navigate=useNavigate()
  const { serverUrl,
        userData,
        setUserData,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage}=useContext(userDataContext)
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

 return (
  <div className='w-full h-[100vh] bg-gradient-to-br from-[#1f4037] via-[#99f2c8] to-[#1f4037] flex justify-center items-center flex-col p-[20px] '>

    
    <div className="group absolute top-[35px] left-[30px] cursor-pointer z-50">
      <IoIosArrowBack
        className='hover:text-[#92afab] text-white w-[35px] h-[35px]'
        onClick={() => navigate("/")}
      />
      <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute top-[50px] left-[5px] bg-white font-semibold text-black text-sm px-2 py-[2px] rounded shadow whitespace-nowrap">
        Back
      </div>
    </div>

    
    <h1 className='text-white font-semibold mb-[20px] text-[30px] text-center'>
      Select your <span className='text-[#153d65] font-semibold'>Assistant Image</span>
    </h1>

    
    <div className='w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-[20px]'>
      <Card image={image1} />
      <Card image={image2} />
      <Card image={image4} />
      <Card image={image5} />
      <Card image={image6} />
      <Card image={image7} />
      <Card image={authBg} />

      
      <div
        className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[200px] bg-[#0b0c10] border-2 border-[#00ffd5] rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl hover:border-4 hover:border-[#ff00c8] hover:shadow-[#00ffd5] cursor-pointer flex justify-center items-center ${
          selectedImage === "input"
            ? "border-4 border-[#ff00c8] hover:shadow-2xl hover:shadow-[#00ffd5]"
            : ""
        }`}
        onClick={() => {
          inputImage.current.click();
          setSelectedImage("input");
        }}
      >
        {!frontendImage && (
          <PiUploadSimpleLight className='text-white w-[25px] h-[25px]' />
        )}
        {frontendImage && (
          <img src={frontendImage} className='h-full object-cover' />
        )}
      </div>
    </div>


    <input
      type="file"
      accept='image/*'
      ref={inputImage}
      hidden
      onChange={handleImage}
    />

   
    {selectedImage && (
      <button
        className='min-w-[130px] cursor-pointer h-[70px] mt-[30px] bg-white rounded-full text-[19px] font-semibold text-black hover:shadow-2xl hover:border-4 hover:border-[#99f2c8] hover:shadow-[#00ffd5]'
        onClick={() => navigate("/customize2")}
      >
        Next
      </button>
    )}
  </div>
)
}

export default Customize