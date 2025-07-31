import React, { useState } from 'react';
import './App.css';

function App() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);
  const [result, setResult] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [jdFileName, setJdFileName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [responseCompany, setResponseCompany] = useState('');
  const [responseRole, setResponseRole] = useState('');
  const [presentSkills, setPresentSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [suggestions, setSuggestions] = useState('');
  const [responseMatchingSkills, setResponseMatchingSkills] = useState([]);
  const [responseMissingSkills, setResponseMissingSkills] = useState([]);
  const [responseSuggestions, setResponseSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
    setResumeFileName(e.target.files[0].name);
  };

  const handleJdChange = (e) => {
    setJd(e.target.files[0]);
    setJdFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jd) {
      alert('Please upload both resume and job description files.');
      return;
    }
    setIsLoading(true); // 🌀 Start spinner
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jd', jd);
    formData.append('company', companyName);
    formData.append('role', jobTitle);

    try {
      const response = await fetch('http://localhost:8000/score', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // Update Phase 1 + 2 + 3 states
      setResponseCompany(data.company);
      setResponseRole(data.role);
      setResult(data.score);
      setPresentSkills(data.present_skills || []);
      setMissingSkills(data.missing_skills || []);
      setSuggestions(data.suggestions || '');
      setResponseMatchingSkills(data.present_skills);
      setResponseMissingSkills(data.missing_skills);
      setResponseSuggestions([data.suggestions]); // wrap in array to safely map
    } catch (error) {
      console.error('Error:', error);
      setResult('Something went wrong. Try again later.');
    }
    setIsLoading(false); // ✅ Stop spinner
  };

  return (
    <div className="App">
      <h1>🧠 JobQuest</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume:</label>
          <input type="file" onChange={handleResumeChange} />
        </div>

        <div>
          <label>Upload Job Description:</label>
          <input type="file" onChange={handleJdChange} />
        </div>

        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div>
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="text-center mt-4">
            <span className="inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            <p className="text-sm text-gray-600 mt-2">Comparing resume and job description...</p>
          </div>
        ) : (
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
             Submit
          </button>
           )}
      </form>

      {result && (
  <div className="result-block" style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", marginTop: "20px" }}>
    <strong>Company:</strong> {responseCompany}{"\n"}
    <strong>Role:</strong> {responseRole}{"\n"}
    <strong>Resume:</strong> {resumeFileName}{"\n"}
    <strong>JD:</strong> {jdFileName}{"\n"}
    <strong>Match Score:</strong> {result}{"\n\n"}

    ✅ <span style={{ color: "green" }}>Matching Skills:</span>{"\n"}
    {responseMatchingSkills.map((skill, idx) => (
      <div key={idx} style={{ color: "green", marginLeft: "1rem" }}>- {skill}</div>
    ))}

    ❌ <span style={{ color: "red" }}>Missing Skills:</span>{"\n"}
    {responseMissingSkills.map((skill, idx) => (
      <div key={idx} style={{ color: "red", marginLeft: "1rem" }}>- {skill}</div>
    ))}

    🧠 <span style={{ color: "#ff9900" }}>Suggestions:</span>{"\n"}
    {responseSuggestions.map((tip, idx) => (
      <div key={idx} style={{ fontStyle: "italic", marginLeft: "1rem" }}>- {tip}</div>
    ))}
  </div>
)}
    </div>
  );
}

export default App;