import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Grid, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from './Navbar'; // Import Navbar component
import SettingPanel from './settingpanel'; // Import SettingPanel component

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

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateNewPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatePasswordMatch = (newPassword, confirmPassword) => newPassword === confirmPassword;

  const handlePasswordChange = async () => {
    const newErrors = {};
    
    // Validate new password
    if (newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.";
    }
    
    // Check if new password is the same as old password
    if (newPassword === oldPassword) {
      newErrors.newPassword = "New password cannot be the same as the old password.";
    }
    
    // Validate password match
    if (!validatePasswordMatch(newPassword, confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/public/change-password', { // Update the URL as necessary
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is correctly stored
        },
 body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();
      console.log('API Response:', data); // Log the response to debug

      if (response.ok) {
        toast.success(data.message);
        // Optionally, navigate to another page or reset the form
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password!');
    }
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
                    type={showOldPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle old password visibility"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            edge="end"
                          >
                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Typography variant="subtitle1" gutterBottom>
                    Enter New Password
                  </Typography>
                  <TextField
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (!validateNewPassword(e.target.value)) {
                        setErrors((prevErrors) => ({ ...prevErrors, newPassword: "New password must be at least 8 characters long and include uppercase, lowercase, digit, and special character." }));
                      } else if (e.target.value === oldPassword) {
                        setErrors((prevErrors) => ({ ...prevErrors, newPassword: "New password cannot be the same as the old password." }));
                      } else {
                        setErrors((prevErrors) => ({ ...prevErrors, newPassword: null }));
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle new password visibility"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={errors.newPassword ? true : false}
                    helperText={errors.newPassword}
                  />

                  <Typography variant="subtitle1" gutterBottom>
                    Confirm New Password
                  </Typography>
                  <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    margin 
                    ="normal"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value !== newPassword) {
                        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match." }));
                      } else {
                        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: null }));
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword}
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

export default ChangePasswordPage;