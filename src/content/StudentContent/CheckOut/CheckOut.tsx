import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import CheckoutScreen from './CheckoutScreen';
import Summary from './Summary';

const CheckOut = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 5,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      }}
    >
      <Grid item xs>
        <CheckoutScreen />
      </Grid>
      <Grid item>
        <Summary />
      </Grid>
    </Grid>
  );
};

export default CheckOut;
