import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useTheme, Container } from '@material-ui/core';
import { Loader } from 'src/components';
import { API_SERVICES } from 'src/Services';
import {
  COURSE_STATUS_NAME,
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import CourseBanner from '../Courses/CourseBanner';
import UpComingWorkshop from './UpComingWorkshop';
import WorkShopDetails from './WorkShopDetails';
import { useDebounce } from 'src/hooks/useDebounce';

const WorkShop = () => {
  const theme = useTheme();
  const [workshopDetails, setWorkshopDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
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
      const response: any = await API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english,
        params
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.courses?.length) {
          const workShop = response?.data?.courses.filter(
            (item) =>
              item.course_type === COURSE_TYPE_NAME[4] &&
              item.course_status === COURSE_STATUS_NAME[1]
          );
          setWorkshopDetails(workShop);
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
            <CourseBanner
              course={'Lorem ipsum dolor sit amet, consectetur'}
              courseSubTitle={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit ullamco laboris nisi ut aliquip ex ea c'
              }
            />

            <UpComingWorkshop
              workshopDetails={workshopDetails}
              onSearchValChange={handleSearchValue}
              handleClearSearchValue={handleClearSearchValue}
              searchval={searchval}
            />
          </Grid>
        </Container>
      </Box>
    );
  }
// };
export default memo(WorkShop);
