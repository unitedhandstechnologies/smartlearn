import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Loader } from 'src/components';
import {
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import UpComingSeminars from './UpComingSeminars';
import UpComingWebinars from './UpComingWebinars';

const Seminars = () => {
  const theme = useTheme();
  const [seminarCourseDetails, setSeminarCourseDetails] = useState([]);
  const [webinarCourseDetails, setWebinarCourseDetails] = useState([]);
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
          let seminarCourse = response?.data?.courses.filter((item) => {
            return item.course_type === COURSE_TYPE_NAME[1];
          });
          setSeminarCourseDetails(seminarCourse);
          let webinarCourse = response?.data?.courses.filter((item) => {
            return item.course_type === COURSE_TYPE_NAME[3];
          });
          setWebinarCourseDetails(webinarCourse);
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
        <UpComingSeminars courseDetails={seminarCourseDetails} />
        <UpComingWebinars courseDetails={webinarCourseDetails} />
      </Grid>
    );
  }
};
export default memo(Seminars);
