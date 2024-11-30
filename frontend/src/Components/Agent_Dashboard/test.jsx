import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Avatar, TextField, Button, Box, Paper } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material'; // Importing individual icons used in TextField and Typography

// Importing additional icons used in the component
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
// import CertificateIcon from '@mui/icons-material/Certificate';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; // Icon for License Number
import BookIcon from '@mui/icons-material/Book'; // Icon for Specialization
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Icon for Mission Statement
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Icon for Certification

import Navbar from './Navbar';
import SettingPanel from './settingpanel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

const ButtonContainer = styled(Paper)(({ theme }) => ({
  width: '300px',
  padding: '20px',
  margin: 'auto',
  marginTop: '40px',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0)',
  borderRadius: '20px',
  '& .MuiButton-root': {
    marginBottom: '10px',
    border: '2px solid transparent',
    borderRadius: '20px',
    color: 'white',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ProfileContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.2)',
  },
  marginTop: '40px',
});

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  borderRadius: '20px',
}));

const Agent_Profile = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
  const [location, setLocation] = useState('New York, USA');
  const [avatarUrl, setAvatarUrl] = useState('/path/to/avatar.jpg');

  const [formState, setFormState] = useState({
    mobile: '',
    landline: '',
    whatsapp: '',
    city: '',
    address: '',
    yearsOfExperience: '',
    specialization: '',
    agency: '',
    licenseNumber: '',
    certifications: '',
    missionStatement: '',
    cnicFront: null,
    cnicBack: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name in formState.socialMediaLinks) {
      setFormState({
        ...formState,
        socialMediaLinks: {
          ...formState.socialMediaLinks,
          [name]: value,
        },
      });
    } else {
      setFormState({
        ...formState,
        [name]: files ? files[0] : value,
      });
    }
  };

  const validateForm = () => {
    // Validation logic
    // ...
    return true;
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3000/api/public/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
          } else {
            console.error ('Error fetching user data:', response.status);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = () => {
    if (validateForm()) {
      // Form submission logic here
      toast.success('Changes Saved Successfully');
    }
    setIsEditingName(false);
    setIsEditingLocation(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
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
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <SettingPanel />
              </Grid>

              <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ProfileContainer>
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
                    User Profile
                  </Typography>

                  <Grid container spacing={0} alignItems="center" paddingTop={3}>
                    <GradientPaper style={{ padding: '20px', marginBottom: '20px', width: '100%' }}>
                      <Grid container spacing={3} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={3} sx={{ textAlign: 'center', marginLeft: '0.1px' }}>
                          <Avatar
                            alt="User Avatar"
                            src={avatarUrl}
                            sx={{ width: '100px', height: '100px', margin: 'auto' }}
                          />
                          <label htmlFor="avatarInput">
                            <input
                              accept="image/*"
                              id="avatarInput"
                              type="file"
                              style={{ display: 'none' }}
                              onChange={handleAvatarChange}
                            />
                            <Button variant="text" component="span" startIcon={<PhotoCameraIcon />} fullWidth>
                              Change Avatar
                            </Button>
                          </label>
                        </Grid>

                        <Grid item xs={12} md={9} container direction="column" alignItems="center">
                          {isEditingName ? (
                            <TextField
                              fullWidth
                              label="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              InputProps={{
                                endAdornment: (
                                  <Button
                                    variant="text"
                                    onClick={handleSaveChanges}
                                    startIcon={<SaveIcon />}
                                    sx={{
                                      transition: 'transform 0.2s',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                      },
                                    }}
                                  >
                                    Save
                                  </Button>
                                ),
                              }}
                            />
                          ) : (
                            <Typography variant="h5" gutterBottom>
                              {name}
                              <EditIcon
                                fontSize="small"
                                sx={{
                                  verticalAlign: 'bottom',
                                  marginLeft: '5px',
                                  transition: 'transform 0.2s',
                                  color: '#1976D2',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                  },
                                }}
                                onClick={() => setIsEditingName(true)}
                              />
                            </Typography>
                          )}

                          {isEditingLocation ? (
                            <TextField
                              fullWidth
                              label="Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              InputProps={{
                                endAdornment: (
                                  <Button
                                    variant="text"
                                    onClick={handleSaveChanges}
                                    startIcon={<SaveIcon />}
                                    sx={{
                                      transition: 'transform 0.2s',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                      },
                                    }}
                                  >
                                    Save
                                  </Button>
                                ),
                              }}
                            />
                          ) : (
                            <Grid container spacing={1} alignItems="center" justifyContent="center">
                              <Grid item>
                                <LocationOnIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">
                                  {location}
                                  <EditIcon
                                    fontSize="small"
                                    sx={{
                                      verticalAlign: 'bottom',
                                      marginLeft: '5px',
                                      transition: 'transform 0.2s',
                                      color: '#1976D2',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                      },
                                    }}
                                    onClick={() => setIsEditingLocation(true)}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                          )}

