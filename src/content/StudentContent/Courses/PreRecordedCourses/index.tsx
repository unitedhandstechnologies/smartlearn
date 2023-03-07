import { Grid } from '@mui/material';
import { ButtonComp } from 'src/components';
import { useTheme, makeStyles, Container } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ApplyNow from '../ApplyNow';
import { useNavigate } from 'react-router';
import CourseBanner from '../CourseBanner';
import useStudentInfo from 'src/hooks/useStudentInfo';

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

type PreRecordedCourseProps = {
  data?: any;
  mentorDetails?: any;
  totalDuration?: number;
};

const PreRecordedCourses = ({
  data,
  mentorDetails,
  totalDuration
}: PreRecordedCourseProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  const { studentDetails } = useStudentInfo();

  return (
    <Container>
      {studentDetails.id != 0 ? (
        <ButtonComp
          buttonText={'All courses'}
          startIcon={
            <span style={{ color: theme.Colors.secondary, paddingTop: 7 }}>
              <ArrowBackIcon />
            </span>
          }
          backgroundColor={'transparent'}
          buttonTextColor={'#78828C'}
          buttonFontFamily={'Switzer'}
          buttonFontSize={18}
          btnWidth={'fit-content'}
          height={'40px'}
          classes={{ root: classes.button }}
          onClickButton={() =>
            navigateTo('/home/profilehome', {
              replace: true
            })
          }
        />
      ) : (
        <ButtonComp
          buttonText={'All courses'}
          startIcon={
            <span style={{ color: theme.Colors.secondary, paddingTop: 7 }}>
              <ArrowBackIcon />
            </span>
          }
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
      )}
      <Grid sx={{ position: 'relative' }}>
        <Grid
          sx={{
            display: 'flex',
            flex: 1,
            position: 'relative',
            paddingTop: 3
          }}
        >
          <CourseBanner
            courseDetails={data}
            courseTitle={data?.course_name}
            mentorName={data?.mentor_name}
            mentorProfile={mentorDetails?.image_url}
            bannerOuterContainerStyle={{
              minHeight: 360
            }}
          />
        </Grid>
        <Grid
          container
          width={'380px'}
          xs={12}
          sx={{
            zIndex: 1,
            paddingBottom: '3%',
            bottom: 0,
            top: '130px',
            position: 'absolute',
            right: '40px',
            [theme.breakpoints.down('md')]: {
              paddingTop: 5,
              justifyContent: 'center',
              position: 'relative',
              width: '100%'
            },
            [theme.breakpoints.up(1400)]: {
              alignItems: 'flex-start'
            }
          }}
        >
          <ApplyNow
            course={data}
            timeType={totalDuration >= 60 ? 'hours' : 'mins'}
            duration={
              totalDuration >= 60
                ? (totalDuration / 60).toFixed()
                : totalDuration.toFixed(2)
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PreRecordedCourses;
