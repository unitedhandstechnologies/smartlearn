import { useEffect, useCallback, useContext } from 'react';
import { useState } from 'react';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import {
  NewOrder,
  ListIcon,
  DownloadIcon,
  StatisticIcon,
  LineBarIcon
} from 'src/Assets/Images';
import { Heading, Loader } from 'src/components';
import { MultiSelectChip } from 'src/components';
import { useTheme } from '@material-ui/core';
import { FILTER_CHIPS, HTTP_STATUSES } from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { API_SERVICES } from 'src/Services';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import { useNavigate } from 'react-router';
import { Grid } from '@mui/material';
import { UserInfoContext } from 'src/contexts/UserContext';
import MentorDashboard from '../MentorDashboard';

let COUNT = {
  revenueCountYear: 235000,
  revenueCountMonth: 35000,
  revenueCountWeek: 45000
};

function AdminDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [revenueChipFilter, setRevenueChipFilter] = useState([FILTER_CHIPS[0]]);
  const [revenueCount, setRevenueCount] = useState();
  const [selectedTab, setSelectedTab] = useState<string | number>(0);
  const [studentCount, setStudentCount] = useState<string | number>();
  const [mentorCount, setMentorCount] = useState<number>();
  const [courseCount, setCourseCount] = useState<string | number>();
  const [freeCount, setFreeCount] = useState<string | number>();
  const [paidCount, setPaidCount] = useState<string | number>();
  const [selectedTabVal, setSelectedTabVal] = useState<string | number>(0);
  const navigateTo = useNavigate();
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);
  const { userDetails } = useContext(UserInfoContext);
  const newDate = new Date();
  const CurrentMonth = newDate.getMonth();

  const handleSetSelectedTab = (value) => {
    setSelectedTab(value);
    if (value === 0) {
      navigateTo('/admin/reports', { replace: true });
    } else if (value === 1) {
      navigateTo('/admin/course-management', { replace: true });
    } else if (value === 2) {
      navigateTo('/admin/students-administration', { replace: true });
    } else if (value === 3) {
      navigateTo('/admin/instructor-management', { replace: true });
    }
  };
  const handleSetSelectedTabVal = (value) => {
    setSelectedTabVal(value);
  };

  const revenueDetails = [
    {
      heading: t('dashboard.totalRevenue'),
      subText:
        revenueChipFilter[0] === 'Year'
          ? COUNT.revenueCountYear
          : revenueChipFilter[0] === 'Month'
          ? COUNT.revenueCountMonth
          : COUNT.revenueCountWeek,
      iconImage: StatisticIcon
    },
    {
      heading: t('dashboard.revenueReport'),
      subText: '',
      iconImage: StatisticIcon
    }
  ];

  const courseDetails = [
    {
      heading: t('dashboard.paidCourse'),
      subText: paidCount,
      iconImage: ListIcon
    },
    {
      heading: t('dashboard.freeCourse'),
      subText: freeCount,
      iconImage: ListIcon
    }
  ];

  const handleChangeRevenueChip = (selectedChipItem: string[]) => {
    setRevenueChipFilter(selectedChipItem);
  };

  const fetchData = useCallback(async () => {
    if (userDetails.user_type === 1 || userDetails.user_type === 2) {
      try {
        let params: any = {};

        const revenueResponse: any =
        await API_SERVICES.enrollmentManagementService.getAllBy(
          params
        );
        console.log(revenueResponse, "revenueResponserevenueResponserevenueResponse")
        console.log(revenueResponse?.data?.TotalAmount, "totalAmount")
        COUNT.revenueCountMonth = revenueResponse?.data?.TotalAmount
      
        setLoading(true);
        if (debValue !== '') {
          params.searchString = debValue;
        }
        const response: any = await API_SERVICES.adminUserService.getAllUsers(
          params
        );

        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (response?.data?.users) {
            const onlyStudentList = response.data.users.filter(
              (item) => item.user_type === 4
            );
            setStudentCount(onlyStudentList.length);
          }
        }

        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (response?.data?.users) {
            const onlyMentorList = response.data.users.filter(
              (item) => item.user_type === 3
            );
            setMentorCount(onlyMentorList.length);
          }
        }

        const response1: any = await Promise.all([
          API_SERVICES.courseManagementService.getStatistic()
        ]);
        if (response1[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
          const totalCourse =
            parseInt(response1[0]?.data?.courseStatus.enabledCount) +
            parseInt(response1[0]?.data?.courseStatus.pendingCount);
          setCourseCount(totalCourse);
          setFreeCount(
            parseInt(response1[0]?.data?.courseStatus.freeEnabled) +
              parseInt(response1[0]?.data?.courseStatus.freePending)
          );
          setPaidCount(
            parseInt(response1[0]?.data?.courseStatus.paidEnabled) +
              parseInt(response1[0]?.data?.courseStatus.paidPending)
          );
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);

        const response: any = await Promise.all([
          API_SERVICES.instructorReportsService.getAmountEnrolled(
            userDetails.id,
            CurrentMonth
          ),
          API_SERVICES.instructorReportsService.getStudentEnrolled(
            userDetails.id,
            CurrentMonth
          )
        ]);
        if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
          setRevenueCount(response[0]?.data);
        }
        if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
            setCourseCount(response[1]?.data);
          }
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  }, [revenueChipFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const overAllDetails = [
    {
      heading: t('dashboard.downloadReports'),
      subText: 1,
      iconImage: DownloadIcon
    },
    {
      heading: t('dashboard.numberOfCourses'),
      subText: courseCount,
      iconImage: ListIcon
    },
    {
      heading: t('dashboard.numberOfStudents'),
      subText: studentCount,
      iconImage: NewOrder
    },
    {
      heading: t('dashboard.numberOfInstructors'),
      subText: mentorCount,
      iconImage: NewOrder
    },
    {
      heading: t('dashboard.courseOverview'),
      subText: courseCount,
      iconImage: ListIcon
    }
  ];

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {userDetails.user_type === 1 || userDetails.user_type === 2 ? (
          <>
            <Heading headingText={t('home.adminRevenue')} />
            <MultiSelectChip
              chipItems={FILTER_CHIPS}
              selectedChipItem={revenueChipFilter}
              handleChange={handleChangeRevenueChip}
              chipStyle={{
                padding: theme.spacing(2, 0.8),
                height: theme.MetricsSizes.large
              }}
            />
            <ContentDisplayTiles
              displayContent={revenueDetails}
              isTileTypeOrders={true}
              onTabChange={handleSetSelectedTabVal}
              tabValue={selectedTabVal}
            />
            <Heading headingText={t('overAllDetails')} />
            <ContentDisplayTiles
              displayContent={overAllDetails}
              isTileTypeOrders={true}
              onTabChange={handleSetSelectedTab}
              tabValue={selectedTab}
            />
            <TabPanel value={selectedTab} index={4}>
              <ContentDisplayTiles
                displayContent={courseDetails}
                isTileTypeOrders={true}
              />
            </TabPanel>
          </>
        ) : (
          <>
            <Grid>
              <Heading
                headingText={'Dashboard'}
                headerFontSize={'32px'}
                headerFontWeight={500}
                headingColor={'#3C414B'}
                headerFontFamily={'IBM Plex Serif'}
                style={{
                  [theme.breakpoints.down('xs')]: {
                    fontSize: 15
                  },
                  padding: '0px 0px 20px 0px'
                }}
              />
              <Grid>
                <img src={LineBarIcon} alt="" />
              </Grid>
            </Grid>
            <Grid paddingTop={4}>
              <MentorDashboard
                revenueCount={revenueCount}
                courseCount={courseCount}
              />
            </Grid>
          </>
        )}
      </>
    );
  }
}

export default AdminDashboard;
