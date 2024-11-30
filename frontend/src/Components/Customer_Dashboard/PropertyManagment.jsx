import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

// Styled components
const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 0px 20px #bebebe, 10px 10px 20px #ffffff',
  background: '#ffffff',
}));

const StyledContainer = styled(Paper)(({ theme }) => ({
  marginBottom: '20px',
  boxShadow: '0px 0px 5px #bebebe, 10px 10px 20px #ffffff',
  border: '1px solid #ddd',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  marginTop: '60px',
  height: '87vh',
}));

const EmptyStateBox = styled(Paper)(({ theme }) => ({
  padding: '40px',
  textAlign: 'center',
  background: `linear-gradient(to right, #4e73df, #4a90e2)`,
  color: '#ffffff',
  boxShadow: '0px 0px 10px #bebebe',
  borderRadius: '8px',
}));

const FilterBox = styled(Paper)(({ theme }) => ({
  padding: '10px',
  paddingTop: '12px',
  marginBottom: '5px',
  boxShadow: '0px 0px 10px #bebebe',
  borderRadius: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  background: `linear-gradient(to right, #4e73df, #4a90e2)`,
  color: '#ffffff',
}));

const FilterItem = styled(Box)(({ theme }) => ({
  flex: '1 1 150px',
  minWidth: '150px',
  height: '40px',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: '#ffffff',
  color: '#4e73df',
  '&:hover': {
    backgroundColor: '#4a90e2',
    color: '#ffffff',
  },
}));

