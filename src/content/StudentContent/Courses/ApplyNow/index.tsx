import { Grid, styled, Typography, useTheme } from '@mui/material';
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
    width: '25%',
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
    padding: 1,
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
      sx={{
        background: '#FFFFFF',
        ...classes.containerStyle
      }}
    >
      <Grid container>
        <Grid item container alignItems="center">
          {dataPrice.map((item, index) => {
            return (
              <Grid key={index}>
                <Grid item xs>
                  <TypographyText sx={{ ...classes.price }}>
                    {item.price}
                  </TypographyText>
                </Grid>
                <Grid item xs>
                  <TypographyText sx={{ ...classes.mrp }}>
                    {item.mrp}
                  </TypographyText>
                </Grid>
                <Grid item xs>
                  <TypographyText sx={{ ...classes.offer }}>
                    {item.offer}
                  </TypographyText>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid xs={12} sx={{ ...classes.gridStyle }}>
          <img src={ClockIcon} style={{ paddingRight: 15 }} alt="" />
          <TypographyText sx={{ color: '#FF783C' }}>
            11 hours left at this price
          </TypographyText>
        </Grid>
        <Grid item xs={10}>
          <ButtonComp
            buttonText={'Apply Now'}
            buttonTextColor={'#FFFFFF'}
            buttonFontFamily={'Switzer'}
            buttonFontSize={16}
            btnWidth={'100%'}
            height={'40px'}
          />
        </Grid>
        <Grid item xs={2} sx={{ ...classes.favIcon }}>
          <img src={FavIcon} />
        </Grid>

        <Grid xs={12} sx={{ ...classes.gridStyle, paddingTop: 1 }}>
          <TypographyText
            sx={{ fontSize: '18px', fontWeight: 600, padding: 1 }}
          >
            This course includes:
          </TypographyText>
        </Grid>
        {data.map((item, index) => {
          return (
            <Grid sx={{ ...classes.gridStyle }} key={index}>
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
