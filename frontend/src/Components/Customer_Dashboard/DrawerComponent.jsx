// src/components/DrawerComponent.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatIcon from '@mui/icons-material/Chat';
import { Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import ListAltIcon from '@mui/icons-material/ListAlt';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      background: '#f2f2f2',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      top: 0,
      borderBottom: '0.5px solid black',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      padding: '9px',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  sessionStorage.clear();
  navigate("/register");
  toast.success("You have been logged out successfully.");
};

const CustomListItem = ({ to, icon: Icon, text, open }) => {
  const theme = useTheme();
  const location = useLocation();

  // Check if this list item is the active one
  const isActive = location.pathname === to;

  return (
<ListItem
      component={Link}
      to={to}
      sx={{
        padding: open ? '10px' : '10px 0',
        margin: '5px auto',
        borderRadius: '20px',
        transition: 'all 0.3s ease-in-out',
        // backgroundColor: isActive ? theme.palette.primary.light : 'transparent',  // Active background color
        border: isActive ? `2px solid ${theme.palette.primary.main}` : open ? '1px solid transparent' : 'none',  // Active border color
        color: isActive ? '#000' : open ? '#fff' : 'inherit',
        width: '90%',
        maxWidth: '200px',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: 'transparent',
          transform: open ? 'scale(1.05)' : 'none',
        },
        '&:focus, &:active': {
          borderColor: theme.palette.primary.dark,
          backgroundColor: 'transparent',
          transform: open ? 'scale(0.95)' : 'none',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ListItemIcon sx={{ color: isActive ? '#000' : open ? '#000000' : theme.palette.primary.main, minWidth: 'auto', marginRight: open ? '8px' : '0' }}>
        <Icon />
      </ListItemIcon>
      {open && (
        <ListItemText
          primary={text}
          sx={{ color: isActive ? '#000' : '#000000', fontWeight: isActive ? 600 : 500 }}  // Active text color and weight
        />
      )}
    </ListItem>  );
};

const DrawerComponent = ({ drawerOpen, toggleDrawer, handleMouseEnter, handleMouseLeave }) => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={drawerOpen}
      onMouseEnter={handleMouseEnter}  // Trigger drawer open on hover
      onMouseLeave={handleMouseLeave}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List component="nav">
        <CustomListItem
          to="/customer-dashboard"
          icon={DashboardIcon}
          text="Dashboard"
          open={drawerOpen}
        />
        <CustomListItem
          to="/customer-dashboard/propertyform"
          icon={ListAltIcon}
          text="Post Listing"
          open={drawerOpen}
        />
        <CustomListItem
          to="/customer-dashboard/propertymanagment"
          icon={BusinessIcon}
          text="Listing Management"
          open={drawerOpen}
        />
        <CustomListItem
          to="/customer-dashboard/chat"
          icon={ChatIcon}
          text="Chat"
          open={drawerOpen}
        />
        <CustomListItem
          to="/customer-dashboard/customer-profile"
          icon={Person2Icon}
          text="User Profile"
          open={drawerOpen}
        />
        <Divider sx={{ my: 3 }} />
        <CustomListItem
          to="/customer-dashboard/helpdesk"
          icon={HelpOutlineIcon}
          text="Help Desk"
          open={drawerOpen}
        />
      </List>
      <Box sx={{ flexGrow: 1 }} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleLogout(navigate)}
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderRadius: 10,
          padding: '10px 20px',
          margin: drawerOpen ? '20px auto' : '10px auto',
          display: 'block',
          backgroundColor: drawerOpen ? 'primary' : 'transparent',
          color: drawerOpen ? '#fff' : '#2196f3',
          border: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
          maxWidth: 200,
          width: drawerOpen ? '100%' : 'fit-content',
          '&:hover, &:active': {
            color: drawerOpen ? '#fff' : '#fff',
          },
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: drawerOpen ? 'red' : 'transparent',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        {drawerOpen ? 'Logout' : (
          <LogoutIcon sx={{
            fontSize: 24,
            color: '#2196f3',
            '&:hover': {
              color: '#d32f2f',
            },
          }} />
        )}
      </Button>
    </Drawer>
  );
};

export default DrawerComponent;
