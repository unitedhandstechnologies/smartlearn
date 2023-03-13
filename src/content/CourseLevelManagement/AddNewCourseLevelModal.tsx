import React, { useState } from 'react';
import { makeStyles, Grid, useTheme } from '@material-ui/core';
import { useEdit } from 'src/hooks/useEdit';
import DualActionButton from 'src/components/DualActionButton';
import { CONFIRM_MODAL, HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';
import { DialogComp, MuiTabComponent } from 'src/components';
import { useTranslation } from 'react-i18next';
import CourseLevelTextInput from './CourseLevelTextInput';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.fontWeight.bold,
    alignItems: 'center'
  },
  selectedTab: {
    fontWeight: theme.fontWeight.bold,
    color: theme.Colors.secondary
  },
  dialogPaper: {
    width: 847,
    padding: theme.spacing(2, 1, 2, 5),
    borderRadius: 18
  }
}));

type Props = {
  handleClose?: () => void;
  updateData?: () => void;
  rowData?: any;
  type?: string;
};
const AddNewCourseLevelModal = ({
  handleClose,
  updateData,
  rowData,
  type
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.course_level_language?.length &&
      rowData?.course_level_language.filter((item) => item.language_id === lanID);
    return data?.length && data[0].course_level_name;
  };

  const initialValues = {
    engCourseName: getLanguageData(LANGUAGE_ID.english) || '',
    hinCourseName: getLanguageData(LANGUAGE_ID.hindi) || '',
    gujCourseName: getLanguageData(LANGUAGE_ID.gujarati) || '',
    sort_no: rowData?.course_level?.sort_no ?? '',
    status: rowData?.course_level?.status ?? 1,
  };

  const edit = useEdit(initialValues);

  const RequiredFields = [
    'engCourseName',
    'hinCourseName',
    'gujCourseName',
    'sort_no',
    'status',
  ];

  const tabs = [
    {
      label: 'English',
      id: 1
    },
    {
      label: 'Hindi',
      id: 2
    },
    {
      label: 'Gujarati',
      id: 3
    }
  ];

  const types = {
    [CONFIRM_MODAL.create]: {
      handleType: 1
    },
    [CONFIRM_MODAL.edit]: {
      handleType: 2
    }
  };

  const handleCreate = async () => {
    try {
      let uData = {
        sort_no: edit.getValue('sort_no'),
        status: edit.getValue('status'),
        language_details: [
          {
            language_id: 1,
            course_level_name: edit.getValue('engCourseName')
          },
          {
            language_id: 2,
            course_level_name: edit.getValue('hinCourseName')
          },
          {
            language_id: 3,
            course_level_name: edit.getValue('gujCourseName')
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      }

      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.courseLevelManagementService.create({      
          data: uData,
          successMessage: 'New Course Level Added successfully!',
          failureMessage: 'Sort Number already Exist'
        });
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.courseLevelManagementService.updateCourseLevel(
          rowData?.course_level?.id,
          {
            data: uData,
            successMessage: 'Course Level updated successfully!',
            failureMessage: 'Sort Number already Exist'
          }
        );
      }
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        handleClose();
        updateData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleChangeTab = (value) => {
    setSelected(value);
  };

  const renderTab = (tabValue) => {
    return (
      <Grid>
        <CourseLevelTextInput
          edit={edit}
          tabValue={tabValue}
          isError={isError}
        />
      </Grid>
    );
  };

  const renderDialogContent = () => {
    return (
      <Grid container>
        <MuiTabComponent
          currentTabVal={selected}
          tabContent={tabs}
          tabIndicatorColor={theme.Colors.secondary}
          renderTabContent={renderTab}
          onTabChange={handleChangeTab}
          tabClasses={{
            selected: classes.selectedTab
          }}
        />
      </Grid>
    );
  };

  const renderAction = () => {
    return (
      <Grid container justifyContent="center">
        <DualActionButton
          onLeftButtonClick={handleClose}
          onRightButtonClick={handleCreate}
          buttonText={
            types[type].handleType === 2 ? t('save') : t('button.create')
          }
        />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={
        types[type].handleType === 2
          ? t('courselevel.edit')
          : t('courselevel.add')
      }
      open={true}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      onClose={handleClose}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default React.memo(AddNewCourseLevelModal);
