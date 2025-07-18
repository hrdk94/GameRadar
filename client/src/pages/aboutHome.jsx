import { useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from "@mui/material";

export default function AboutHome() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <h1>Hi, This is created by @hrdk94</h1>

      <div style={{ marginTop: '10px' }}>
        <GitHubIcon style={{ verticalAlign: 'middle' }} />
        <a href="https://github.com/hrdk94" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px', color:"#1976d2" }}>
          GitHub
        </a>
      </div>

      <div style={{ marginTop: '10px' }}>
        <LinkedInIcon style={{ verticalAlign: 'middle' }} />
        <a href="https://www.linkedin.com/in/hrdk94/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px', color:"#1976d2" }}>
          LinkedIn
        </a>
      </div>

      <br />
      <Button variant="outlined" onClick={handleGoBack}>Go Back</Button>
    </div>
  );
}
