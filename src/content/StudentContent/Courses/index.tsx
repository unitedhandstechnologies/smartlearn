import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Container } from '@material-ui/core';
import UpComingCourse from './UpComingCourse';
import LearnAtUrPace from './LearnAtUrPace';
import { API_SERVICES } from 'src/Services';
import {
  COURSE_STATUS_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID,
  COURSE_STATUS_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'src/hooks/useDebounce';

const Courses = () => {
  const [courseDetails, setCourseDetails] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const [chipIconText, setChipIconText] = useState<number[]>([0, 0, 1, 0]);
  const [chipRecorderText, setChipRecorderText] = useState<number[]>([0, 1]);
  const [searchval, setSearchVal] = useState<string>('');
  const [courseLevel, setCourseLevel] = useState<any>([]);
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
      setCourseDetails([]);
      setCourseLevel([]);
      const response: any = await Promise.all([ API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english,
        params
      ),
      API_SERVICES.courseLevelManagementService.getAllCourseLevels(
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
      )])
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.courses) {
          let enabledCourse = response[0]?.data?.courses.filter((item) => {
            return item.course_status === COURSE_STATUS_NAME[1];
          });
          setCourseDetails(enabledCourse);
        }
      }
      if(response[1]?.status < HTTP_STATUSES.BAD_REQUEST){
        if(response[1]?.data?.courseLevel){
          let enabledCourseLevel = response[1]?.data?.courseLevel.filter((item) => {
            return item.status === COURSE_STATUS_ID.enabled
          })
          setCourseLevel(enabledCourseLevel)
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [DETECT_LANGUAGE[i18n.language], debValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
            courseLevel={courseLevel}
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
