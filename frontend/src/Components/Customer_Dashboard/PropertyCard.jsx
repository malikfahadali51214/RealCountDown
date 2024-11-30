import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CardActions,
  Divider,
  Tooltip,
  Collapse,
  Grid,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GavelIcon from '@mui/icons-material/Gavel';
import axios from 'axios';
import VisibilityDurationDialog from './VisibilityDurationDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StarIcon from '@mui/icons-material/Star';
import PaymentForm from './PaymentForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Placeholder when no property cards are available
const NoDataPlaceholder = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '30vh',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 2,
      boxShadow: 3,
      p: 4,
    }}
  >
    <Typography variant="h6" color="text.secondary">
      No Property Card Available
    </Typography>
  </Box>
);

const PropertyCard = () => {
  const [propertyRequirements, setPropertyRequirements] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [enabled, setEnabled] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [visibilityDuration, setVisibilityDuration] = useState({});
  const [dialogType, setDialogType] = useState('');
  const [error, setError] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [featured, setFeatured] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyRequirements = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/property-requirements', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPropertyRequirements(response.data);

        const initialEnabledState = {};
        const initialFeaturedState = {};
        const initialVisibilityDuration = {};

        response.data.forEach(property => {
          initialEnabledState[property._id] = localStorage.getItem(`enabled-${property._id}`) === 'true';
          initialFeaturedState[property._id] = false; // Default featured state

          const endTime = parseInt(localStorage.getItem(`endTime-${property._id}`));
          if (initialEnabledState[property._id] && endTime) {
            const remainingTime = Math.max(0, endTime - Date.now());
            initialVisibilityDuration[property._id] = remainingTime;
          } else {
            initialVisibilityDuration[property._id] = 0; // No time if not enabled
          }
        });

        setEnabled(initialEnabledState);
        setFeatured(initialFeaturedState);
        setVisibilityDuration(initialVisibilityDuration);
      } catch (error) {
        console.error('Error fetching property requirements:', error);
      }
    };

    fetchPropertyRequirements();
  }, []);

  const deleteProperty = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/property-requirements/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPropertyRequirements(prev => prev.filter(property => property._id !== id));
      toast.success('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property!');
    }
  };

  const handleExpandClick = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVisibilityClick = async (id) => {
    if (!enabled[id]) {
      setCurrentPropertyId(id);
      setDialogType('visibility');
      setDialogOpen(true);
    } else {
      if (visibilityDuration[id] > 0) {
        try {
          const token = localStorage.getItem('token'); // Corrected this line
          await axios.put(`http://localhost:3000/api/property-requirements/${id}/timer-end`, {
            timerEnd: null,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          toast.info('Bidding is now disabled and timer reset.');
        } catch (error) {
          console.error('Error updating timer end:', error);
          toast.error('Failed to disable bidding!');
        }
      }
  
      setEnabled(prev => {
        const newEnabledState = { ...prev, [id]: false };
        localStorage.setItem(`enabled-${id}`, false);
        localStorage.setItem(`visibilityDuration-${id}`, 0);
        localStorage.removeItem(`endTime-${id}`);
        return newEnabledState;
      });
      setVisibilityDuration(prev => ({ ...prev, [id]: 0 }));
      toast.info(`Bidding is now disabled.`);
    }
  };
  const handleFeatureClick = (id) => {
    if (!featured[id]) {
      setDialogType('feature');
      setCurrentPropertyId(id);
      setDialogOpen(true);
    } else {
      setFeatured(prev => ({ ...prev, [id]: false }));
      toast.info('Unfeatured Successfully for this property');
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setError('');
    setTimeLimit('');
    setDialogType('');
  };

  const handleSubmitDuration = async (data) => {
    const durationInMs = data.value * 3600000; // Convert hours to milliseconds
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/api/property-requirements/${data.id}/bid-time`, {
        duration: durationInMs,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const endTime = Date.now() + durationInMs; // Calculate the end time
        setVisibilityDuration(prev => ({ ...prev, [data.id]: durationInMs }));
        setEnabled(prev => {
          const newEnabledState = { ...prev, [data.id]: true };
          localStorage.setItem(`enabled-${data.id}`, true);
          localStorage.setItem(`visibilityDuration-${data.id}`, durationInMs);
          localStorage.setItem(`endTime-${data.id}`, endTime);
          return newEnabledState;
        });
        setDialogOpen(false);
        toast.success(`Bidding is now enabled for ${data.value} hour.`);
      }
    } catch (error) {
      console.error('Error submitting bidding duration:', error);
      toast.error('Failed to set bidding duration!');
    }
  };

  const Timer = ({ duration, propertyId }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
      if (!propertyId) {
        console.error('Property ID is undefined. Cannot update timer end.');
        return; // Exit if propertyId is not defined
      }

      if (timeLeft <= 0) {
        const updateTimerEnd = async () => {
          try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/property-requirements/${propertyId}/timer-end`, {
              timerEnd: null,
            }, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            console.log('Timer end updated to null successfully.');
            setEnabled(prev => ({ ...prev, [propertyId]: false })); // Reset the bidding state
          } catch (error) {
            console.error('Error updating timer end:', error);
          }
        };
        updateTimerEnd();
        return; // Exit early if the timer is up
      }

      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0)); // Decrease time left by 1000ms (1 second)
      }, 1000);

      return () => clearInterval(intervalId);
    }, [timeLeft, propertyId]);

    const formatTime = (time) => {
      const totalSeconds = Math.floor(time / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 *  24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;
    };


    return (
      <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
        {timeLeft > 0 ? formatTime(timeLeft) : 'Time is up!'}
      </Typography>
    );
  };

  const primaryColor = '#4a90e2';
  const secondaryColor = '#4e73df';

  return (
    <>
      {propertyRequirements.length === 0 ? (
        <NoDataPlaceholder />
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="left" gap={2}>
          {propertyRequirements.map((property) => (
            <Card key={property._id} sx={{
              mb: 2,
              ml: 2.5,
              borderRadius: 2,
              boxShadow: 4,
              transition: 'transform 0.3s, boxShadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              },
              width: '30%', // Adjust width for three cards per row
            }}>
              {property.imageFile ? (
                <Box sx={{
                  position: 'relative',
                  height: 0,
                  paddingTop: '56.25%',
                  overflow: 'hidden',
                }}>
                  <img
                    src={`http://localhost:3000/${property.imageFile}`}
                    alt={property.title || 'Property'}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                                    <Box
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '3px',
                    }}
                  >
                    {property.role}
                  </Box>

                </Box>
              ) : (
                <Box sx={{
                  position: 'relative',
                  height: 0,
                  paddingTop: '56.25%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                }}>
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '24px',
                      fontWeight: 'bold',
                    }}
                  >
                    No Image Available
                  </Typography>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '3px',
                    }}
                  >
                    {property.role}
                  </Box>
                </Box>
              )}
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5" sx={{ fontWeight: '600', color: primaryColor }}>{property.title}</Typography>
                  {enabled[property._id] && visibilityDuration[property._id] > 0 ? (
                    <Timer duration={visibilityDuration[property._id]} propertyId={property._id} />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Bidding Disabled
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: '500' }}>
                    Type: <span style={{ fontWeight: '400' }}>{property.propertyType}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: '500' }}>
                    Price: <span style={{ fontWeight: '400' }}>${property.price}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: '500' }}>
                    City: <span style={{ fontWeight: '400' }}>{property.city}</span>
                  </Typography>
                </Box>
              </CardContent>

              <Collapse in={expanded[property._id]} timeout="auto" unmountOnExit>
                <CardContent sx={{
                  borderTop: '1px solid #e0e0e0',
                  pt: 2,
                  pb: 2,
                  backgroundColor: '#f9f9f9',
                  animation: 'fadeIn 0.3s',
                  borderRadius: 1,
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '600', color: primaryColor }} gutterBottom>
                    Property Details
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Area Size:</strong> {property.areaSize} {property.areaSizeUnit}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Rooms:</strong> {property.bedrooms}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Washrooms:</strong> {property.bathrooms}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Additional Features:</strong> {property.additionalFeatures.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Ready for Possession:</strong> {property.readyForPossession ? 'Yes' : 'No'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: '600', color: primaryColor }} gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" color="#555">
                    <strong>Location:</strong> {property.location || 'Unknown Location'}
                  </Typography>
                  <Typography variant="body2" color="#555">
                    <strong>Email:</strong> {property.emailAddress || 'Unknown Email'}
                  </Typography>
                  <Typography variant="body2" color="#555">
                    <strong>Phone:</strong> {property.phoneNumber || 'Unknown Phone'}
                  </Typography>
                </CardContent>
              </Collapse>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconButton onClick={() => handleExpandClick(property._id)}>
                  {expanded[property._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
                <Tooltip title={enabled[property._id] ? 'Bidding' : 'Bid Property'} arrow>
                  <IconButton
                    onClick={() => handleVisibilityClick(property._id)}
                    color={enabled[property._id] ? 'primary' : 'default'}
                    sx={{
                      '&:hover': { color: '#1a73e8' },
                      transition: 'color 0.3s',
                      background: enabled[property._id] ? '#e3f2fd' : 'none',
                      borderRadius: 2,
                    }}
                  >
                    {enabled[property._id] ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </Tooltip>

                <Tooltip title={featured[property._id] ? 'Featured' : 'Feature Property'} arrow>
                  <IconButton
                    onClick={() => handleFeatureClick(property._id)}
                    color={featured[property._id] ? '#fdd835' : 'default'}
                    sx={{
                      '&:hover': { color: '#fdd835' },
                      transition: 'color 0.3s',
                      background: featured[property._id] ? '#fff176' : 'none',
                      borderRadius: 2,
                    }}
                  >
                    <StarIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete Property" arrow>
                  <IconButton
                    onClick={() => deleteProperty(property._id)}
                    color="error"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ffebee',
                        borderRadius: 2,
                      },
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Bids" arrow>
                  <IconButton
                    onClick={() => {
                      navigate(`/customer-dashboard/PreviewProperty/${property._id}`); // Pass property ID
                    }}
                    color="default"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                        borderRadius: 2,
                      },
                    }}
                  >
                    <GavelIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
      <VisibilityDurationDialog
        open={dialogOpen && dialogType === 'visibility'}
        onClose={handleDialogClose}
        onSubmit={handleSubmitDuration}
        error={error}
        timeLimit={timeLimit}
        setTimeLimit={setTimeLimit}
        propertyId={currentPropertyId} // Pass the current property ID
      />
      <Payment Form
        open={dialogOpen && dialogType === 'feature'}
        onClose={handleDialogClose}
        onPaymentSubmit={() => {
          setFeatured(prev => ({ ...prev, [currentPropertyId]: true }));
          handleDialogClose();
        }}
      />
    </>
  );
};

export default PropertyCard;