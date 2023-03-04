import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { MuiConfirmModal } from 'src/components';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
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
  const { cartDetails, updateCartInfo } = useCartInfo();
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState<any>({ open: false });
  const navigateTo = useNavigate();
  let total = 0;
  let tax = 0;
  let courseId;
  let studentId;
  let rowId;
  let courseName;
  cartDetails.forEach((item) => {
    total += item.total;
    tax += item.tax;
    courseId = item.course_id;
    studentId = item.user_id;
    rowId = item.id;
    courseName = item.course_name;
    return { total, tax, courseId, studentId, rowId, courseName };
  });
  let totalAmount = total + tax;

  const onClickCheckout = async (amount) => {
    let data = {
      status_id: 1,
      enrolled_date: new Date().toLocaleDateString(),
      amount: amount
    };
    const enrollRes: any =
      await API_SERVICES.enrollmentManagementService.create(
        studentId,
        courseId,
        {
          data: data,
          successMessage: 'Course enrolled succefully',
          failureMessage: 'There is something wrong to enroll the course'
        }
      );
    if (enrollRes?.status < HTTP_STATUSES.BAD_REQUEST) {
      const removeCart: any = await API_SERVICES.AddToCartService.delete(
        rowId,
        {}
      );
      if (removeCart?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateCartInfo(studentId);
        navigateTo('/home/thankyou-page', {
          state: courseName,
          replace: true
        });
      }
    }
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        backgroundColor: theme.Colors.white,
        padding: 5,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      }}
    >
      <Grid item xs>
        <CheckoutScreen total={totalAmount} onClickCheckout={onClickCheckout} />
      </Grid>
      <Grid item>
        <Summary
          coursePrice={total}
          tax={tax}
          totalAmount={totalAmount}
          purchaseData={cartDetails}
        />
      </Grid>
      {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
    </Grid>
  );
};

export default CheckOut;
