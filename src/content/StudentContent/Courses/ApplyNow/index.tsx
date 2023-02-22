import { Grid, styled, Typography, useTheme, Box } from '@mui/material';
import React from 'react';
import {
  ClockIcon,
  VideoTutor,
  DownloadIcon,
  LifeTime,
  CertificateIcon
} from '../../../../Assets/Images';
import { ButtonComp, Heading } from 'src/components';
import FavIcon from '../../../../Assets/Images/FavIcon.svg';

const classes = {
  containerStyle: {
    width: '23%',
    height: '100%',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.09)',
    borderRadius: '4px',
    padding: 4
  },
  price: {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: 'Switzer'
  },
  mrp: {
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Switzer',
    color: 'red',
    textDecoration: 'line-through',
    paddingLeft: 1
  },
  titleStyle: {
    color: '#3C414B',
    fontSize: '18px',
    fontWeight: 600
  },
  offer: {
    color: '#3CC878',
    fontSize: '16px',
    fontWeight: 600,
    paddingLeft: 1
  },
  textStyle: {
    color: '#78828C',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Switzer'
  },
  textStyleTime: {
    color: 'red',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Switzer'
  },
  gridStyle: {
    display: 'flex',
    paddingBottom: '10px'
  },
  favIcon: {
    background: '#F2F4F7',
    borderRadius: '5px',
    padding: 1.3,
    paddingBottom: 0,
    cursor: 'pointer'
  }
};

const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  fontFamily: 'Switzer',
  color: '#3C414B'
}));
const data = [
  {
    name: '23 hours of video tutorials',
    img: VideoTutor
  },
  {
    name: '4 downloadable resources',
    img: DownloadIcon
  },
  {
    name: 'Lifetime access to the course',
    img: LifeTime
  },
  {
    name: 'Certificate of completion',
    img: CertificateIcon
  }
];
const dataPrice = [
  {
    price: '₹3,500'
  },
  {
    mrp: '₹3,500'
  },
  {
    offer: '40% off'
  }
];

const ApplyNow = () => {
  const theme = useTheme();
  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      xl={3}
      lg={3}
      justifyContent={'center'}
      sx={{
        background: '#FFFFFF',
        ...classes.containerStyle
      }}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          item
          container
          alignItems="center"
          sx={{
            [theme.breakpoints.down('lg')]: {
              justifyContent: 'center'
            }
          }}
        >
          {dataPrice.map((item, index) => {
            return (
              <Grid key={index}>
                <Grid>
                  <TypographyText sx={{ ...classes.price }}>
                    {item.price}
                  </TypographyText>
                </Grid>
                <Grid>
                  <TypographyText sx={{ ...classes.mrp }}>
                    {item.mrp}
                  </TypographyText>
                </Grid>
                <Grid>
                  <TypographyText sx={{ ...classes.offer }}>
                    {item.offer}
                  </TypographyText>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          xs={12}
          sx={{
            ...classes.gridStyle,
            [theme.breakpoints.down('lg')]: {
              justifyContent: 'center'
            }
          }}
        >
          <img src={ClockIcon} style={{ paddingRight: 15 }} alt="" />
          <TypographyText sx={{ color: '#FF783C' }}>
            11 hours left at this price
          </TypographyText>
        </Grid>
        <Grid item xs={6} md={6} lg={9} justifyContent={'flex-start'}>
          <ButtonComp
            buttonText={'Apply Now'}
            buttonTextColor={'#FFFFFF'}
            buttonFontFamily={'Switzer'}
            buttonFontSize={16}
            btnWidth={'100%'}
            btnBorderRadius={4}
            height={'40px'}
          />
        </Grid>
        <Grid sx={{ ...classes.favIcon, ml: 1 }}>
          <img src={FavIcon} />
        </Grid>

        <Grid
          xs={12}
          sx={{
            ...classes.gridStyle,
            paddingTop: 1,
            [theme.breakpoints.down('lg')]: {
              justifyContent: 'center'
            }
          }}
        >
          <TypographyText
            sx={{ fontSize: '18px', fontWeight: 600, padding: 1 }}
          >
            This course includes:
          </TypographyText>
        </Grid>
        {data.map((item, index) => {
          return (
            <Grid
              container
              sx={{
                ...classes.gridStyle,
                [theme.breakpoints.down('lg')]: {
                  justifyContent: 'center'
                }
              }}
              key={index}
            >
              <img src={item.img} style={{ paddingRight: 10 }} alt="" />
              <Typography sx={{ ...classes.textStyle }}>
                {item.name}
              </Typography>{' '}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ApplyNow;