<Grid container spacing={1} alignItems="center" justifyContent="center">
  <Grid item>
    <EmailIcon />
  </Grid>
  <Grid item>
    <Typography variant="body1">{email}</Typography> {/* Display the email */}
  </Grid>
</Grid>
                        </Grid>
                      </Grid>
                    </GradientPaper>

                    <GradientPaper style={{ padding: '20px', marginBottom: '20px', width: '100%' }}>
                      <Typography variant="h6" gutterBottom align="center">
                        Additional Information
                      </Typography>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Mobile"
                            name="mobile"
                            value={formState.mobile}
                            onChange={handleChange}
                            error={!!errors.mobile}
                            helperText={errors.mobile}
                            InputProps={{
                              startAdornment: <PhoneAndroidIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Landline"
                            name="landline"
                            value={formState.landline}
                            onChange={handleChange}
                            error={!!errors.landline}
                            helperText={errors.landline}
                            InputProps={{
                              startAdornment: <PhoneIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Whatsapp"
                            name="whatsapp"
                            value={formState.whatsapp}
                            onChange={handleChange}
                            error={!!errors.whatsapp}
                            helperText={errors.whatsapp}
                            InputProps={{
                              startAdornment: <WhatsAppIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formState.city}
                            onChange={handleChange}
                            error={!!errors.city}
                            helperText={errors.city}
                            InputProps={{
                              startAdornment: <LocationOnIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formState.address}
                            onChange={handleChange}
                            multiline
                            rows={2}
                            error={!!errors.address}
                            helperText={errors.address}
                            InputProps={{
                              startAdornment: <HomeIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Years of Experience"
                            name="yearsOfExperience"
                            type="number"
                            value={formState.yearsOfExperience}
                            onChange={handleChange}
                            error={!!errors.yearsOfExperience}
                            helperText={errors.yearsOfExperience}
                            InputProps={{
                              startAdornment: <WorkIcon color="primary" sx={{ marginRight: '15px' }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="License Number"
                            name="licenseNumber"
                            value={formState.licenseNumber}
                            onChange={handleChange}
                            error={!!errors.licenseNumber}
                            helperText={errors.licenseNumber}
                            InputProps={{
                              startAdornment: <AssignmentIndIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Agency"
                            name="agency"
                            value={formState.agency}
                            onChange={handleChange}
                            error={!!errors.agency}
                            helperText={errors.agency}
                            multiline
                            rows={2}
                            InputProps={{
                              startAdornment: <BusinessIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Specialization"
                            name="specialization"
                            value={formState.specialization}
                            onChange={handleChange}
                            error={!!errors.specialization}
                            helperText={errors.specialization}
                            multiline
                            rows={2}
                            InputProps={{
                              startAdornment: <BookIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Certifications"
                            name="certifications"
                            value={formState.certifications}
                            onChange={handleChange}
                            multiline
                            rows={2}
                            error={!!errors.certifications}
                            helperText={errors.certifications}
                            InputProps={{
                               startAdornment: <VerifiedUserIcon color="primary" sx={{ marginRight: '15px' }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Mission Statement"
                            name="missionStatement"
                            value={formState.missionStatement}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            error={!!errors.missionStatement}
                            helperText={errors.missionStatement}
                            InputProps={{
                              startAdornment: <LightbulbIcon color="primary" sx={{ marginRight: '15px' }}/>,
                            }}
                          />
                        </Grid>
                       
                        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px', marginLeft: '4px' }}>
                          <Grid item xs={12} sm={6}>
                            <label htmlFor="cnicFrontInput">
                              <div
                                style={{
                                  border: '2px dashed #ccc',
                                  padding: '20px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  transition: 'border-color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1976D2')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#ccc')}
                              >
                                Upload CNIC Front
                                <br />
                                <input
                                  accept="image/*"
                                  id="cnicFrontInput"
                                  type="file"
                                  name="cnicFront"
                                  onChange={handleChange}
                                  style={{ display: 'none' }}
                                />
                              </div>
                            </label>
                            {errors.cnicFront && (
                              <Typography color="error" variant="body2">
                                {errors.cnicFront}
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <label htmlFor="cnicBackInput">
                              <div
                                style={{
                                  border: '2px dashed #ccc',
                                  padding: '20px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  transition: 'border-color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1976D2')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#ccc')}
                              >
                                Upload CNIC Back
                                <br />
                                <input
                                  accept="image/*"
                                  id="cnicBackInput"
                                  type="file"
                                  name="cnicBack"
                                  onChange={handleChange}
                                  style={{ display: 'none' }}
                                />
                              </div>
                            </label>
                            {errors.cnicBack && (
                              <Typography color="error" variant="body2">
                                {errors.cnicBack}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <ButtonContainer>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              style={{ marginTop: '20px' }}
                              onClick={handleSaveChanges}
                            >
                              Submit
                            </Button>
                          </ButtonContainer>
                        </Grid>
                      </Grid>
                    </GradientPaper>
                  </Grid>
                </ProfileContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Agent_Profile;
