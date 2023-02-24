import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { Heading, ButtonComp } from '../../../components';
import { LineBarIcon } from '../../../Assets/Images';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  }
}));
const USPs = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid>
      {/* <Heading
        headingText={'Learn smart to earn smart'}
        headerFontSize={'40px'}
        headerFontWeight={500}
        headingColor={'#3C414B'}
        style={{
          [theme.breakpoints.down('xs')]: {
            fontSize: 15
          },
          padding: '20px 0px 0px 0px'
        }}
      /> */}
      <Grid>
        <Typography
          style={{
            fontSize: '40px',
            fontWeight: 500,
            color: '#3C414B',
            fontFamily: 'IBM Plex Serif'
          }}
        >
          <span style={{ fontWeight: 700 }}>Learn</span> smart to{' '}
          <span style={{ fontWeight: 700 }}>earn</span> smart
        </Typography>
      </Grid>
      <Grid>
        <img src={LineBarIcon} alt="" />
      </Grid>
      <Grid sx={{ padding: '10px 0px 40px 0px' }}>
        <Typography
          style={{
            color: '#78828C',
            fontSize: 18,
            fontWeight: 400,
            fontStyle: 'normal',
            fontFamily: 'Switzer',
            paddingBottom: '40px'
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{
            [theme.breakpoints.down('xs')]: {
              flexDirection: 'column'
            }
          }}
        >
          <Grid item xs>
            <Box
              sx={{
                borderRadius: '5px',
                backgroundColor: 'lightGrey',
                width: '100%',
                height: 344
                // [theme.breakpoints.down('xs')]: {
                //   width: 76
                // }
              }}
            />
          </Grid>
          <Grid container item xs alignContent="center">
            <Grid item>
              <Heading
                headingText={'USP title -1'}
                headerFontSize={'32px'}
                headerFontWeight={500}
                headingColor={'#3C414B'}
              />
              <Typography
                style={{
                  color: '#78828C',
                  fontSize: 18,
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontFamily: 'Switzer'
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Typography>
              <ButtonComp
                buttonText={'Start learning'}
                endIcon={<ArrowForwardIcon />}
                backgroundColor={'transparent'}
                buttonTextColor={'#3C78F0'}
                btnWidth={'fit-content'}
                height={'40px'}
                classes={{ root: classes.button }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default USPs;
