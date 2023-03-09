import { Divider, useTheme, Grid, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { LineBarIcon } from 'src/Assets';

const notifications = [
  {
    title: 'Congratulations! you earned a certificate',
    content:
      'You just completed a course “Basics of options trading”. Tap  to view your certificate.'
  },
  {
    title: 'Password changed',
    content: 'Password for your account has been changed recently.'
  },
  {
    title: 'Upcoming workshop alert',
    content: 'You have a workshop to attend tomorrow. Tap to view the details'
  },
  {
    title: 'Upcoming workshop alert',
    content: 'You have a workshop to attend tomorrow. Tap to view the details'
  }
];

const ViewNotifications = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          padding: 2
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
            {'Notifications'}
          </Typography>

          {/* <Typography
            style={{
              fontSize: 18,
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#78828C'
            }}
          >
            Continue with Google or enter your details
          </Typography> */}
          <Grid sx={{ paddingTop: 1 }}>
            <img src={LineBarIcon} height={40} />
          </Grid>
        </Grid>
        {notifications?.map((notification, index) => {
          return (
            <Grid container key={index} gap={1} paddingTop={3}>
              <Grid item paddingTop={0.4}>
                <FiberManualRecordIcon
                  fontSize="small"
                  style={{ color: `${index === 0 ? '#3C78F0' : '#B4BEC8'}` }}
                />
              </Grid>
              <Grid item xs>
                <Typography
                  style={{
                    fontFamily: 'Switzer Variable',
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#3C414B'
                  }}
                >
                  {notification.title}
                </Typography>
                <Typography
                  style={{
                    fontFamily: 'Switzer Variable',
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#78828C',
                    paddingTop: 7
                  }}
                >
                  {notification.content}
                  <Divider
                    variant="fullWidth"
                    sx={{
                      marginTop: 2,
                      backgroundColor: '#3C78F0'
                    }}
                  />
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ViewNotifications;
