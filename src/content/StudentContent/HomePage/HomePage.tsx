import { memo, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Loader } from 'src/components';
import { useTheme, Container } from '@material-ui/core';
import LearnTheWayBox from './LearnTheWay/LearnTheWayBox';
import Mentors from './Mentors';
import UpComingSession from './UpComingSession';
import Reviews from './Reviews';
import FAQs from './FAQs';
import USPs from './Usp';
import { API_SERVICES } from 'src/Services';
import {
  COURSE_STATUS_ID,
  COURSE_STATUS_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID,
  USER_TYPES
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import StartYourLearningBanner from './StartYourLearningBanner';
import HomeBanner from './HomeBanner';
import { BackgroundLine } from 'src/Assets';
import PaytmCheckouts from './PaytmCheckOut';

const HomePage = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [courseDetails, setCourseDetails] = useState<any>([]);
  const [mentorDetails, setMentorDetails] = useState<any>([]);
  const [faqDetails, setFaqDetails] = useState<any>([]);
  const [ratingData, setRatingData] = useState<any>([]);
  const [bannerManagement, setBannerManagement] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const { searchValue } = useSearchVal();
  // const debValue = useDebounce(searchValue, 2000)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setCourseDetails([]);
      setMentorDetails([]);
      setFaqDetails([]);
      setRatingData([]);
      setBannerManagement([]);
      // const params: any = {};
      // if(debValue !== '') {
      //   params.searchString = debValue
      // }
      const response: any = await Promise.all([
        API_SERVICES.courseManagementService.getAll(
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        ),
        API_SERVICES.homeUserService.getAll(),
        API_SERVICES.pageManagementService.getAllFaq(
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        ),
        API_SERVICES.homeUserService.getAllRatings(),
        API_SERVICES.homeUserService.getAllStudentBannerManagement(
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        )
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.courses?.length) {
          let enabledCourse = response[0]?.data?.courses.filter((item) => {
            return item.course_status === COURSE_STATUS_NAME[1];
          });
          setCourseDetails(enabledCourse);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.users?.length) {
          let acceptedMentor = response[1]?.data?.users.filter((item) => {
            return item.user_type === USER_TYPES.mentor && item.status_id === 2;
          });
          setMentorDetails(acceptedMentor);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[2]?.data?.faq?.length) {
          let enabledFaq = response[2]?.data?.faq.filter((item) => {
            return item.status === COURSE_STATUS_ID.enabled;
          });
          setFaqDetails(enabledFaq);
        }
      }
      if (response[3]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[3]?.data?.ratings?.length) {
          setRatingData(response[3]?.data?.ratings);
        }
      }
      if (response[4]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[4]?.data?.bannerManagement?.length) {
          let enabledBannerManagement =
            response[4]?.data?.bannerManagement.filter((item) => {
              return item.banner_status === COURSE_STATUS_ID.enabled;
            });
          setBannerManagement(enabledBannerManagement);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid container sx={{ position: 'relative' }}>
        <Grid container direction="column">
          <HomeBanner bannerManagement={bannerManagement} />
        </Grid>
        <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(7, 0) }}
        >
          <USPs bannerManagement={bannerManagement} />
        </Grid>
        <Grid
          container
          direction="column"
          sx={{
            padding: theme.spacing(7, 0),
            backgroundImage: `url(${BackgroundLine})`,
            [theme.breakpoints.down('xs')]: { backgroundImage: 'none' }
          }}
        >
          <UpComingSession courseDetails={courseDetails} />
        </Grid>
        <Grid
          container
          direction="column"
          style={{
            padding: theme.spacing(7, 0),
            background: theme.Colors.white
          }}
        >
          <LearnTheWayBox />
          <Container style={{ maxWidth: '1200px' }}>
            <Mentors
              mentorDetails={mentorDetails}
              courseDetails={courseDetails}
              headingText={'Learn from industry leading mentors'}
              viewButtonPosition={'top'}
              sliceValue={4}
            />
          </Container>
        </Grid>
        <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(10, 0), background: '#F2F4F7' }}
        >
          <Reviews ratingData={ratingData} />
        </Grid>
        <StartYourLearningBanner />
        <Grid
          container
          direction="column"
          style={{
            padding: theme.spacing(7, 0),
            background: theme.Colors.white
          }}
        >
          <FAQs faqDetails={faqDetails} />
          {/* <PaytmCheckouts /> */}
        </Grid>
      </Grid>
    );
  }
};
export default memo(HomePage);
