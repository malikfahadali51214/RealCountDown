import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
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

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [avatarUrl, setAvatarUrl] = useState('/path/to/avatar.jpg');
  const [formState, setFormState] = useState({
    mobile: '',
    landline: '',
    whatsapp: '',
    city: '',
    address: '',
    cnicFront: null,
    cnicBack: null,
  });

  const [errors, setErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null); // Track avatar file
  const [cnicFrontPreview, setCnicFrontPreview] = useState(null);
const [cnicBackPreview, setCnicBackPreview] = useState(null);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newErrors = { ...errors };
  
    // Instant validation for specific fields
    if (name === 'mobile') {
      const regex = /^[0-9]*$/; // Only allow numbers
      if (!regex.test(value)) {
        newErrors.mobile = 'Invalid mobile number';
      } else {
        newErrors.mobile = value.length === 10 ? '' : 'Mobile number must be 10 digits';
      }
    }
  
    if (name === 'landline') {
      const regex = /^[0-9]*$/; // Only allow numbers
      if (!regex.test(value)) {
        newErrors.landline = 'Invalid landline number';
      } else {
        newErrors.landline = value.length >= 7 && value.length <= 10 ? '' : 'Landline number must be between 7 to 10 digits';
      }
    }
  
    if (name === 'whatsapp') {
      const regex = /^[0-9]*$/; // Only allow numbers
      if (!regex.test(value)) {
        newErrors.whatsapp = 'Invalid whatsapp number';
      } else {
        newErrors.whatsapp = value.length === 10 ? '' : 'Whatsapp number must be 10 digits';
      }
    }
  
    if (name === 'city') {
      const regex = /^[A-Za-z\s]*$/; // Only allow letters and spaces
      if (!regex.test(value)) {
        newErrors.city = 'Invalid city name';
      } else {
        newErrors.city = value ? '' : 'City is required';
      }
    }
  
    if (name === 'address') {
      const regex = /^[A-Za-z0-9\s,.-]*$/; // Allow letters, numbers, spaces, and some special characters
      if (!regex.test(value)) {
        newErrors.address = 'Invalid address format';
      } else {
        newErrors.address = value ? '' : 'Address is required';
      }
    }
  
    setFormState({
      ...formState,
      [name]: files ? files[0] : value,
    });


    // Handle CNIC uploads for previews
  if (name === 'cnicFront' && files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCnicFrontPreview(reader.result); // Set the preview for CNIC Front
    };
    if (file) reader.readAsDataURL(file);
  }

  if (name === 'cnicBack' && files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCnicBackPreview(reader.result); // Set the preview for CNIC Back
    };
    if (file) reader.readAsDataURL(file);
  }

    setErrors(newErrors); // Update errors state dynamically
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

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/; // Assuming mobile number should be 10 digits
    const landlineRegex = /^[0-9]{7,10}$/; // Assuming landline number should be 7 to 10 digits
    const whatsappRegex = /^[0-9]{10}$/; // Assuming whatsapp number should be 10 digits
    const cityRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces for city
    const addressRegex = /^[A-Za-z0-9\s,.-]+$/; // Alphanumeric and some special characters for address
  
    if (!formState.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!mobileRegex.test(formState.mobile)) newErrors.mobile = 'Invalid mobile number';
  
    if (!formState.landline) newErrors.landline = 'Landline number is required';
    else if (!landlineRegex.test(formState.landline)) newErrors.landline = 'Invalid landline number';
  
    if (!formState.whatsapp) newErrors.whatsapp = 'Whatsapp number is required';
    else if (!whatsappRegex.test(formState.whatsapp)) newErrors.whatsapp = 'Invalid whatsapp number';
  
    if (!formState.city) newErrors.city = 'City is required';
    else if (!cityRegex.test(formState.city)) newErrors.city = 'Invalid city name';
  
    if (!formState.address) newErrors.address = 'Address is required';
    else if (!addressRegex.test(formState.address)) newErrors.address = 'Invalid address format';
  
    if (!formState.cnicFront) newErrors.cnicFront = 'CNIC Front is required';
    if (!formState.cnicBack) newErrors.cnicBack = 'CNIC Back is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSaveChanges = async () => {
    if (validateForm()) {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
  
        // Append all form fields to FormData
        formData.append('name', name);
        formData.append('mobile', formState.mobile);
        formData.append('landline', formState.landline);
        formData.append('whatsapp', formState.whatsapp);
        formData.append('city', formState.city);
        formData.append('address', formState.address);
  
        // Append CNIC files if they exist
        if (formState.cnicFront) {
          formData.append('cnicFront', formState.cnicFront);
        }
        if (formState.cnicBack) {
          formData.append('cnicBack', formState.cnicBack);
        }
  
        // Append avatar file if it exists
        if (avatarFile) {
          formData.append('avatar', avatarFile); // Add the avatar file
        }
  
        const response = await fetch('http://localhost:3000/api/public/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (response.ok) {
          toast.success('Changes Saved Successfully');
          setIsEditing(false); // Lock fields
          setAvatarFile(null); // Reset avatar file after saving
          window.location.reload();
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to save changes');
        }
      } catch (error) {
        console.error('Error saving changes:', error);
        toast.error('An error occurred while saving changes');
      }
    }
  };


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // Store the file directly
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Set the preview of the avatar
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(null); // Reset if no file is selected
      setAvatarUrl('/path/to/avatar.jpg'); // Reset to default avatar if needed
    }
  };


  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/public/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();

        // Populate form fields with fetched data
        setFormState({
          mobile: profileData.mobile || '',
          landline: profileData.landline || '',
          whatsapp: profileData.whatsapp || '',
          city: profileData.city || '',
          address: profileData.address || '',
          cnicFront: profileData.cnicFront || '',
          cnicBack: profileData.cnicBack || ''
        });

        setAvatarUrl(profileData.avatar ? `http://localhost:3000/uploads/${profileData.avatar}` : '/path/to/default/avatar.jpg');

      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('An error occurred while fetching profile data');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
              {/* Left Panel (SettingPanel) */}
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <SettingPanel />
              </Grid>

              {/* Right Panel (Profile Form) */}
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
                        {/* Avatar and Change Avatar Button */}

