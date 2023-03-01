import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import CheckoutScreen from './CheckoutScreen';
import Summary from './Summary';

const purchaseData = [
  {
    id: 1,
    chipValue: 'Course',
    title: 'Basics of Stock Market investments',
    price: 4500,
    seat: 'No.of available seats',
    seatCount: 2
  },
  {
    id: 2,
    chipValue: 'Workshop',
    title: 'Basics of Stock Market investments',
    price: 4500,
    seat: 'No.of available seats',
    seatCount: 4
  },
  {
    id: 3,
    chipValue: 'Seminor',
    title: 'Basics of Stock Market investments',
    price: 4500,
    seat: 'No.of available seats',
    seatCount: 9
  }
];
const CheckOut = () => {
  const theme = useTheme();
  let coursePrice = 4500;
  let tax = (4500 / 100) * 10 * purchaseData.length;
  let total = purchaseData.length * coursePrice + tax;

  return (
    <Grid
      container
      spacing={4}
      sx={{
        padding: 5,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      }}
    >
      <Grid item xs>
        <CheckoutScreen total={total} />
      </Grid>
      <Grid item>
        <Summary
          coursePrice={coursePrice}
          tax={tax}
          total={total}
          purchaseData={purchaseData}
        />
      </Grid>
    </Grid>
  );
};

export default CheckOut;
