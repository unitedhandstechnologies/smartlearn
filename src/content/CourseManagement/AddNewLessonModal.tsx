import React, { useState } from 'react';
import { makeStyles, Grid, useTheme } from '@material-ui/core';

import { useEdit } from 'src/hooks/useEdit';
import DualActionButton from 'src/components/DualActionButton';
import { CONFIRM_MODAL, HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';
import { DialogComp, MuiTabComponent } from 'src/components';
import { t } from 'i18next';
import TextLesson from './TextLesson';

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
    padding: theme.spacing(2),
    borderRadius: 18
  }
}));

type Props = {
  handleClose?: () => void;
  updateData?: () => void;
  rowData?: any;
  type?: string;
  courseId: number;
  sectionId: number;
};
const AddNewLessonModal = ({
  handleClose,
  updateData,
  rowData,
  courseId,
  sectionId,
  type
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.lesson_languages?.length &&
      rowData?.lesson_languages.filter((item) => item.language_id === lanID);
    let lessonName = data?.length && data[0].lesson_name;
    let pdfUrl = data?.length && data[0].pdf_url;
    let videoUrl = data?.length && data[0].video_url;
    let duration = data?.length && data[0].duration;
    return { lessonName, pdfUrl, videoUrl, duration };
  };

  const initialValues = {
    engLessonName: getLanguageData(LANGUAGE_ID.english).lessonName || '',
    hinLessonName: getLanguageData(LANGUAGE_ID.hindi).lessonName || '',
    gujLessonName: getLanguageData(LANGUAGE_ID.gujarati).lessonName || '',
    engVideoUrl: getLanguageData(LANGUAGE_ID.english).videoUrl || '',
    hinVideoUrl: getLanguageData(LANGUAGE_ID.hindi).videoUrl || '',
    gujVideoUrl: getLanguageData(LANGUAGE_ID.gujarati).videoUrl || '',
    engPdfUrl: getLanguageData(LANGUAGE_ID.english).pdfUrl || '',
    hinPdfUrl: getLanguageData(LANGUAGE_ID.hindi).pdfUrl || '',
    gujPdfUrl: getLanguageData(LANGUAGE_ID.gujarati).pdfUrl || '',
    engDuration: getLanguageData(LANGUAGE_ID.english).duration || 0.0,
    hinDuration: getLanguageData(LANGUAGE_ID.hindi).duration || 0.0,
    gujDuration: getLanguageData(LANGUAGE_ID.gujarati).duration || 0.0
  };

  const edit = useEdit(initialValues);

  const RequiredFields = [];

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
      let uData: any = {
        lesson_languages: [
          {
            lesson_name: edit.getValue('engLessonName'),
            language_id: 1,
            video_url: edit.getValue('engVideoUrl'),
            pdf_url: edit.getValue('engPdfUrl'),
            duration: edit.getValue('engDuration')
          },
          {
            lesson_name: edit.getValue('hinLessonName'),
            language_id: 2,
            video_url: edit.getValue('hinVideoUrl'),
            pdf_url: edit.getValue('hinPdfUrl'),
            duration: edit.getValue('hinDuration')
          },
          {
            lesson_name: edit.getValue('gujLessonName'),
            language_id: 3,
            video_url: edit.getValue('gujVideoUrl'),
            pdf_url: edit.getValue('gujPdfUrl'),
            duration: edit.getValue('gujDuration')
          }
        ]
      };
 
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      }
      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.sectionAndLessonService.createLesson(
          courseId,
          sectionId,
          {
            data: uData,
            successMessage: 'New Lesson Added successfully!',
            failureMessage: 'Error: Lesson Added Failed'
          }
        );
      } else if (types[type].handleType === 2) {
        if (!edit.isAnyModified()) {
          handleClose();
          return;
        }
        response = await API_SERVICES.sectionAndLessonService.updateLesson(
          rowData?.lesson?.id,
          {
            data: uData,
            successMessage: 'Lesson Updated successfully!',
            failureMessage: 'Error: Failed to Update Lesson'
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
    return <TextLesson edit={edit} tabValue={tabValue} isError={isError} />;
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
      <DualActionButton
        onLeftButtonClick={handleClose}
        onRightButtonClick={handleCreate}
        buttonText={
          types[type].handleType === 2 ? t('save') : t('button.create')
        }
      />
    );
  };

  return (
    <DialogComp
      dialogTitle={
        types[type].handleType === 2
          ? 'Edit Lesson Details'
          : 'Create Lesson Details'
      }
      maxWidth={'sm'}
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

export default React.memo(AddNewLessonModal);
