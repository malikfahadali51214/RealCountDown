import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

// Define a custom theme
const theme = createTheme({
  palette: {
    text: {
      primary: '#000000', // Black text color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Customize font family
  },
});

// Styled Paper component with custom styles
const PanelContainer = styled(Paper)(({ theme }) => ({
  width: '300px',
  padding: '20px',
  margin: 'auto',
  marginTop: '40px',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  border: '2px solid #e0e0e0', // Custom border
  borderRadius: '20px', // Rounded corners
  '& .MuiButton-root': {
    marginBottom: '10px',
    border: '2px solid transparent', // Transparent border initially
    borderRadius: '20px', // Rounded corners
    color: theme.palette.text.primary, // Black text color
    backgroundColor: 'transparent', // Transparent background
    '&:hover': {
      borderColor: theme.palette.primary.main, // Border color on hover
      backgroundColor: 'transparent', // Ensure no background color on hover
    },
  },
}));

const SettingPanel = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <PanelContainer>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => navigate('/agent-dashboard/agent-profile')}
          >
            User Profile
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth 
            onClick={() => navigate('/agent-dashboard/preview-profile')}
          >
            Preview Profile
          </Button>

          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth 
            onClick={() => navigate('/agent-dashboard/change-password')}
          >
            Change Password
          </Button>

        </PanelContainer>
      </Box>
    </ThemeProvider>
  );
};

export default SettingPanel;
