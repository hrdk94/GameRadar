import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ParticlesBackground from "../components/ParticleBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <ParticlesBackground />
      <div className="relative z-10 text-center">
        <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold" }}>
          WELCOME TO GAMERADAR!
        </h1>
        <Link to="/register">
          <Button
            variant="outlined"
            style={{ backgroundColor: "red", color: "white", margin: "10px" }}
          >
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant="outlined"
            style={{ backgroundColor: "blue", color: "white", margin: "10px" }}
          >
            Login
          </Button>
        </Link>
        <Link to="/about">
          <Button
            variant="outlined"
            style={{ backgroundColor: "#32936F", color: "white", margin: "10px" }}
          >
            About Us!
          </Button>
        </Link>
      </div>
    </div>
  );
}
