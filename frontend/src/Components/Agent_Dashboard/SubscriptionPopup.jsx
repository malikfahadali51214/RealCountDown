import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentForm from './PaymentForm'; // Import the PaymentForm component

// Styled Card component
const CreditCard = styled(Card)(({ theme }) => ({
  width: '280px',
  padding: '20px',
  margin: '10px',
  textAlign: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const SubscriptionPopup = ({ buyOpen, handleBuyClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Conversion rate from USD to PKR
  const usdToPkr = 280; // Example conversion rate

  const handlePaymentSubmit = (packageDetails) => {
    // Handle the payment submission logic here
    console.log("Payment submitted for package:", packageDetails);
    // Close the popup after submission (if desired)
    handleBuyClose();
  };

  return (
    <Dialog open={buyOpen} onClose={handleBuyClose} fullWidth maxWidth="md">
<DialogTitle
  sx={{
    textAlign: 'center',
    pb: 0,
    color: '#ffffff',
    fontFamily: 'Georgia, serif',
    fontSize: '1.80rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
    borderRadius: '10px',
    width: '100%',
  }}
>
  Buy Credits
</DialogTitle>

      <DialogContent sx={{ textAlign: 'center', px: 4, py: 3 }}>
        <Typography variant="body1" gutterBottom>
          Please select a credit package:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'auto',
            flexWrap: 'nowrap',
            mt: 2,
            paddingBottom: '10px'
          }}
        >
          {/* Standard Plan */}
          <CreditCard elevation={5} sx={{ background: 'linear-gradient(to right, #ff9800, #ffb74d)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Standard Plan
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              30 Credits
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {`₨ ${50.00 * usdToPkr}`} {/* Convert to PKR */}
            </Typography>
            <List dense>
            </List>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff5722', mt: 2, color: '#fff', borderRadius: 4 }}
              fullWidth
              onClick={() => setSelectedPackage({ plan: 'Standard Plan', credits: 30, price: 50.00 * usdToPkr })}
            >
              Select
            </Button>
          </CreditCard>

          {/* Scale Plan */}
          <CreditCard elevation={5} sx={{ background: 'linear-gradient(to right, #03a9f4, #81d4fa)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Scale Plan
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              40 Credits
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {`₨ ${60.00 * usdToPkr}`} {/* Convert to PKR */}
            </Typography>
            <List dense>
            </List>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#0277bd', mt: 2, color: '#fff', borderRadius: 4 }}
              fullWidth
              onClick={() => setSelectedPackage({ plan: 'Scale Plan', credits: 40, price: 60.00 * usdToPkr })}
            >
              Select
            </Button>
          </CreditCard>

          {/* Pro Plan */}
          <CreditCard elevation={5} sx={{ background: 'linear-gradient(to right, #4caf50, #a5d6a7)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Pro Plan
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              60 Credits
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {`₨ ${70.00 * usdToPkr}`} {/* Convert to PKR */}
            </Typography>
            <List dense>
            </List>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#2e7d32', mt: 2, color: '#fff', borderRadius: 4 }}
              fullWidth
              onClick={() => setSelectedPackage({ plan: 'Pro Plan', credits: 60, price: 70.00 * usdToPkr })}
            >
              Select
            </Button>
          </CreditCard>
        </Box>

        {/* Render PaymentForm below the packages */}
        {selectedPackage && (
          <PaymentForm
            open={true}
            onClose={() => setSelectedPackage(null)}
            onPaymentSubmit={handlePaymentSubmit}
            selectedPackage={selectedPackage}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleBuyClose} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionPopup;