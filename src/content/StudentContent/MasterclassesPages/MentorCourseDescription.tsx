import { Grid, useTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { ButtonComp } from 'src/components';
import ApplyNow from '../Courses/ApplyNow';
import CourseBanner from '../Courses/CourseBanner';
import CourseDescription from '../Courses/CourseDescription/CourseDescription';
import CourseRating from '../Courses/CourseRating/Index';
import { useLocation, useNavigate } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { chatIcon, Intermediate, Online, Star, WadeWarren } from 'src/Assets';

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

const MentorCourseDescription = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  const { state }: any = useLocation();
  let data = { ...state?.formData };
  let courseId = { ...state?.course_id };

  return (
    <Grid sx={{ padding: 4 }}>
      <ButtonComp
        buttonText={'All masterClasses'}
        startIcon={<ArrowBackIcon />}
        backgroundColor={'transparent'}
        buttonTextColor={'#78828C'}
        buttonFontFamily={'Switzer'}
        buttonFontSize={18}
        btnWidth={'fit-content'}
        height={'40px'}
        classes={{ root: classes.button }}
        onClickButton={() =>
          navigateTo('/home/masterclasses', {
            replace: true
          })
        }
      />
      <Grid
        sx={{
          display: 'flex',
          flex: 1,
          position: 'relative',
          paddingTop: 2
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
        container
        justifyContent={'flex-end'}
        position={'absolute'}
        width={'94%'}
        xs={12}
        sx={{
          zIndex: 1,
          paddingBottom: 8,
          bottom: 0,
          [theme.breakpoints.down('md')]: {
            paddingTop: 5,
            justifyContent: 'center',
            position: 'relative',
            width: '100%'
          }
        }}
      >
        <ApplyNow />
      </Grid>
      <Grid
        container
        paddingTop={22}
        sx={{
          [theme.breakpoints.down('md')]: {
            paddingTop: 1
          }
        }}
      >
        <Grid item xs={12} md={9}>
          <CourseDescription />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MentorCourseDescription;
