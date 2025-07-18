import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home(){
    return(
        <div>
            <h1>WELCOME TO GAMERADAR!</h1>
            <Link to="/register"><Button variant="outlined" style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}>Register</Button></Link>
            <Link to="/login"><Button variant="outlined" style={{ backgroundColor: "blue", color: "white", marginRight: "10px" }}>Login</Button></Link>
            <Link to="/Abouth"><Button variant="outlined" style={{ backgroundColor: "Greed", color: "white" }}>About Us!</Button></Link>
        </div>
    )
}