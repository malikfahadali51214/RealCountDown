import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import SubscriptionPopup from './SubscriptionPopup'; // Import the SubscriptionPopup component

// Update the gradient and colors to match the PropertyCard component
const primaryColor = '#4e73df';
const secondaryColor = '#4a90e2';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(4), // Rounded corners
  boxShadow: '0 12px 20px rgba(0,0,0,0.2)', // Consistent shadow effect
  width: '420px',
  height: '150px',
  marginLeft:'130px',

  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
  },
  color: '#fff', // Black text color
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const BidCreditsCard = () => {
  const [buyOpen, setBuyOpen] = useState(false);
  const totalCredits = 12; // Replace with actual total credits logic if needed

  const handleBuyOpen = () => setBuyOpen(true);
  const handleBuyClose = () => setBuyOpen(false);

  return (
    <>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
        <StyledPaper elevation={9}>
          <Box sx={{ flex: 1, paddingLeft: '20px' }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#fff', // Use black text
                fontWeight: 'bold', 
                textAlign: 'left',
                WebkitBackgroundClip: 'text',
              }}
            >
              Bid Credits
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left', color: '#fff' }}>
              {totalCredits}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'left', color: '#ddd' }}>
              Buy to get access
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            size="medium" 
            sx={{ borderRadius: 4, color: '#fff', marginRight: '20px' }}
            onClick={handleBuyOpen} // Open the subscription popup on click
          >
            BUY now
          </Button>
        </StyledPaper>
      </Box>

      {/* SubscriptionPopup Component */}
      <SubscriptionPopup buyOpen={buyOpen} handleBuyClose={handleBuyClose} />
    </>
  );
};

export default BidCreditsCard;
