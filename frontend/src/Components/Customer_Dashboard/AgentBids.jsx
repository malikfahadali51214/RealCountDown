import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const AgentBids = ({ bids, acceptedBidId, handleAcceptBid, handleUndoAcceptBid }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Bids</Typography>
      {bids.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No bids available.
        </Typography>
      ) : (
        <List>
          {bids.map((bid) => (
            <ListItem key={bid.agentId}>
              <ListItemText
                primary={`${bid.agentName} - $${bid.amount}`}
                secondary={`Submitted on: ${formatDate(bid.dateSubmitted)} - ${bid.message}`}
              />
              {acceptedBidId === bid.agentId ? (
                <Button variant="outlined" color="primary" onClick={handleUndoAcceptBid}>
                  Undo Accept
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => handleAcceptBid(bid.agentId)}>
                  Accept
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

// Prop type validation
AgentBids.propTypes = {
  bids: PropTypes.arrayOf(
    PropTypes.shape({
      agentId: PropTypes.string.isRequired,
      agentName: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      dateSubmitted: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  acceptedBidId: PropTypes.string,
  handleAcceptBid: PropTypes.func.isRequired,
  handleUndoAcceptBid: PropTypes.func.isRequired,
};

export default AgentBids;