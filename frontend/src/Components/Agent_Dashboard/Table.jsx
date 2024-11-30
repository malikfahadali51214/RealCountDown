import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { styled } from '@mui/system';

const data = [
  { Title:'Hill House',name: 'Qasid', email: 'qasid.ahmad@example.com', phone: '1234567890', Bid:'0.7%',role: 'Buyer' },
  { Title:'Seaside Condo',name: 'Usama', email: 'usama@example.com', phone: '9876543210', Bid:'1.2%',role: 'Seller' },
];

const StyledTableCell = styled(TableCell)(({ theme, role }) => ({
  color: getRoleColor(role, theme),
  fontWeight: 'bold',
  borderBottom: '2px solid #f0f0f0',
  padding: '16px',

}));

const getRoleColor = (role, theme) => {
  switch (role) {
    case 'buyer':
      return theme.palette.success.main; // Green
    case 'seller':
      return theme.palette.info.main; // Blue
    case 'hostess':
      return theme.palette.warning.main; // Yellow
    case 'renter':
      return theme.palette.warning.light; // Light Yellow
    default:
      return 'inherit';
  }
};

// StyledTableRow to add hover effect on the whole row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
  '&:hover': {
    transform: 'scale(1.005)', // Slightly scale up on hover, adjusted to prevent overflow
    boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.2)`, // Subtle shadow on hover
    backgroundColor: theme.palette.action.hover, // Use the theme's hover background color
  },
}));

const RoleColorTable = () => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ 
      maxWidth: '120%', margin: 'auto', marginTop: '20px', overflow: 'hidden',
      width: '90%',
      boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
      borderRadius: '20px',

     }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell role="header">Title</StyledTableCell>
            <StyledTableCell role="header">Name</StyledTableCell>
            <StyledTableCell role="header">Email</StyledTableCell>
            <StyledTableCell role="header">Phone Number</StyledTableCell>
            <StyledTableCell role="header">Bid Submitted</StyledTableCell>
            <StyledTableCell role="header">Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.Title}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.Bid}</TableCell>
              <StyledTableCell role={row.role}>{row.role}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleColorTable;
