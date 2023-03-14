import { useEffect } from 'react';
import {
  IconButton,
  Typography,
  useTheme,
  makeStyles
} from '@material-ui/core';
import { Grid } from '@mui/material';
import { BasicStockIcon, LineBarIcon } from 'src/Assets';
import { ButtonComp, MuiCardComp } from 'src/components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MentorProfile from './MentorProfile';
import { useLocation, useNavigate } from 'react-router';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getUserId } from 'src/Utils';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 3,
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  }
}));

const MentorCreatedCourses = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { state }: any = useLocation();
  const navigateTo = useNavigate();
  const mentorCategory = [];
  const userId = getUserId();

  state?.courses
    ?.filter((crs) => crs?.mentor_id === state?.id)
    .map((crs) => {
      if (!mentorCategory?.includes(crs?.category_name)) {
        mentorCategory.push(crs?.category_name);
      }
    });

  const upcomingWorkShops = state?.courses?.filter(
    (course) =>
      course?.course_type === COURSE_TYPE_NAME[4] &&
      course?.mentor_id === state?.id
  );
  const course = state?.courses?.filter(
    (course) =>
      course?.course_type !== COURSE_TYPE_NAME[4] &&
      course?.mentor_id === state?.id
  );

  const onClickCardImage = (rowData) => {
    if (userId !== null) {
      navigateTo(`/home/course-details/${rowData?.course_name}`, {
        state: {
          formData: { ...rowData },
          backBtnTxt: 'All masterclasses',
          backBtnRoute: '/home/masterclasses'
        },
        replace: true
      });
    } else {
      navigateTo('/home/user-login', {
        state: {
          formData: { ...rowData },
          route: `/home/course-details/${rowData?.course_name}`,
          backBtnTxt: 'All masterclasses',
          backBtnRoute: '/home/masterclasses'
        },
        replace: true
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Grid paddingLeft={5} mt={2}>
        <ButtonComp
          buttonText={'All Mentors'}
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
      </Grid>
      <Grid container spacing={3} padding={5} paddingTop={3}>
        <Grid item xs={12} sm={5} md={3.3} mt={2}>
          <MentorProfile mentorDetails={state} category={mentorCategory} />
        </Grid>
        <Grid item xs={12} sm={7} md={8.7}>
          {upcomingWorkShops?.length ? (
            <>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems={'flex-start'}
              >
                <Grid>
                  <Typography
                    style={{
                      fontSize: '32px',
                      fontWeight: 500,
                      color: '#3C414B',
                      fontFamily: 'IBM Plex Serif'
                    }}
                  >
                    Upcoming Workshops
                  </Typography>
                  <Grid>
                    <img src={LineBarIcon} alt="" />
                  </Grid>
                </Grid>
                <Grid>
                  <IconButton style={{ color: '#3C78F0' }}>
                    <ChevronLeftIcon
                      style={{
                        border: '1px solid #3C78F0',
                        paddingTop: 1,
                        width: 37,
                        height: 50,
                        borderRadius: 4
                      }}
                    />
                  </IconButton>
                  <IconButton style={{ color: '#3C78F0' }}>
                    <ChevronRightIcon
                      style={{
                        border: '1px solid #3C78F0',
                        paddingTop: 1,
                        width: 37,
                        height: 50,
                        borderRadius: 4
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                padding={2}
                justifyContent={'space-between'}
                gap={4}
                sx={{
                  [theme.breakpoints.down('xs')]: {
                    padding: 0,
                    alignItems: 'center'
                  }
                }}
              >
                {upcomingWorkShops?.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={12} md={5.5}>
                      <MuiCardComp
                        key={index}
                        imgUrl={
                          item.image_url ? item.image_url : BasicStockIcon
                        }
                        rightText={item.course_type}
                        leftText={item.cost_type}
                        heading={item.category_name}
                        title={item.course_name}
                        subText={item.course_description}
                        courseLevel={item?.course_level_name?.trim()}
                        courseLanguage={
                          item.language_id === 1
                            ? 'English'
                            : item.language_id === 2
                            ? 'Hindi'
                            : 'Gujarati'
                        }
                        date={item.starting_date}
                        endingDate={item.ending_date}
                        zoomLink={item.meeting_link}
                        locationName={item.meeting_location}
                        subCategory={item.sub_category_name}
                        courseType={item.course_type}
                        onClickCardImage={() => onClickCardImage(item)}
                        prize={item.amount}
                        discount={item.discount}
                        item={item}
                        backBtnTxt={'All masterclasses'}
                        backBtnRoute={'/home/masterclasses'}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          ) : null}

          <Grid>
            <Typography
              style={{
                fontSize: '32px',
                fontWeight: 500,
                color: '#3C414B',
                fontFamily: 'IBM Plex Serif'
              }}
            >
              Courses
            </Typography>
            <Grid>
              <img src={LineBarIcon} alt="" />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={'space-between'}
            gap={4}
            padding={2}
            sx={{
              [theme.breakpoints.down('xs')]: {
                padding: 0,
                alignItems: 'center'
              }
            }}
          >
            {course?.length
              ? course?.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={12} md={5.5}>
                      <MuiCardComp
                        key={index}
                        imgUrl={
                          item.image_url ? item.image_url : BasicStockIcon
                        }
                        rightText={item.course_type}
                        leftText={item.cost_type}
                        heading={item.category_name}
                        title={item.course_name}
                        subText={item.course_description}
                        courseLevel={item.course_level_name}
                        courseLanguage={
                          item.language_id === 1
                            ? 'English'
                            : item.language_id === 2
                            ? 'Hindi'
                            : 'Gujarati'
                        }
                        date={item.starting_date}
                        endingDate={item.ending_date}
                        zoomLink={item.meeting_link}
                        locationName={item.meeting_location}
                        subCategory={item.sub_category_name}
                        courseType={item.course_type}
                        onClickCardImage={() => onClickCardImage(item)}
                        prize={item.amount}
                        discount={item.discount}
                        item={item}
                        backBtnTxt={'All masterclasses'}
                        backBtnRoute={'/home/masterclasses'}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MentorCreatedCourses;
