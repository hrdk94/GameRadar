import { useEffect, useState } from 'react';
import { Menu, MenuItem, Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.name) {
      setUsername(userData.name);
    }
  }, []);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert("Logged out");
    handleMenuClose();
    navigate('/login');  // ✅ Redirect to login page
  };
  
  const handleAboutUs = () =>{
    handleMenuClose();
    navigate('/about');
  }

  const handleAccount =()=>{
    alert("To be added Later");
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#191308',
      color: '#fff'
    }}>
      <Typography variant="h5" style={{ color: '#2966acff', fontWeight: 'bold' }}>
        GameRadar
      </Typography>

      <div>
        <Button 
          startIcon={<AccountCircleIcon />} 
          style={{ color: '#fff', textTransform: 'none' }} 
          onClick={handleMenuOpen}
        >
          {username}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleAccount}> Account Settings </MenuItem>
          <MenuItem onClick={handleAboutUs}> About US! </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
