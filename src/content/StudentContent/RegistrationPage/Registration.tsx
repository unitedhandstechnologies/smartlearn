import {
  Avatar,
  InputAdornment,
  Typography,
  useTheme
} from '@material-ui/core';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import { memo, useState } from 'react';
import { LineBarIcon, Google } from 'src/Assets';
import { ButtonComp, TextInputComponent } from 'src/components';
import { useNavigate } from 'react-router';
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
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import { HighlightOff } from '@material-ui/icons';

const Registration = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState('');
  const navigateTo = useNavigate();
  const [permission, setPermission] = useState([]);
  const [userType, setUserType] = useState(USER_TYPE_ID.student);
  const [profileImage, setProfileImage] = useState('No file choosen');

  const onClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };
  const onClickEyeIconConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const { i18n } = useTranslation();
  const STUDENT_INITIAL_DATA = {
    first_name: '',
    last_name: '',
    user_name: '',
    phone_number: '',
    email_id: '',
    password: '',
    image_url: '',
    confirmPassword: '',
    user_type: userType,
    social_information_url: '',
    permissions: permission,
    code: '91' || '',
    language_id: 1 || DETECT_LANGUAGE[i18n.language],
    gender: '',
    qualification: '',
    about: ''
  };
  const RequiredFields = [
    'first_name',
    'last_name',
    'email_id',
    'password',
    'confirmPassword',
    'phone_number',
    'user_name'
  ];
  const edit = useEdit(STUDENT_INITIAL_DATA);
  const firstNameError = error && !edit.allFilled('first_name');
  const lastNameError = error && !edit.allFilled('last_name');
  const userNameError = error && !edit.allFilled('user_name');

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
  const codeError = error && !edit.allFilled('code');
  const imageError = error && !edit.allFilled('image_url');

  const onClickRegister = async () => {
    try {
      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please fill all the required fields');
      }
      if (!isPhoneNumber(edit.getValue('phone_number'))) {
        setError(true);
        return toast.error('Please enter your valid 10 digit mobile number');
      } else {
        setError(false);
      }
      if (
        edit.getValue('confirmPassword') !== edit.getValue('password') ||
        edit.getValue('password').length < 7
      ) {
        return setError(true);
      }
      let userData = { ...STUDENT_INITIAL_DATA, ...edit.edits };
      if (userType === USER_TYPE_ID.student) {
        const response: any = await API_SERVICES.adminUserService.create({
          data: userData,
          successMessage: 'New Student Created successfully!',
          failureMessage: 'Error: Student Already Exist'
        });
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          navigateTo('/home/afterRegMessage', {
            state: {
              data: {
                email_id: response?.data?.user.email_id,
                first_name: response?.data?.user.first_name,
                id: response?.data?.user.id,
                user_type: response?.data?.user.user_type
              }
            },
            replace: true
          });
        }
      } else if (userType === USER_TYPE_ID.mentors) {
        const response: any = await API_SERVICES.adminUserService.create({
          data: userData,
          successMessage: 'New Instructor Created successfully!',
          failureMessage: 'Error: Instructor Already Exist'
        });
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          navigateTo('/home/afterRegMessage', {
            state: {
              data: {
                email_id: response?.data?.user.email_id,
                first_name: response?.data?.user.first_name,
                id: response?.data?.user.id,
                user_type: response?.data?.user.user_type
              }
            },
            replace: true
          });
        }
      }
    } catch (e) {
      console.log(e, '---login err-----');
    } finally {
      // setLoading(false);
    }
  };
  const onUploadFiles = async (event: any) => {
    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = async () => {
      if (
        img.width <= 270 &&
        img.width >= 200 &&
        img.height <= 350 &&
        img.height >= 250
      ) {
        const uploadImageRes: any =
          await API_SERVICES.imageUploadService.uploadImage(formData);
        if (uploadImageRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          toast.success(`${'Image Upload Successfully'}`);
          if (uploadImageRes?.data?.images) {
            edit.update({
              image_url: uploadImageRes?.data?.images[0].Location
            });
          }
        }
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
        ${img.width} x ${img.height} but we require size image between 270 x 350 to 200 x 250.`);
      }
    };
  };
  const removeProfile = () => {
    edit.update({
      image_url: ''
    });
    setProfileImage('No file chosen');
    if (!edit.allFilled('image_url')) {
      return;
    } else {
      toast.success(`${t('Toast.imageRemovedSuccessfully')}`);
    }
  };
  const handleChange = (event) => {
    setValues(event.target.value);
    edit.update({ code: event.target.value });
  };
  const handleClick = () => {
    setUserType(USER_TYPE_ID.mentors);
    setPermission([1, 4, 8]);
  };
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
            {userType === USER_TYPE_ID.student
              ? 'Sign up and start learning'
              : 'Instructor Signup '}
          </Typography>
          {userType === USER_TYPE_ID.student ? (
            <Grid container item style={{ justifyContent: 'end' }}>
              <ButtonComp
                buttonText="Instructor SignUp"
                backgroundColor="#3C78F0"
                buttonTextColor={theme.Colors.white}
                buttonFontSize={16}
                buttonFontWeight={400}
                btnWidth={'fit-content'}
                height="40px"
                buttonFontFamily="Switzer"
                onClickButton={handleClick}
              />
            </Grid>
          ) : null}

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
          <Grid sx={{ paddingTop: 2 }}>
            <img src={LineBarIcon} height={40} />
          </Grid>
          <Grid sx={{ paddingTop: 4 }}>
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

        <Grid container direction="column" sx={{ paddingTop: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
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
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Last Name'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('last_name')}
                onChange={(e) =>
                  edit.update({
                    last_name: capitalizeFirstLetter(e.target.value)
                  })
                }
                isError={lastNameError}
                helperText={lastNameError && 'Please enter your last name'}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>
                  <Typography
                    style={{
                      color: '#78828C',
                      fontWeight: theme.fontWeight.medium
                    }}
                  >
                    {t('gender')}
                  </Typography>
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={`${edit.getValue('gender')}`}
                  onChange={(e) => {
                    edit.update({
                      gender: (e.target as HTMLInputElement).value
                    });
                  }}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label={t('male')}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label={t('female')}
                  />
                </RadioGroup>
              </FormControl>
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
            <Grid item xs={12} md={6} container spacing={0}>
              <Grid item xs={3} md={3} sx={{ marginTop: '10px' }}>
                {/* <TextInputComponent
                  inputLabel={'Code'}
                  variant="outlined"
                  borderColor={'#3C78F0'}
                  labelColor={'#78828C'}
                  value={edit.getValue('code')}
                  required
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    edit.update({ code: e.target.value });
                  }}
                  isError={codeError}
                  // helperText={phoneError && 'Please enter your country code'}
                /> */}
                <CountryCode
                  inputLabel={t('code')}
                  labelColor={'#78828C'}
                  required
                  handleChange={handleChange}
                  value={edit.getValue('code')}
                  isError={codeError}
                />
              </Grid>
              <Grid item xs={9} md={9} sx={{ marginTop: '10px' }}>
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
                    phoneError &&
                    'Please enter your valid 10 digit mobile number'
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Profile Image'}
                labelColor={'#78828C'}
                value={edit.getValue('image_url').split('/')[3] || profileImage}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ButtonComp
                        backgroundColor={theme.Colors.primary}
                        buttonText={'Browse'}
                        buttonFontSize={theme.MetricsSizes.small_xxx}
                        buttonTextColor="white"
                        buttonFontWeight={theme.fontWeight.medium}
                        disableElevation={true}
                        onBrowseButtonClick={onUploadFiles}
                        isBrowseButton
                        height={'30px'}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <HighlightOff
                        style={{ cursor: 'pointer' }}
                        onClick={removeProfile}
                      />
                    </InputAdornment>
                  )
                }}
                //required
                //isError={imageError}
                helperText={
                  imageError
                    ? ''
                    : 'Only .png, .jpg, .jpeg, .bmp format is allowed & max size 2 MB with 270 X 350 resolution'
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                marginTop: 5,
                [theme.breakpoints.down('sm')]: {
                  marginTop: 0
                }
              }}
            >
              <Avatar alt="SmartLearn" src={edit.getValue('image_url')} />
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel="Qualification"
                labelColor={'#78828C'}
                borderColor={'#3C78F0'}
                value={edit.getValue('qualification')}
                onChange={(e) => edit.update({ qualification: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'User Name'}
                variant="outlined"
                borderColor={'#3C78F0'}
                labelColor={'#78828C'}
                required
                value={edit.getValue('user_name')}
                onChange={(e) => edit.update({ user_name: e.target.value })}
                isError={userNameError}
                helperText={userNameError && 'Please enter your user name'}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
              <TextInputComponent
                inputLabel={'Password'}
                required
                variant="outlined"
                labelColor={'#78828C'}
                borderColor={'#3C78F0'}
                value={edit.getValue('password')}
                size="medium"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => edit.update({ password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      //   className={styles.eyeIcon}
                      onClick={onClickEyeIcon}
                      disableFocusRipple
                      disableRipple
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  )
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
                required
                variant="outlined"
                labelColor={'#78828C'}
                borderColor={'#3C78F0'}
                value={edit.getValue('confirmPassword')}
                size="medium"
                type={showPasswordConfirm ? 'text' : 'password'}
                onChange={(e) =>
                  edit.update({ confirmPassword: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      //   className={styles.eyeIcon}
                      onClick={onClickEyeIconConfirm}
                      disableFocusRipple
                      disableRipple
                      edge="end"
                    >
                      {showPasswordConfirm ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  )
                }}
                helperText={
                  confirmPasswordError &&
                  'Both password and confirm password should be same!'
                }
                isError={confirmPasswordError}
              />
            </Grid>
            {userType === USER_TYPE_ID.student ? null : (
              <Grid item xs={12} md={12} sx={{ marginTop: '10px' }}>
                <TextInputComponent
                  inputLabel="About"
                  multiline={true}
                  maxRows={4}
                  inputHeight={100}
                  labelColor={'#78828C'}
                  borderColor={'#3C78F0'}
                  value={edit.getValue('about')}
                  onChange={(e) => edit.update({ about: e.target.value })}
                />
              </Grid>
            )}
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
              Have an account?
              <span
                style={{
                  fontSize: 16,
                  fontFamily: 'Switzer',
                  fontWeight: 400,
                  textAlign: 'center',
                  color: '#3C78F0',
                  cursor: 'pointer'
                }}
                onClick={
                  userType === USER_TYPE_ID.student
                    ? () => navigateTo('/home/user-login')
                    : () => navigateTo('/admin/login')
                }
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
