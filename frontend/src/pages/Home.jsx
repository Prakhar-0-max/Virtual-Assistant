import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from "../context/UserContext"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import ai from "../assets/ai.gif"
import user from "../assets/user.gif"

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  }

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // or 'hi-IN' for Hindi

    const voices = window.speechSynthesis.getVoices()
    
    const hindiVoice = voices.find(v => v.lang === 'en-US');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data
    speak(response);

    if (type === 'google_search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'instagram_open') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.instagram.com/`, '_blank');
    }

    if (type === 'facebook_open') {

      window.open(`https://www.facebook.com/`, '_blank');
    }



    if (type === 'calculator_open') {

      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }

    if (type === 'weather_show') {

      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }

    if (type === 'youtube_search' || type === 'youtube_play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  }


  useEffect(() => {
    const unlockSpeech = () => {
      const dummy = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(dummy);
      window.removeEventListener("click", unlockSpeech);
    };
    window.addEventListener("click", unlockSpeech);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continous = true,
      recognition.lang = 'en-IN'

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log("heard:" + transcript)

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("")
        setUserText(transcript)
        const data = await getGeminiResponse(transcript)
        handleCommand(data)
        console.log(data)
        setAiText(data.response)
        setUserText("")

      }
    }
    recognition.onend = () => {
      setAiText("")
      recognition.start();
    };

    recognition.start()
    return () => {
      // recognition.stop();
      window.removeEventListener("click", unlockSpeech);
    };
  }, [])


//  window.speechSynthesis.cancel(); 
// const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, mai tumaari kya madad kar sakta hu`);
// greeting.lang = 'hi-IN';
// window.speechSynthesis.speak(greeting);


  

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black]  to-[#212147] flex justify-center items-center flex-col p-[20px] gap-[5px] relative'>

      {/* Customize Dropdown */}
      <div className="absolute top-[27px] right-[90px] group z-50"
        onClick={() => navigate("/customize")}>
        <FaRegEdit className='text-[28px] text-white hover:text-[#3f4c4a] transition duration-200 cursor-pointer' />

        <div

          className="opacity-0 group-hover:opacity-100 absolute top-[35px] right-0 bg-white text-black px-4 py-2 rounded shadow-md text-sm cursor-pointer transition duration-200 hover:bg-green-100 whitespace-nowrap flex items-center gap-2 font-semibold"
        >
          Edit Assistant
        </div>
      </div>

      {/* Logout Dropdown */}
      <div className="absolute top-[28px] right-[20px] group z-50"
        onClick={handleLogout}>
        <RiLogoutCircleLine className='text-[28px] text-white hover:text-[#3f4c4a] transition duration-200 cursor-pointer' />

        <div

          className="opacity-0 group-hover:opacity-100 absolute top-[40px] right-0 bg-white text-black px-4 py-2 rounded shadow-md text-sm cursor-pointer transition duration-200 hover:bg-green-100 whitespace-nowrap flex items-center gap-2 font-semi  bold"
        >
          Logout
        </div>
      </div>


      {/* Assistant Image */}
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow:lg '>
        <img src={userData?.assistantImage} alt="" className='h-[300px] rounded-2xl object-cover' />
      </div>

      {/* Assistant Name */}
      <h1 className='text-white text-[25px] mb-7 font-semibold'>Hey I'm {userData?.assistantName}</h1>
     
        {!aiText && <img src={user} alt="Voice" className="w-[200px] " />}
    
      {aiText && <img src={ai} alt="" className='w-[200px] bg-transparent ' />}

<h1 className='text-white'>{userText?userText:aiText?aiText:null}</h1>
    </div>
  )
}

export default Home;
