import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
import {
  SmartLearnLogoFooter,
  LinkedIn,
  Insta,
  YouTube,
  Twitter
} from '../../Assets/Images';
import Typography from '@mui/material/Typography';
import { ButtonComp, TextInputComponent } from '../../components';
import Divider from '@mui/material/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(0, 0, 1, 0)
  },
  placeHolderStyle: {
    color: theme.Colors.darkGrayishBlue,
    fontSize: theme.MetricsSizes.small_xxx,
    fontWeight: theme.fontWeight.regular,
    '&::placeholder': {
      color: theme.Colors.darkGrayishBlue,
      fontSize: theme.MetricsSizes.small_xxx,
      fontWeight: theme.fontWeight.regular
    }
  }
}));
const pages = ['Courses', 'Workshops', 'Seminars', 'Masterclasses'];

const Text = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 3, 0.5, 0),
  textAlign: 'start',
  color: '#B4BEC8',
  margin: theme.spacing(0, 1.5, 0, 0),
  fontFamily: 'Switzer',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  cursor: 'pointer',
  lineHeight: '150%'
}));

const Contact = styled(Typography)(({ theme }) => ({
  //padding: theme.spacing(1),
  textAlign: 'start',
  color: '#FFFFFF',
  marginTop: theme.spacing(1),
  fontFamily: 'Switzer',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16
}));

const SocialMedia = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(3, 0)
}));
const DividerFoot = styled(Divider)(({ theme }) => ({
  background: '#3C78F0',
  height: 3
}));
export default function Footer() {
  const theme = useTheme();
  const styles = useStyles();
  const navigateTo = useNavigate();

  const handleClick = (event) => {
    if (event.target.innerText === 'Courses') {
      navigateTo('/home/courses');
    } else if (event.target.innerText === 'Workshops') {
      navigateTo('/home/workshops');
    } else if (event.target.innerText === 'Seminars') {
      navigateTo('/home/seminars-webinars');
    } else if (event.target.innerText === 'Masterclasses') {
      navigateTo('/home/masterclasses');
    }
  };

  return (
    <Grid sx={{ backgroundColor: '#002350', paddingTop: 8 }}>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            padding: theme.spacing(1, 0),
            [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
          }}
        >
          <Grid item xs>
            <img src={SmartLearnLogoFooter} alt="" />
            <Text>
              Small description about SmartLearn goes here like this. Longer
              description goes here like this.
            </Text>
          </Grid>
          <Grid item xs>
            {pages.map((page, index) => (
              <ButtonComp
                key={index}
                buttonText={page}
                backgroundColor={'#002350'}
                buttonTextColor={theme.Colors.white}
                buttonFontSize={16}
                buttonFontWeight={400}
                buttonFontFamily="Switzer"
                height={30}
                style={{
                  alignItems: 'start',
                  justifyContent: 'start'
                }}
                classes={{ root: styles.button }}
                onClick={handleClick}
              />
            ))}
          </Grid>
          <Grid item xs>
            <Contact>
              <span
                style={{
                  color: '#3C78F0',
                  fontFamily: 'Switzer',
                  fontStyle: 'normal',
                  fontWeight: 400
                }}
              >
                p:
              </span>{' '}
              +91 98765 43210
            </Contact>
            <Contact>
              <span
                style={{
                  color: '#3C78F0',
                  fontFamily: 'Switzer',
                  fontStyle: 'normal',
                  fontWeight: 400
                }}
              >
                e:
              </span>{' '}
              contact@smartlearn.com
            </Contact>
            <SocialMedia>
              <img
                src={LinkedIn}
                alt=""
                style={{ marginRight: 15, cursor: 'pointer' }}
              />
              <img
                src={Insta}
                alt=""
                style={{ marginRight: 15, cursor: 'pointer' }}
              />
              <img
                src={YouTube}
                alt=""
                style={{ marginRight: 15, cursor: 'pointer' }}
              />
              <img src={Twitter} alt="" style={{ cursor: 'pointer' }} />
            </SocialMedia>
          </Grid>

          <Grid item xs>
            <TextInputComponent
              variant="outlined"
              placeholder={'Your email address'}
              inputWidth={''}
              InputProps={{ classes: { input: styles.placeHolderStyle } }}
            />

            <ButtonComp
              buttonText={'Subscribe'}
              backgroundColor={'#3C78F0'}
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth="104px"
              height={'40px'}
              buttonFontFamily="Switzer"
              style={{
                margin: theme.spacing(2, 0)
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <DividerFoot variant="fullWidth" sx={{ marginTop: 8 }} />

      <Container>
        <Grid
          container
          xs={12}
          sx={{
            [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
          }}
        >
          <Grid item xs>
            <Typography
              style={{
                padding: theme.spacing(0.5),
                textAlign: 'start',
                color: '#B4BEC8',
                margin: theme.spacing(1.5),
                fontFamily: 'Switzer',
                fontStyle: 'normal',
                fontWeight: 400
              }}
            >
              Â© Copyright 2023. All rights reserved by
              <span
                style={{
                  color: 'white',
                  fontWeight: 400,
                  fontFamily: 'Switzer',
                  fontStyle: 'normal',
                  marginLeft: '4px'
                }}
              >
                Jainam Broking Limited.
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            xs
            sx={{
              [theme.breakpoints.down('sm')]: { display: 'none' }
            }}
          >
            <Typography
              style={{
                textAlign: 'end',
                marginRight: 20,
                color: '#B4BEC8',
                margin: theme.spacing(1.5),
                fontFamily: 'Switzer',
                fontStyle: 'normal',
                fontWeight: 400,
                cursor: 'pointer'
              }}
            >
              Terms of Use{' '}
              <span
                style={{
                  textAlign: 'end',
                  marginRight: 20,
                  color: '#B4BEC8',
                  margin: theme.spacing(1.5),
                  fontFamily: 'Switzer',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  cursor: 'pointer'
                }}
              >
                Privacy Policy
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
