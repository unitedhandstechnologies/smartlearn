import { Typography, useTheme, Avatar, makeStyles } from '@material-ui/core';
import { Grid, Box } from '@mui/material';
import React from 'react';
import { whiteLine } from 'src/Assets';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  },
  AvatarStyle: {
    width: '32px',
    height: '32px',
    margin: theme.spacing(0, 1, 0, 1)
  }
}));
type Props = {
  courseTitle?: any;
  courseSubTitle?: any;
  course?: any;
  mentorName?: any;
  mentorProfile?: any;
  bannerOuterContainerStyle?: any;
};
const SeminarWebinarBanner = ({
  course,
  courseTitle,
  courseSubTitle,
  mentorName,
  mentorProfile,
  bannerOuterContainerStyle
}: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      sx={{
        padding: theme.spacing(0, 0, 0, 6),
        background: '#3C78F0',
        minHeight: '320px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2, 6)
        },
        ...bannerOuterContainerStyle
      }}
    >
      <Grid
        item
        container
        xs={12}
        md={8}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ zIndex: 1 }}
      >
        <Typography
          style={{
            color: 'white',
            fontSize: '48px',
            fontWeight: 700,
            fontFamily: 'IBM Plex Serif',
            lineHeight: '120%'
          }}
        >
          {course}
        </Typography>
        <img src={whiteLine} style={{ margin: theme.spacing(2, 0) }} />
        {courseTitle && (
          <Typography
            style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 500,
              fontFamily: 'IBM Plex Serif',
              lineHeight: '120%'
            }}
          >
            {courseTitle}
          </Typography>
        )}

        {courseSubTitle && (
          <Typography
            style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '150%'
            }}
          >
            {courseSubTitle}
          </Typography>
        )}

        {mentorProfile && (
          <Box
            sx={{
              display: 'flex',
              marginTop: 2
            }}
          >
            <Typography
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'Switzer'
              }}
            >
              By
            </Typography>
            <Avatar
              src={mentorProfile}
              classes={{
                root: classes.AvatarStyle,
                [theme.breakpoints.down('md')]: {
                  display: 'none'
                }
              }}
            />
            <Typography
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'Switzer',
                padding: 4
              }}
            >
              {mentorName}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="flex-end"
        md
        sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          }
        }}
      >
        <Grid
          sx={{
            background: '#002350',
            width: '150px'
          }}
        />
      </Grid>
      <Grid
        sx={{
          height: '100%',
          position: 'absolute',
          right: 0,
          display: 'flex',
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          }
        }}
      >
        <Grid
          sx={{
            transform: 'skewX(-40deg)',
            background: '#78B4FF',
            width: '50px'
          }}
        />
        <Grid
          sx={{
            background: '#002350',
            transform: 'skewX(-40deg)',
            width: '250px'
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(SeminarWebinarBanner);
