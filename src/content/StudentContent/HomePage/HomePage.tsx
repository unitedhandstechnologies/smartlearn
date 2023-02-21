import { memo, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Loader } from 'src/components';
import { useTheme } from '@material-ui/core';
import LearnTheWayBox from './LearnTheWay/LearnTheWayBox';
import Mentors from './Mentors';
import UpComingSession from './UpComingSession';
import Reviews from './Reviews';
import FAQs from './FAQs';
import USPs from './Usp';
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
import StartYourLearningBanner from './StartYourLearningBanner';
import HomeBanner from './HomeBanner';
import { BackgroundLine } from 'src/Assets';
import WishListCourse from '../Profile/WishListCourse';

const HomePage = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [courseDetails, setCourseDetails] = useState([]);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [faqDetails, setFaqDetails] = useState([]);
  const [ratingData, setRatingData] = useState([]);
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
        API_SERVICES.homeUserService.getAllRatings()
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
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid container sx={{ position: 'relative' }}>
        <Grid container direction="column">
          <HomeBanner />
        </Grid>
        <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(7, 7) }}
        >
          <USPs />
        </Grid>
        <Grid
          container
          direction="column"
          sx={{
            padding: theme.spacing(7, 7),
            backgroundImage: `url(${BackgroundLine})`,
            [theme.breakpoints.down('xs')]: { backgroundImage: 'none' }
          }}
        >
          <UpComingSession courseDetails={courseDetails} />
        </Grid>
        <Grid
          container
          direction="column"
          style={{ padding: theme.spacing(7, 7) }}
        >
          <LearnTheWayBox />
          <Mentors
            mentorDetails={mentorDetails}
            headingText={'Learn from industry leading mentors'}
            viewButtonPosition={'top'}
            sliceValue={4}
          />
        </Grid>
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
          <WishListCourse/>
        </Grid>
      </Grid>
    );
  }
};
export default memo(HomePage);
