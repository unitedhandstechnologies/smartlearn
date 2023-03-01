import { Typography, useTheme } from '@material-ui/core';
import { Grid, Box, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowNext, whiteLine } from 'src/Assets';
import { ButtonComp } from 'src/components';

const StartYourLearningBanner = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  return (
    <Box
      sx={{
        padding: theme.spacing(0, 6),
        background: '#3C78F0',
        minHeight: '320px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2, 6)
        }
      }}
    >
      <Container
        maxWidth="lg"
        style={{
          maxWidth: '1200px'
        }}
      >
        <Grid container xs={12}>
          <Grid
            item
            container
            xs={12}
            sm
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ zIndex: 1 }}
          >
            <Typography
              style={{
                color: 'white',
                fontSize: '48px',
                fontWeight: 700,
                fontFamily: 'IBM Plex Serif',
                lineHeight: '120%',
                marginTop: 46
              }}
            >
              Start your journey of smarter{' '}
              <span style={{ color: 'black' }}>learning</span> and{' '}
              <span style={{ color: 'black' }}>earning</span>
            </Typography>
            <img src={whiteLine} style={{ margin: theme.spacing(2, 0) }} />
          </Grid>
          <Grid
            item
            xs={12}
            sm
            container
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              [theme.breakpoints.down('xs')]: {
                justifyContent: 'center'
              },
              zIndex: 1
            }}
          >
            <ButtonComp
              height={59}
              buttonFontFamily="Switzer"
              buttonFontSize={theme.MetricsSizes.regular}
              backgroundColor={theme.Colors.white}
              buttonTextColor={'#3C78F0'}
              btnBorderRadius={'4px'}
              buttonText={'Start learning for free'}
              iconImage={<img src={ArrowNext} style={{ marginLeft: '8px' }} />}
              onClickButton={() => navigateTo('/home/courses')}
              style={{ zIndex: 1 }}
            />
          </Grid>
          <Grid
            sx={{
              height: '100%',
              position: 'absolute',
              right: '5.4%',
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                display: 'none'
              },

              [theme.breakpoints.up('xl')]: {
                right: '2%'
              }
            }}
          >
            <Grid
              sx={{
                transform: 'skewX(-40deg)',
                background: '#78B4FF',
                width: '50px'
              }}
            />
            <Grid
              sx={{
                background: '#002350',
                transform: 'skewX(-40deg)',
                width: '400px'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default React.memo(StartYourLearningBanner);
