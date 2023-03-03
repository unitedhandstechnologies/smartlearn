import { Divider, useTheme } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SpeechBubble } from 'src/Assets';
import { ButtonComp, Heading } from 'src/components';

const ThankyouEnrolling = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { state } = useLocation();
  let courseName = state;
  const handleNavigate = () => {
    navigateTo('/home/profile', { 
        state: {tabVal: 2},
        replace: true });
  };
  return (
    <Grid
      container
      spacing={4}
      justifyContent={'center'}
      alignContent={'center'}
      direction={'column'}
      sx={{ padding: theme.spacing(0.5) }}
    >
      <Grid item>
        <Heading
          headingText={'Thank you'}
          headerFontSize={'40px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          headerFontFamily={'Switzer'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        />
        <Divider style={{ background: theme.Colors.greyLight, padding: 3 }} />
      </Grid>
      <Grid
        item
        sx={{
          alignSelf: 'center'
        }}
      >
        <img src={SpeechBubble} />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontSize: '32px',
            fontWenghit: theme.fontWeight.medium,
            color: theme.Colors.blackBerry,
            lineHeight: '48px',
            fontFamily: 'IBM Plex Serif',
            [theme.breakpoints.down('xs')]: {
              fontSize: 25
            }
          }}
        >
          Thank you for Enrolling this Course.
        </Typography>
      </Grid>
      <Grid item>
        <ButtonComp
          buttonText="Go to MyLibrary"
          onClickButton={handleNavigate}
          btnWidth={'100%'}
        />
      </Grid>
    </Grid>
  );
};

export default ThankyouEnrolling;
