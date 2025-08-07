import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext';
import { IoIosArrowBack } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Customize2 = () => {
    const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleUpdateAssistant = async () => {
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("assistantName", assistantName)
            if (backendImage) {
                formData.append("assistantImage", backendImage)
            } else {
                formData.append("imageUrl", selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`,
                formData,
                { withCredentials: true })
            setLoading(false)
            toast.success("Assistant Create Successfully")
            console.log(result.data);
            setUserData(result.data);
            navigate("/")
        } catch (error) {
            setLoading(false)
            toast.error("Assistant Creation Failed")
            console.log(error)
        }
    }
    return (
        <div className='w-full h-[100vh]  bg-gradient-to-br from-[#1f4037] via-[#99f2c8] to-[#1f4037] flex justify-center items-center flex-col p-[20px] '>

            <div className="group absolute top-[35px] left-[30px] cursor-pointer z-50">
                <IoIosArrowBack
                    className='hover:text-[#92afab] text-white w-[35px] h-[35px]'
                    onClick={() => navigate("/")}
                />
                <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute top-[50px] left-[5px] bg-white font-semibold text-black text-sm px-2 py-[2px] rounded shadow whitespace-nowrap">
                    Back
                </div>
            </div>

            <div className='mb-22'>
                <h1 className='text-white font-semibold mb-[60px] text-[30px] text-center'>Enter  your <span className='text-[#153d65]  font-semibold'> Assistant Name</span></h1>

                <input type="text" placeholder='eg. Jarvis ' className=' w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-black placeholder-black px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setAssistantName(e.target.value)} value={assistantName} />


            </div>
            {assistantName && <button className='min-w-[180px] cursor-pointer h-[45px] mt-[10px] bg-white rounded-full text-[19px] font-semibold text-black  hover:shadow-2xl hover:border-4 hover:border-[#99f2c8] hover:shadow-[#00ffd5] ' disabled={loading} onClick={() => {

                handleUpdateAssistant()

            }}>{!loading ? "Create" : "Loading"}</button>}

        </div>
    )
}

export default Customize2