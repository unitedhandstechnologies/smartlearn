import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { HTTP_STATUSES } from 'src/Config/constant';
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
  const [addToCart, setAddToCart]=useState<any>([]);
  const [loading, setLoading]=useState<boolean>(false);
  const { studentDetails, updateStudentInfo } = useStudentInfo();  
  let total = 0;
  let tax=0;
  addToCart.forEach((item) => {
      total += item.total
      tax += item.tax  
    return {total,tax}});
  let totalAmount = total + tax;

  const fetchData = async () => {
    try {
      setLoading(true);
      setAddToCart([]);
      const response: any = await API_SERVICES.AddToCartService.getAllAddToCart(
        studentDetails?.id
      );
      if(response?.status < HTTP_STATUSES.BAD_REQUEST){
        if(response?.data?.AddToCart?.length) {
          setAddToCart(response?.data?.AddToCart)
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData()
  },[studentDetails])

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
          total={totalAmount}
          purchaseData={addToCart}
          fetchData={fetchData}
        />
      </Grid>
    </Grid>
  );
};

export default CheckOut;
