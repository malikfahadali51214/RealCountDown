import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { Message as MessageIcon } from '@mui/icons-material';

const FeedbackPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  borderRadius: '10px',
  textAlign: 'left',
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  paddingBottom: '20px',
  color: '#ffffff',
  fontFamily: 'Georgia, serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
  marginBottom: '20px',
  padding: '10px',
  borderRadius: '10px',
  textAlign: 'center',
}));

const FeedbackSection = ({ feedbacks }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box>
      <SectionHeader variant="h5">Customer Feedback</SectionHeader>
      {feedbacks.length === 0 ? (
        <FeedbackPaper>
          <Typography variant="body1" align="center">
            No feedback available at the moment.
          </Typography>
        </FeedbackPaper>
      ) : expanded ? (
        feedbacks.map((feedback) => (
          <FeedbackPaper key={feedback.id}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1">
                <strong>{feedback.user}</strong>
              </Typography>
              <Rating
                name="read-only"
                value={feedback.rating}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                {feedback.comment}
              </Typography>
            </Box>
          </FeedbackPaper>
        ))
      ) : (
        <Carousel>
          {feedbacks.slice(0, 3).map((feedback) => (
            <FeedbackPaper key={feedback.id}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1">
                  <strong>{feedback.user}</strong>
                </Typography>
                <Rating
                  name="read-only"
                  value={feedback.rating}
                  readOnly
                  precision={0.5}
                />
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  {feedback.comment}
                </Typography>
              </Box>
            </FeedbackPaper>
          ))}
        </Carousel>
      )}
      {!expanded && feedbacks.length > 0 && (
        <Button
  variant="contained"
  color="primary"
  sx={{
    border: '2px solid transparent',
    borderRadius: '20px',
    color: (theme) => theme.palette.text.primary,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: (theme) => theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  }}
          startIcon={<MessageIcon />}
          onClick={handleToggle}
        >
          View All Feedback
        </Button>
      )}
    </Box>
  );
};

export default FeedbackSection;
