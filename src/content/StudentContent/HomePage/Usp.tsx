import { Grid, Typography, Box, Container } from '@mui/material';
import React from 'react';
import { Heading, ButtonComp } from '../../../components';
import { LineBarIcon } from '../../../Assets/Images';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  }
}));
const USPs = ({ bannerManagement }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  return (
    <Container maxWidth="lg">
      <Grid>
        <Typography
          sx={{
            fontSize: '40px',
            fontWeight: 500,
            color: '#3C414B',
            fontFamily: 'IBM Plex Serif',
            [theme.breakpoints.down('xs')]: {
              fontSize: 25
            }
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
          sx={{
            color: '#78828C',
            fontSize: 18,
            fontWeight: 400,
            fontStyle: 'normal',
            fontFamily: 'Switzer',
            paddingBottom: '40px',
            [theme.breakpoints.down('xs')]: {
              fontSize: 14
            }
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
        ></Grid>
        <Carousel prevIcon={null} nextIcon={null} indicators={false}>
          {bannerManagement.length
            ? bannerManagement?.map((item, index) => {
                return (
                  <Carousel.Item interval={1500} key={index}>
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
                      <Grid
                        item
                        xs
                        sx={{
                          height: 344,
                          [theme.breakpoints.down('sm')]: {
                            height: '150px'
                          }
                        }}
                      >
                        <img
                          className="d-block w-100"
                          src={item.banner_image}
                          alt="Image One"
                          width="100%"
                          height="100%"
                        />
                      </Grid>
                      <Grid container item xs alignContent="center">
                        <Grid item>
                          <Typography
                            sx={{
                              color: '#3C414B',
                              fontSize: 32,
                              fontWeight: theme.fontWeight.medium,
                              fontStyle: 'normal',
                              fontFamily: 'Switzer',
                              [theme.breakpoints.down('sm')]: {
                                fontSize: 20
                              }
                            }}
                          >
                            {item.banner_name}
                          </Typography>
                          <Typography
                            sx={{
                              color: '#78828C',
                              fontSize: 18,
                              fontWeight: theme.fontWeight.regular,
                              fontStyle: 'normal',
                              fontFamily: 'Switzer',
                              [theme.breakpoints.down('sm')]: {
                                fontSize: 14
                              }
                            }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                          </Typography>
                          <ButtonComp
                            buttonText={'Start learning'}
                            endIcon={<ArrowForwardIcon />}
                            backgroundColor={'transparent'}
                            buttonTextColor={'#3C78F0'}
                            btnWidth={'fit-content'}
                            height={'40px'}
                            classes={{ root: classes.button }}
                            onClickButton={() => navigateTo('/home/user-login')}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Carousel.Item>
                );
              })
            : null}
        </Carousel>
      </Grid>
    </Container>
  );
};
export default USPs;
