import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { HTTP_STATUSES } from 'src/Config/constant';
import useCartInfo from 'src/hooks/useCartInfo';
import useStudentInfo from 'src/hooks/useStudentInfo';
import { API_SERVICES } from 'src/Services';
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
  const { cartDetails } = useCartInfo();
  let total = 0;
  let tax=0;
  cartDetails.forEach((item) => {
      total += item.total
      tax += item.tax  
    return {total,tax}});
  let totalAmount = total + tax;

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
        <CheckoutScreen total={totalAmount} />
      </Grid>
      <Grid item>
        <Summary
          coursePrice={total}
          tax={tax}
          totalAmount={totalAmount}
          purchaseData={cartDetails}
        />
      </Grid>
    </Grid>
  );
};

export default CheckOut;
