import { memo, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { useTheme } from '@material-ui/core';
import { Loader } from 'src/components';
import UpComingCourse from './UpComingCourse';
import LearnAtUrPace from './LearnAtUrPace';
import CourseBegin from 'src/content/StudentContent/Courses/CourseBegin/CourseBegin';
import { API_SERVICES } from 'src/Services';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import PreRecordedCourses from './PreRecordedCourses';
import Quiz from './QASection/Quiz';

const Courses = () => {
  const theme = useTheme();
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.courses?.length) {
          setCourseDetails(response?.data?.courses);
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
      <Grid
        // container
        // direction={'column'}
        // style={{ padding: theme.spacing(7, 7) }}
        padding={6}
      >
        <UpComingCourse courseDetails={courseDetails} />
        <LearnAtUrPace courseDetails={courseDetails} />
        {/* <Quiz courseDetails={courseDetails} /> */}
        <CourseBegin />
      </Grid>
    );
  }
};
export default memo(Courses);
