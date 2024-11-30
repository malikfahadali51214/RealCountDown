import React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

// Example data showing time (Months) and performance metrics (Properties Sold and Revenue)
const data = [
  { month: 'Jan', propertiesSold: 20, revenue: 5000 },
  { month: 'Feb', propertiesSold: 25, revenue: 6000 },
  { month: 'Mar', propertiesSold: 30, revenue: 7500 },
  { month: 'Apr', propertiesSold: 35, revenue: 8200 },
  { month: 'May', propertiesSold: 40, revenue: 9000 },
  { month: 'Jun', propertiesSold: 50, revenue: 11000 },
  { month: 'Jul', propertiesSold: 45, revenue: 10500 },
  { month: 'Aug', propertiesSold: 55, revenue: 12000 },
  { month: 'Sep', propertiesSold: 60, revenue: 13000 },
  { month: 'Oct', propertiesSold: 65, revenue: 14000 },
  { month: 'Nov', propertiesSold: 70, revenue: 15000 },
  { month: 'Dec', propertiesSold: 75, revenue: 16000 },
];

// Styled component for the chart container with hover effects
const HoverableContainer = styled('div')(({ theme }) => ({
  marginLeft:'20px',
  marginTop: '60px',
  width: '125%',
  height: 380,
  transition: 'transform 0.3s, box-shadow 0.3s',

}));

const PerformanceChart = () => {
  const theme = useTheme();

  return (
    <HoverableContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }} // Add margins to ensure labels are visible
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis with Time Label (Months in this case) */}
          <XAxis
            dataKey="month"
            label={{
              position: 'insideBottomLeft',
              offset: -20, // Move slightly down from the axis to make space for the label
              style: { fill: theme.palette.text.primary }, // Adjust color based on the theme
            }}
          />

          {/* Y-Axis for Properties Sold */}
          <YAxis
            yAxisId="left"
            label={{
              value: 'Properties Sold',
              angle: -90,
              position: 'insideLeft',
              offset: 10, // Move slightly to the left from the axis to make space for the label
              style: { fill: theme.palette.text.primary }, // Adjust color based on the theme
            }}
          />

          {/* Y-Axis for Revenue with a different color */}
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: 'Revenue ($)',
              angle: -90,
              position: 'insideRight',
              offset: -10, // Move slightly to the right from the axis to make space for the label
              style: { fill: theme.palette.text.primary }, // Adjust color based on the theme
            }}
          />

          <Tooltip />
          <Legend />

          {/* Line for Properties Sold */}
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="propertiesSold" 
            stroke={theme.palette.primary.main} 
          />

          {/* Line for Revenue */}
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="revenue" 
            stroke={theme.palette.secondary.main} 
          />
        </LineChart>
      </ResponsiveContainer>
    </HoverableContainer>
  );
};

export default PerformanceChart;
