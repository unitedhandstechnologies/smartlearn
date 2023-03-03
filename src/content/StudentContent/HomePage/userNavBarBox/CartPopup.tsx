import { useTheme } from '@material-ui/core';
import { Divider } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ButtonComp, MuiConfirmModal } from 'src/components';
import PopOver from 'src/components/PopOverComp';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import useCartInfo from 'src/hooks/useCartInfo';
import { API_SERVICES } from 'src/Services';

const sumItems = ['Item(s):', 'Additional tax:', 'Subtotal:'];

type cartProps = {
  course_type: string;
  total: number;
  tax: number;
  course_name: string;
  available_student_count: number;
};

type Props = {
  carts: any;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
};

const CartPopover = (props: Props) => {
  const { carts, anchorEl, handleClose } = props;
  const theme = useTheme();
  const { updateCartInfo } = useCartInfo();
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const [confirmModal, setConfirmModal] = useState<any>({ open: false });

  const renderComponent = () => {
    let total = 0;
    let tax = 0;

    const getTotals = (index) => {
      if (index === 0) {
        carts.forEach((item) => (total += item.total));
        return total;
      } else if (index === 1) {
        carts.forEach((item) => (tax += item.tax));
        return tax;
      } else {
        return total + tax;
      }
    };

    const handleClickButton = (data) => {
      navigateTo('/home/checkout-page', {
        replace: true
      });
      handleClose();
    };

    const onClickRemoveCourse = async (rowData) => {
      const onCancelClick = () => {
        setConfirmModal({ open: false });
      };
      const onConfirmClick = async () => {
        const deleteUserRes: any = await API_SERVICES.AddToCartService.delete(
          rowData?.id,
          {
            successMessage: 'Course removed Successfully',
            failureMessage: 'Failed to delete Course'
          }
        );
        if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          onCancelClick();
          updateCartInfo(rowData?.user_id);
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
      <>
        <Grid paddingLeft={1.5}>
          <Typography
            style={{
              fontFamily: 'Switzer Variable',
              fontSize: 16,
              fontWeight: 400,
              color: '#78828C'
            }}
          >
            items:
          </Typography>
        </Grid>
        <Divider light={true} style={{ paddingTop: 17 }} />
        {carts?.map((item, index) => {
          return (
            <Grid key={index} padding={1} paddingTop={2}>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Grid
                  style={{
                    color: '#78828C',
                    border: ' 1px solid #3CC878',
                    fontSize: '12px',
                    fontFamily: 'Switzer',
                    fontWeight: 400,
                    height: 25,
                    paddingLeft: 6,
                    paddingRight: 6,
                    paddingTop: 3,
                    borderRadius: 17
                  }}
                >
                  {item.course_type}
                </Grid>
                <Grid>
                  <ButtonComp
                    variant={'outlined'}
                    buttonText={'remove'}
                    buttonTextColor={'#78828C'}
                    buttonFontSize={12}
                    buttonFontFamily={'Switzer'}
                    buttonFontWeight={400}
                    height={'25px'}
                    style={{
                      background: 'none',
                      border: 'none'
                    }}
                    onClickButton={() => onClickRemoveCourse(item)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} padding={1.5} paddingTop={2.5}>
                <Grid xs={8.5} md={8.5}>
                  <Typography
                    style={{
                      fontFamily: 'Switzer',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#3C414B'
                    }}
                  >
                    {item.course_name}
                  </Typography>
                </Grid>
                <Grid xs={3.5} md={3.5} alignItems={'flex-end'}>
                  <Typography
                    style={{
                      fontFamily: 'Switzer',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#3C414B',
                      textAlign: 'end'
                    }}
                  >
                    ₹{item.total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              {item.course_type !== 'Recorded Course' && (
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Grid paddingLeft={1}>
                    <Typography
                      style={{
                        fontFamily: 'Switzer',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#3C414B'
                      }}
                    >
                      No. of Seats
                    </Typography>
                  </Grid>
                  <Grid
                    style={{
                      paddingLeft: 6,
                      paddingRight: 6,
                      border: '1.5px solid #3C78F0',
                      borderRadius: 4,
                      marginRight: 14
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: 'Switzer',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#3C414B',
                        textAlign: 'end'
                      }}
                    >
                      {item.available_student_count}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {index != carts.length - 1 ? (
                <Divider light={true} style={{ paddingTop: 20 }} />
              ) : null}
            </Grid>
          );
        })}
        <Grid paddingLeft={1.5} paddingTop={1.5}>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: '#78828C'
            }}
          >
            pricing:
          </Typography>
        </Grid>
        <Divider light={true} style={{ paddingTop: 15 }} />
        {sumItems?.map((itm, index) => {
          return (
            <Grid key={index} container paddingLeft={1.5} paddingTop={1.3}>
              <Grid item>
                <Typography
                  style={{
                    fontFamily: 'Switzer',
                    fontSize: `${index === 2 ? '24px' : '18px'}`,
                    fontWeight: 400,
                    color: '#3C414B'
                  }}
                >
                  {itm}
                </Typography>
                {index == 1 ? (
                  <Divider light={true} style={{ paddingTop: 18 }} />
                ) : null}
              </Grid>
              <Grid item xs paddingRight={2}>
                <Typography
                  style={{
                    fontFamily: 'Switzer',
                    fontSize: '18px',
                    fontWeight: `${index === 2 ? 600 : 400}`,
                    color: '#3C414B',
                    textAlign: 'end'
                  }}
                >
                  ₹{getTotals(index).toFixed(2)}
                </Typography>
                {index == 1 ? (
                  <Divider light={true} style={{ paddingTop: 18 }} />
                ) : null}
              </Grid>
            </Grid>
          );
        })}
        <Grid padding={1.5} paddingTop={13}>
          <ButtonComp
            buttonText={'Checkout'}
            buttonFontSize={14}
            buttonFontWeight={400}
            btnBorderRadius={4}
            btnWidth={'100%'}
            onClickButton={() => handleClickButton(carts)}
          />
        </Grid>
        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
      </>
    );
  };

  return (
    <PopOver
      anchorEl={anchorEl}
      handleClose={handleClose}
      popOverTitle={'Your Cart'}
      renderContent={renderComponent}
    />
  );
};

export default CartPopover;
