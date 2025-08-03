import Button from '@mui/material/Button';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticleBackground';


export default function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(formData)
        })
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data)); // save username
            localStorage.setItem('token', data.token);  
            alert('Login successful!');
            navigate('/games');  
            console.log(data); 
        } else {
            alert(`Login failed: ${data.error || "Unknown error"}`);
        }} catch(err){
            console.log("Login error: ", err);
            alert("Login Error, Try Again!");
        }
    };

    const handleRegister =()=>{
        navigate('/register'); 
    }

    return (
        <div>
            <ParticlesBackground />
            <div style={{ position: "relative", zIndex: 10 }}>
                <h1 style={{color:"#1976d2"}}>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="email" 
                placeholder="Email" 
                onChange={handleChange} 
                required
                />
                <br /><br />
                <input 
                type="password" 
                name="password"
                placeholder="Password" 
                onChange={handleChange} 
                required
                />
                <br /><br />
                <Button 
                type='submit' 
                variant="outlined" 
                style={{ backgroundColor: "Blue", 
                color: "white", marginRight:"10px"}}
                >
                    Login
                </Button>
                <Button 
                // type='submit' 
                variant="outlined" 
                style={{ backgroundColor: "Red", 
                color: "white"}}
                onClick={handleRegister}
                >
                    Register
                </Button>
                
            </form>
            </div>
        </div>
    )
}