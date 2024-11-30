import React from 'react';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const FilterContainer = styled(Paper)({
  padding: '20px',
  marginTop: '50px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const OptionButton = styled(Button)(({ theme, active }) => ({
  margin: '10px',
  padding: '10px 20px',
  border: '2px solid transparent',
  borderRadius: '20px',
  color: active ? '#fff' : theme.palette.primary.main,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  borderColor: theme.palette.primary.main,
  boxShadow: active ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

const CityListContainer = styled(Box)({
  marginTop: '20px',
});

const CityItem = styled(Box)(({ theme }) => ({
  padding: '10px',
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  cursor: 'pointer',
  textAlign: 'center',
}));

const FilterSection = ({ cities, selectedFilter, onFilterChange, onCityFilterChange }) => {
  return (
    <FilterContainer>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <OptionButton
            variant={selectedFilter === 'Buyer' ? 'contained' : 'outlined'}
            active={selectedFilter === 'Buyer'}
            onClick={() => onFilterChange('Buyer')}
          >
            Buyer
          </OptionButton>
        </Grid>
        <Grid item>
          <OptionButton
            variant={selectedFilter === 'Seller' ? 'contained' : 'outlined'}
            active={selectedFilter === 'Seller'}
            onClick={() => onFilterChange('Seller')}
          >
            Seller
          </OptionButton>
        </Grid>
        <Grid item>
          <OptionButton
            variant={selectedFilter === 'Tenant' ? 'contained' : 'outlined'}
            active={selectedFilter === 'Tenant'}
            onClick={() => onFilterChange('Tenant')}
          >
            Tenant
          </OptionButton>
        </Grid>
        <Grid item>
          <OptionButton
            variant={selectedFilter === 'Renter' ? 'contained' : 'outlined'}
            active={selectedFilter === 'Renter'}
            onClick={() => onFilterChange('Renter')}
          >
            Renter
          </OptionButton>
        </Grid>
      </Grid>
      <CityListContainer>
        <Grid container spacing={2}>
          {cities.map((city) => (
            <Grid item xs={3} sm={2} md={1.5} key={city.name}>
              <CityItem onClick={() => onCityFilterChange(city.name)}>
                <Typography variant="body1">{city.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {city.listings} listings
                </Typography>
              </CityItem>
            </Grid>
          ))}
        </Grid>
      </CityListContainer>
    </FilterContainer>
  );
};

export default FilterSection;
