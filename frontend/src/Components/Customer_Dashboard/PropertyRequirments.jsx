import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  Toolbar,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  LocationOn,
  MonetizationOn,
  Home,
  Info,
  ContactMail,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import Navbar from './Navbar'; 
import axios from 'axios';

const defaultTheme = createTheme();

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976D2',
  color: '#ffffff',
  padding: '12px 20px',
  borderRadius: '10px',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: '#1565C0',
    transform: 'scale(1.02)',
  },
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
}));

const NeonLabel = styled(FormControlLabel)(({ theme }) => ({
  width: 'auto',
  padding: '10px 20px',
  borderRadius: '10px',
  backgroundColor: '#f0f0f0',
  margin: '5px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#e0e0e0',
    transform: 'scale(1.02)',
    boxShadow: '0 0 3px #00e5ff, 0 0 3px #00e5ff',
  },
  
  '& .MuiRadio-root': {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
  '& .Mui-checked': {
    '& ~ .MuiFormControlLabel-label': {
      color: '#1976D2',
      fontWeight: 'bold',
    },
  },
}));

const ButtonContainer = styled(Paper)(({ theme }) => ({
  width: '300px',
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

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  borderRadius: '20px',
}));

const areaPricePerUnit = 100; // Example: $100 per square foot
const bedroomPrice = 5000; // Example: $5000 for each bedroom
const bathroomPrice = 3000; // Example: $3000 for each bathroom
const areaConversionFactors = {
  marla: 272.25, // 1 marla = 272.25 sq ft
  sqFt: 1, // 1 sq ft = 1 sq ft
  sqM: 10.7639, // 1 sq m = 10.7639 sq ft
  sqYd: 9, // 1 sq yd = 9 sq ft
  kanal: 5445, // 1 kanal = 5445 sq ft
};

const usdToPkrConversionRate = 280; // Example conversion rate, update as needed

