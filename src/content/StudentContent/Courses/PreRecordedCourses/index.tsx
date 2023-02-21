import { memo } from 'react';
import { Grid, ImageListItemBar, ImageListItem } from '@mui/material';
import { ButtonComp } from 'src/components';
import { useTheme, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  chatIcon,
  Intermediate,
  Online,
  Star,
  WadeWarren
} from '../../../../Assets/Images';
import CourseRating from '../CourseRating/Index';
import ApplyNow from '../ApplyNow';
import { useLocation, useNavigate } from 'react-router';
import CourseBanner from '../CourseBanner';
import CourseDescription from '../CourseDescription/CourseDescription';
import CourseRight from '../CourseRight';
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
  AvatorStyle: {
    width: '32px',
    height: '32px',
    margin: theme.spacing(0, 1, 0, 1)
  }
}));
const PreRecordedCourses = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  const { state }: any = useLocation();
  let data = {...state?.formData}
  
  return (
    <Grid sx={{ padding: 4 }}>
      <ButtonComp
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
      />
      {/* <Grid container> */}
      <Grid
        sx={{
          display: 'flex',
          flex: 1,
          position: 'relative'
        }}
      >
        <CourseBanner
          courseTitle={'Basics of Stock Market investments'}
          mentorName={'Wade Warren'}
          mentorProfile={WadeWarren}
          bannerOuterContainerStyle={{
            minHeight: 360
          }}
        />
      </Grid>
      <Grid
        xs={12}
        sx={{
          bottom: 80,
          marginLeft: 8,
          background: 'white',
          position: 'absolute',
          [theme.breakpoints.down('sm')]: {
            bottom: '0px'
          }
        }}
      >
        <CourseRating review={review} />
      </Grid>
      <Grid
        item
        position={'absolute'}
        xs={12}
        sx={{
          bottom: 10,
          marginLeft: 115,
          // zIndex: 1,
          // top: 0,
          // //position: 'sticky',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            position: 'relative',
            marginTop: 8,
            marginLeft: 0,
            width: '325px'
          }
        }}
      >
        <ApplyNow />
      </Grid>
      <Grid container paddingTop={20}>
        <Grid item xs={12} md={9}>
          <CourseDescription courseDescription={data}/>
        </Grid>
        <Grid container item xs={12} md={3}>
          <CourseRight />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PreRecordedCourses;
