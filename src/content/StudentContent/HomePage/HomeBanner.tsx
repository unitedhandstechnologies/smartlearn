import { Typography, useTheme } from '@material-ui/core';
import { Grid, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowNext, HomePageRight, whiteLine } from 'src/Assets';
import { ButtonComp } from 'src/components';

const HomeBanner = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  return (
    <Grid
      sx={{
        display: 'flex',
        width: '100%',
        flex: 1,
        position: 'relative',
        background: '#3C78F0',
        minHeight: '480px',
        backgroundSize: '50%',
        [theme.breakpoints.up('md')]: {
          background: `#3C78F0 url(${HomePageRight}) no-repeat right top`
        }
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative'
        }}
      >
        <Grid
          sx={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(4, 0, 0, 0),
            position: 'relative',
            zIndex: 1,
            [theme.breakpoints.up('md')]: {
              padding: theme.spacing(9, 0, 2, 0),
              clipPath: 'polygon(0% 0%, 100% 0%, 94% 100%, 0% 100%)'
            }
          }}
        >
          <Typography
            style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 500,
              fontFamily: 'IBM Plex Serif',
              lineHeight: '120%'
            }}
          >
            Financial learning made
            <span style={{ color: 'black' }}> smarter</span>
          </Typography>
          <Grid sx={{ margin: theme.spacing(1, 0) }}>
            <img src={whiteLine} />
          </Grid>
          <Typography
            style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: 400,
              fontFamily: 'Switzer'
            }}
          >
            From basics to professionals of stock market, investment, finance
            management, options & futures trading
          </Typography>
          <Grid
            sx={{
              marginTop: 6,
              [theme.breakpoints.down('md')]: {
                marginTop: 3
              }
            }}
          >
            <ButtonComp
              height={43}
              buttonFontFamily="Switzer"
              buttonFontSize={theme.MetricsSizes.regular}
              backgroundColor={theme.Colors.white}
              buttonTextColor={'#3C78F0'}
              btnBorderRadius={'4px'}
              buttonText={'Start learning for free'}
              iconImage={<img src={ArrowNext} style={{ marginLeft: '8px' }} />}
              onClickButton={() => navigateTo('/home/user-login')}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{
            position: 'absolute',
            top: 0,
            clipPath: 'polygon(0% 0%, 100% 0%, 30% 100%, 0% 100%)',
            height: '100%',
            background: '#3C78F0',
            width: '25%',
            left: '46%',
            [theme.breakpoints.down('sm')]: {
              display: 'none'
            }
          }}
        />
      </Container>
    </Grid>
  );
};

export default React.memo(HomeBanner);
