import { Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { memo } from 'react';
import { LineBarIcon } from 'src/Assets';
import logo from '../../../Assets/Images/Logo.svg';
import { useNavigate, useLocation } from 'react-router';

import { CertificateImage } from 'src/Assets';

const Certificate = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { state }: any = useLocation();
  const data = { ...state?.data };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          padding: 5
        }
      }}
    >
      <Grid item xs={12} md={6}>
        <Grid
          container
          item
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
          xs={12}
          md={12}
        >
          <img
            src={logo}
            style={{
              height: 60,
              width: 200,
              mixBlendMode: 'multiply'
            }}
          />
        </Grid>
        <Grid>
          <Grid sx={{ paddingTop: 2 }}>
            {/* <Typography
              style={{
                fontSize: 32,
                fontWeight: 500,
                fontFamily: 'IBM Plex Serif',
                color: '#3C414B',
                margin: theme.spacing(2, 0),
                textAlign: 'center'
              }}
            >
              Certificate
            </Typography> */}

            <img src={LineBarIcon} height={40} />

            <img height="100%" width="100%" src={CertificateImage} />
          </Grid>

          <Grid sx={{ paddingTop: 4 }}>
            <Typography
              style={{
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'Switzer',
                color: '#78828C'
              }}
            >
              with regards
            </Typography>
            <span
              style={{
                fontSize: 18,
                fontFamily: 'Switzer',
                fontWeight: 400,
                textAlign: 'center',
                color: '#3C78F0',
                paddingTop: 5
              }}
            >
              -smartLearn Team
            </span>
          </Grid>
        </Grid>

        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              justifyContent: 'center'
            }
          }}
        >
          <Typography
            style={{
              padding: 10,

              color: '#3C78F0',
              fontSize: 16,
              fontFamily: 'Switzer',
              fontWeight: 700,
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() =>
              navigateTo('/home/profile', {
                state: { tabVal: 2 },
                replace: true
              })
            }
          >
            Back to My Library
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(Certificate);
