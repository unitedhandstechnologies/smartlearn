import { Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowNext, HomePageRight, whiteLine } from 'src/Assets';
import { ButtonComp } from 'src/components';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

const HomeBanner = ({ bannerManagement }) => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  return (
    <Grid
      sx={{
        display: 'flex',
        width: '100%',
        flex: 1,
        position: 'relative'
      }}
    >
      <Grid
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(4, 0, 2, 4),
          background: '#3C78F0',
          zIndex: 5,
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4, 0, 2, 4),
            clipPath: 'polygon(0% 0%, 100% 0%, 94% 100%, 0% 100%)'
          }
        }}
      >
        <Typography
          style={{
            color: 'white',
            fontSize: '48px',
            fontWeight: 700,
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
          left: '40%',
          zIndex: 1,
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          }
        }}
      />
      <Grid
        sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          },
          [theme.breakpoints.up('md')]: {
            flex: 1
          },
          height: '100%'
        }}
      >
        <Carousel prevIcon={null} nextIcon={null}>
          {bannerManagement?.length
            ? bannerManagement.map((item, index) => {
                return (
                  <Carousel.Item
                    interval={1500}
                    key={index}
                    style={{ height: '500px' }}
                  >
                    <img
                      className="d-block w-100"
                      src={item.banner_image}
                      alt="Image One"
                      width="100%"
                      height="500px"
                    />
                    {/* <Carousel.Caption>
                      <h3>{item.banner_name}</h3>
                    </Carousel.Caption> */}
                  </Carousel.Item>
                );
              })
            : null}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default React.memo(HomeBanner);
