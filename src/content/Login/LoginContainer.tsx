import React, { useState, useCallback } from 'react';
import { Grid, useTheme, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ButtonComp, TextInputComponent } from 'src/components';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useNavigate } from 'react-router';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import useUserInfo from 'src/hooks/useUserInfo';
import logo from '../../Assets/Images/Logo.svg';
import { useTranslation } from 'react-i18next';

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

  const onClickLogin = useCallback(async () => {
    try {
      setLoading(true);
      let data = {
        user_name: loginForm.user_name,
        password: loginForm.password
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
            updateUserInfo((prevState) => {
              return { ...prevState, ...getUserRes?.data?.user };
            });
          }
        }
        navigateTo('/admin', { replace: true });
      }
    } catch (e) {
      console.log(e, '---login err-----');
    } finally {
      setLoading(false);
    }
  }, [loginForm]);
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
            value={loginForm.user_name}
            size="medium"
            onChange={(e) =>
              setLoginForm({ ...loginForm, user_name: e.target.value })
            }
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
            type={showPassword ? 'text' : 'password'}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
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
