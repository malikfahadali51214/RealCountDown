// PackageSelection.js
import React from 'react';

const packages = [
  { id: 1, duration: '3 Days', price: 2800 }, // Price in PKR
  { id: 2, duration: '7 Days', price: 5600 }, // Price in PKR
  { id: 3, duration: '1 Month', price: 14000 }, // Price in PKR
];

const PackageSelection = ({ selectedPackage, onPackageSelect }) => {
  // Inline styles
  const packageSelectionStyle = {
    marginBottom: '20px',
    textAlign: 'center',
  };

  const packagesStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px', // Add gap between boxes
  };

  const packageStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    width: '300px', // Adjusted width for better spacing
    boxShadow: selectedPackage ? '0 4px 20px rgba(0, 123, 255, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const packageHoverStyle = {
    backgroundColor: '#f7f9fc',
    boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
    transform: 'scale(1.05)',
  };

  const selectedStyle = {
    borderColor: '#007bff',
    backgroundColor: '#e7f0ff',
  };

  return (
    <div style={packageSelectionStyle}>
      <h5 style={{ fontWeight: 'bold', color: '#333' }}>Select a Package</h5>
      <div style={packagesStyle}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              ...packageStyle,
              ...(selectedPackage === pkg.id ? selectedStyle : {}),
            }}
            onClick={() => onPackageSelect(pkg.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = packageHoverStyle.backgroundColor;
              e.currentTarget.style.boxShadow = packageHoverStyle.boxShadow;
              e.currentTarget.style.transform = packageHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = selectedPackage === pkg.id ? selectedStyle.backgroundColor : '';
              e.currentTarget.style.boxShadow = selectedPackage ? '0 4px 20px rgba(0, 123, 255, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = '';
            }}
          >
            <h6 style={{ fontWeight: 'bold', margin: '10px 0' }}>{pkg.duration}</h6>
            <p style={{ fontSize: '1.2rem', color: '#007bff', margin: '5px 0' }}>
              Price: <strong>{pkg.price} PKR</strong>
            </p>
            <button style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '10px'
            }} onClick={() => onPackageSelect(pkg.id)}>
              Select Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSelection;