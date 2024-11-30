import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Tooltip,
  Tabs,
  Tab,
  AppBar,
  IconButton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AgentBids from './AgentBids';
import axios from 'axios';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#06b6d4',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const StyledContainer = styled(Paper)(({ theme }) => ({
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  marginTop: '60px',
  height: '87vh',
  overflow: 'auto',
}));

const ImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const ViewPropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [bids, setBids] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [acceptedBidId, setAcceptedBidId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch property details
        const propertyResponse = await axios.get(`http://localhost:3000/api/property-requirements/${propertyId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProperty(propertyResponse.data);

        // Fetch bids for the property
        const bidsResponse = await axios.get(`http://localhost:3000/api/property-requirements/${propertyId}/bids`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBids(bidsResponse.data);
      } catch (error) {
        console.error('Error fetching property and bids:', error);
      }
    };

    fetchData();
  }, [propertyId]);

  if (!property) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleAcceptBid = (agentId) => {
    setAcceptedBidId(agentId);
  };

  const handleUndoAcceptBid = () => {
    setAcceptedBidId(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, padding: '20px' }}>
          <StyledContainer>
            <Box mb={4} display="flex" alignItems="center">
              <IconButton color="primary" onClick={() => window.history.back()}>
                <ArrowBackIcon />
              </IconButton>
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
                  paddingLeft: '500px',
                  borderRadius: '10px',
                }}
              >
                Property Details for {property.title}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              
  <ImageContainer>
    {property.imageFile ? (
      <img 
        src={`http://localhost:3000/${property.imageFile}`}
        alt={property.title}
        style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0px 0px 10px #bebebe' }}
      />
    ) : (
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: `linear-gradient(to right, #2563eb, #06b6d4)`, // Replace with your primary and secondary colors
          borderRadius: '8px',
          boxShadow: '0px 0px 10px #bebebe',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
            ...No Image Available...
        </Typography>
      </Box>
    )}
  </ImageContainer>
</Grid>
              <Grid item xs={12} sm={8}>
                <Paper sx={{ padding: '20px', boxShadow: '0px 0px 20px #bebebe' }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {property.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {property.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Tooltip title="Location">
                        <Typography variant="h6" fontWeight="bold">
                          <LocationOnIcon /> Location
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2" color="textSecondary">
                        {property.city}, {property.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Price">
                        <Typography variant="h6" fontWeight="bold">
                          <AttachMoneyIcon /> Price
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2" color="textSecondary">
                        ${property.price.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Bedrooms">
                        <Typography variant="h6" fontWeight="bold">
                          <BedIcon /> Bedrooms
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2" color="textSecondary">
                        {property.bedrooms}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Bathrooms">
                        <Typography variant="h6" fontWeight="bold">
                          <BathtubIcon /> Bathrooms
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2" color="textSecondary">
                        {property.bathrooms}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Box mt={4}>
              <AppBar position="static" color="default">
                <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                  <Tab label="Property Specifications" />
                  <Tab label="Contact Details" />
                </Tabs>
              </AppBar>
              <Box p={3}>
                {tabIndex === 0 && (
                  <Paper sx={{ padding: '20px', boxShadow: '0px 0px 20px #bebebe' }}>
                    <Typography variant="h6">Property Specifications</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Role:</strong> {property.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Plot Number:</strong> {property.plotNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Type:</strong> {property.propertyType}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Area:</strong> {property.areaSize} {property.areaSizeUnit}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Features:</strong> {property.additionalFeatures}
                    </Typography>
                  </Paper>
                )}
                {tabIndex === 1 && (
                  <Paper sx={{ padding: '20px', boxShadow: '0px 0px 20px #bebebe' }}>
                    <Typography variant="h6">Contact Details</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Email:</strong> {property.emailAddress}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Phone:</strong> {property.phoneNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Landline:</strong> {property.landline}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      <strong>Preferred Contact Method:</strong> {property.contactMethod}
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>

            <AgentBids
              bids={bids}
              acceptedBidId={acceptedBidId}
              handleAcceptBid={handleAcceptBid}
              handleUndoAcceptBid={handleUndoAcceptBid}
            />
          </StyledContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ViewPropertyDetails;