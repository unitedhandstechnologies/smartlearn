import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { ButtonComp, Loader } from 'src/components';
import { useTheme } from '@material-ui/core';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import { API_SERVICES } from 'src/Services';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID,
  USER_TYPES
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { BackgroundLine } from 'src/Assets';
import WishListCourse from '../Profile/WishListCourse';
import CourseBanner from '../Courses/CourseBanner';
import CatchFrom from './CatchFrom';
import YourUpComingSession from './YourUpComingSession';
import MoreUpcomingsession from './MoreUpcomingsession';
import LearnTheWayBox from '../HomePage/LearnTheWay/LearnTheWayBox';
import Mentors from '../HomePage/Mentors';
import Reviews from '../HomePage/Reviews';
import StartYourLearningBanner from '../HomePage/StartYourLearningBanner';
import FAQs from '../HomePage/FAQs';
import RateYourExperience from '../HomePage/RateYourExperience/ExperienceRate';
import useStudentInfo from 'src/hooks/useStudentInfo';

const ProfileHome = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [courseDetails, setCourseDetails] = useState([]);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [faqDetails, setFaqDetails] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { studentDetails, updateStudentInfo } = useStudentInfo();
  const [enrollCourse, setEnrollCourse] = useState<any>([]);
  const [rating, setRating] = useState<boolean>(false);

  // const { searchValue } = useSearchVal();
  // const debValue = useDebounce(searchValue, 2000)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setCourseDetails([]);
      setMentorDetails([]);
      setFaqDetails([]);
      setRatingData([]);
      // const params: any = {};
      // if(debValue !== '') {
      //   params.searchString = debValue
      // }
      const response: any = await Promise.all([
        API_SERVICES.courseManagementService.getAll(
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        ),
        API_SERVICES.homeUserService.getAll(),
        API_SERVICES.pageManagementService.getAllFaq(LANGUAGE_ID.english),
        API_SERVICES.homeUserService.getAllRatings(),
        API_SERVICES.enrollmentManagementService.getById(studentDetails?.id, {
          failureMessage: 'No course enrolled with the Student'
        })
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.courses?.length) {
          setCourseDetails(response[0]?.data?.courses);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.users?.length) {
          let acteptedMentor = response[1]?.data?.users.filter((item) => {
            return item.user_type === USER_TYPES.mentor && item.status_id === 2;
          });
          setMentorDetails(acteptedMentor);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[2]?.data?.faq?.length) {
          setFaqDetails(response[2]?.data?.faq);
        }
      }
      if (response[3]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[3]?.data?.ratings?.length) {
          setRatingData(response[3]?.data?.ratings);
        }
      }
      if (response[4]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[4]?.data?.enrolledCourse?.length) {
          setEnrollCourse(response[4]?.data?.enrolledCourse);
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
  const completedCourse = enrollCourse.filter((item) => {
    if (item.status_id === 2) {
      setRating(true);
    }
    return item.status_id === 2;
  });
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid container sx={{ position: 'relative', background: '#ffffff' }}>
        <Container>
          {rating ? (
            <RateYourExperience courseDetails={completedCourse} />
          ) : null}

          <Grid container direction="column" paddingTop={4}>
            <CourseBanner
              course={'Sometitle goes here'}
              courseSubTitle={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit ullamco laboris nisi ut aliquip ex ea c'
              }
            />
          </Grid>
          <Grid
            container
            direction="column"
            sx={{
              padding: theme.spacing(7, 7)
            }}
          >
            <CatchFrom courseDetails={enrollCourse} />
          </Grid>
          <Grid
            container
            direction="column"
            sx={{
              padding: theme.spacing(5, 5)
            }}
          >
            <YourUpComingSession courseDetails={enrollCourse} />
          </Grid>
        </Container>
        <Grid
          container
          direction="column"
          sx={{
            padding: theme.spacing(7, 7),
            backgroundImage: `url(${BackgroundLine})`,
            [theme.breakpoints.down('xs')]: { backgroundImage: 'none' }
          }}
        >
          <MoreUpcomingsession courseDetails={courseDetails} />
        </Grid>
        {/* <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(7, 7) }}
        > */}

        <LearnTheWayBox />
        <Container>
          <Mentors
            mentorDetails={mentorDetails}
            headingText={'Learn from industry leading mentors'}
            viewButtonPosition={'top'}
            sliceValue={4}
          />
        </Container>
        {/* </Grid> */}
        <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(10, 7), background: '#F2F4F7' }}
        >
          <Reviews ratingData={ratingData} />
        </Grid>
        <StartYourLearningBanner />
        <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(7, 7) }}
        >
          <FAQs faqDetails={faqDetails} />
          {/* <WishListCourse /> */}
        </Grid>
      </Grid>
    );
  }
};
export default memo(ProfileHome);
const notifications = [
  {
    title: '1.How was your experience with the course?',
    content: ''
  },
  {
    title: '2. How was your experience with your instructor?',
    content: ''
  },
  {
    title: '3. How can we improve to provide you a better experience?',
    content: ''
  }
];
