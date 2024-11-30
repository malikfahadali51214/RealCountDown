import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Grid, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar'; // Import Navbar component
import SettingPanel from './settingpanel'; // Import SettingPanel component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormContainer = styled(Paper)({
  padding: '30px',
  margin: 'auto',
  width: '100%', // Ensure it takes full width of the grid item
  textAlign: 'center',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  borderRadius: '20px',
  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.2)',
  },
  marginTop: '40px',
});


const ButtonContainer = styled(Paper)(({ theme }) => ({
  width: '300px',
  padding: '20px',
  margin: 'auto',
  marginTop: '40px',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0)',
  borderRadius: '20px', // Rounded corners
  '& .MuiButton-root': {
    marginBottom: '10px',
    border: '2px solid transparent', // Transparent border initially
    borderRadius: '20px', // Rounded corners
    color: 'white', // Black text color
    '&:hover': {
      borderColor: theme.palette.primary.main, // Border color on hover
    },
  },
}));

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  borderRadius: '20px',
}));

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error('New Password and Confirm Password do not match!');

      return;
    }
    // Simulated logic to handle password change
    // Replace with actual logic to update password
    // For demonstration, we just show a success message
    toast.success('Password Changed Successfully');

  };



  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar /> {/* Include Navbar component */}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '50px' }}>
          <Grid container spacing={3}>
            {/* Left Panel (SettingPanel) */}
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <SettingPanel />
            </Grid>

            {/* Right Panel (Change Password Form) */}
            <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormContainer>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  style={{
                    paddingBottom: '30px',
                    color: '#ffffff',
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.80rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '10px',
                  }}
                >
                  Change Password
                </Typography>

                <GradientPaper>
                  <Typography variant="subtitle1" gutterBottom>
                    Enter Old Password
                  </Typography>
                  <TextField
                    label="Old Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />

                  <Typography variant="subtitle1" gutterBottom>
                    Enter New Password
                  </Typography>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <Typography variant="subtitle1" gutterBottom>
                    Confirm New Password
                  </Typography>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </GradientPaper>

                <ButtonContainer>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                    onClick={handlePasswordChange}
                  >
                    Submit
                  </Button>
                </ButtonContainer>
              </FormContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ChangePassword;
