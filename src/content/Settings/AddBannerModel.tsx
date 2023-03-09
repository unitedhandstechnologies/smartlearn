import { Grid, makeStyles, useTheme } from '@material-ui/core';
import React, { useState, memo } from 'react';
import { DialogComp, MuiTabComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import { useEdit } from 'src/hooks/useEdit';
import { t } from 'i18next';
import { API_SERVICES } from 'src/Services';
import toast from 'react-hot-toast';
import { HTTP_STATUSES, CONFIRM_MODAL, LANGUAGE_ID } from 'src/Config/constant';
import { TextInput } from './TextInput';

const useStyles = makeStyles((theme) => ({
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

const AddBannerModel = ({
  handleClose,
  updateData,
  rowData,
  type,
  isMissingImageEntry,
  setIsMissingImageEntry,
  setIsMissingNameEntry,
  isMissingNameEntry
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  console.log('rowData', rowData);

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.banner_language?.length &&
      rowData?.banner_language?.filter((item) => item?.language_id === lanID);
    let name = data?.length && data[0].banner_name;
    let description = data?.length && data[0].banner_description;
    return { name, description };
  };
  const initialValues = {
    banner_type: 1,
    banner_status: rowData?.banner?.banner_status ?? 1,
    banner_image: rowData?.banner?.banner_image ?? '',
    engBannerName: getLanguageData(LANGUAGE_ID.english).name || '',
    hinBannerName: getLanguageData(LANGUAGE_ID.hindi).name || '',
    gujBannerName: getLanguageData(LANGUAGE_ID.gujarati).name || '',
    engBannerDescription:
      getLanguageData(LANGUAGE_ID.english).description || '',
    hinBannerDescription: getLanguageData(LANGUAGE_ID.hindi).description || '',
    gujBannerDescription: getLanguageData(LANGUAGE_ID.english).description || ''
  };
  const edit = useEdit(initialValues);
  const RequiredFields = [
    'engBannerName',
    'banner_image',
    'hinBannerName',
    'gujBannerName'
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

  const handleChangeTab = (value) => {
    setStep(value);
  };

  const renderTab = (tabValue) => {
    return (
      <Grid>
        <TextInput
          tabValue={tabValue}
          edit={edit}
          setIsMissingImageEntry={setIsMissingImageEntry}
          error={error}
          type={type}
          types={types}
        />
      </Grid>
    );
  };
  const renderDialogContent = () => {
    return (
      <Grid container>
        <MuiTabComponent
          currentTabVal={step}
          renderTabContent={renderTab}
          tabContent={tabs}
          tabIndicatorColor={theme.Colors.secondary}
          onTabChange={handleChangeTab}
          tabClasses={{
            selected: classes.selectedTab
          }}
        />
      </Grid>
    );
  };

  const handleCreate = async () => {
    try {
      let uData = {
        banner_status: edit.getValue('banner_status'),
        banner_type: edit.getValue('banner_type'),
        banner_image: edit.getValue('banner_image'),
        banner_details: [
          {
            language_id: 1,
            banner_name: edit.getValue('engBannerName')
            // banner_description: edit.getValue('engBannerDescription')
          },
          {
            language_id: 2,
            banner_name: edit.getValue('hinBannerName')
            // banner_description: edit.getValue('hinBannerDescription')
          },
          {
            language_id: 3,
            banner_name: edit.getValue('gujBannerName')
            // banner_description: edit.getValue('gujBannerDescription')
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please fill all the required fields');
      }
      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.bannerManagementService.create({
          data: uData,
          successMessage: t('Toast.bannerCreatedSuccessfully'),
          failureMessage: t('Toast.failedtoUpdate')
        });
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.bannerManagementService.update(
          rowData?.banner?.id,
          {
            data: uData,
            successMessage: t('Toast.bannerEditedSuccessfully'),
            failureMessage: t('Toast.failedtoUpdate')
          }
        );
      }

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        handleClose();
      }
    } catch (err) {
      toast.error(err?.message);
    }
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
          ? t('setting.editBannerImage')
          : t('setting.addBannerImage')
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

export default memo(AddBannerModel);
