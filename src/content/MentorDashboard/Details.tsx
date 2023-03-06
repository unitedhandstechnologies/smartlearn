import { Box, makeStyles, useTheme, Tab } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    '&:hover': {
      background: 'transparent'
    }
  },
  button: {
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  }
}));
type Props = {
  heading?: string;
  mobile?: string;
  email?: string;
  questions?: string;
  icon?: any;
  count?: string;
  details?: any;
  reports?: any;
  handleClickIcon?: () => void;
};

const Details = ({
  heading,
  icon,
  count,
  reports,
  handleClickIcon,
  questions,
  mobile,
  email
}: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box
      sx={{
        padding: '25px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 24px rgba(0, 35, 80, 0.1)'
      }}
    >
      <Grid container spacing={3} direction={'row'}>
        <Grid item xs={12} display="flex" justifyContent={'space-between'}>
          {questions === 'Have any questions?' ? (
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '24px',
                color: '#3C414B',
                fontStyle: 'normal',
                fontFamily: 'IBM Plex Serif'
              }}
            >
              {questions}
            </Typography>
          ) : (
            <img src={icon} alt="" />
          )}
          {questions === 'Have any questions?' ? null : (
            <IconButton
              sx={{
                color: '#3C78F0',
                fontSize: 16,
                fontWeight: 700,
                fontFamily: 'Switzer',
                marginBottom: 5,
                padding: '12px 0px 0px 0px',
                ':hover': {
                  background: 'transparent'
                }
              }}
              onClick={handleClickIcon}
            >
              Details <ArrowForwardIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              color: '#78828C',
              padding: '5px 5px 0px 0px'
            }}
          >
            {heading}
          </Typography>
          {questions === 'Have any questions?' ? (
            <Typography
              sx={{
                color: '#78828C',
                fontWeight: 400,
                fontSize: '18px',
                fontFamily: 'Switzer'
              }}
            >
              {' '}
              {count}
            </Typography>
          ) : (
            <Typography
              sx={{
                color: '#3C414B',
                fontWeight: 700,
                fontSize: '32px',
                fontFamily: 'Switzer'
              }}
            >
              {heading === 'Total Revenue' ? (
                <span
                  style={{
                    color: '#3C414B',
                    fontWeight: 700,
                    fontSize: '32px',
                    fontFamily: 'Switzer'
                  }}
                >
                  ₹
                </span>
              ) : null}

              {count}
            </Typography>
          )}
        </Grid>
      </Grid>
      {questions === 'Have any questions?' ? (
        <Grid item paddingTop={5}>
          <Typography
            sx={{
              color: '#3C78F0',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'Switzer'
            }}
          >
            {mobile}
          </Typography>
          <Divider sx={{ color: '#F2F4F7', paddingTop: 2 }} />

          <Typography
            sx={{
              [theme.breakpoints.down('xs')]: { fontSize: '12px' },
              color: '#3C78F0',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'Switzer',
              paddingTop: 2
            }}
          >
            {email}
          </Typography>
        </Grid>
      ) : null}
      {questions === 'Have any questions?' ? null : (
        <>
          <Divider sx={{ color: '#F2F4F7', paddingTop: 2 }} />
          <Grid
            container
            spacing={0.5}
            alignItems="center"
            item
            xs={8}
            display="flex"
            justifyContent={'space-between'}
            sx={{
              //border: '1px solid #F2F4F7',
              paddingTop: 2
              // marginTop: 2,
              // borderRadius: '15px'
            }}
          >
            {reports.map((item, index) => {
              return (
                <Grid item key={index}>
                  <Typography
                    sx={{
                      color: '#78828C',
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: 'Switzer',
                      textAlign: 'center'
                    }}
                  >
                    {item.heading}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#3C414B',
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: 'Switzer',
                      textAlign: 'center'
                    }}
                  >
                    {item.subText}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Details;
