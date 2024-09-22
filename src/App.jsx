import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { useTransition, animated } from 'react-spring';

import './App.css'

function App() {
  const [apiInput, setApiInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [jsonResponse, setJSONResponse] = useState([]);
  const [resData, setResData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const filterTransition = useTransition(showDropdown, {
    from: {height: "0%"},
    enter: {height: "6 %"},
    leave: {height: "0%"},
  });

  const handleSubmit = async () => {
    try {
      let inpApi = JSON.parse(apiInput);
      let fileObje = {"file_b64":"BASE_64_STRING"};
      const data = Object.assign({}, inpApi, fileObje)
      console.log("data:", data);
      const res = await axios.post(`${API_URL}/api/bfhl`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response from server:", res.data);
      setResData(res.data)
      setShowDropdown(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    console.log("api: ", API_URL);
    axios.get(API_URL+"/api/bfhl")
      .then(data => {
        setJSONResponse(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <>
    <div className='h-screen flex flex-col items-center justify-center gap-y-4 bg[#e9e9e9]'>
      <h1 className='font-bold text-[30px]'>API_INPUT</h1>
      <input type="text" name="" id=""
      value={apiInput} onChange={event => setApiInput(event.target.value)}
      className='text-[28px] mt8 outline-none border-b-2 border-black rounded-md focus:border-b-violet-600 transition-[0.2s]'
      />
      <button onClick={handleSubmit} id='submitbtn'
      className=' bg-violet-600 mt4 text-white w-[120px] h-[50px] transition-[0.2s] active:scale-95 hover:scale-105 rounded-lg after:rounded-lg after:bg-violet-800'
      >Submit</button>
      {filterTransition((style, show) =>
      show ?
      <animated.div style={style}>
        <select name="" id="filterOption"  value={selectedOption} onChange={handleDropdownChange}
        className=' outline-none text-[20px] mt4 hover:bg-black hover:text-white transition-[0.2S]'
        >
        <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
          <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          <option value="Show All">Show All</option>
        </select>
      </animated.div>
      : null
      )}
      <div className=' mt6 bg-white shadow-md rounded-md p-2 smooth-width smooth-height transition-[0.2s]'>
      {resData?.numbers.length && (selectedOption == "numbers" || selectedOption == "Show All") ? <p>Numbers: <span>{resData?.numbers?.map(no => <span key={no}>{no},</span>)}</span></p> : null}
          {resData?.alphabets.length && (selectedOption == "alphabets" || selectedOption == "Show All") != 0 ? <p>Alphabets: <span>{resData?.alphabets?.map(alpha => <span key={alpha}>{alpha},</span>)}</span></p> : null}
          {/* {resData?.highest_alphabet.length && (selectedOption == "highestAlpha" || selectedOption == "Show All") != 0 ? <p>Highest Alphabet: <span>{resData?.highest_alphabet}</span></p> : null} */}
          {resData?.highest_lowercase_alphabet.length && (selectedOption == "Highest Lowercase Alphabet" || selectedOption == "Show All") != 0 ? <p>Highest Lowercase Alphabet: <span>{resData?.highest_lowercase_alphabet}</span></p> : null}
      </div>
    </div>
    </>
  )
}

export default App
