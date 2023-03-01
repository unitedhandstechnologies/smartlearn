import { Typography, useTheme } from '@material-ui/core';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { LineBarIcon, Google } from 'src/Assets';
import { ButtonComp, TextInputComponent } from 'src/components';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
// import IconButton from '@mui/material/IconButton';

import { useNavigate, useLocation } from 'react-router';
import { API_SERVICES } from 'src/Services';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  USER_TYPE_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import toast from 'react-hot-toast';
import { useEdit } from 'src/hooks/useEdit';
import { capitalizeFirstLetter, isPhoneNumber, isValidEmail } from 'src/Utils';
import { t } from 'i18next';
import CountryCode from 'src/components/CountryCode';
const MentorAfterReg = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();

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
        <Grid>
          <Typography
            style={{
              fontSize: 32,
              fontWeight: 500,
              fontFamily: 'IBM Plex Serif',
              color: '#3C414B',
              margin: theme.spacing(2, 0)
            }}
          >
            Thanks for signing up/ joining us
          </Typography>
          <Grid sx={{ paddingTop: 2 }}>
            <img src={LineBarIcon} height={40} />
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
              Dear Instructor Thank you for registering! We look forward to
              seeing you after admin approval until that please be patience.we
              will inform you shortly.
            </Typography>
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
            onClick={() => navigateTo('/home')}
          >
            Back to Home
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(MentorAfterReg);
