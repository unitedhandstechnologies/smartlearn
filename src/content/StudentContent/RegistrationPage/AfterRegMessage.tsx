import { Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { memo } from 'react';
import { LineBarIcon } from 'src/Assets';
import logo from '../../../Assets/Images/Logo.svg';
import { useNavigate, useLocation } from 'react-router';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES, USER_TYPE_ID } from 'src/Config/constant';
import toast from 'react-hot-toast';

const AfterRegMessage = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { state }: any = useLocation();
  const data = { ...state?.data };

  const onClickResend = async () => {
    try {
      const response: any = await API_SERVICES.adminUserService.resendMail(
        data.id
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        toast.success('Verification link sent successfully');
      }
    } catch (e) {
      toast.error(e);
    } finally {
      // setLoading(false);
    }
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
          <Typography
            style={{
              fontSize: 32,
              fontWeight: 500,
              fontFamily: 'IBM Plex Serif',
              color: '#3C414B',
              margin: theme.spacing(2, 0)
            }}
          >
            Thanks for signing up / joining us, Mr.{data.first_name}!
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
              We're happy signed up for smartLearn. To start with smartLearn
              Please check your email address {data.email_id}. We sent an
              account activation link.
            </Typography>
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
                onClick={onClickResend}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: 'Switzer',
                    fontWeight: 400,
                    textAlign: 'center',
                    color: '#78828C',
                    paddingTop: 5
                  }}
                >
                  Didn't receive verification link?
                </span>
                &nbsp;Resend
              </Typography>
            </Grid>
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
          {/* <Grid style={{ paddingTop: 8 }}>
            <ButtonComp
              startIcon={<img src={Gmail} />}
              buttonText={'Open Gmail'}
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
          </Grid> */}
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
            onClick={
              data.user_type === USER_TYPE_ID.student
                ? () => navigateTo('/home/user-login')
                : () => navigateTo('/admin/login')
            }
          >
            Go to Login
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(AfterRegMessage);