<Grid item xs={12} md={3} sx={{ textAlign: 'center', marginLeft: '0.1px' }}>
  <Avatar
    alt="User  Avatar"
    src={avatarUrl}
    sx={{ width: '100px', height: '100px', margin: 'auto' }}
  >
    {name.charAt(0)} {/* Display the first letter of the user's name */}
  </Avatar>
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
  {avatarFile && (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSaveChanges}
      style={{ marginTop: '10px', width: '100%' }}
    >
      Save Avatar
    </Button>
  )}
</Grid>

                        {/* User Information Section */}
                        <Grid item xs={12} md={9} container direction="column" alignItems="center">
                          {/* Name Editing Section */}
                          <Grid container spacing={1} alignItems="center" justifyContent="center">
                            <Grid item>
                              <Typography variant="h5" gutterBottom>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{
                                      startAdornment: (
                                        <EditIcon />
                                      ),
                                    }}
                                  />
                                ) : (
                                  <span>{name}</span>
                                )}
                              </Typography>
                            </Grid>
                            {isEditing ? null : (
                              <Grid item>
                                <Button variant="text" onClick={() => setIsEditing(true)}>
                                  <EditIcon />
                                </Button>
                              </Grid>
                            )}
                          </Grid>

                          {/* Email Editing Section */}
                          <Grid container spacing={1} alignItems="center" justifyContent="center">
                            <Grid item>
                              <EmailIcon />
                            </Grid>
                            <Grid item>
                              <Typography variant="body1">
                                {email}
                              </Typography>
                            </Grid>
                          </Grid>

                          {/* Location Editing Section */}
                          {/* ... */}
                        </Grid>
                      </Grid>
                    </GradientPaper>

                    <GradientPaper style={{ padding: '20px', marginBottom: '20px', width: '100%' }}>
                      <Typography variant="h6" gutterBottom align="center">
                        Additional Information
                      </Typography>
                      <Grid container spacing={2} justifyContent="center">
                        {/* Mobile and Landline Fields */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Mobile"
                            name="mobile"
                            disabled={!isEditing}
                            value={formState.mobile}
                            onChange={handleChange}
                            error={!!errors.mobile}
                            helperText={errors.mobile}
                            InputProps={{
                              startAdornment: (
                                <PhoneAndroidIcon />
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                cursor: !isEditing ? 'default' : 'text',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Landline"
                            name="landline"
                            disabled={!isEditing}
                            value={formState.landline}
                            onChange={handleChange}
                            error={!!errors.landline}
                            helperText={errors.landline}
                            InputProps={{
                              startAdornment: (
                                <PhoneIcon />
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                cursor: !isEditing ? 'default' : 'text',
                              },
                            }}
                          />
                        </Grid>
                        {/* Whatsapp and City Fields */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Whatsapp"
                            name="whatsapp"
                            disabled={!isEditing}
                            value={formState.whatsapp}
                            onChange={handleChange}
                            error={!!errors.whatsapp}
                            helperText={errors.whatsapp}
                            InputProps={{
                              startAdornment: (
                                <WhatsAppIcon />
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                cursor: !isEditing ? 'default' : 'text',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="City"
                            name="city"
                            disabled={!isEditing}
                            value={formState.city}
                            onChange={handleChange}
                            error={!!errors.city}
                            helperText={errors.city}
                            InputProps={{
                              startAdornment: (
                                <LocationOnIcon />
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                cursor: !isEditing ? 'default' : 'text',
                              },
                            }}
                          />
                        </Grid>
                        {/* Address Field */}
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            disabled={!isEditing}
                            value={formState.address}
                            onChange={handleChange}
                            multiline
                            rows={2}
                            error={!!errors.address}
                            helperText={errors.address}
                            InputProps={{
                              startAdornment: (
                                <HomeIcon />
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                cursor: !isEditing ? 'default' : 'text',
                              },
                            }}
                          />
                        </Grid>

                        {/* Upload CNIC Front and Back */}
                        {/* Upload CNIC Front and Back */}
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
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1976D2'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ccc'}
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
          disabled={!isEditing} // Disable if not editing
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
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1976D2'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ccc'}
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
          disabled={!isEditing} // Disable if not editing
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

<Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px', marginLeft: '4px' }}>
  <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom>
      CNIC Front
    </Typography>
    <div style={{ overflow: 'hidden', maxWidth: '100%', borderRadius: '8px' }}>
      {cnicFrontPreview ? (
        <img 
          src={cnicFrontPreview} 
          alt="CNIC Front Preview" 
          style={{ width: '100%', height: 'auto' }} 
        />
      ) : (
        <img 
          src={`http://localhost:3000/uploads/${formState.cnicFront}`} 
          alt="CNIC Front" 
          style={{ width: '100%', height: 'auto' }} 
        />
      )}
    </div>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom>
      CNIC Back
    </Typography>
    <div style={{ overflow: 'hidden', maxWidth: '100%', borderRadius: '8px' }}>
      {cnicBackPreview ? (
        <img 
          src={cnicBackPreview} 
          alt="CNIC Back Preview" 
          style={{ width: '100%', height: 'auto' }} 
        />
      ) : (
        <img 
          src={`http://localhost:3000/uploads/${formState.cnicBack}`} 
          alt="CNIC Back" 
          style={{ width: '100%', height: 'auto' }} 
        />
      )}
    </div>
  </Grid>
</Grid>

                        {/* Submit or Edit Button */}
                        <Grid item xs={12}>
                          {isEditing ? (
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
                          ) : (
                            <ButtonContainer>
                              <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '20px' }}
                                onClick={() => setIsEditing(true)}
                              >
                                Edit
                              </Button>
                            </ButtonContainer>
                          )}
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

export default UserProfilePage;