import { Divider } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { ButtonComp } from 'src/components';
import PopOver from 'src/components/PopOverComp';

const sumItems = ['Item(s):', 'Additional tax:', 'Subtotal:'];

type cartProps = {
  courserType: string;
  amount: number;
  courseName: string;
  availableSeat: number;
};

type Props = {
  carts: cartProps[];
  anchorEl: null | HTMLElement;
  handleClose: () => void;
};

const CartPopover = (props: Props) => {
  const { carts, anchorEl, handleClose } = props;

  const renderComponent = () => {
    let total = 0;
    let tax = 0;

    const getTotals = (index) => {
      if (index === 0) {
        carts.forEach((item) => (total += item.amount));
        return total;
      } else if (index === 1) {
        tax = 450;
        return tax;
      } else {
        return total + tax;
      }
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
        {carts.map((item, index) => {
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
                  {item.courserType}
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
                    {item.courseName}
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
                    ₹{item.amount}
                  </Typography>
                </Grid>
              </Grid>
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
                    {item.availableSeat}
                  </Typography>
                </Grid>
              </Grid>
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
        {sumItems.map((itm, index) => {
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
                  ₹{getTotals(index)}
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
          />
        </Grid>
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
