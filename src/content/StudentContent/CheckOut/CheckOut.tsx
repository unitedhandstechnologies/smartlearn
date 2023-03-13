import React, { useState } from 'react';
import { Container, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { MuiConfirmModal } from 'src/components';
import { HTTP_STATUSES } from 'src/Config/constant';
import useCartInfo from 'src/hooks/useCartInfo';
import { API_SERVICES } from 'src/Services';
import CheckoutScreen from './CheckoutScreen';
import Summary from './Summary';
import useStudentInfo from 'src/hooks/useStudentInfo';

const CheckOut = () => {
  const theme = useTheme();
  const { cartDetails, updateCartInfo } = useCartInfo();
  const { studentDetails } = useStudentInfo();
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
    try {
      let req = { user_id: studentDetails.id, amount: 1, email:studentDetails.email_id, mobile_no:studentDetails.phone_number };
      const response: any = await API_SERVICES.paymentService.create({
        data: req
      });
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        var config = {
          root: '',
          flow: 'DEFAULT',
          data: {
            orderId: response.data.orderId,
            token: response.data.response.body.txnToken,
            tokenType: 'TXN_TOKEN',
            amount: '1.00'
          },
          merchant: {
            mid: 'JAINAM95623432247480',
            redirect: false
          },
          handler: {
            transactionStatus: async function transactionStatus(paymentStatus) {
              if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                let data = {
                  status_id: 1,
                  enrolled_date: new Date().toLocaleDateString(),
                  amount: 1
                };
                const enrollRes: any =
                  await API_SERVICES.enrollmentManagementService.create(
                    studentId,
                    courseId,
                    {
                      data: data,
                      successMessage: 'Course enrolled successfully',
                      failureMessage:
                        'There is something wrong to enroll the course'
                    }
                  );
                if (enrollRes?.status < HTTP_STATUSES.BAD_REQUEST) {
                  const removeCart: any =
                    await API_SERVICES.AddToCartService.delete(rowId, {});
                  if (removeCart?.status < HTTP_STATUSES.BAD_REQUEST) {
                    updateCartInfo(studentId);
                    (window as any).Paytm.CheckoutJS.close();
                    navigateTo('/home/thankyou-page', {
                      state: courseName,
                      replace: true
                    });
                  }
                }
              }
            },
            notifyMerchant: function notifyMerchant(eventName, data) {
            
            }
          }
        };

        if ((window as any).Paytm && (window as any).Paytm.CheckoutJS) {
          (window as any).Paytm.CheckoutJS.init(config)
            .then(function onSuccess() {
              (window as any).Paytm.CheckoutJS.invoke();
            })
            .catch(function onError(error) {
              console.log('error => ', error);
            });
        }
      }
    } catch (error) {
      console.error(error, 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={4}
        sx={{
          backgroundColor: theme.Colors.white,
          padding: theme.spacing(4.5, 0),
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Grid item xs>
          <CheckoutScreen
            total={totalAmount}
            onClickCheckout={onClickCheckout}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Summary
            coursePrice={total}
            tax={tax}
            totalAmount={totalAmount}
            purchaseData={cartDetails}
          />
        </Grid>
        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
      </Grid>
    </Container>
  );
};

export default CheckOut;
