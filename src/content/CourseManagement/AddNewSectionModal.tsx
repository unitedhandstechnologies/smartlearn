import { Grid, makeStyles, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  DialogComp,
  MuiTabComponent,
  TextInputComponent
} from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import { CONFIRM_MODAL, HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { capitalizeFirstLetter } from 'src/Utils';

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
  onClose?: () => void;
  courseId?: number;
  type?: string;
  updateData?: () => void;
  rowData?: any;
  fetchSectionData?: () => void;
};

const AddNewSectionModal = ({
  onClose,
  courseId,
  type,
  updateData,
  rowData,
  fetchSectionData
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);
  const { t } = useTranslation();

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.section_languages?.length &&
      rowData?.section_languages?.filter((item) => item.language_id === lanID);
    return data?.length && data[0].section_name;
  };

  const initialValues = {
    engSectionName: getLanguageData(LANGUAGE_ID.english) || '',
    hinSectionName: getLanguageData(LANGUAGE_ID.hindi) || '',
    gujSectionName: getLanguageData(LANGUAGE_ID.gujarati) || ''
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

  const handleChangeTab = (value) => {
    setSelected(value);
  };

  const renderTab = (tabValue) => {
    return <TextInput edit={edit} tabValue={tabValue} isError={isError} />;
  };

  const handleCreateOrEdit = async () => {
    try {
      let uData: any = {
        section_languages: [
          {
            section_name: edit.getValue('engSectionName'),
            language_id: 1
          },
          {
            section_name: edit.getValue('hinSectionName'),
            language_id: 2
          },
          {
            section_name: edit.getValue('gujSectionName'),
            language_id: 3
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      }

      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.sectionAndLessonService.createSection(
          courseId,
          {
            data: uData,
            successMessage: 'New Section Added successfully!',
            failureMessage: 'Error: Section Added Failed'
          }
        );
      } else if (types[type].handleType === 2) {
        if (!edit.isAnyModified()) {
          onClose();
          return;
        }
        response = await API_SERVICES.sectionAndLessonService.updateSection(
          courseId,
          {
            data: uData,
            successMessage: 'Section updated successfully!',
            failureMessage: 'Error: Failed to update Section'
          }
        );
      }
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        onClose();
      }
    } catch (err) {
      toast.error(err?.message);
    }
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
          onLeftButtonClick={onClose}
          onRightButtonClick={handleCreateOrEdit}
          buttonText={
            type === CONFIRM_MODAL.create
              ? t('button.create')
              : t('button.save')
          }
        />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={
        types[type].handleType === 2
          ? 'Edit Section Details'
          : 'Create Section Details'
      }
      open={true}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      maxWidth={'sm'}
      onClose={onClose}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default React.memo(AddNewSectionModal);

type TextProps = {
  tabValue: number | string;
  edit: any;
  isError: boolean;
};

const TextInput = React.memo(({ tabValue, edit, isError }: TextProps) => {
  const theme = useTheme();
  const getCategoryVal =
    tabValue === 1
      ? edit.getValue('engSectionName')
      : tabValue === 2
      ? edit.getValue('hinSectionName')
      : edit.getValue('gujSectionName');
  const sectionError = isError && !getCategoryVal;

  return (
    <TextInputComponent
      inputLabel={'Section'}
      labelColor={theme.Colors.primary}
      value={getCategoryVal}
      onChange={(e) => {
        let value = capitalizeFirstLetter(e.target.value);
        if (tabValue === 1) {
          edit.update({ engSectionName: value });
        } else if (tabValue === 2) {
          edit.update({ hinSectionName: value });
        } else {
          edit.update({ gujSectionName: value });
        }
      }}
      isError={sectionError}
      helperText={sectionError && 'Please enter the Section Title'}
    />
  );
});
