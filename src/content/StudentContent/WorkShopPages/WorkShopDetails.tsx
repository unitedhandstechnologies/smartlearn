import { memo } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { ButtonComp } from 'src/components';
import { useTheme, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useNavigate } from 'react-router';
import CourseBanner from '../Courses/CourseBanner';
import CourseDescription from '../../StudentContent/Courses/CourseDescription/CourseDescription';

import {
  Calendar,
  chatIcon,
  Intermediate,
  Online,
  WadeWarren
} from 'src/Assets';
import CourseRating from '../Courses/CourseRating/Index';
import StartLearnWorkshop from './StartLearnWorkshop';

const review = [
  {
    name: '13 Nov, 2022',
    subText: 'Happening on',
    img: Calendar
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

const WorkShopDetails = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  return (
    <>
      {/* <ButtonComp
        buttonText={'All courses'}
        startIcon={<ArrowBackIcon />}
        backgroundColor={'transparent'}
        buttonTextColor={'#78828C'}
        buttonFontFamily={'Switzer'}
        buttonFontSize={18}
        btnWidth={'fit-content'}
        height={'40px'}
        classes={{ root: classes.button }}
        onClickButton={() =>
          navigateTo('/home', {
            replace: true
          })
        }
      /> */}
      <Grid
        sx={{
          display: 'flex',
          flex: 1,
          position: 'relative',
          padding: 4
        }}
      >
        <CourseBanner
          courseTitle={'Basics of Stock Market investments'}
          mentorName={'Wade Warren'}
          mentorProfile={WadeWarren}
        />
      </Grid>
      <Grid
        position={'absolute'}
        sx={{ bottom: 100, marginLeft: 8, background: 'white' }}
      >
        <CourseRating review={review} />
      </Grid>
      <Grid
        item
        position={'absolute'}
        xs={12}
        sx={{
          bottom: 10,
          marginLeft: 120,
          background: 'white',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            position: 'relative',
            marginTop: 2,
            marginLeft: 3,
            width: '325px'
          }
        }}
      >
        <StartLearnWorkshop />
      </Grid>
      <Grid container padding={4}>
        <Grid item xs={12} md={9} paddingTop={10}>
          <CourseDescription />
        </Grid>
      </Grid>
    </>
  );
};
export default WorkShopDetails;
