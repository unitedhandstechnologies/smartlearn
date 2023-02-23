import { Typography, useTheme, Avatar, makeStyles } from '@material-ui/core';
import { Grid, Box } from '@mui/material';
import React from 'react';
import { chatIcon, Star, whiteLine, Intermediate, Online } from 'src/Assets';
import CourseRating from './CourseRating/Index';

const review = [
  {
    name: '4.5',
    subText: 'Ratings',
    img: Star
  },
  {
    name: 'English',
    subText: 'Course language',
    img: chatIcon
  },
  {
    name: 'Intermediate',
    subText: 'Difficulty level',
    img: Intermediate
  },
  {
    name: 'Online',
    subText: 'Study mode',
    img: Online
  }
];

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
const CourseBanner = ({
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
        md={6}
        direction="column"
        paddingTop={mentorProfile ? 3 : 0}
        justifyContent={mentorProfile ? 'flex-start' : 'center'}
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
            height: `${mentorProfile ? '150%' : '100%'}`,
            background: '#002350',
            width: '150px'
          }}
        />
      </Grid>
      {mentorProfile ? <CourseRating review={review} /> : null}
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
            width: '80px'
          }}
        />
        <Grid
          sx={{
            background: '#002350',
            transform: 'skewX(-40deg)',
            width: '380px'
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(CourseBanner);
