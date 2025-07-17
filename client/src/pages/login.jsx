import Button from '@mui/material/Button';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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


    return (
        <div>
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
                style={{ backgroundColor: "red", 
                color: "white"}}
                >
                    Login
                </Button>
            </form>
        </div>
    )
}