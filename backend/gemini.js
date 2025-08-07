import axios from 'axios'
const geminiResponse=async(command,assistantName,userName)=>{
    try {
       
console.log(" Sending prompt to Gemini...");
        const apiUrl=process.env.GEMINI_API_URL
        const prompt = ` You are a virtual assistant  ${assistantName} created by ${userName}.
        You are not Google. You will now behave like a voice-enabled assistant

        Your task is to understand the user's natural language input and respond with a JSON object like this:

        {
        "type":"general" | "google_search" | "youtube_search" | "youtube_play"
        | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show", 

        "userInput" : "<original user input>" {only remove your name from userinput if exists} and kisi n google ya youtube pe kuch search karne ko bola hai to userInput me only vo search vala text jaye,

        "response" : "<a short spoken response to read out loud to the user>"
        }

        Instructions:
        - "type":determine the intent of the user .
        - "userinput" : original sentence the user spoke.
        - "response" : A short voice-friendly reply, eg., "Sure , playing it now , "here's what I found ","Today is Tuesday " etc.


        Type meanings: 
        - "general": if it's a factual or information question 
        aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena 
        - "google_search": if user wants to search something on Google. 
        - "youtube_search": if user wants to search something on Youtube. 
        - "youtube_play": if user wants to directly  play a video or song. 
        - "calculator_open": if user wants to open a calculator. 
        - "instagram_open": if user wants to open a instagram. 
        - "facebook_open": if user wants to open a facebook. 
        - "weather_show": if user wants to know weather. 
        - "get_time": if user ask for current time. 
        - "get_day": if user ask what day it is. 
        - "get_date": if user ask what date it is. 
        - "get_month": if user ask for the current month. 

        Important :
        -Use ${userName} agar koi puche tume kisne bnaya
        - Only respond with the JSON object , nothing else.
        
        now your userInput -${command}
        `;
        const result = await axios.post(apiUrl,{
            "contents": [{
        "parts": [{
            "text": prompt
          }]
        }]
        })
        return result.data.candidates[0].content.parts[0].text
    } catch (error) {
    console.error(" Error from Gemini API:", error?.response?.data || error.message || error);
}

}
export default geminiResponse