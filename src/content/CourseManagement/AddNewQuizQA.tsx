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
import OuizQAInput from './OuizQAInput';

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
  quizId: number;
};
const AddNewQuizQA = ({
  handleClose,
  updateData,
  rowData,
  courseId,
  quizId,
  type
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.quizzes_languages?.length &&
      rowData?.quizzes_languages.filter((item) => item.language_id === lanID);
    let question = data?.length && data[0].question;
    let answer = data?.length && data[0].answer;
    let option1 = data?.length && data[0].option_1;
    let option2 = data?.length && data[0].option_2;
    let option3 = data?.length && data[0].option_3;
    let option4 = data?.length && data[0].option_4;

    return { question, answer, option1, option2, option3, option4 };
  };

  const initialValues = {
    qNumber: rowData?.quizzes.question_no || '',
    engQuestion: getLanguageData(LANGUAGE_ID.english).question || '',
    hinQuestion: getLanguageData(LANGUAGE_ID.hindi).question || '',
    gujQuestion: getLanguageData(LANGUAGE_ID.gujarati).question || '',
    answer: rowData?.quizzes.answer || '',    
    engOption1: getLanguageData(LANGUAGE_ID.english).option1 || '',
    hinOption1: getLanguageData(LANGUAGE_ID.hindi).option1 || '',
    gujOption1: getLanguageData(LANGUAGE_ID.gujarati).option1 || '',
    engOption2: getLanguageData(LANGUAGE_ID.english).option2 || '',
    hinOption2: getLanguageData(LANGUAGE_ID.hindi).option2 || '',
    gujOption2: getLanguageData(LANGUAGE_ID.gujarati).option2 || '',
    engOption3: getLanguageData(LANGUAGE_ID.english).option3 || '',
    hinOption3: getLanguageData(LANGUAGE_ID.hindi).option3 || '',
    gujOption3: getLanguageData(LANGUAGE_ID.gujarati).option3 || '',
    engOption4: getLanguageData(LANGUAGE_ID.english).option4 || '',
    hinOption4: getLanguageData(LANGUAGE_ID.hindi).option4 || '',
    gujOption4: getLanguageData(LANGUAGE_ID.gujarati).option4 || '',
  };
  const edit = useEdit(initialValues);

  const RequiredFields = [
    'qNumber',
    'answer'
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
      let uData: any = {
        question_no: edit.getValue('qNumber'),
        answer: edit.getValue('answer'),
        language_details: [
          {
            language_id: 1,
            question: edit.getValue('engQuestion'),
            option_1: edit.getValue('engOption1'),
            option_2: edit.getValue('engOption2'),
            option_3: edit.getValue('engOption3'),
            option_4: edit.getValue('engOption4'),
          },
          {            
            language_id: 2,
            question: edit.getValue('hinQuestion'),
            option_1: edit.getValue('hinOption1'),
            option_2: edit.getValue('hinOption2'),
            option_3: edit.getValue('hinOption3'),
            option_4: edit.getValue('hinOption4'),
          },
          {            
            language_id: 3,
            question: edit.getValue('gujQuestion'),
            option_1: edit.getValue('gujOption1'),
            option_2: edit.getValue('gujOption2'),
            option_3: edit.getValue('gujOption3'),
            option_4: edit.getValue('gujOption4'),
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      }
      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.quizService.createQuiz(
          courseId,
          {
            data: uData,
            successMessage: 'New Quiz Question and Answer added successfully!',
            failureMessage: ''
          }          
        );
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          handleClose();
          updateData();
        }
        else{
          toast.error(response.message)
        }
      } else if (types[type].handleType === 2) {
        if (!edit.isAnyModified()) {
          handleClose();
          return;
        }
        
        response = await API_SERVICES.quizService.updateQuiz(
          quizId,
          {
            data: uData,
            successMessage: ' Quiz Question and Answer Updated successfully!',
            failureMessage: 'Error: Failed to Update  Quiz Question and Answer'
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
    return <OuizQAInput  edit={edit} tabValue={tabValue} isError={isError} />;
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
          ? 'Edit Quiz Details'
          : 'Create Quiz Details'
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

export default React.memo(AddNewQuizQA);
