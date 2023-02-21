import React, { useState } from 'react';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { DialogComp, MuiTabComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import {  HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import FaqInputContent from './FaqInputContent';


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
  rowData?: any;
  updateData?: () => void;
  type?: string;
  categories?: any[];
  onCreateOrEditFaqButtonClick?: ()=>void;
  types:any,
};
const AddFaqModal = ({
    handleClose,
  rowData,
  type,
  types,
  updateData,
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);

  const getQuestions = (lanID: number) => {
    let data =
      rowData?.faq_language?.length &&
      rowData?.faq_language?.filter(
        (item) => item.language_id === lanID
      );
    return data?.length && data[0].question;
  };

  const getAnswers = (lanID: number) => {
    let data =
      rowData?.faq_language?.length &&
      rowData?.faq_language?.filter(
        (item) => item.language_id === lanID
      );
    return data?.length && data[0].answer;
  };

  const initialValues = {
    questionEnglish: getQuestions(LANGUAGE_ID.english) || '',
    questionHindi: getQuestions(LANGUAGE_ID.hindi) || '',
    questionGujarati: getQuestions(LANGUAGE_ID.gujarati) || '',
    answerEnglish: getAnswers(LANGUAGE_ID.english) || '',
    answerHindi: getAnswers(LANGUAGE_ID.hindi) || '',
    answerGujarati: getAnswers(LANGUAGE_ID.gujarati) || '',
    sort_no: rowData?.faq.sort_no ?? '',
    status: rowData?.faq?.status ?? 1,
  };
  const edit = useEdit(initialValues);

  const RequiredFields = [
    'questionEnglish',
/*     'questionHindi',
    'questionGujarati', */
    'answerEnglish',
/*     'answerHindi',
    'answerGujarati', */
    'sort_no',
    'status'
  ];

  const tabs = [
    {
      label: 'English',
      id: 1
    }/* ,
    {
      label: 'Hindi',
      id: 2
    },
    {
      label: 'Gujarati',
      id: 3
    } */
  ];

  const handleCreateOrEdit = async () => {
    try {
      let uData = {
        sort_no: edit.getValue('sort_no'),
        status: edit.getValue('status'),
        language_details: [
          {
            language_id: 1,
            question: edit.getValue('questionEnglish'),
            answer: edit.getValue('answerEnglish')
          },
          {
            language_id: 2,
            question: edit.getValue('questionEnglish'),
            answer: edit.getValue('answerEnglish')
          },
          {
            language_id: 3,
            question: edit.getValue('questionEnglish'),
            answer: edit.getValue('answerEnglish')
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      }

      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.pageManagementService.create({
          data: uData,
          successMessage: 'New FQA Added successfully!',
          failureMessage: 'Sort Number already Exist'
        });
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.pageManagementService.updateFaq(
          rowData?.faq?.id,
          {
            data: uData,
            successMessage: 'FAQ updated successfully!',
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
        <FaqInputContent 
            edit={edit}
            tabValue={tabValue}
            isError={isError}
        />
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
          onRightButtonClick={handleCreateOrEdit}
          buttonText={
             types[type].handleType === 2 ? t('save') :  t('button.create')
          }
        />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={
         types[type].handleType === 2
          ? t('Page.editFaq'): 
           t('Page.addNewFaq')
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

export default AddFaqModal;
