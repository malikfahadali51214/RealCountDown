import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled('div')(({ theme }) => ({
  background: `linear-gradient(to right, #4e73df, #4a90e2)`,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(4),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  marginTop:'15px',
  marginLeft:'130px',
  width: '420px',
  height: '150px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
  },
  color: '#000', // Black text color
  justifyContent: 'space-between',
}));

const EarningsHistoryTable = () => {
  const [balanceOpen, setBalanceOpen] = useState(false);

  // Sample transaction history
  const transactions = [
    { date: '2024-06-21', description: 'Deposit', amount: 3024.00 },
    { date: '2024-05-15', description: 'Deposit', amount: 1500.00 },
    { date: '2024-04-10', description: 'Withdrawal', amount: -500.00 },
    { date: '2024-03-25', description: 'Deposit', amount: 1000.00 },
  ];

  // Function to calculate total deposits
  const calculateTotalDeposits = () => {
    // Filter deposits and withdrawals
    const deposits = transactions.filter(transaction => transaction.amount > 0);
    const withdrawals = transactions.filter(transaction => transaction.amount < 0);

    // Sum deposits
    const totalDeposits = deposits.reduce((total, transaction) => total + transaction.amount, 0);

    // Subtract withdrawals
    const totalWithdrawals = withdrawals.reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate net deposits
    const netTotalDeposits = totalDeposits + totalWithdrawals;

    return netTotalDeposits;
  };

  // Function to format currency
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  // Calculate total deposits
  const totalDeposits = calculateTotalDeposits();

  // Handle dialog open/close
  const handleBalanceOpen = () => setBalanceOpen(true);
  const handleBalanceClose = () => setBalanceOpen(false);

  return (
    <>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <StyledPaper elevation={9}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'left' }}>
              Total Deposits
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left', color: '#fff' }}>
              {formatCurrency(totalDeposits)}
            </Typography>
            <Typography variant="body1" color="#ddd" sx={{ textAlign: 'left' }}>
              Last Deposit on {new Date(transactions[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ borderRadius: 4, color: '#fff' }}
            onClick={handleBalanceOpen}
          >
            View History
          </Button>
        </StyledPaper>
      </Box>

      <Dialog open={balanceOpen} onClose={handleBalanceClose} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction History</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell align="right" style={{ color: transaction.amount < 0 ? 'red' : 'green' }}>
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBalanceClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EarningsHistoryTable;
