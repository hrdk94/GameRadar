import Button from '@mui/material/Button';

export default function Login(){
    return (
        <div>
            <form>
                <input type="text" placeholder="Email"/> <br /><br />
                <input type="text" placeholder="Password" /><br /><br />
                <Button variant="outlined" style={{ backgroundColor: "red", color: "white"}}>Login</Button>
            </form>
        </div>
    )
}