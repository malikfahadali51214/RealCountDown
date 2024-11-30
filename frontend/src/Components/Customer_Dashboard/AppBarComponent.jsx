// frontend/AppBarComponent.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Slide, TextField, Avatar, Box, Paper, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Define the drawer width
const drawerWidth = 240;

// Create a styled AppBar component
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Define the AppBarComponent
const AppBarComponent = ({ drawerOpen }) => {
  // Initialize state variables
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState(''); // State to store username
  const [userEmail, setUserEmail] = useState(''); // State to store user email

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        if (token) {
          // Make a GET request to the API endpoint to fetch user data
          const response = await fetch('http://localhost:3000/api/public/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            // Parse the response data as JSON
            const data = await response.json();
            // Update the state variables with the fetched data
            setUserName(data.name);
            setUserEmail(data.email);
          } else {
            // Handle error (e.g., unauthorized)
            console.error('Error fetching user data:', response.status);
          }
        }
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Handle search toggle
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // Handle profile toggle
  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar 
        position="absolute" 
        open={drawerOpen}
        sx={{
          background: 'linear-gradient(to right, #e0e0e0, #f8f8f8 30%)',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: 0,
          borderBottom: '0.5px solid #ccc',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
          padding: '0 16px'
        }}
      >
        <Toolbar 
          sx={{ 
            pr: '24px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
            position: 'relative' 
          }}
        >
          
          {/* Placeholder for left section */}
          <div style={{ width: '200px' }}></div>
          
          {/* Logo container, positioned centrally */}
          <Typography 
            component="h1" 
            variant="h6" 
            color="inherit" 
            noWrap 
            sx={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)',
              flexGrow: 1, 
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            <Link to='/' style={{ textDecoration: 'none', color: '#333' }}>
              <span className='logo'>RealCountdown</span>
            </Link>
          </Typography>

          {/* Search icon and bar */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '20 px', position: 'relative' }}>
            <IconButton color="inherit" onClick={handleSearchToggle} sx={{ position: 'relative', zIndex: 2 }}>
              <SearchIcon sx={{ color: '#555' }} />
            </IconButton>
            <Slide direction="down" in={searchOpen} mountOnEnter unmountOnExit>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search By ID"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: searchOpen ? '200px' : '0px',
                  transition: 'width 0.4s ease-in-out',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ddd',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#aaa',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '8px 14px',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#333',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                  },
                }}
              />
            </Slide>
          </div>

          {/* Profile picture and username inside a rounded oval container */}
          <Box 
            sx={{ 
                position: 'relative',
                display: 'flex', 
                alignItems: 'center', 
                marginLeft: '20px',
                padding: '2px 4px',
                borderRadius: '25px',
                transition: 'border-color 0.3s ease',  // Smooth transition for border color change
                cursor: 'pointer',
                border: '1px solid transparent',  // Start with a transparent border
                '&:hover': {
                  border: '1px solid #4a90e2',  // Change border color on hover
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',  // Optional: add a subtle box-shadow
                }
            
            }}
            onClick={handleProfileToggle}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: '#f1f1f1',
                padding: '6px 14px',
                borderRadius: '20px',
              }}
            >
              <Typography 
                variant ="subtitle1" 
                sx={{ 
                  color: '#333', 
                  fontWeight: 500,
                  fontFamily: 'Roboto, sans-serif',
                  marginRight: '10px'
                }}
              >
                {userName} {/* Display the fetched username */}
              </Typography>
              <Avatar 
                alt="Profile Picture" 
                src={userName ? undefined : "/path/to/profile-pic.jpg"} 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  }
                }} 
              >
                {userName ? <span>{userName.charAt(0).toUpperCase()}</span> : ''}
              </Avatar>
            </Box>

            {/* Profile details panel */}
            <Slide 
              direction="down" 
              in={profileOpen} 
              mountOnEnter 
              unmountOnExit
              timeout={400} // Adjust the timeout as needed for smoother transition
            >
              <Paper 
                elevation={4} 
                sx={{ 
                  position: 'absolute', 
                  top: '105%', // Position the profile details below the username box
                  right: '0%', 
                  transform: 'translateX(-50%)',
                  width: '260px',
                  padding: '20px',
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  zIndex: 1000,
                  textAlign: 'center',
                  transition: 'opacity 0.3s ease-in-out' // Smooth opacity transition
                }}
              >
                <Avatar 
                  alt="Profile Picture" 
                  src={userName ? undefined : "/path/to/profile-pic.jpg"} // Use the profile picture only if userName is not available
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    margin: '0 auto',
                  }} 
                >
                  {userName ? <span>{userName.charAt(0).toUpperCase()}</span> : ''}
                </Avatar>
                <Typography variant="h6" sx={{ marginBottom: '5px' }}>{userName}</Typography>
                <Typography variant="body2" sx={{ color: '#666', marginBottom: '15px' }}>
                  {userEmail ? userEmail : 'Email not available'} {/* Display the fetched email or a fallback message */}
                </Typography>
                <Link to="/customer-dashboard/customer-profile" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outlined" // Use outlined variant for border styling
                    color="primary" 
                    sx={{ 
                      border: '1px solid #4a90e2', // Neon-like border color
                      color: '#4a90e2', // Text color
                      '&:hover': {
                        color: '#333', // Hover text color
                        borderColor: '#333', // Hover border color
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Optional: add a subtle box-shadow on hover
                      },
                      '& .MuiButton-label': {
                        textTransform: 'none', // Ensure button text is not transformed
                      }
                    }}
                  >
                    Account Settings
                  </Button>
                </Link>
              </Paper>
            </Slide>

          </Box>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default AppBarComponent;