import Button from '@mui/material/Button';

export default function Register(){
    return (
        <div>
            <form>
                <input type="text" placeholder="Name"/> <br /><br />
                <input type="text" placeholder="Email"/><br /><br />
                <input type="text" placeholder="Password" /> <br /><br />
                <Button variant="outlined" style={{ backgroundColor: "blue", color: "white"}}>Register</Button>
            </form>
        </div>
    )
}