import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  Grid,
  IconButton,
  FormControlLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled, keyframes } from '@mui/system';

// Styled component for the NeonLabel
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
      color: '#1976D2', // Label color when checked
      fontWeight: 'bold', // Make the label text bold when checked
    },
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    animation: `${fadeIn} 0.3s ease-in-out`,
    borderRadius: '15px',
  },
  '& .MuiDialogTitle-root': {
    background: 'linear-gradient(to right, #4e73df, #4a90e2)',
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(2),
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.3s ease',
  },
  '& .MuiDialogContentText-root': {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
  },
  '& .MuiButton-root': {
    textTransform: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    boxShadow: 'none',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const VisibilityDurationDialog = ({
  open,
  onClose,
  onSubmit,
  duration,
  propertyId, // Add propertyId as a prop
}) => {
  const [selectedDuration, setSelectedDuration] = useState(duration || 1); // Initialize with a default value

  const durationOptions = [
    { value: 0.01667, label: '1 Minute' }, // 1 Minute in hours
    { value: 1, label: '1 Hour' },
    { value: 2, label: '2 Hours' },
    { value: 4, label: '4 Hours' },
    { value: 8, label: '8 Hours' },
    { value: 12, label: '12 Hours' },
    { value: 24, label: '1 Day' },
    { value: 48, label: '2 Days' },
    { value: 72, label: '3 Days' },
  ];

  const handleDialogSubmit = () => {
    if (selectedDuration < 0.01667) { // Check for minimum duration of 1 minute
      toast.error('Duration must be at least 1 minute.');
      return;
    }
    onSubmit({ id: propertyId, value: selectedDuration });
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Set Visibility Duration
        <IconButton onClick={onClose} style={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please specify the duration for which the listing should remain available for bidding.
        </DialogContentText>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                aria-label="duration"
                name="duration"
                value={selectedDuration}
                onChange={handleDurationChange}
                row // Aligns radio buttons horizontally
              >
                {durationOptions.map((option) => (
                  <NeonLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined" startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <Button onClick={handleDialogSubmit} color="primary" variant="contained" startIcon={<AccessTimeIcon />}>
          Submit
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default VisibilityDurationDialog;