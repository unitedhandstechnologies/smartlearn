import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useTheme, Container } from '@material-ui/core';
import { Loader } from 'src/components';
import { API_SERVICES } from 'src/Services';
import {
  COURSE_STATUS_NAME,
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID,
  USER_TYPES
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import UpcomingMasterClass from './UpcomingMasterClass';
import Mentors from '../HomePage/Mentors';
import { useDebounce } from 'src/hooks/useDebounce';

const Masterclasses = () => {
  const theme = useTheme();
  const [courseDetails, setCourseDetails] = useState([]);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chipIconText, setChipIconText] = useState([0, 0, 1]);
  const { i18n } = useTranslation();
  const [searchval, setSearchVal] = useState('');
  const debValue = useDebounce(searchval, 1000);

  const handleSearchValue = (value) => {
    setSearchVal(value);
  };

  const handleClearSearchValue = () => {
    setSearchVal('');
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await Promise.all([
        API_SERVICES.courseManagementService.getAll(
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english, params
        ),
        API_SERVICES.homeUserService.getAll()
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
          console.log(response[1]?.data, 'mentors');
          setMentorDetails(acceptedMentor);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [DETECT_LANGUAGE[i18n.language], debValue]);

  useEffect(() => {
    window.scrollTo(0,0)
    fetchData();
  }, [fetchData]);

  const title = (
    <Typography
      sx={{
        fontSize: '40px',
        fontWeight: 500,
        color: '#3C414B',
        fontFamily: 'IBM Plex Serif',
        [theme.breakpoints.down('xs')]: {
          fontSize: 25
        }
      }}
    >
      Best in the industry{' '}
      <span style={{ color: theme.Colors.secondary }}>mentors</span>
    </Typography>
  );
  // if (loading) {
  //   return <Loader />;
  // } else {
    return (
      <Box sx={{ py: 5 }}>
        <Container>
          <Grid>
            <UpcomingMasterClass
              courseDetails={courseDetails.filter(
                (course) => course.course_type === COURSE_TYPE_NAME[2]
              )}
              chipIconText={chipIconText}
              setChipIconText={setChipIconText}
              onSearchValChange={handleSearchValue}
              handleClearSearchValue={handleClearSearchValue}
              searchval={searchval}  
            />
            <Mentors
              mentorDetails={mentorDetails}
              courseDetails={courseDetails.filter(
                (course) =>
                  course.course_type === COURSE_TYPE_NAME[2] ||
                  course.course_type === COURSE_TYPE_NAME[4]
              )}
              headingText={title}
              viewButtonPosition={'bottom'}
              sliceValue={12}
            />
          </Grid>
        </Container>
      </Box>
    );
  }
// };

export default memo(Masterclasses);
