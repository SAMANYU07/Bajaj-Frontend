import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';

import './App.css'

function App() {
  const [apiInput, setApiInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [jsonResponse, setJSONResponse] = useState([]);
  const [resData, setResData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      let inpApi = JSON.parse(apiInput);
      let fileObje = {"file_b64":"BASE_64_STRING"};
      const data = Object.assign({}, inpApi, fileObje)
      console.log("data:", data);
      const res = await axios.post(`${API_URL}/api/bfhl`, data, {
        headers: {
          'Content-Type': 'application/json' // Specify content type
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
    <div className='h-screen w-screen flex items-center justify-center'>
      <h1>API_INPUT</h1>
      <input type="text" name="" id=""
      value={apiInput} onChange={event => setApiInput(event.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <select name="" id="filterOption"  value={selectedOption} onChange={handleDropdownChange}>
        <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
          <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          <option value="Show All">Show All</option>
        </select>
      </div>
      <div>
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
