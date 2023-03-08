import { Grid, useTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { ButtonComp } from 'src/components';
import ApplyNow from '../Courses/ApplyNow';
import CourseBanner from '../Courses/CourseBanner';
import CourseDescription from '../Courses/CourseDescription/CourseDescription';
import { useLocation, useNavigate } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
          courseDetails={state}
          courseTitle={state?.course_name}
          mentorName={state?.mentor_name}
          mentorProfile={state?.mentor_profile}
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
        <ApplyNow course={state} />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        paddingTop={5}
        sx={{ [theme.breakpoints.down('md')]: { paddingTop: 1 } }}
      >
        <CourseDescription courseDescription={state} />
      </Grid>
    </Grid>
  );
};

export default MentorCourseDescription;