const PropertyRequirements = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    description: '',
    emailAddress: '',
    phoneNumber: '',
    landline: '',
    contactMethod: '',
    role: '',
    city: '',
    location: '',
    plotNumber: '',
    propertyType: '',
    price: '',
    areaSize: '',
    areaSizeUnit: '',
    bedrooms: '',
    bathrooms: '',
    additionalFeatures: '',
    additionalFeaturesList: [],
    readyForPossession: true,
    imageFile: null,
    videoFile: null,
    imageFilePreview: '',
    videoFilePreview: '',
  });

  const [showImagesVideosSection, setShowImagesVideosSection] = useState (false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'phoneNumber':
      case 'landline':
        if (!/^\d+$/.test(value)) {
          error = 'Phone number must contain only digits';
        }
        break;
      case 'emailAddress':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email address is invalid';
        }
        break;
      case 'price':
      case 'areaSize':
      case 'bedrooms':
      case 'bathrooms':
        if (value < 0) {
          error = 'Value cannot be negative';
        } else if (!/^\d+$/.test(value)) {
          error = 'This field must contain only digits';
        }
        break;
      case 'city':
      case 'location':
      case 'plotNumber':
      case 'title':
      case 'description':
        if (!value.trim()) {
          error = 'This field is required';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: file,
          [`${name}Preview`]: reader.result,
        }));
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
      validateField(name, newValue); // Validate field on change
    }

    // Show/hide images and videos section based on role
    if (name === 'role') {
      if (value === 'Seller' || value === 'Renter') {
        setShowImagesVideosSection(true);
      } else {
        setShowImagesVideosSection(false);
      }
    }
  }, []);

  const calculatePredictedPrice = useCallback(() => {
    const areaSizeValue = parseFloat(formData.areaSize) || 0;
    const bedroomsValue = parseInt(formData.bedrooms) || 0;
    const bathroomsValue = parseInt(formData.bathrooms) || 0;
  
    // Convert area size to square feet based on selected unit
    const areaSizeInSqFt = areaSizeValue * (areaConversionFactors[formData.areaSizeUnit] || 1);
  
    const priceInUSD = (areaSizeInSqFt * areaPricePerUnit) +
                       (bedroomsValue * bedroomPrice) +
                       (bathroomsValue * bathroomPrice);
  
    // Convert price from USD to PKR
    const priceInPKR = priceInUSD * usdToPkrConversionRate;
  
    setPredictedPrice(priceInPKR);
  }, [formData.areaSize, formData.bedrooms, formData.bathrooms, formData.areaSizeUnit]);


  useEffect(() => {
    calculatePredictedPrice();
  }, [calculatePredictedPrice]);

  const handleAddFeature = () => {
    if (formData.additionalFeatures.trim() !== '') {
      setFormData((prevState) => ({
        ...prevState,
        additionalFeaturesList: [...prevState.additionalFeaturesList, formData.additionalFeatures.trim()],
        additionalFeatures: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.phoneNumber || !formData.city || !formData.location || !formData.price) {
      toast.error('Please fill out all required fields!');
      return;
    }

    // Additional validation for role and property type
    if (!formData.role) {
      toast.error('Please select a role!');
      return;
    }

    if (!formData.propertyType) {
      toast.error('Please select a property type!');
      return;
    }

    const priceValue = parseFloat(formData.price);
    if (predictedPrice && (priceValue < predictedPrice * 0.9 || priceValue > predictedPrice * 1.1)) {
      toast.error(`Price should be within ±10% of the predicted price: $${predictedPrice.toFixed(2)}`);
      return;
    }

    const formDataToSend = new FormData();

    // Append userId to form data
    const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))._id;
    formDataToSend.append('userId', userId);

    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Ensure readyForPossession is sent as a boolean value
    formDataToSend.append('readyForPossession', formData.readyForPossession.toString()); // Convert boolean to string

    // Append additionalFeaturesList
    formData.additionalFeaturesList.forEach((feature) => {
      formDataToSend.append('additionalFeatures', feature);
    });

    if (formData.imageFile) {
      formDataToSend.append('imageFile', formData.imageFile);
    }

    if (formData.videoFile) {
      formDataToSend.append('videoFile', formData.videoFile);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/property-requirements', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        toast.success('Property requirement created successfully!');
        resetFormData();
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Failed to create property requirement!');
    }
  };

  const resetFormData = () => {
    setFormData({
      fullName: '',
      title: '',
      description: '',
      emailAddress: '',
      phoneNumber: '',
      landline: '',
      contactMethod: '',
      role: '',
      city: '',
      location: '',
      plotNumber: '',
      propertyType: '',
      price: '',
      areaSize: '',
      areaSizeUnit: '',
      bedrooms: '',
      bathrooms: '',
      additionalFeatures: '',
      additionalFeaturesList: [],
      readyForPossession: true,
      imageFile: null,
      videoFile: null,
      imageFilePreview: '',
      videoFilePreview: '',
    });
    setShowImagesVideosSection(false);
    setErrors({});
    setPredictedPrice(null); // Reset predicted price
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token is missing');
        return;
      }

      const response = await axios.get('http://localhost:3000/api/public/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userProfile = response.data;
        console.log('User  Profile:', userProfile);

        // Check if all required fields are filled
        const requiredFields = ['mobile', 'landline', 'whatsapp', 'city', 'address', 'name'];
        const isProfileComplete = requiredFields.every((field) => userProfile[field] !== null && userProfile[field] !== undefined && userProfile[field] !== '');

        console.log('Is Profile Complete:', isProfileComplete);
        setIsProfileComplete(isProfileComplete);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to fetch user profile!');
    }
  };

  useEffect(() => {
    fetchUserProfile();
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
          <Toolbar />
          <Grid container justifyContent="center" style={{ minHeight: '100vh', padding: '20px' }}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <GradientPaper elevation={5} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  style={{
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
                  Property Requirement Form
                </Typography>

                <form onSubmit={handleSubmit}>
                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <PersonIcon color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Select Role
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <RadioGroup aria-label="role" name="role" value={formData.role} onChange={handleChange} row>
                          <NeonLabel value="Buyer" control={<Radio />} label="Buyer" />
                          <NeonLabel value="Seller" control={<Radio />} label="Seller" />
                          <NeonLabel value="Tenant" control={<Radio />} label="Tenant" />
                          <NeonLabel value="Renter " control={<Radio />} label="Renter" />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </GradientPaper>

                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <CategoryIcon color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Property Type
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <RadioGroup aria-label="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} row>
                          <NeonLabel value="house" control={<Radio />} label="House" />
                          <NeonLabel value="flat" control={<Radio />} label="Flat" />
                          <NeonLabel value="upperPortion" control={<Radio />} label="Upper Portion" />
                          <NeonLabel value="lowerPortion" control={<Radio />} label="Lower Portion" />
                          <NeonLabel value="farmHouse" control={<Radio />} label="Farm House" />
                          <NeonLabel value="room" control={<Radio />} label="Room" />
                          <NeonLabel value="pentHouse" control={<Radio />} label="Pent House" />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </GradientPaper>

                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <LocationOn color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Location
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={14}>
                        <TextField required label="City" name="city" fullWidth variant="outlined" onChange={handleChange} value={formData.city} error={!!errors.city} helperText={errors.city} />
                      </Grid>
                      <Grid item xs={12} sm={14}>
                        <TextField required label="Location" name="location" fullWidth variant="outlined" onChange={handleChange} value={formData.location} error={!!errors.location} helperText={errors.location} />
                      </Grid>
                      <Grid item xs={12} sm={14}>
                        <TextField label="Plot Number" name="plotNumber" fullWidth variant="outlined" onChange={handleChange} value={formData.plotNumber} error={!!errors.plotNumber} helperText={errors.plotNumber} />
                      </Grid>
                    </Grid>
                  </GradientPaper>


                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <Home color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Features and Amenities
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="bedrooms"
                          name="bedrooms"
                          label="Bedrooms"
                          type="number"
                          fullWidth
                          variant="outlined"
                          value={formData.bedrooms}
                          onChange={handleChange}
                          error={!!errors.bedrooms}
                          helperText={errors.bedrooms}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="bathrooms"
                          name="bathrooms"
                          label="Bathrooms"
                          type="number"
                          fullWidth
                          variant="outlined"
                          value={formData.bathrooms}
                          onChange={handleChange}
                          error={!!errors.bathrooms}
                          helperText={errors.bathrooms}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="additionalFeatures"
                          name="additionalFeatures"
                          label="Add additional features (e.g., parking spaces, waste disposal, internet)"
                          fullWidth
                          variant="outlined"
                          value={formData.additionalFeatures}
                          onChange={handleChange}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddFeature}
                          style={{ marginTop: '10px' }}
                        >
                          Add+
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        {formData.additionalFeaturesList && formData.additionalFeaturesList.length > 0 && (
                          <div>
                            <Typography variant="subtitle1" gutterBottom>
                              Additional Features Added:
                            </Typography>
                            {formData.additionalFeaturesList.map((feature, index) => (
                              <Typography key={index} variant="body1">
                                {feature}
                              </Typography>
                            ))}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </GradientPaper>



                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <MonetizationOn color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Price and Area
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="areaSize"
                          name="areaSize"
                          label="Area Size"
                          fullWidth
                          type="number"
                          variant="outlined"
                          onChange={handleChange}
                          value={formData.areaSize}
                          error={!!errors.areaSize}
                          helperText={errors.areaSize}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="area-size-unit-label">Unit</InputLabel>
                          <Select
                            labelId="area-size-unit-label"
                            id="areaSizeUnit"
                            name="areaSizeUnit"
                            value={formData.areaSizeUnit}
                            onChange={handleChange}
                            label="Unit"
                          >
                            <MenuItem value="marla">Marla</MenuItem>
                            <MenuItem value="sqFt"> Sq. Ft.</MenuItem>
                            <MenuItem value="sqM">Sq. M.</MenuItem>
                            <MenuItem value="sqYd">Sq. Yd.</MenuItem>
                            <MenuItem value="kanal">Kanal</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="price"
                          name="price"
                          label="Price"
                          fullWidth
                          type="number"
                          variant="outlined"
                          onChange={handleChange}
                          value={formData.price}
                          error={ 
!!errors.price}
                          helperText={errors.price}
                        />
                      </Grid>



                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.readyForPossession}
                              onChange={handleChange}
                              name="readyForPossession"
                              color="primary"
                            />
                          }
                          label="Ready for Possession"
                        />
                      </Grid>
                    </Grid>
                    {formData.areaSizeUnit ? (
  predictedPrice ? (
    <Typography variant="body1" style={{ marginTop: '20px', color: 'green' }}>
      Predicted Price: ₨{predictedPrice.toFixed(2)}
    </Typography>
  ) : (
    <Typography variant="body1" style={{ marginTop: '20px', color: 'gray' }}>
      Predicted Price will be displayed here
    </Typography>
  )
) : (
  <Typography variant="body1" style={{ marginTop: '20px', color: 'gray' }}>
    Please select an area size unit to see the predicted price.
  </Typography>
)}

                  </GradientPaper>



                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <Info color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Ad Information
                        
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField required id="title" name="title" label="Title" fullWidth variant="outlined" onChange={handleChange} value={formData.title} error={!!errors.title} helperText={errors.title} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField id="description" name="description" label="Description" fullWidth multiline rows={4} variant="outlined" onChange={handleChange} value={formData.description} error={!!errors.description} helperText={errors.description} />
                      </Grid>
                    </Grid>
                  </GradientPaper>

                  {showImagesVideosSection && (
                    <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item>
                          <VideoIcon color="primary" />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                            Property Images and Videos
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          {formData.imageFilePreview && (
                            <img src={formData.imageFilePreview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '10px' }} />
                          )}
                          <input
                            accept="image/*"
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="imageFile">
                            <div
                              style={{
                                border: '2px dashed #ccc',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                transition: 'border-color 0.3s',
                                height: '70px',
                                lineHeight: '30px',
                                marginTop: '10px',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1976D2'}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ccc'}
                            >
                              Upload Image
                            </div>
                          </label>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {formData.videoFilePreview && (
                            <video controls style={{ width: '100%', maxHeight: '300px', marginBottom: '10px' }}>
                              <source src={formData.videoFilePreview} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          <input
                            accept="video/*"
                            id="videoFile"
                            name="videoFile"
                            type="file"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="videoFile">
                            <div
                              style={{
                                border: '2px dashed #ccc',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                transition: 'border-color 0.3s',
                                height: '70px',
                                lineHeight: '30px',
                                marginTop: '10px',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1976D2'}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ccc'}
                            >
                              Upload Video
                            </div>
                          </label>
                        </Grid>
                      </Grid>
                    </GradientPaper>
                  )}

                  <GradientPaper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item>
                        <ContactMail color="primary" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                          Contact Information
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField required label="Landline" name="landline" fullWidth variant="outlined" onChange={handleChange} value={formData.landline} error={!!errors.landline} helperText={errors.landline} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField required label 
                        ="Email Address" name="emailAddress" fullWidth variant="outlined" onChange={handleChange} value={formData.emailAddress} error={!!errors.emailAddress} helperText={errors.emailAddress} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField required label="Phone Number" name="phoneNumber" fullWidth variant="outlined" onChange={handleChange} value={formData.phoneNumber} error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="contact-method-label">Preferred Contact Method</InputLabel>
                          <Select
                            labelId="contact-method-label"
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                          >
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="phone">Phone</MenuItem>
                            <MenuItem value="landline">Landline</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </GradientPaper>

                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonContainer>
                      {!isProfileComplete && (
                        <Typography variant="body1" color="error" style={{ marginBottom: '10px', textAlign: 'center' }}>
                          Complete Profile First
                        </Typography>
                      )}
                      <StyledButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={!isProfileComplete}
                      >
                        Submit
                      </StyledButton>
                    </ButtonContainer>
                  </Box>
                </form>
              </GradientPaper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PropertyRequirements;