const ListingManagement = () => {
  const [propertyRequirements, setPropertyRequirements] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [idFilter, setIdFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0); // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Pagination

  useEffect(() => {
    const fetchPropertyRequirements = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/property-requirements', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Set all listings' status to "Pending"
        const updatedListings = response.data.map(listing => ({
          ...listing,
          status: 'Pending', // Set status to Pending for all listings
        }));
  
        setPropertyRequirements(updatedListings);
        setFilteredListings(updatedListings); // Initialize filtered listings with updated data
      } catch (error) {
        console.error('Error fetching property requirements:', error);
      }
    };
  
    fetchPropertyRequirements();
  }, []);

  const handleFilter = useCallback(() => {
    let filtered = propertyRequirements;

    if (idFilter ) {
      filtered = filtered.filter((listing) =>
        listing._id.toString().includes(idFilter)
      );
    }
    if ( roleFilter) {
      filtered = filtered.filter((listing) => listing.role === roleFilter);
    }
    if (cityFilter) {
      filtered = filtered.filter((listing) =>
        listing.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    if (propertyTypeFilter) {
      filtered = filtered.filter(
        (listing) => listing.propertyType === propertyTypeFilter
      );
    }
    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter((listing) => listing.status === statusFilter);
    }

    setFilteredListings(filtered);
  }, [idFilter, roleFilter, cityFilter, propertyTypeFilter, statusFilter, propertyRequirements]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleReset = () => {
    setIdFilter('');
    setRoleFilter('');
    setCityFilter('');
    setPropertyTypeFilter('');
    setStatusFilter('');
    setFilteredListings(propertyRequirements);
  };

  const headers = [
    { label: "ID", key: "_id" },
    { label: "Role", key: "role" },
    { label: "City", key: "city" },
    { label: "Property Type", key: "propertyType" },
    { label: "Status", key: "status" },
    { label: "Price", key: "price" },
    { label: "Area Size", key: "areaSize" },
    { label: "Email", key: "emailAddress" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Bedrooms", key: "bedrooms" },
    { label: "Bathrooms", key: "bathrooms" },
    { label: "Plot Number", key: "plotNumber" },
  ];

  const csvReport = {
    data: filteredListings,
    headers: headers,
    filename: 'Listings_Report.csv'
  };

  const FilterComponent = useMemo(() => (
    <FilterBox>
      <FilterItem key="idFilter">
        <TextField
          label="ID"
          variant="outlined"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          fullWidth
          InputProps={{
            style: {
              color: '#ffffff',
              height: '40px',
              padding: '8px 14px',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#ffffff',
            },
            shrink: true,
          }}
        />
      </FilterItem>
      <FilterItem key="roleFilter">
        <TextField
          label="Role"
          select
          variant="outlined"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          fullWidth
          InputProps={{
            style: {
              color: '#ffffff',
              height: '40px',
              padding: '8px 14px',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#ffffff',
            },
            shrink: true,
          }}
        >
          <MenuItem value="Buyer">Buyer</MenuItem>
          <MenuItem value="Seller">Seller</MenuItem>
          <MenuItem value="Tenant">Tenant</MenuItem>
          <MenuItem value="Renter">Renter</MenuItem>
        </TextField>
      </FilterItem>
      <FilterItem key="cityFilter">
        <TextField
          label="City"
          variant="outlined"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          fullWidth
          InputProps={{
            style: {
              color: '#ffffff',
              height: '40px',
              padding: '8px 14px',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#ffffff',
            },
            shrink: true,
          }}
        />
      </FilterItem>
      <FilterItem key="propertyTypeFilter">
        <TextField
          label="Property Type"
          select
          variant="outlined"
          value={propertyTypeFilter}
          onChange={(e) => setPropertyTypeFilter(e.target.value)}
          fullWidth
          InputProps={{
            style: {
              color: '#ffffff',
              height: '40px',
              padding: '8px 14px',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#ffffff',
            },
            shrink: true,
          }}
        >
          <MenuItem value="house">House</MenuItem>
          <MenuItem value="flat">Flat</MenuItem>
          <MenuItem value="upperPortion">Upper Portion</MenuItem>
          <MenuItem value="lowerPortion">Lower Portion</MenuItem>
          <MenuItem value="farmHouse">Farm House</MenuItem>
          <MenuItem value="room">Room</MenuItem>
          <MenuItem value="pentHouse">Pent House</MenuItem>
        </TextField>
      </FilterItem>
      <FilterItem>
        <CustomButton variant="contained"
          onClick={handleReset}
          fullWidth
        >
          Reset
        </CustomButton>
      </FilterItem>
      <FilterItem>
        <CustomButton variant="contained" fullWidth>
          <CSVLink {...csvReport} style={{ textDecoration: 'none', color: 'inherit' }}>
            Export as CSV
          </CSVLink>
        </CustomButton>
      </FilterItem>
    </FilterBox>
  ), [idFilter, roleFilter, cityFilter, propertyTypeFilter, handleReset, csvReport]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            overflow: 'hidden',
            padding: '20px',
          }}
        >
          <StyledContainer maxWidth="lg">
            <Box>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{
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
                }}
              >
                Listing Management
              </Typography>
              {FilterComponent}
              <GradientPaper>
                {filteredListings.length === 0 ? (
                  <EmptyStateBox>
                    <Typography variant="h6" gutterBottom>
                      No Listings Available
                    </Typography>
                    <Typography variant="body1">
                      There are no listings that match the current filters.
                      Please try adjusting the filters or reset them to view
                      all available listings.
                    </Typography>
                  </EmptyStateBox>
                ) : (
                  <TableContainer
                    component={Paper}
                    sx={{ maxHeight: 410, overflow: 'auto' }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={15} sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: '20px',
                                flexWrap: 'wrap',
                                position: 'sticky',
                                zIndex: 1,
                              }}
                            >
                              <Button
                                variant={statusFilter === '' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                All ({propertyRequirements.length})
                              </Button>
                              <Button
                                variant={statusFilter === 'Active' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('Active')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                Active ({propertyRequirements.filter(listing => listing.status === 'Active').length})
                              </Button>
                              <Button
                                variant={statusFilter === 'Pending' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('Pending')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                Pending ({propertyRequirements.filter(listing => listing.status === 'Pending').length})
                              </Button>
                              <Button
                                variant={statusFilter === 'Rejected' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('Rejected')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                Rejected ({propertyRequirements.filter(listing => listing.status === 'Rejected').length})
                              </Button>
                              <Button
                                variant={statusFilter === 'Expired' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('Expired')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                Expired ({propertyRequirements.filter(listing => listing.status === 'Expired').length})
                              </Button>
                              <Button
                                variant={statusFilter === 'Downgraded' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('Downgraded')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                Downgraded ({propertyRequirements.filter(listing => listing.status === 'Downgraded').length})
                              </Button>
                              <Button
                                variant={statusFilter === 'Inactive' ? 'contained' : 'outlined'}
                                onClick={() => setStatusFilter('Inactive')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                              >
                                Inactive ({propertyRequirements.filter(listing => listing.status === 'Inactive').length})
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', minWidth: '50px' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '100px' }}>Role</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '150px' }}>City</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '150px' }}>Property Type</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '100px' }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', minWidth: '100px' }}>Price</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', minWidth: '150px' }}>Area Size</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '200px' }}>Email Address</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '150px' }}>Phone Number</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '150px' }}>Landline</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '150px' }}>Contact Method</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '150px' }}>Plot Number</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', minWidth: '100px' }}>Bedrooms</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', minWidth: '100px' }}>Bathrooms</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', minWidth: '200 px' }}>Additional Features</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredListings
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((listing, index) => (
                            <TableRow key={listing._id} hover>
                              <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{index + 1}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.role}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.city}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.propertyType}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.status}</TableCell>
                              <TableCell sx={{ textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.price}</TableCell>
                              <TableCell sx={{ textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.areaSize} {listing.areaSizeUnit}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.emailAddress}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.phoneNumber}</TableCell>
                              <TableCell sx={{ textAlign: ' left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.landline}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.contactMethod}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.plotNumber}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.bedrooms}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.bathrooms}</TableCell>
                              <TableCell sx={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {listing.additionalFeatures.length > 0
                                  ? listing.additionalFeatures.map((feature, index) =>
                                      index === 0 ? feature : `${feature}, `
                                    )
                                  : 'N/A'}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={filteredListings.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </GradientPaper>
            </Box>
          </StyledContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ListingManagement;