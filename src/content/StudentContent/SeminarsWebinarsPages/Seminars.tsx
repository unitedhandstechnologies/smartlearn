import { useTheme, Container } from '@material-ui/core';
import { Grid, Box } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Loader } from 'src/components';
import {
  COURSE_STATUS_NAME,
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useDebounce } from 'src/hooks/useDebounce';
import { API_SERVICES } from 'src/Services';
import UpComingSeminars from './UpComingSeminars';
import UpComingWebinars from './UpComingWebinars';
import Language from '../../../Assets/Images/Language.svg';

const Seminars = () => {
  const theme = useTheme();
  const [seminarCourseDetails, setSeminarCourseDetails] = useState([]);
  const [webinarCourseDetails, setWebinarCourseDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chipRecorderText, setChipRecorderText] = useState([0, 1]);
  const [chipIconText, setChipIconText] = useState([0, 0, 1]);
  const { i18n } = useTranslation();
  const [searchval, setSearchVal] = useState('');
  const debValue = useDebounce(searchval, 1000);
  const [chipFilterItem, setChipFilterItem] = useState([0, 1]);
  
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
      const response: any = await API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language] || 1,
        params
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.courses?.length) {
          let seminarCourse = response?.data?.courses.filter((item) => {
            return (
              item.course_type === COURSE_TYPE_NAME[1] &&
              item.course_status === COURSE_STATUS_NAME[1]&&
              item.course_name !== ""
            );
          });
          setSeminarCourseDetails(seminarCourse);
          let webinarCourse = response?.data?.courses.filter((item) => {
            return (
              item.course_type === COURSE_TYPE_NAME[3] &&
              item.course_status === COURSE_STATUS_NAME[1]&&
              item.course_name !== ""
            );
          });
          setWebinarCourseDetails(webinarCourse);
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

  // if (loading) {
  //   return <Loader />;
  // } else {
  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Grid>
          <UpComingSeminars
            courseDetails={seminarCourseDetails}
            chipIconText={chipRecorderText}
            setChipIconText={setChipRecorderText}
            onSearchValChange={handleSearchValue}
            handleClearSearchValue={handleClearSearchValue}
            searchval={searchval}
            setChipFilterItem={setChipFilterItem}
            chipFilterItem={chipFilterItem}
          />
          <UpComingWebinars
            courseDetails={webinarCourseDetails}
            setChipIconText={setChipIconText}
            chipIconText={chipIconText}
            onSearchValChange={handleSearchValue}
            handleClearSearchValue={handleClearSearchValue}
            searchval={searchval}
          />
        </Grid>
      </Container>
    </Box>
  );
};
// };
export default memo(Seminars);
