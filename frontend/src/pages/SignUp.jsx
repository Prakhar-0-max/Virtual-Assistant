import React, { use, useContext, useState } from 'react'
import { IoEyeOffOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { userDataContext } from '../context/UserContext';
import toast from 'react-hot-toast';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [err, setErr] = useState("")
  const { serverUrl, userData,
        setUserData } = useContext(userDataContext)
    const [loading,setLoading]=useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("")
     setLoading(true);
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name, email, password
      }, { withCredentials: true })
      toast.success("Sign up Successfully")
      setUserData(result.data)
      setLoading(false)
      navigate("/customize");
    } catch (error) {
      toast.error("Sign up Failed");
      console.log(error);
        setUserData(null)
      setLoading(false)
      setErr(error?.response?.data?.message || error.message)
    }
  }
  return (
    <div className="w-full h-screen  bg-gradient-to-br from-[#1f4037] via-[#99f2c8] to-[#1f4037] flex items-center justify-center">

      <form className='w-[90%] h-[500px] max-w-[500px] bg-[#00000069] backdrop-blur-md shadow-lg shadow-[#99f2c8] items-center flex flex-col justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>

        <h1 className='text-white text-[30px] mb-9 font-semibold'>Register to <span className='text-blue-400'>  Virtual Assistant</span></h1>

        <input type="text" placeholder='Enter your name' className='w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setName(e.target.value)} value={name} />

        <input type="email" placeholder='Email ' className='w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            autoComplete="new-password"
            className="w-full h-[50px] rounded-full outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2 text-[18px] pr-10 "
            required
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />

          {!showPassword && (
            <FiEye
              className="absolute inset-y-0 right-11 mt-13flex items-center text-white w-6 h-6 my-auto cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}

          {showPassword && (
            <IoEyeOffOutline
              className="absolute inset-y-0 right-11 flex items-center text-white w-6 h-6 my-auto cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>


        {err.length > 0 && <p className='text-red-500'>
          {err}
        </p>}
        <button className='min-w-[130px] cursor-pointer h-[43px] mt-[30px] bg-white rounded-full text-[19px] font-semibold text-black  hover:shadow-2xl hover:border-4 hover:border-[#99f2c8] hover:shadow-[#00ffd5]' disabled={loading}>{loading?"Loading...":"Sign Up"} </button>

        <p className='text-[white] text-[16px] cursor-pointer' onClick={() => navigate("/signin")}>Already have an account? <span className='text-blue-400 hover:underline'>Login</span></p>

      </form>
    </div>

  )
}

export default SignUp