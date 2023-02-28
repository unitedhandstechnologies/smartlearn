import { Typography, useTheme } from '@material-ui/core';
import { memo, useCallback, useState } from 'react';
import { LineBarIcon, Google } from 'src/Assets';
import { ButtonComp, TextInputComponent } from 'src/components';
import { useNavigate } from 'react-router';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import useStudentInfo from 'src/hooks/useStudentInfo';
import toast from 'react-hot-toast';
import { useEdit } from 'src/hooks/useEdit';
import { isValidEmail } from 'src/Utils';
import { Grid } from '@mui/material';
const ForgetPassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);
  const { updateStudentInfo } = useStudentInfo();
  const INITIAL_DATA = {
    email_id: ''
  };
  const RequiredFields = ['email_id'];
  const edit = useEdit(INITIAL_DATA);
  const emailError =
    (error && !edit.allFilled('email_id')) ||
    (error &&
      edit.allFilled('email_id') &&
      !isValidEmail(edit.getValue('email_id')));
  const { i18n } = useTranslation();
  const onClick = useCallback(async () => {
    if (!edit.allFilled(...RequiredFields)) {
      setError(true);
      return toast.error('Please fill the registered Email');
    }
  }, []);
  const navigateTo = useNavigate();
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 30,
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
            Forget Password
          </Typography>
          <Grid style={{ paddingTop: 6 }}>
            <img src={LineBarIcon} height={40} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} container direction="column">
          <Grid item xs={6} md={6} style={{ paddingTop: 20 }}>
            <TextInputComponent
              inputLabel={'Enter registered Email'}
              placeholder={'Email'}
              variant="outlined"
              required
              borderColor={'#3C78F0'}
              labelColor={'#78828C'}
              value={edit.getValue('email_id')}
              onChange={(e) => edit.update({ email_id: e.target.value })}
              isError={emailError}
              helperText={emailError && 'Please enter valid Email'}
            />
          </Grid>

          <Grid item xs={6} md={6} style={{ marginTop: '24px' }}>
            <ButtonComp
              buttonText="Reset Password"
              backgroundColor="#3C78F0"
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth="100%"
              height="40px"
              buttonFontFamily="Switzer"
              onClickButton={onClick}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 8,

              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                justifyContent: 'center'
              }
            }}
          >
            <Typography
              style={{
                color: '#78828C',
                fontSize: 16,
                fontFamily: 'Switzer',
                fontWeight: 700,
                textAlign: 'start',
                cursor: 'pointer'
              }}
            >
              Or
              <span
                style={{
                  fontSize: 16,
                  fontFamily: 'Switzer',
                  fontWeight: 400,
                  textAlign: 'center',
                  paddingLeft: 3,
                  color: '#3C78F0',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('/home/user-login')}
              >
                Log in
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(ForgetPassword);
