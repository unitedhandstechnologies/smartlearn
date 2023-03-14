import React, { useState, useEffect, useRef, useContext } from 'react';
import { makeStyles, Grid, useTheme } from '@material-ui/core';
import CreatePrimaryDetails from './CreatePrimaryDetails';
import { DialogComp, MuiTabComponent } from 'src/components';
import { toast } from 'react-hot-toast';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  COURSE_STATUS_NAME,
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID,
  MENTOR_STATUS,
  USER_TYPES,
  USER_TYPE_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import DualActionButton from 'src/components/DualActionButton';
import CreateCourseDetails from './CreateCourseDetails';
import { UserInfoContext } from 'src/contexts/UserContext';
const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: 950,
    minHeight: 500,
    padding: theme.spacing(1),
    borderRadius: theme.MetricsSizes.regular
  },
  dialogTitleRoot: {
    padding: theme.spacing(0, 3)
  },
  selectedTab: {
    fontWeight: theme.fontWeight.bold,
    color: theme.Colors.secondary
  }
}));

interface Props {
  onClose: () => void;
  updateData: Awaited<() => Promise<void>>;
  rowData?: any;
  type: string;
  getCourseById: Awaited<(id: number) => Promise<void>>;
}

const AddNewCourseModal = ({
  onClose,
  updateData,
  rowData,
  type,
  getCourseById
}: Props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const theme = useTheme();
  const [mentors, setMentors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [courseLevels, setCourseLevels] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [rowItemData, setRowItemData] = useState<any>({});
  const courseRef = useRef({});

  const types = {
    [CONFIRM_MODAL.create]: {
      handleType: 1
    },
    [CONFIRM_MODAL.edit]: {
      handleType: 2
    }
  };

  const tabItems = [
    {
      id: 1,
      label: 'Primary Details',
      component: () => (
        <CreatePrimaryDetails
          error={error}
          dateError={dateError}
          edit={edit}
          categories={categories}
          mentors={
            userDetails.user_type === USER_TYPE_ID.mentors
              ? mentorCourse
              : mentors
          }
          courseLevels={courseLevels}
          isDisableCourseType={
            rowItemData?.course?.course_type === COURSE_TYPE_NAME[6] &&
            (types[type].handleType === 2 ||
              courseRef?.current[0]?.isBackFromCourseDetails)
          }
        />
      )
    },
    {
      id: 2,
      label: 'Course Details',
      component: () => <CreateCourseDetails courseRef={courseRef} />
    }
  ];

  const getLanguageData = (lanID: number) => {
    let data =
      rowItemData?.course_language?.length &&
      rowItemData?.course_language?.filter(
        (item) => item.language_id === lanID
      );
    let courseName = data?.length && data[0].course_name;
    let courseDescription = data?.length && data[0].course_description;
    let requirements = data?.length && data[0].requirements;
    return { courseName, courseDescription, requirements };
  };

  const [selectedTab, setSelectedTab] = useState(tabItems[0]?.id);
  const initialData = {
    language_details: [
      {
        language_id: 1,
        course_name: getLanguageData(LANGUAGE_ID.english).courseName || '',
        course_description:
          getLanguageData(LANGUAGE_ID.english).courseDescription || '',
        requirements: getLanguageData(LANGUAGE_ID.english).requirements || ''
      },
      {
        language_id: 2,
        course_name: getLanguageData(LANGUAGE_ID.hindi).courseName || '',
        course_description:
          getLanguageData(LANGUAGE_ID.hindi).courseDescription || '',
        requirements: getLanguageData(LANGUAGE_ID.gujarati).requirements || ''
      },
      {
        language_id: 3,
        course_name: getLanguageData(LANGUAGE_ID.gujarati).courseName || '',
        course_description:
          getLanguageData(LANGUAGE_ID.gujarati).courseDescription || '',
        requirements: getLanguageData(LANGUAGE_ID.gujarati).requirements || ''
      }
    ],
    category_id: rowItemData?.course?.category_id || 0,
    category_name: rowItemData?.course?.category_name || '',
    sub_category_id: rowItemData?.course?.sub_category_id || '',
    sub_category_name: rowItemData?.course?.sub_category_name || '',
    mentor_id: rowItemData?.course?.mentor_id || '',
    mentor_name: rowItemData?.course?.mentor_name || '',
    course_type: rowItemData?.course?.course_type || '',
    chapter: rowItemData?.course?.chapter || '',
    section: rowItemData?.course?.section || '',
    cost_type: rowItemData?.course?.cost_type || '',
    amount: rowItemData?.course?.amount || 0,
    discount: rowItemData?.course?.discount || 0,
    starting_date: rowItemData?.course?.starting_date || '',
    ending_date: rowItemData?.course?.ending_date || '',
    duration: rowItemData?.course?.duration || '',
    starting_time: rowItemData?.course?.starting_time || '',
    ending_time: rowItemData?.course?.ending_time || '',
    course_mode: rowItemData?.course?.course_mode || '',
    meeting_location: rowItemData?.course?.meeting_location || '',
    meeting_link: rowItemData?.course?.meeting_link || '',
    course_status: rowItemData?.course?.course_status || COURSE_STATUS_NAME[1],
    total_no_of_students: rowItemData?.course?.total_no_of_students || '',
    course_level_name: rowItemData?.course?.course_level_name || '',
    course_level_id: rowItemData?.course?.course_level_id || '',
    image_url: rowItemData?.course?.image_url || ''
  };

  const edit = useEdit(initialData);
  const { userDetails } = useContext(UserInfoContext);
  const onTabChange = (value: any) => {
    setSelectedTab(value);
  };

  const RequiredFieldsForSeminar = [
    'mentor_name',
    'image_url',
    'category_name',
    'sub_category_name',
    'cost_type',
    'starting_date',
    'ending_date',
    'starting_time',
    'ending_time',
    'course_level_name',
    'course_mode',
    'meeting_location',
    'total_no_of_students'
  ];

  const RequiredFieldsForRecorded = [
    'mentor_name',
    'image_url',
    'category_name',
    'sub_category_name',
    'cost_type',
    'course_level_name'
  ];

  const RequiredFieldsForOthers = [
    'mentor_name',
    'image_url',
    'category_name',
    'sub_category_name',
    'cost_type',
    'starting_date',
    'ending_date',
    'starting_time',
    'ending_time',
    'course_level_name',
    'course_mode',
    'meeting_link'
  ];

  const renderTabContent = (tabVal?: any) => {
    const findActiveTab = tabItems.find(({ id }) => id === tabVal);
    return <Grid>{findActiveTab ? findActiveTab.component() : null}</Grid>;
  };

  const fetchData = async () => {
    try {
      let getLanguageId = DETECT_LANGUAGE[i18n.language];
      const response: any = await Promise.all([
        API_SERVICES.adminUserService.getAllUsers(),
        API_SERVICES.categoryManagementService.getAllCategoryNoPermission(
          getLanguageId
        ),
        API_SERVICES.courseLevelManagementService.getAllCourseLevels(
          getLanguageId
        )
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.users) {
          const approvedMentorList = response[0].data.users.filter(
            (item) =>
              item.status_id === MENTOR_STATUS.accepted &&
              item.user_type === USER_TYPES.mentor
          );
          if (
            USER_TYPES.superAdmin ||
            USER_TYPES.admin === userDetails.user_type
          ) {
            setMentors([...approvedMentorList]);
          }
          // else {
          //   const mentor = approvedMentorList.filter(
          //     (item) => item.id === userDetails.id
          //   );
          //   setMentors(mentor);
          // }
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.categories) {
          const category = response[1]?.data?.categories;
          const filteredCategory = category.filter((item) => item.status === 1);
          setCategories(filteredCategory);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (
          response[2]?.data?.courseLevel &&
          response[2]?.data?.courseLevel?.length
        ) {
          const enabledCourseLevel = response[2]?.data?.courseLevel.filter(
            (item) => item.status === 1
          );
          setCourseLevels(enabledCourseLevel);
        }
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const mentorCourse = mentors.filter((item) => item.id === userDetails.id);
  console.log(userDetails, 'userDetails');

  const handleNextClick = async () => {
    let RequiredFields;
    if (edit.getValue('course_type') === 'Recorded Course') {
      if (edit.getValue('cost_type') === 'Paid') {
        let temp = ['amount', 'discount'];
        RequiredFields = [...RequiredFieldsForRecorded, ...temp];
      } else {
        RequiredFields = RequiredFieldsForRecorded;
      }
    } else if (edit.getValue('course_type') === 'Seminar') {
      if (edit.getValue('cost_type') === 'Paid') {
        let temp = ['amount', 'discount'];
        RequiredFields = [...RequiredFieldsForSeminar, ...temp];
      } else {
        RequiredFields = RequiredFieldsForSeminar;
      }
    } else {
      if (edit.getValue('cost_type') === 'Paid') {
        let temp = ['amount', 'discount'];
        RequiredFields = [...RequiredFieldsForOthers, ...temp];
      } else {
        RequiredFields = RequiredFieldsForOthers;
      }
    }
    const date = new Date().toLocaleDateString();
    const dateFrom = new Date(edit.getValue('starting_date')).toLocaleDateString();
    const dateTo = new Date(edit.getValue('ending_date')).toLocaleDateString();

    try {
      if (dateFrom < date) {
        setError(true);
        setDateError(true);
        return toast.error('Please select a valid Date');
      }
      if (dateFrom > dateTo) {
        setError(true);
        setDateError(true);
        return toast.error(
          'Starting Date should be a Date previous to Ending Date'
        );
      }
      // if (edit.getValue('course_type') !== 'Webinar' && dateFrom == dateTo) {
      //   setError(true);
      //   setDateError(true);
      //   return toast.error(
      //     'Starting Date should be a Date previous to Ending Date'
      //   );
      // }

      if (edit.getValue('starting_time') > edit.getValue('ending_time')) {
        setError(true);
        setTimeError(true);
        return toast.error('Starting Time should be less than Ending Time');
      }

      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please fill all the required fields');
      }
      if (
        types[type].handleType === 1 &&
        !courseRef?.current[0]?.isBackFromCourseDetails
      ) {
        let data = {
          amount: 0,
          discount: 0,
          chapter: 0,
          section: 0,
          meeting_location: '',
          meeting_link: '',
          total_no_of_students: 0,
          learn_objective: [],
          discount_time: 2,
          theory_date: '',
          theory_time: '',
          practical_time: '',
          practical_date: '',
          ...edit.edits
        };
        const response: any =
          await API_SERVICES.courseManagementService.createCourse({
            data: data,
            successMessage: 'Course Created successfully!'
          });

        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (edit.getValue('course_type') === COURSE_TYPE_NAME[6]) {
            if (response?.data?.course_details) {
              let data = {
                courseId: response.data.course_details.id
              };
              courseRef.current[0] = data;
              updateData();
              edit.reset();
              onTabChange(2);
            }
          } else {
            onClose();
            updateData();
          }
        }
      } else if (
        types[type].handleType === 2 ||
        courseRef?.current[0]?.isBackFromCourseDetails
      ) {
        let data = { ...edit.edits };
        if (!edit.isAnyModified()) {
          if (edit.getValue('course_type') === COURSE_TYPE_NAME[6]) {
            let data = {
              courseId: rowItemData?.course?.id
            };
            courseRef.current[0] = data;
            onTabChange(2);
          } else {
            onClose();
          }
          return;
        }
        const response: any = await API_SERVICES.courseManagementService.update(
          rowItemData?.course?.id,
          {
            data: data,
            successMessage: 'Course updated successfully!',
            failureMessage: 'Failed to update course'
          }
        );
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (edit.getValue('course_type') === COURSE_TYPE_NAME[6]) {
            if (response?.data?.course) {
              let data = {
                courseId: response.data.course.id
              };
              courseRef.current[0] = data;
              updateData();
              edit.reset();
              onTabChange(2);
            }
          } else {
            onClose();
            updateData();
          }
        }
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleOnClickDone = async () => {
    try {
      const data = {
        chapter: courseRef?.current[0]?.chapter ?? 0,
        section: courseRef?.current[0]?.section ?? 0
      };
      let courseId = rowItemData?.course?.id ?? courseRef.current[0]?.courseId;
      const response: any = await API_SERVICES.courseManagementService.update(
        courseId,
        {
          data: data,
          successMessage: 'Course Details updated successfully!'
        }
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        onClose();
        updateData();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    setRowItemData(rowData);
  }, []);

  const handleOnClickBack = async () => {
    const response: any = await getCourseById(courseRef?.current[0]?.courseId);
    if (response?.data?.course && response?.data?.course_language) {
      setRowItemData(response.data);
      onTabChange(1);
      courseRef.current[0].isBackFromCourseDetails = true;
    }
  };

  const renderAction = () => {
    return (
      <DualActionButton
        onLeftButtonClick={selectedTab === 2 ? handleOnClickBack : onClose}
        onRightButtonClick={
          selectedTab === 2 ? handleOnClickDone : handleNextClick
        }
        buttonText={
          selectedTab === 2
            ? 'Done'
            : edit.getValue('course_type') !== COURSE_TYPE_NAME[6]
            ? 'Save'
            : 'Next'
        }
        leftBtnText={selectedTab === 2 && 'Back'}
      />
    );
  };

  const renderDialogContent = () => {
    return (
      <Grid container>
        <MuiTabComponent
          currentTabVal={selectedTab}
          tabContent={tabItems}
          tabIndicatorColor={theme.Colors.secondary}
          renderTabContent={renderTabContent}
          onTabChange={() => {}}
          tabClasses={{
            selected: classes.selectedTab
          }}
        />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={
        types[type].handleType === 2
          ? t('course.editCourse')
          : t('course.create')
      }
      open={true}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
      onClose={selectedTab === 2 ? handleOnClickDone : onClose}
    />
  );
};

export default React.memo(AddNewCourseModal);
