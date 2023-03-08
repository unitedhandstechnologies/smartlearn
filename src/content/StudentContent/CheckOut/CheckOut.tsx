import React, { useState } from 'react';
import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { MuiConfirmModal } from 'src/components';
import { HTTP_STATUSES } from 'src/Config/constant';
import useCartInfo from 'src/hooks/useCartInfo';

import { API_SERVICES } from 'src/Services';
import CheckoutScreen from './CheckoutScreen';
import Summary from './Summary';

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
          successMessage: 'Course enrolled successfully',
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
