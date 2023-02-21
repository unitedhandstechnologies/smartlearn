import { Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import { ArrowNext, whiteLine } from 'src/Assets';
import { ButtonComp } from 'src/components';

const StartYourLearningBanner = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      xs={12}
      sx={{
        padding: theme.spacing(0, 6),
        background: '#3C78F0',
        minHeight: '320px',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2, 6)
        }
      }}
    >
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
            lineHeight: '120%'
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
          }
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
          onClickButton={() => {}}
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
  );
};

export default React.memo(StartYourLearningBanner);
