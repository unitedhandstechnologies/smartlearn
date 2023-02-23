import { Typography, useTheme, Grid } from '@material-ui/core';
import { memo, useCallback, useState } from 'react';
import { LineBarIcon, Google } from 'src/Assets';
import { ButtonComp, TextInputComponent } from 'src/components';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import RightContainer from './RightContainer';
import { useNavigate, useLocation } from 'react-router';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import useStudentInfo from 'src/hooks/useStudentInfo';
import toast from 'react-hot-toast';
const UserLogin = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ user_name: '', password: '' });
  const { updateStudentInfo } = useStudentInfo();
  const onClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };
  const { i18n } = useTranslation();
  const { state } : any = useLocation();
   
  const onClickLogin = useCallback(async () => {
    try {
      //  setLoading(true);
      let data = {
        user_name: loginForm.user_name,
        password: loginForm.password,
        user_type: 4
      };
      const response: any = await API_SERVICES.authService.userLogin({
        data
      });
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        i18n.changeLanguage('en');
        localStorage.setItem('token', JSON.stringify(response?.data?.token));

        if (response?.data?.users?.length) {
          localStorage.setItem(
            'userId',
            JSON.stringify(response?.data.users[0].id)
          );
          const getUserRes: any = await API_SERVICES.adminUserService.getById(
            response?.data.users[0].id
          );
          if (getUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
            updateStudentInfo((prevState: any) => {
              return { ...prevState, ...getUserRes?.data?.user };
            });
          }
        }
        toast.success('Profile Login successfully');
        if(state){
          navigateTo(state.route, {
            state: { ...state.details },
            replace: true
          })
        }else{
          navigateTo('/home/profilehome', { replace: true });
        }
      }
    } catch (e) {
      console.log(e, '---login err-----');
    } finally {
      // setLoading(false);
    }
  }, [loginForm]);
  const navigateTo = useNavigate();
  return (
    <Grid
      container
      style={{
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
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
            Login to Continue
          </Typography>
          <Grid container item style={{ justifyContent: 'end' }}>
            <ButtonComp
              buttonText="Instructor Login"
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
          </Grid>
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
          <Grid style={{ paddingTop: 6 }}>
            <img src={LineBarIcon} height={40} />
          </Grid>
          <Grid style={{ paddingTop: 6 }}>
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
        <Divider sx={{ color: '#B4BEC8', paddingTop: 3 }}>
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

        <Grid container direction="column">
          <Grid item xs style={{ paddingTop: 15 }}>
            <TextInputComponent
              inputLabel={'Email'}
              variant="outlined"
              borderColor={'#3C78F0'}
              labelColor={'#78828C'}
              value={loginForm.user_name}
              size="medium"
              onChange={(e) =>
                setLoginForm({ ...loginForm, user_name: e.target.value })
              }
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  onClickLogin();
                }
              }}
            />
          </Grid>
          <Grid item xs style={{ marginTop: '24px' }}>
            <TextInputComponent
              inputLabel={'Password'}
              variant="outlined"
              labelColor={'#78828C'}
              size="medium"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
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
              // onKeyPress={(event) => {
              //   if (event.key === 'Enter') {
              //     onClickLogin();
              //   }
              // }}
            />
          </Grid>
          {/* <ButtonComp
            buttonText="Forgot password?"
            variant="text"
            buttonTextColor="#3C78F0"
            backgroundColor="inherit"
            buttonFontFamily="Switzer"
            buttonFontSize={14}
            buttonFontWeight={400}
            style={{
              cursor: 'pointer'
            }}
            onClickButton={() => navigateTo('/home/user-registration')}
          /> */}
          <Typography
            style={{
              color: '#3C78F0',
              fontSize: 16,
              fontFamily: 'Switzer',
              fontWeight: 400,
              textAlign: 'start',
              paddingTop: 5,
              cursor: 'pointer'
            }}
            onClick={() => navigateTo('/home/forgetpassword')}
          >
            Forgot password?
          </Typography>
          <Grid item xs={12} style={{ marginTop: '24px' }}>
            <ButtonComp
              buttonText="Login"
              backgroundColor="#3C78F0"
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth="100%"
              height="40px"
              buttonFontFamily="Switzer"
              onClickButton={onClickLogin}
            />
          </Grid>
          {/* <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              style={{
                // marginTop: 30,
                color: '#78828C',
                fontSize: 16,
                fontFamily: 'Switzer',
                fontWeight: 400,
                textAlign: 'center'
              }}
            >
              Don't have an account?
            </Typography>
            <ButtonComp
              buttonText="Registration"
              variant="text"
              buttonTextColor={'#3C78F0'}
              backgroundColor={'inherit'}
              buttonFontSize={16}
              buttonFontWeight={700}
              // height="40px"
              buttonFontFamily="Switzer"
              style={{
                marginTop: 20
              }}
              onClickButton={() => navigateTo('/home/user-registration')}
            />
          </Grid> */}
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 5,
              [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
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
              onClick={() => {
                console.log('----------');
              }}
            >
              Don't have an account?{' '}
              <span
                style={{
                  fontSize: 16,
                  fontFamily: 'Switzer',
                  fontWeight: 400,
                  textAlign: 'center',
                  color: '#3C78F0',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('/home/user-registration')}
              >
                {' '}
                Register
              </span>
            </Typography>

            {/* <ButtonComp
              buttonText="Register"
              variant="text"
              buttonTextColor={'#3C78F0'}
              backgroundColor={'inherit'}
              buttonFontSize={16}
              buttonFontWeight={700}
              // height="40px"
              buttonFontFamily="Switzer"
              // style={{
              //   marginTop: 20
              // }}
              onClickButton={() => navigateTo('/home/user-registration')}
            /> */}
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={2}>
        <ButtonComp
          buttonText="Instructor Login"
          backgroundColor="#3C78F0"
          buttonTextColor={theme.Colors.white}
          buttonFontSize={16}
          buttonFontWeight={400}
          btnWidth="100%"
          height="40px"
          buttonFontFamily="Switzer"
          onClickButton={() => navigateTo('/admin/login', { replace: true })}
        />
      </Grid> */}
    </Grid>
  );
};
export default memo(UserLogin);
