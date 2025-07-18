import { useEffect, useState } from 'react';
import { Menu, MenuItem, Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("testUser"); //by default
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
    navigate('/login');  // Redirect to login page
  };
  
  const handleAboutUs = () =>{
    handleMenuClose();
    navigate('/about'); // Redirect to about page
  }

  const handleAccount =()=>{
    alert("To be added Later"); // need to add later 
  };

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#191308',
      color: '#fff'
    }}>
      <Typography variant="h5" style={{ color: '#1976d2', fontWeight: 'bold' }}>
        GameRadar
      </Typography>

      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

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
          <MenuItem onClick={handleAboutUs}> About Us! </MenuItem>
          <MenuItem onClick={handleLogout}> Logout </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
