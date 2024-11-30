import React, { useEffect, useState, memo } from 'react';
import { Box, Typography, CircularProgress, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const KPIContainer = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
  
  display: 'flex',
  justifyContent: 'space-around',
  padding: '20px',
  backgroundColor: theme.palette.background.default,
  flexWrap: 'wrap',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  borderRadius: '20px',
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const getColor = (value) => {
  if (value >= 90) return '#1b5e20'; // Dark Green
  if (value >= 75) return '#4caf50'; // Green
  if (value >= 60) return '#8bc34a'; // Light Green
  if (value >= 45) return '#ffeb3b'; // Yellow
  if (value >= 30) return '#ff9800'; // Orange
  if (value >= 15) return '#ff5722'; // Deep Orange
  return '#f44336'; // Red
};

const CircularKPI = memo(({ value, max, tooltip }) => {
  const [animationValue, setAnimationValue] = useState(Math.round(value));
  const percentage = (value / max) * 100;

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const increment = percentage / (duration / 16); // Approx. 60 FPS
    let start = 0;

    const animate = () => {
      if (start < percentage) {
        start += increment;
        setAnimationValue(Math.min(Math.round(start), percentage));
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, max]);

  return (
    <Tooltip title={tooltip} arrow>
      <BadgeContainer>
        <CircularProgress
          variant="determinate"
          value={animationValue}
          size={100}
          thickness={5}
          sx={{
            color: getColor(animationValue),
            position: 'relative',
            transition: 'color 0.3s ease',
          }}
        />
        <Typography
          variant="h6"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {Math.round(value)} {/* Ensure value is rounded */}
        </Typography>
      </BadgeContainer>
    </Tooltip>
  );
});

const AgentProfileView = () => {
  // Dummy data for calculations
  const agentData = {
    kpis: {
      propertiesSold: 67, // Example of properties sold
      totalLeads: 150, // Total leads generated
      clientSatisfactionScores: [4, 5, 5, 3, 4.5], // Example client satisfaction scores
    },
  };

  // Calculate Lead Conversion Rate
  const leadConversionRate = Math.round((agentData.kpis.propertiesSold / agentData.kpis.totalLeads) * 100) || 0;

  // Calculate Client Satisfaction Score
  const clientSatisfactionScore =
    agentData.kpis.clientSatisfactionScores.length > 0
      ? Math.round((agentData.kpis.clientSatisfactionScores.reduce((acc, score) => acc + score, 0) / agentData.kpis.clientSatisfactionScores.length) * 20) // Scale to 100
      : 0;

  const propertiesSold = agentData.kpis.propertiesSold || 0;

  return (
    <Box>
      <KPIContainer>
        {[
          {
            key: 'propertiesSold',
            value: propertiesSold,
            tooltip: `Current properties sold: ${propertiesSold}`,
            label: 'Properties Sold',
            description: 'Total properties sold this month',
          },
          {
            key: 'leadConversionRate',
            value: leadConversionRate,
            tooltip: `Current lead conversion rate: ${leadConversionRate.toFixed(2)}%`,
            label: 'Lead Conversion Rate',
            description: 'Percentage of leads converted to sales',
          },
          {
            key: 'clientSatisfactionScore',
            value: clientSatisfactionScore,
            tooltip: `Current client satisfaction score: ${clientSatisfactionScore}`,
            label: 'Client Satisfaction Score',
            description: 'Average satisfaction rating from clients',
          },
        ].map(({ key, value, tooltip, label, description }) => (
          <Box textAlign="center" key={key} display="flex" flexDirection="column" alignItems="center" m={1}>
            <CircularKPI value={value} max={100} tooltip={tooltip} />
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '600', marginTop: 1 }}>
              {label}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Box>
        ))}
      </KPIContainer>
    </Box>
  );
};

export default AgentProfileView;
