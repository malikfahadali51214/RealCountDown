import React, { useState } from 'react';
import { ThemeProvider, createTheme, Box, CssBaseline, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './AppBar';
import Navbar from './Navbar';
import EarningsHistoryCard from './EarningsHistoryCard';
import BidCreditsCard from './BidCreditsCard';
import Table from './Table';
import Chart from './Chart';
import KPISection from './KPISection'; // Import the AgentProfileView component

const defaultTheme = createTheme();

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    toast.success('You have been logged out successfully.');
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/register');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar open={open} toggleDrawer={toggleDrawer} />
        <Navbar open={open} toggleDrawer={toggleDrawer} handleLogout={handleLogout} />
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
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6}>
              <Chart />
            </Grid>

            {/* Earnings History Card */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <EarningsHistoryCard />
                </Grid>
                <Grid item xs={12}>
                  <BidCreditsCard />
                </Grid>
              </Grid>
            </Grid>

            {/* Agent Profile View (KPI Section) */}
            <Grid item xs={10.8} sx={{ marginLeft: 9 }}> {/* You can adjust the value as needed */}
  <KPISection />
</Grid>
          </Grid>
          
          <Table />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
