import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Container } from '@material-ui/core';
import { Loader } from 'src/components';
import UpComingCourse from './UpComingCourse';
import LearnAtUrPace from './LearnAtUrPace';
import { API_SERVICES } from 'src/Services';
import {
  COURSE_STATUS_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'src/hooks/useDebounce';
import CourseBanner from './CourseBanner';

const Courses = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const [chipIconText, setChipIconText] = useState([0, 0, 1]);
  const [chipRecorderText, setChipRecorderText] = useState([0, 1]);
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
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language] || 1,
        params
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.courses) {
          let enabledCourse = response?.data?.courses.filter((item) => {
            return item.course_status === COURSE_STATUS_NAME[1];
          });
          setCourseDetails(enabledCourse);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [DETECT_LANGUAGE[i18n.language], debValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Grid>
          <UpComingCourse
            courseDetails={courseDetails}
            chipIconText={chipIconText}
            setChipIconText={setChipIconText}
            onSearchValChange={handleSearchValue}
            handleClearSearchValue={handleClearSearchValue}
            searchval={searchval}
          />
          <LearnAtUrPace
            courseDetails={courseDetails}
            chipIconText={chipRecorderText}
            setChipIconText={setChipRecorderText}
            onSearchValChange={handleSearchValue}
            handleClearSearchValue={handleClearSearchValue}
            searchval={searchval}
          />
        </Grid>
      </Container>
    </Box>
  );
};
export default memo(Courses);
