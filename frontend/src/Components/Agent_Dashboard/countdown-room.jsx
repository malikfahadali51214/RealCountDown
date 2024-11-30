import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Modal,
  TextField,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Bed as BedIcon, Bathtub as BathtubIcon, SquareFoot as SquareFootIcon } from '@mui/icons-material';
import Navbar from './Navbar';
import FilterSection from './FilterSection';
import axios from 'axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; 
import { toast } from 'react-toastify'; 

const ProfileContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '40px',
  width: '100%',
  borderRadius: '20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.2)',
  },
  marginTop: '20px',
});

const ButtonContainer = styled(Paper)(({ theme }) => ({
  width: '200px',
  margin: '0',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0)',
  borderRadius: '20px',
  '& .MuiButton-root': {
    border: '2px solid transparent',
    borderRadius: '20px',
    color: 'black',
    borderColor: theme.palette.primary.main,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '20px 0',
  padding: '20px',
  borderRadius: '15px',
  width: '150%',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'linear-gradient(to right, #dfe9f3, #f7f9fb)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  height: '300px',
}));

const ImageBox = styled(Box)(({ theme }) => ({
  flex: '1 1 30%',
  marginRight: '20px',
  position: 'relative',
  height: '100%',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    objectFit: 'cover',
    display: 'block',
  },
  '& .watermark': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '24px',
    fontWeight: 'bold',
  },
}));

const DetailsBox = styled(Box)(({ theme }) => ({
  flex: '1 1 70%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const TitleContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
});

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

const BidModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const BidBox = styled(Paper) ({
  padding: '30px',
  borderRadius: '15px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
});

const BidIconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
});

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [openBidModal, setOpenBidModal] = useState(false);
  const [bidPercentage, setBidPercentage] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/property-requirements/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (Array.isArray(response.data)) {
          const validProperties = response.data.filter(property => property.timerEnd !== null);
          setProperties(validProperties);
          const timeRemaining = validProperties.reduce((acc, property) => {
            acc[property._id] = Math.max(0, new Date(property.timerEnd) - new Date());
            return acc;
          }, {});
          setRemainingTime(timeRemaining);
        } else {
          console.error('Expected an array but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
    
    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => {
        const updatedTime = { ...prevTime };
        Object.keys(updatedTime).forEach(id => {
          updatedTime[id] = Math.max(0, updatedTime[id] - 1000);
        });
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const cityCounts = properties.reduce((acc, property) => {
      if (!acc[property.city]) {
        acc[property.city] = { listings: 0 };
      }
      acc[property.city].listings += 1;
      return acc;
    }, {});

    const citiesArray = Object.keys(cityCounts).map((cityName) => ({
      name: cityName,
      listings: cityCounts[cityName].listings,
    }));

    setCities(citiesArray);
    setFilteredCities(citiesArray);
  }, [properties]);

  useEffect(() => {
    if (selectedFilter) {
      const filtered = cities.filter((city) => {
        return properties.some((property) => property.city === city.name && property.role === selectedFilter);
      });
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  }, [selectedFilter, properties, cities]);

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    setSelectedCity('');
  };

  const handleCityFilter = (city) => {
    setSelectedCity(city);
  };

  const handleResetFilters = () => {
    setSelectedFilter('');
    setSelectedCity('');
  };

  const handleBid = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setOpenBidModal(true);
  };

  const handleBidSubmit = async () => {
    if (bidPercentage && bidPercentage > 0 && bidPercentage <= 100) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/bids', {
          propertyId: selectedPropertyId,
          bidAmount: bidPercentage,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success(response.data.message);
        setOpenBidModal(false);
        setBidPercentage('');
      } catch (error) {
        console.error('Error submitting bid:', error);
        toast.error('Failed to submit bid.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please enter a valid bid percentage');
    }
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
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
        <Grid container justifyContent="center">
          <FilterSection
            cities={filteredCities}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilter}
            onCityFilterChange={handleCityFilter}
            onResetFilters={handleResetFilters}
          />
          <ProfileContainer>
            <Grid item xs={12} sm={10} md={8}>
              {properties.length === 0 ? (
                <Typography variant="h6" color="textSecondary" align="center">
                  No properties found for the selected filters.
                </Typography>
              ) : (
                properties.map((property) => (
                  <StyledPaper key={property._id}>
                    <ImageBox>
                      {property.imageFile ? (
                        <img src={`http://localhost:3000/${property.imageFile}`} alt="Property" />
                      ) : (
                        <Box className="watermark">No Image Available</Box>
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '3px',
                          zIndex: 1,
                        }}
                      >
                        {property.role}
                      </Box>
                    </ImageBox>
                    <DetailsBox>
                      <Box>
                        <TitleContainer>
                          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography variant="h4" color="primary" gutterBottom>
                              PKR {property.price.toLocaleString()}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {formatTime(remainingTime[property._id] || 0)}
                            </Typography>
                          </Box>
                        </TitleContainer>
                        <Typography variant="h6" gutterBottom>
                          {property.location}, {property.city}
                        </Typography>
                        <Divider sx={{ marginBottom: '10px' }} />
                        <Box display="flex" alignItems="center">
                          <BedIcon sx={{ marginRight: '5px' }} />
                          <Typography variant="body1">{property.bedrooms}</Typography>
                          <Box mx={1}>|</Box>
                          <BathtubIcon sx={{ marginRight: '5px' }} />
                          <Typography variant="body1">{property.bathrooms}</Typography>
                          <Box mx={1}>|</Box>
                          <SquareFootIcon sx={{ marginRight: '5px' }} />
                          <Typography variant="body1">
                            {property.areaSize} {property.areaSizeUnit}
                          </Typography>
                        </Box>
                        <Divider sx={{ marginY: '10px' }} />
                        <TitleContainer>
                          <Box>
                            <Typography
                              variant="h5"
                              gutterBottom
                              onClick={() => navigate(`/agent-dashboard/countdown-room/property/${property._id}`)}
                              sx={{ cursor: 'pointer', color: 'primary.main' }}
                            >
                              {truncateText(property.title, 50)}
                            </Typography>
                          </Box>
                          <ButtonContainer>
                            <Button fullWidth onClick={() => handleBid(property._id)}>
                              Bid Now
                            </Button>
                          </ButtonContainer>
                        </TitleContainer>
                      </Box>
                    </DetailsBox>
                  </StyledPaper>
                ))
              )}
            </Grid>
          </ProfileContainer>
        </Grid>
      </Box>
      <BidModal open={openBidModal} onClose={() => setOpenBidModal(false)}>
        <BidBox>
          <BidIconContainer>
            <AttachMoneyIcon sx={{ fontSize: '40px', color: 'primary.main' }} />
            <Typography variant="h6" sx={{ marginLeft: '10px' }}>
              Enter Your Bid Percentage
            </Typography>
          </BidIconContainer>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            value={bidPercentage}
            onChange={(e) => setBidPercentage(e.target.value)}
            placeholder="Bid Percentage"
            inputProps={{ min: 1, max: 100 }}
            error={bidPercentage <= 0 || bidPercentage > 100}
            helperText={bidPercentage <= 0 || bidPercentage > 100 ? 'Please enter a valid percentage' : ''}
          />
          {loading && <LinearProgress sx={{ marginTop: '20px' }} />}
          <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenBidModal(false)} color="secondary" sx={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button onClick={handleBidSubmit} variant="contained" color="primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Bid'}
            </Button>
          </Box>
        </BidBox>
      </BidModal>
    </Box>
  );
};

export default PropertyListings;