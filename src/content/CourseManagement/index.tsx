import { useCallback, useContext, useEffect, useState } from 'react';
import { LineBarIcon, ListIcon, StatisticIcon } from 'src/Assets/Images';
import { ButtonComp, Heading, MuiConfirmModal } from 'src/components';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';
import { Loader } from 'src/components';
import { AddCircleOutline } from '@material-ui/icons';
import {
  CONFIRM_MODAL,
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import CourseManagementTable from './CourseManagementTable';
import AddNewCourseModal from './AddNewCourseModal';
import CourseViewModal from './CourseViewModal';
import { API_SERVICES } from 'src/Services';
import toast from 'react-hot-toast';
import { UserInfoContext } from 'src/contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  dividerStyle: {
    background: theme.Colors.black
  },
  containerStyle: {
    paddingRight: theme.spacing(2.8)
  },
  headingStyle: {
    paddingLeft: theme.spacing(2.5)
  }
}));

const COURSE_COUNT = {
  pendingCount: 0,
  enabledCount: 0,
  paidPending: 0,
  freePending: 0,
  paidEnabled: 0,
  freeEnabled: 0
};
function CourseManagement() {
  const classes = useStyles();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [courseCount, setCourseCount] = useState(COURSE_COUNT);
  const { userDetails } = useContext(UserInfoContext);

  const courseManagementDetails = [
    {
      heading: t('course.viewAllCourses'),
      subText: '',
      iconImage: ListIcon,
      value: 0
    },
    {
      heading: t('course.statistics'),
      subText: '',
      iconImage: StatisticIcon,
      value: 1
    }
  ];

  const statisticDetails = [
    {
      heading: t('course.activeCourses'),
      subText: courseCount.enabledCount,
      iconImage: ListIcon,
      value: 1
    },
    {
      heading: t('course.pendingCourse'),
      subText: courseCount.pendingCount,
      iconImage: ListIcon,
      value: 2
    }
  ];

  const courseToDisplay = [
    {
      heading: t('course.freeCourse'),
      subText: courseCount.freeEnabled,
      iconImage: ListIcon,
      value: 1
    },
    {
      heading: t('course.paidCourse'),
      subText: courseCount.paidEnabled,
      iconImage: ListIcon,
      value: 2
    }
  ];

  const pendingCourseToDisplay = [
    {
      heading: t('course.freeCourse'),
      subText: courseCount.freePending,
      iconImage: ListIcon,
      value: 1
    },
    {
      heading: t('course.paidCourse'),
      subText: courseCount.paidPending,
      iconImage: ListIcon,
      value: 2
    }
  ];

  const courseSubCategory = [
    {
      heading: t('course.seminar'),
      subText: '',
      iconImage: ListIcon,
      value: 1
    },
    {
      heading: 'Master Class',
      subText: '',
      iconImage: ListIcon,
      value: 2
    },
    {
      heading: t('course.webinar'),
      subText: '',
      iconImage: ListIcon,
      value: 3
    },
    {
      heading: t('course.workshop'),
      subText: '',
      iconImage: ListIcon,
      value: 4
    },
    {
      heading: t('course.liveCourse'),
      subText: '',
      iconImage: ListIcon,
      value: 5
    },
    {
      heading: t('course.savedCourse'),
      subText: '',
      iconImage: ListIcon,
      value: 6
    }
  ];

  const [selectedTab, setSelectedTab] = useState<string | number>(
    courseManagementDetails[0].value
  );
  const [selectedCourseTypeVal, setSelectedCourseTypeVal] = useState<
    string | number
  >(courseSubCategory[0].value);
  const [selectedStatistic, setSelectedStatistic] = useState<number>(
    statisticDetails[0].value
  );
  const [selectCourseType, setSelectCourseType] = useState<number>(
    courseToDisplay[0].value
  );

  const [filteredTableData, setFilteredTableData] = useState([]);

  const [addNewCourse, setAddNewCourse] = useState<any>({
    open: false
  });
  const [tableData, setTableData] = useState([]);
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });
  const { searchValue, setSearchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
  }

  const handleSetSelectedTab = (value) => {
    setSelectedTab(value);
    setSearchValue('');
  };

  const handleSetSelectedTabVal = (value: number | string) => {
    setSelectedCourseTypeVal(value);
    setSearchValue('');
  };

  const handleSelectedStatistic = (value) => {
    setSelectedStatistic(value);
  };

  const fetchData = useCallback(async () => {
    try {
      let params: any = {};
      if (userDetails.user_type === 1 || userDetails.user_type === 2) {
        if (debValue !== '') {
          params.searchString = debValue;
        }
      } else if (userDetails.user_type === 3) {
        params.mentor_id = userDetails.id;
      }

      const response: any = await Promise.all([
        API_SERVICES.courseManagementService.getAll(
          DETECT_LANGUAGE[i18n.language],
          params
        ),
        API_SERVICES.courseManagementService.getStatistic()
      ]);

      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        setTableData(response[0]?.data?.courses);
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        setCourseCount(response[1]?.data?.courseStatus);
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [debValue, selectedCourseTypeVal]);

  useEffect(() => {
    fetchData();
  }, [debValue, selectedCourseTypeVal]);

  const onDeleteCourse = (rowData) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any =
        await API_SERVICES.courseManagementService.delete(rowData?.id, {
          successMessage: 'Course deleted successfully!'
        });

      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the Course?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const onActionButtonClick = (rowData: any) => {
    setModalOpen({ open: true, rowData: rowData });
  };

  const getCourseById = async (id: number) => {
    const response: any = await API_SERVICES.courseManagementService.getById(
      id
    );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      return response;
    }
  };

  const onCreateOrEditButtonClick = useCallback(
    async (rowData?: any, type?: string) => {
      if (type === CONFIRM_MODAL.edit) {
        const response: any = await getCourseById(rowData?.course_id);
        if (response?.data?.course && response?.data?.course_language) {
          setAddNewCourse({
            open: true,
            rowData: response.data,
            type: type
          });
        }
        return;
      }
      setAddNewCourse({ open: true, type: type });
    },
    []
  );

  const onClickAcceptCourse = (rowData: any, courseStatus: string) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    let updateData = {
      course_status: courseStatus
    };
    const onConfirmClick = async () => {
      const response: any = await API_SERVICES.courseManagementService.update(
        rowData?.id,
        {
          data: updateData,
          successMessage: 'Course Approved successfully!'
        }
      );

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.secondary,
      description: 'Are you sure want to accept this Course?',
      title: 'Accept',
      iconType: CONFIRM_MODAL.accept
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const getFilteredTableData = tableData.filter(
    (item) => item.course_type === COURSE_TYPE_NAME[selectedCourseTypeVal]
  );

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {userDetails.user_type === 3 ? (
          <Grid>
            <Heading
              headingText={'Courses'}
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
        ) : (
          <Heading headingText={t('course.courseManagementDetails')} />
        )}
        <ButtonComp
          buttonText={t('course.addNewCourse')}
          onClickButton={() =>
            onCreateOrEditButtonClick({}, CONFIRM_MODAL.create)
          }
          backgroundColor={theme.Colors.primary}
          height="33px"
          buttonFontSize={theme.MetricsSizes.tiny_xxx}
          buttonTextColor={theme.Colors.white}
          buttonFontWeight={theme.fontWeight.medium}
          btnWidth={'fit-content'}
          btnBorderRadius={100}
          endIcon={<AddCircleOutline fontSize="small" />}
        />
        <ContentDisplayTiles
          displayContent={courseManagementDetails}
          isTileTypeOrders={true}
          onTabChange={handleSetSelectedTab}
          tabValue={selectedTab}
        />
        <TabPanel value={selectedTab} index={0}>
          <ContentDisplayTiles
            displayContent={courseSubCategory}
            isTileTypeOrders={true}
            onTabChange={handleSetSelectedTabVal}
            tabValue={selectedCourseTypeVal}
          />
          <Box sx={{ mt: 3 }}>
            <CourseManagementTable
              onClickActionButton={onActionButtonClick}
              tableRowData={getFilteredTableData}
              //onClickCancelOrAccept={onClickCancelOrAccept}
              onEditCourseDetais={(rowData) =>
                onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
              }
              onDeleteCourse={onDeleteCourse}
              onClickAcceptCourse={onClickAcceptCourse}
              updateData={fetchData}
            />
          </Box>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ContentDisplayTiles
            displayContent={statisticDetails}
            isTileTypeOrders={true}
            onTabChange={handleSelectedStatistic}
            tabValue={selectedStatistic}
          />
          <TabPanel value={selectedStatistic} index={1}>
            <ContentDisplayTiles
              displayContent={courseToDisplay}
              isTileTypeOrders={true}
              // onTabChange={handleSetSelectedTabVal}
              // tabValue={selectedTabVal}
            />
          </TabPanel>
          <TabPanel value={selectedStatistic} index={2}>
            <ContentDisplayTiles
              displayContent={pendingCourseToDisplay}
              isTileTypeOrders={true}
              // onTabChange={handleSetSelectedTabVal}
              // tabValue={selectedTabVal}
            />
          </TabPanel>
        </TabPanel>

        {modalOpen.open && (
          <CourseViewModal
            onClose={() => setModalOpen({ open: false })}
            {...modalOpen}
          />
        )}
        {addNewCourse.open && (
          <AddNewCourseModal
            onClose={() => setAddNewCourse({ open: false })}
            updateData={fetchData}
            getCourseById={getCourseById}
            {...addNewCourse}
          />
        )}
        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
      </>
    );
  }
}

export default CourseManagement;
