import React from 'react';
import { CardContent, Typography, Box, Grid, Icon } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  VisibilityOutlined,
  
  StarOutlined,
} from '@mui/icons-material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

// Define your primary and secondary gradient colors
const primaryColor = '#4a90e2';
const secondaryColor = '#4e73df';

// Animation for blink effect
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;

// Styled components for the card wrapper and blinking icon

const GradientPaper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
  color: 'white',
  padding: theme.spacing(1),
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  minHeight: '170px', // Adjust this value based on your design
}));


const BlinkingIcon = styled(Icon)(({ theme }) => ({
  color: 'white',
  animation: `${blinkAnimation} 1s infinite`,
  marginBottom: theme.spacing(1), // Add space below the icon
  marginLeft: theme.spacing(1), // Add space to the left of the icon
}));

const KPI_Cards = () => {
  // Example values (replace with actual data)
  const allListings = 1000;
  const activeListings = 500;
  const featuredListings = 100;

  return (
    <CardContent>
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item xs={12} sm={4}>
          <GradientPaper>
            <BlinkingIcon component={VisibilityOutlined} fontSize="large" />
            <Typography variant="h6" gutterBottom>
              Active Listings
            </Typography>
            <Typography variant="h4" gutterBottom>
              {allListings}
            </Typography>
          </GradientPaper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <GradientPaper>
            <Icon component={FormatListNumberedIcon} fontSize="large" />
            <Typography variant="h5" gutterBottom>
              All Listings
            </Typography>
            <Typography variant="h4" gutterBottom>
              {activeListings}
            </Typography>
          </GradientPaper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <GradientPaper>
            <Icon component={StarOutlined} fontSize="large" />
            <Typography variant="h6" gutterBottom>
              Featured Listings
            </Typography>
            <Typography variant="h4">
              {featuredListings}
            </Typography>
          </GradientPaper>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default KPI_Cards;
