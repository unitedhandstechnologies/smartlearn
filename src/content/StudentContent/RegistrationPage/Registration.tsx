import { Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { LineBarIcon, Google } from 'src/Assets';
import { ButtonComp, TextInputComponent } from 'src/components';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
// import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import useStudentInfo from 'src/hooks/useStudentInfo';
import toast from 'react-hot-toast';
import { useEdit } from 'src/hooks/useEdit';
import { capitalizeFirstLetter, isPhoneNumber, isValidEmail } from 'src/Utils';
const Registration = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  // const { updateStudentInfo } = useStudentInfo();
  // const onClickEyeIcon = () => {
  //   setShowPassword(!showPassword);
  // };
  const { i18n } = useTranslation();
  const STUDENT_INITIAL_DATA = {
    first_name: '',
    last_name: '',
    user_name: '',
    phone_number: '',
    country: '',
    email_id: '',
    password: '',
    code: '+91'
  };
  const RequiredFields = [
    'first_name',
    'last_name',
    'user_name',
    'country',
    'email_id',
    'password',
    'confirmPassword',
    'phone_number',
    'image_url'
  ];
  const edit = useEdit(STUDENT_INITIAL_DATA);
  const firstNameError = error && !edit.allFilled('first_name');
  const lastNameError = error && !edit.allFilled('last_name');

  const confirmPasswordError =
    (error && !edit.getValue('confirmPassword')) ||
    (error &&
      edit.getValue('confirmPassword') &&
      edit.getValue('password') &&
      edit.getValue('confirmPassword') !== edit.getValue('password'));

  const passwordError =
    (error && !edit.getValue('password')) ||
    (error &&
      edit.getValue('password') &&
      edit.getValue('password').length < 7);

  const emailError =
    (error && !edit.allFilled('email_id')) ||
    (error &&
      edit.allFilled('email_id') &&
      !isValidEmail(edit.getValue('email_id')));

  const phoneError =
    (error && !edit.allFilled('phone_number')) ||
    (error &&
      edit.allFilled('phone_number') &&
      !isPhoneNumber(edit.getValue('phone_number')));

  const onClickRegister = useCallback(async () => {
    if (!edit.allFilled(...RequiredFields)) {
      setError(true);
      return toast.error('Please fill all the required fields');
    }
    // try {
    //   //  setLoading(true);
    //    let data = { ...STUDENT_INITIAL_DATA, ...edit.edits };
    //    response = await API_SERVICES.adminUserService.create({
    //   data: userData,
    //   successMessage: 'New Student Created successfully!',
    //   failureMessage: 'Error: Student Already Exist'
    // });
    //   if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
    //     i18n.changeLanguage('en');
    //     localStorage.setItem('token', JSON.stringify(response?.data?.token));

    //     if (response?.data?.users?.length) {
    //       localStorage.setItem(
    //         'userId',
    //         JSON.stringify(response?.data.users[0].id)
    //       );
    //       const getUserRes: any = await API_SERVICES.adminUserService.getById(
    //         response?.data.users[0].id
    //       );
    //       updateStudentInfo(response?.data.users[0].id);
    //       if (getUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
    //         updateStudentInfo((prevState: any) => {
    //           return { ...prevState, ...getUserRes?.data?.user };
    //         });
    //       }
    //     }
    //     toast.success('Profile Login successfully');
    //     navigateTo('/home/profilehome', { replace: true });
    //   }
    // } catch (e) {
    //   console.log(e, '---login err-----');
    // } finally {
    //   // setLoading(false);
    // }
  }, []);
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
            Signup to Continue
          </Typography>
          {/* <Grid container item style={{ justifyContent: 'end' }}>
            <ButtonComp
              buttonText="Instructor SignUp"
              backgroundColor="#3C78F0"
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth={'fit-content'}
              height="40px"
              buttonFontFamily="Switzer"
              onClickButton={() =>
                navigateTo('/admin/login', { replace: true })
              }
            />
          </Grid> */}
          <Typography
            style={{
              fontSize: 18,
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#78828C'
            }}
          >
            Continue with Google or enter your details
          </Typography>
          <Grid sx={{ paddingTop: 6 }}>
            <img src={LineBarIcon} height={40} />
          </Grid>
          <Grid sx={{ paddingTop: 6 }}>
            <ButtonComp
              startIcon={<img src={Google} />}
              buttonText={'Continue with Google'}
              backgroundColor={theme.Colors.white}
              buttonTextColor={'#3C414B'}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth={'100%'}
              buttonFontFamily="Switzer"
              style={{
                border: '1px solid',
                borderColor: '#B4BEC8'
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ color: '#B4BEC8', paddingTop: 4 }}>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#78828C'
            }}
          >
            Or
          </Typography>
        </Divider>

        <Grid
          item
          container
          spacing={1}
          direction="column"
          sx={{ paddingTop: 4 }}
        >
          <Grid
            container
            item
            spacing={0.5}
            // sx={{
            //   display: 'flex',
            //   justifyContent: 'center',

            //   [theme.breakpoints.down('sm')]: {
            //     flexDirection: 'column'
            //   }
            // }}
          >
            <Grid xs={12} md={6}>
              <TextInputComponent
                inputLabel={'First Name'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('first_name')}
                onChange={(e) =>
                  edit.update({
                    first_name: capitalizeFirstLetter(e.target.value)
                  })
                }
                isError={firstNameError}
                helperText={firstNameError && 'Please enter your first name'}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextInputComponent
                inputLabel={'Last Name'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('last_name')}
                onChange={(e) =>
                  edit.update({
                    first_name: capitalizeFirstLetter(e.target.value)
                  })
                }
                isError={lastNameError}
                helperText={lastNameError && 'Please enter your last name'}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Email'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('email_id')}
                onChange={(e) => edit.update({ email_id: e.target.value })}
                isError={emailError}
                helperText={emailError && 'Please enter valid Email'}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Phone Number'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                value={edit.getValue('phone_number')}
                required
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return;
                  }
                  edit.update({ phone_number: e.target.value });
                }}
                isError={phoneError}
                helperText={
                  phoneError && 'Please enter your valid 10 digit mobile number'
                }
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Password'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('password')}
                onChange={(e) => edit.update({ password: e.target.value })}
                type={'password'}
                inputProps={{
                  maxLength: 12
                }}
                helperText={
                  passwordError &&
                  'The password must contain minimum 7 and maximum 12 characters!'
                }
                isError={passwordError}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Confirm Password'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('confirmPassword')}
                type={'password'}
                helperText={
                  confirmPasswordError &&
                  'Both password and confirm password should be same!'
                }
                isError={confirmPasswordError}
                onChange={(e) =>
                  edit.update({ confirmPassword: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: '20px' }}>
            <ButtonComp
              buttonText="Register"
              backgroundColor="#3C78F0"
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth="100%"
              height="40px"
              buttonFontFamily="Switzer"
              onClickButton={onClickRegister}
            />
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
                // marginTop: 30,
                color: '#78828C',
                fontSize: 16,
                fontFamily: 'Switzer',
                fontWeight: 700,
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Have an account?{' '}
              <span
                style={{
                  fontSize: 16,
                  fontFamily: 'Switzer',
                  fontWeight: 400,
                  textAlign: 'center',
                  color: '#3C78F0',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('/home/user-login')}
              >
                {' '}
                Login
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(Registration);
