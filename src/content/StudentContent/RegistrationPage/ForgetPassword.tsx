import { Typography, useTheme, Grid } from '@material-ui/core';
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
      return toast.error('Please fill the required fields');
    }
  }, []);
  const navigateTo = useNavigate();
  return (
    <Grid
      container
      style={{
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
      }}
    >
      <Grid item xs={6}>
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

        <Grid container direction="column">
          <Grid item xs={6} style={{ paddingTop: 20 }}>
            <TextInputComponent
              inputLabel={'Enter registered Email'}
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

          <Grid item xs={4} style={{ marginTop: '24px' }}>
            <ButtonComp
              buttonText="Send"
              backgroundColor="#3C78F0"
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth="50%"
              height="40px"
              buttonFontFamily="Switzer"
              onClickButton={onClick}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(ForgetPassword);
