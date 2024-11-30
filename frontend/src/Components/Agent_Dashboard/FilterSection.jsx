import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Paper, Slider, Select, MenuItem, FormControlLabel, Checkbox, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';

const FilterContainer = styled(Paper)({
  padding: '20px',
  marginTop: '50px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
  width: '1000px',
});

const OptionButton = styled(Button)(({ theme, active }) => ({
  margin: '5px',
  padding: '8px 16px',
  border: '2px solid transparent',
  borderRadius: '20px',
  color: active ? '#fff' : theme.palette.primary.main,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  borderColor: theme.palette.primary.main,
  boxShadow: active ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  marginTop: '15px',
  padding: '8px 16px',
  borderRadius: '20px',
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

const CityListContainer = styled(Box)({
  marginTop: '20px',
});

const CityItem = styled(Box)(({ theme }) => ({
  padding: '15px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.grey[300]}`,
  cursor: 'pointer',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
}));

const CityName = styled(Typography)({
  fontWeight: '600',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '0.9rem',
});

const CityListings = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  marginTop: '3px',
}));

// Price Range Filter Component
const PriceRangeFilter = ({ priceRange, onPriceChange }) => {
  return (
    <Box marginBottom={2}>
      <Typography gutterBottom variant="h6">Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue) => onPriceChange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={1000000}
        sx={{
          width: '90%',
          margin: '0 auto',
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:hover': {
              boxShadow: 'inherit',
            },
          },
          '& .MuiSlider-track': {
            height: 8,
          },
          '& .MuiSlider-rail': {
            height: 8,
            backgroundColor: '#ddd',
          },
        }}
      />
    </Box>
  );
};

// Area Size Filter Component
const AreaSizeFilter = ({ areaSize, onSizeChange }) => {
  return (
    <Box marginBottom={2}>
      <Typography gutterBottom variant="h6">Area Size (sq ft)</Typography>
      <Slider
        value={areaSize}
        onChange={(event, newValue) => onSizeChange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={5000}
        sx={{
          width: '90%',
          margin: '0 auto',
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:hover': {
              boxShadow: 'inherit',
            },
          },
          '& .MuiSlider-track': {
            height: 8,
          },
          '& .MuiSlider-rail': {
            height: 8,
            backgroundColor: '#ddd',
          },
        }}
      />
    </Box>
  );
};

// Bedrooms and Bathrooms Filter Component
const BedroomsBathroomsFilter = ({ bedrooms, bathrooms, onBedroomsChange, onBathroomsChange }) => {
  return (
    <Box marginBottom={2}>
      <Typography gutterBottom variant="h6">Bedrooms & Bathrooms</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography gutterBottom>Bedrooms</Typography>
          <Select fullWidth value={bedrooms} onChange={onBedroomsChange}>
            {[...Array(10).keys()].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Bathrooms</Typography>
          <Select fullWidth value={bathrooms} onChange={onBathroomsChange}>
            {[...Array(10).keys()].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
};

// Property Type Filter Component
const PropertyTypeFilter = ({ selectedPropertyTypes, onPropertyTypeChange }) => {
  const propertyTypes = ['House', 'Flat', 'Upper Portion', 'Lower Portion', 'Farm House', 'Room', 'Pent House'];

  return (
    <Box marginBottom={2}>
      <Typography gutterBottom variant="h6">Property Type</Typography>
      <Box>
        {propertyTypes.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={selectedPropertyTypes.includes(type.toLowerCase().replace(' ', ''))}
                onChange={(event) => {
                  const newSelectedPropertyTypes = event.target.checked
                    ? [...selectedPropertyTypes, type.toLowerCase().replace(' ', '')]
                    : selectedPropertyTypes.filter((t) => t !== type.toLowerCase().replace(' ', ''));
                  onPropertyTypeChange(newSelectedPropertyTypes);
                }}
              />
            }
            label={type}
          />
        ))}
      </Box>
    </Box>
  );
};

// Main FilterSection Component
const FilterSection = ({ cities, selectedFilter, onFilterChange, onCityFilterChange, onResetFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [areaSize, setAreaSize] = useState([0, 5000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handlePriceChange = (newValue) => setPriceRange(newValue);
  const handleBedroomsChange = (event) => setBedrooms(event.target.value);
  const handleBathroomsChange = (event) => setBathrooms(event.target.value);
  const handleSizeChange = (newValue) => setAreaSize(newValue);
  const handlePropertyTypeChange = (newSelectedPropertyTypes) => setSelectedPropertyTypes(newSelectedPropertyTypes);

  return (
    <FilterContainer>
      <Grid container spacing={1} justifyContent="center">
        {['Buyer', 'Seller', 'Tenant', 'Renter'].map((filter) => (
          <Grid item key={filter}>
            <OptionButton
              variant={selectedFilter === filter ? 'contained' : 'outlined'}
              onClick={() => onFilterChange(filter)}
              active={selectedFilter === filter}
            >
              {filter}
            </OptionButton>
          </Grid>
        ))}
      </Grid>

      <CityListContainer>
        <Grid container spacing={1}>
          {cities.map((city) => (
            <Grid item xs={6} sm={4} md={ 3} key={city.name}>
              <CityItem onClick={() => onCityFilterChange(city.name)}>
                <CityName variant="body1">{city.name}</CityName>
                <CityListings variant="body2">
                  {city.listings} listings
                </CityListings>
              </CityItem>
            </Grid>
          ))}
        </Grid>
      </CityListContainer>

      <Button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} variant="outlined" style={{ marginTop: '20px' }}>
        {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
      </Button>
      <Collapse in={showAdvancedFilters}>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6}>
            <PriceRangeFilter priceRange={priceRange} onPriceChange={handlePriceChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BedroomsBathroomsFilter 
              bedrooms={bedrooms} 
              bathrooms={bathrooms} 
              onBedroomsChange={handleBedroomsChange} 
              onBathroomsChange={handleBathroomsChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AreaSizeFilter areaSize={areaSize} onSizeChange={handleSizeChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PropertyTypeFilter selectedPropertyTypes={selectedPropertyTypes} onPropertyTypeChange={handlePropertyTypeChange} />
          </Grid>
        </Grid>
      </Collapse>
      <ResetButton onClick={onResetFilters} style={{ marginTop: '20px' }}>Reset Filters</ResetButton>
    </FilterContainer>
  );
};

export default FilterSection;