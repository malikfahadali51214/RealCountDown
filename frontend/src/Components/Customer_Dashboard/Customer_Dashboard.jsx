import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import Navbar from './Navbar'; 
import PropertyCard from './PropertyCard';
import KPI_Cards from './KPI_Cards';


const defaultTheme = createTheme();

export default function CustomerDashboard() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      minPrice: 100000,
      maxPrice: 500000,
      propertyType: ['apartment', 'condo'],
      condition: 'good',
      numRooms: 3,
      numWashrooms: 2,
      gatedCommunity: true,
      garage: false,
      garden: true,
      swimmingPool: false,
      balcony: true,
      additionalRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ]);

  const deleteProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  const titleStyle = {
    color: '#ffffff',
    fontFamily: 'Georgia, serif',
    fontSize: '1.80rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '10px',
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <KPI_Cards />
            <Box mt={4}>
              <Typography variant="h4" align="center" gutterBottom sx={titleStyle}>
                Property Cards
              </Typography>
              <Grid container spacing={3}>
                {properties.map((property) => (
                  <Grid item xs={12} key={property.id}>
                    <PropertyCard property={property} deleteProperty={deleteProperty} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
