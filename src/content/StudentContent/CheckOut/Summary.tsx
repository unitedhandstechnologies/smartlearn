import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonComp, Heading, MuiConfirmModal } from 'src/components';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import useCartInfo from 'src/hooks/useCartInfo';
import useStudentInfo from 'src/hooks/useStudentInfo';
import { API_SERVICES } from 'src/Services';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 0,
    padding: theme.spacing(0)
  }
}));
type SummaryProps = {
  purchaseData?: any[];
  coursePrice?: number;
  tax?: number;
  totalAmount?: number;
};

const Summary = ({
  purchaseData,
  coursePrice,
  tax,
  totalAmount,
}: SummaryProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateCartInfo } = useCartInfo();
  const [confirmModal, setConfirmModal] = useState<any>({ open: false });

  const onClickRemoveCourse = async (id, studentId) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any = await API_SERVICES.AddToCartService.delete(
        id,
        {
          successMessage: 'Course removed Successfully',
          failureMessage: 'Failed to delete Course'
        }
      );
      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        updateCartInfo(studentId?.user_id);
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete this Course?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

    return (
      <Grid
        container
        direction={'column'}
        spacing={2}
        sx={{
          padding: theme.spacing(0.4),
          border: '1px solid #3C78F0',
          borderRadius: '8px'
        }}
      >
        <Grid item>
          <Heading
            headingText={'Summary'}
            headerFontSize={'24px'}
            headerFontFamily={'IBM Plex Serif'}
            headerFontWeight={500}
            headingColor={'#3C414B'}
          />
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#78828C'
            }}
          >
            Items:
          </Typography>
        </Grid>
        <Grid item>
          <CourseDetails
            purchaseData={purchaseData}
            onClickRemoveCourse={onClickRemoveCourse}
          />
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#78828C'
            }}
          >
            Price:
          </Typography>
        </Grid>
        <Grid container item>
          <Grid item xs>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 500,
                fontFamily: 'Switzer',
                color: '#3C414B'
              }}
            >
              Item(s):
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 400,
                fontFamily: 'Switzer',
                color: '#3C414B'
              }}
            >
              ₹ {coursePrice.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 400,
                fontFamily: 'Switzer',
                color: '#3C414B'
              }}
            >
              Additional Tax:
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 400,
                fontFamily: 'Switzer',
                color: '#3C414B'
              }}
            >
              ₹ {tax.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs>
            <Typography
              style={{
                fontSize: '24px',
                fontWeight: 400,
                fontFamily: 'Switzer',
                color: '#3C414B'
              }}
            >
              Subtotal:
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'Switzer',
                color: '#3C414B'
              }}
            >
              ₹ {totalAmount.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
      </Grid>
    );
};
export default Summary;

export const CourseDetails = ({ purchaseData, onClickRemoveCourse }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid container spacing={2} direction={'column'}>
      {purchaseData?.length
        ? purchaseData?.map((item, index) => {
            return (
              <Grid item key={index}>
                <Grid container item>
                  <Grid item xs>
                    <ChipComp
                      label={item.course_type}
                      style={{
                        borderColor: '#3CC878',
                        color: '#78828C',
                        fontSize: theme.MetricsSizes.small_x,
                        fontWeight: theme.fontWeight.regular
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <ButtonComp
                      buttonText="remove"
                      backgroundColor={'transparent'}
                      buttonTextColor={'#78828C'}
                      height={theme.MetricsSizes.regular_xx}
                      buttonFontSize={theme.MetricsSizes.small_x}
                      buttonFontWeight={theme.fontWeight.regular}
                      classes={{ root: classes.button }}
                      onClickButton={() => onClickRemoveCourse(item?.id, item?.user_id)}
                    />
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs>
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      {item.course_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      ₹ {item.total}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs>
                  <Grid item xs>
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      No. of Available Seats
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      border: '1px solid #3C78F0',
                      padding: 0.5,
                      textAlign: 'center',
                      borderRadius: '4px',
                      alignSelf: 'center'
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      {item.available_student_count}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};
