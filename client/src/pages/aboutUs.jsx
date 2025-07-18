import { useNavigate } from "react-router-dom";


export default function AboutUs() {
  const navigate = useNavigate();

    const handleGoBack=()=>{
        navigate('/games');
    }
  return (
    <div style={{ padding: '20px' }}>
      <h1>Hi, This is created by @hrdk94</h1>
      <a href="https://github.com/hrdk94" target="_blank" rel="noopener noreferrer">GitHub</a><br /> <br />
      <a href="https://www.linkedin.com/in/hrdk94/" target="_blank" rel="noopener noreferrer">LinkedIn</a>  <br /><br />
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
}
