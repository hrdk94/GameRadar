import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticleBackground';


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // default role
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert('Registered successfully!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
    }} catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ParticlesBackground />
      <div style={{ position: "relative", zIndex: 10 }}>
        <h1 style={{color: "red"}}>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input 
          type="text" 
          name="username" 
          placeholder="Username (eg. gamer123)"
          onChange={handleChange} 
          required 
        />
        <br /><br />
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
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="developer">Developer</option>
        </select>
        <br /><br />
        <Button
          variant="outlined"
          style={{ backgroundColor: "red", color: "white" }}
          type="submit"
        >
          Register
        </Button>
      </form>
      </div>      
    </div>
  );
}
