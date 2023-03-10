import { memo, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@material-ui/core';
import { Loader } from 'src/components';
import { API_SERVICES } from 'src/Services';
import {
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

const Masterclasses = () => {
  const theme = useTheme();
  const [courseDetails, setCourseDetails] = useState([]);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await Promise.all([
        API_SERVICES.courseManagementService.getAll(
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        ),
        API_SERVICES.homeUserService.getAll()
      ]);

      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.courses?.length) {
          console.log(response[0]?.data, 'response');
          setCourseDetails(response[0]?.data?.courses);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.users?.length) {
          let acteptedMentor = response[1]?.data?.users.filter((item) => {
            return item.user_type === USER_TYPES.mentor && item.status_id === 2;
          });
          console.log(response[1]?.data, 'mentors');
          setMentorDetails(acteptedMentor);
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
      <Grid padding={6}>
        <UpcomingMasterClass
          courseDetails={courseDetails.filter(
            (course) => course.course_type === COURSE_TYPE_NAME[2]
          )}
        />
        <Mentors
          mentorDetails={mentorDetails}
          courseDetails={courseDetails.filter(
            (course) =>
              course.course_type === COURSE_TYPE_NAME[2] ||
              course.course_type === COURSE_TYPE_NAME[4]
          )}
          headingText={'Best in the industry mentors'}
          viewButtonPosition={'bottom'}
          sliceValue={12}
        />
      </Grid>
    );
  }
};

export default memo(Masterclasses);
