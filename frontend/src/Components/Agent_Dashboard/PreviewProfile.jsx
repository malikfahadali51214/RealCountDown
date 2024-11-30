// AgentProfileView.js
import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Box,
  Paper,
  Button,
  IconButton,
  Rating,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  AssignmentInd as AssignmentIndIcon,
  Book as BookIcon,
  Lightbulb as LightbulbIcon,
  VerifiedUser as VerifiedUserIcon,
  PhoneCallback as PhoneCallbackIcon,
  PhoneTwoTone as PhoneTwoToneIcon,
} from '@mui/icons-material';
import Navbar from './Navbar';
import FeedbackSection from './FeedbackSection';
import KPISection from './KPISection';

const defaultTheme = createTheme();

const ProfileContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.2)',
  },
  marginTop: '40px',
});

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  borderRadius: '20px',
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

const AgentProfileView = () => {
  const agentData = {
    name: 'John Doe',
    location: 'New York, USA',
    avatarUrl: '/path/to/avatar.jpg',
    email: 'john.doe@example.com',
    mobile: '123-456-7890',
    landline: '098-765-4321',
    whatsapp: '123-456-7890',
    address: '123 Main St, New York, NY',
    yearsOfExperience: '10',
    specialization: 'Real Estate',
    agency: 'ABC Realty',
    licenseNumber: 'LIC123456',
    certifications: 'Certified Real Estate Agent',
    missionStatement: 'To provide the best real estate services.',
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      facebook: 'https://facebook.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
    },
    ratings: 4.5,
    feedbacks: [
      { id: 1, user: 'Alice', rating: 3.5, comment: 'Excellent service!' },
      { id: 2, user: 'Bob', rating: 4.5, comment: 'Very professional.' },
      { id: 1, user: 'Alice', rating: 3.5, comment: 'Excellent service!' },
      { id: 2, user: 'Bob', rating: 4.5, comment: 'Very professional.' },

    ],
    skills: ['Negotiation', 'Property Management', 'Client Relations', 'Market Analysis'],
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
            padding: '20px',
          }}
        >
          <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '50px' }}>
            <Grid>

              <Grid item xs={12}>
                <ProfileContainer>
                  <Grid container spacing={3} alignItems="flex-start">
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center', position: 'sticky', top: '70px' }}>
                      <Avatar
                        alt="User Avatar"
                        src={agentData.avatarUrl}
                        sx={{ width: '150px', height: '150px', margin: 'auto' }}
                      />
                      <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                          color: '#ffffff',
                          fontFamily: 'Georgia, serif',
                          fontSize: '1.50rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
                          padding: '10px',
                          borderRadius: '10px',
                        }}
                      >
                        {agentData.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <LocationOnIcon />
                        <Typography variant="body1" sx={{ ml: 1 }}>
                          {agentData.location}
                        </Typography>
                      </Box>
                      <Rating value={agentData.ratings} readOnly />
                      <Typography variant="body2" sx={{ mb: 1 }}>{`${agentData.ratings} stars`}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PhoneCallbackIcon />}
                        sx={{ mt: 2 }}
                      >
                        Contact Agent
                      </Button>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <KPISection kpis={agentData.kpis} />

                      <GradientPaper>
                        <SectionHeader variant="h6">Contact Information</SectionHeader>
                        <Grid container spacing={2}>
                          {[
                            { icon: <EmailIcon />, text: agentData.email },
                            { icon: <PhoneAndroidIcon />, text: agentData.mobile },
                            { icon: <PhoneTwoToneIcon />, text: agentData.landline },
                            { icon: <WhatsAppIcon />, text: agentData.whatsapp },
                            { icon: <HomeIcon />, text: agentData.address },
                          ].map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                {item.icon}
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                  {item.text}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </GradientPaper>

                      <GradientPaper>
                        <SectionHeader variant="h6">Professional Details</SectionHeader>
                        <Grid container spacing={2}>
                          {[
                            { icon: <WorkIcon />, text: `Years of Experience: ${agentData.yearsOfExperience}` },
                            { icon: <AssignmentIndIcon />, text: `License Number: ${agentData.licenseNumber}` },
                            { icon: <BusinessIcon />, text: `Agency: ${agentData.agency}` },
                            { icon: <BookIcon />, text: `Specialization: ${agentData.specialization}` },
                            { icon: <VerifiedUserIcon />, text: `Certifications: ${agentData.certifications}` },
                            { icon: <LightbulbIcon />, text: `Mission Statement: ${agentData.missionStatement}` },
                          ].map((item, index) => (
                            <Grid item xs={12} key={index}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                {item.icon}
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                  {item.text}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </GradientPaper>

                      <GradientPaper>
                        <SectionHeader variant="h6">Skills and Expertise</SectionHeader>
                        <Grid container spacing={1}>
                          {agentData.skills.map((skill, index) => (
                            <Grid item key={index}>
                              <Button variant="outlined" color="primary">
                                {skill}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </GradientPaper>

                      <GradientPaper>
                        <SectionHeader variant="h6">Social Media</SectionHeader>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                          {agentData.socialMediaLinks.linkedin && (
                            <Grid item>
                              <IconButton
                                component="a"
                                href={agentData.socialMediaLinks.linkedin}
                                target="_blank"
                                color="primary"
                              >
                                <LinkedInIcon />
                              </IconButton>
                            </Grid>
                          )}
                          {agentData.socialMediaLinks.facebook && (
                            <Grid item>
                              <IconButton
                                component="a"
                                href={agentData.socialMediaLinks.facebook}
                                target="_blank"
                                color="primary"
                              >
                                <FacebookIcon />
                              </IconButton>
                            </Grid>
                          )}
                          {agentData.socialMediaLinks.instagram && (
                            <Grid item>
                              <IconButton
                                component="a"
                                href={agentData.socialMediaLinks.instagram}
                                target="_blank"
                                color="primary"
                              >
                                <InstagramIcon />
                              </IconButton>
                            </Grid>
                          )}
                        </Grid>
                      </GradientPaper>
                    </Grid>
                  </Grid>
                </ProfileContainer>
              </Grid>

              <Grid item xs={12}>
                <ProfileContainer>
                  <FeedbackSection feedbacks={agentData.feedbacks} />
                </ProfileContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AgentProfileView;
