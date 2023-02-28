import { memo, useCallback, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ButtonComp } from 'src/components';
import { useTheme, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ApplyNow from '../Courses/ApplyNow/index';
import { useLocation, useNavigate } from 'react-router';
import CourseBanner from '../Courses/CourseBanner';
import CourseDescription from '../Courses/CourseDescription/CourseDescription';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import toast from 'react-hot-toast';

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

const PreRecordedCourses = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [mentorDetails, setMentorDetails] = useState<any>([]);
  const { state }: any = useLocation();
  let data = { ...state?.formData };
  // console.log(daa)
  let totalDuration = 0;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setMentorDetails([]);
      const response: any = await API_SERVICES.adminUserService.getById(data.mentor_id)
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.user) {
          setMentorDetails(response?.data?.user);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid sx={{ padding: 5, background: '#FFFFFF' }}>
      <ButtonComp
        buttonText={'All Workshops'}
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
          navigateTo('/home/workshops', {
            replace: true
          })
        }
      />
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
          courseTitle={data.course_name}
          mentorName={data.mentor_name}
          mentorProfile={mentorDetails.image_url}
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
          paddingBottom: '3%',
          bottom: 0,
          [theme.breakpoints.down('md')]: {
            paddingTop: 5,
            justifyContent: 'center',
            position: 'relative',
            width: '100%'
          },
          [theme.breakpoints.up(1400)]: {
            paddingBottom: '12%',
            alignItems: 'flex-start'
          }
        }}
      >
        <ApplyNow
          course={data}/>
      </Grid>
      <Grid
        container
        sx={{
          [theme.breakpoints.down('md')]: {
            paddingTop: 1
          }
        }}
      >
        <Grid item xs={12} md={9} paddingTop={5}>
          <CourseDescription courseDescription={data} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PreRecordedCourses;
