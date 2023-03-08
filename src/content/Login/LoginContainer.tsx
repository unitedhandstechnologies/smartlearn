import React, { useState, useCallback } from 'react';
import { Grid, useTheme, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ButtonComp, TextInputComponent } from 'src/components';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useNavigate } from 'react-router';
import { HTTP_STATUSES, USER_TYPE_ID } from 'src/Config/constant';
import toast from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import useUserInfo from 'src/hooks/useUserInfo';
import logo from '../../Assets/Images/Logo.svg';
import { useTranslation } from 'react-i18next';
import { useEdit } from 'src/hooks/useEdit';

const useStyles: any = makeStyles((theme) => ({
  centerAlign: {
    marginTop: theme.MetricsSizes.regular_xxx
  },
  eyeIcon: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  forgotTxt: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingTop: theme.MetricsSizes.tiny_xxx,
    color: theme.Colors.blueGrey
  },
  img: {
    marginTop: 20,
    height: 20,
    width: 200,
    mixBlendMode: 'multiply'
  },
  textContainerStyle: {
    marginTop: theme.MetricsSizes.regular_xxx
  }
}));

const LoginContainer = ({
  setLoading
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ user_name: '', password: '' });
  const navigateTo = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { i18n } = useTranslation();
  const INITIAL_DATA = {
    user_name: '',
    password: ''
  };
  const RequiredFields = ['password', 'user_name'];
  const edit = useEdit(INITIAL_DATA);

  const onClickLogin = async () => {
    try {
      if (!edit.allFilled(...RequiredFields)) {
        return toast.error('Please fill the username and password');
      }
      setLoading(true);
      let data = {
        ...INITIAL_DATA,
        ...edit.edits
      };
      const response: any = await API_SERVICES.authService.userLogin({
        data
      });
      if (response?.data.users[0].user_type !== USER_TYPE_ID.student) {
        if (
          (response?.data.users[0].is_verify === true &&
            response?.data.users[0].user_type === USER_TYPE_ID.mentors) ||
          (response?.data.users[0].is_verify === false &&
            response?.data.users[0].user_type === USER_TYPE_ID.superAdmin) ||
          (response?.data.users[0].is_verify === false &&
            response?.data.users[0].user_type === USER_TYPE_ID.admin)
        ) {
          toast.success('User logged in successfully!');
          i18n.changeLanguage('en');
          localStorage.setItem('token', JSON.stringify(response?.data?.token));
          localStorage.setItem(
            'userId',
            JSON.stringify(response?.data.users[0].id)
          );
          const getUserRes: any = await API_SERVICES.adminUserService.getById(
            response?.data.users[0].id
          );
          if (getUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
            updateUserInfo((prevState) => {
              return { ...prevState, ...getUserRes?.data?.user };
            });
          }
          navigateTo('/admin', { replace: true });
        } else {
          toast.error(
            'you are not verified user,again resend verification link'
          );
          navigateTo('/home/afterRegMessage', {
            state: {
              data: {
                email_id: response?.data.users[0].email_id,
                first_name: response?.data.users[0].first_name,
                id: response?.data.users[0].id,
                is_verify: response?.data.users[0].is_verify
              }
            },
            replace: true
          });
        }
      } else {
        toast.error('You are not Admin and Instructor');
        navigateTo('/', { replace: true });
        localStorage.clear();
        i18n.changeLanguage('en');
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  const onClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container direction="column">
      <Grid item container xs={12} direction="column" alignItems="center">
        <img src={logo} className={styles.img} />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={styles.textContainerStyle}
      >
        <Grid item xs={8} className={styles.centerAlign}>
          <TextInputComponent
            inputWidth={500}
            inputLabel={'UserName'}
            variant="outlined"
            labelColor={theme.Colors.darkGreen}
            value={edit.getValue('user_name')}
            size="medium"
            onChange={(e) => edit.update({ user_name: e.target.value })}
            // onKeyPress={(event) => {
            //   if (event.key === 'Enter') {
            //     onClickLogin();
            //   }
            // }}
          />
        </Grid>
        <Grid item xs={8} className={styles.centerAlign}>
          <TextInputComponent
            inputWidth={500}
            inputLabel={'Password'}
            variant="outlined"
            labelColor={theme.Colors.darkGreen}
            size="medium"
            value={edit.getValue('password')}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => edit.update({ password: e.target.value })}
            InputProps={{
              endAdornment: (
                <IconButton
                  className={styles.eyeIcon}
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
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                onClickLogin();
              }
            }}
          />
          <Grid>
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
              onClick={() =>
                navigateTo('/home/forgetpassword', {
                  state: { adminForgetpassword: true },
                  replace: true
                })
              }
            >
              Forgot password?
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={8} style={{ marginTop: theme.MetricsSizes.x_large }}>
          <ButtonComp
            buttonText={'Log in'}
            btnWidth={500}
            onClickButton={onClickLogin}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LoginContainer;
