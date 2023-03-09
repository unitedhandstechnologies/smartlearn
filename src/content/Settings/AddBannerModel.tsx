import {
  Grid,
  InputAdornment,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core';
import React, { useState, memo } from 'react';
import { ButtonComp, DialogComp, MuiTabComponent, TextInputComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import { useEdit } from 'src/hooks/useEdit';
import { capitalizeFirstLetter } from 'src/Utils';
import { t } from 'i18next';
import { API_SERVICES } from 'src/Services';
import toast from 'react-hot-toast';
import { HTTP_STATUSES, CONFIRM_MODAL, LANGUAGE_ID } from 'src/Config/constant';
import MuiTab from 'src/components/MuiTab';
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
  console.log('rowData',rowData);
  
  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.banner_language?.length &&
      rowData?.banner_language.filter((item) => item.language_id === lanID);
    let name = data?.length && data[0].banner_name;
    let description = data?.length && data[0].banner_description;
    return { name, description };
  };
  const initialValues = {
    banner_type: 1,
    banner_status: rowData?.banner_status || 1,
    banner_image: rowData?.banner_image || '',
    engBannerName: getLanguageData(LANGUAGE_ID.english).name || '',
    hinBannerName: getLanguageData(LANGUAGE_ID.hindi).name || '',
    gujBannerName: getLanguageData(LANGUAGE_ID.gujarati).name || '',
    engBannerDes: getLanguageData(LANGUAGE_ID.english).description || '',
    hinBannerDes: getLanguageData(LANGUAGE_ID.hindi).description || '',
    gujBannerDec: getLanguageData(LANGUAGE_ID.english).description || ''
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
    console.log('val',value);
    
    setStep(value);
  };

  const renderTab = (tabValue) => {
    console.log('tabValue',tabValue);
    
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
      // let banner_details = [
      //   {
      //     language_id: 1,
      //     banner_name: edit.getValue('engBannerName'),
      //   },
      //   {
      //     language_id: 2,
      //     banner_name: edit.getValue('hinBannerName')
      //   },
      //   {
      //     language_id: 3,
      //     banner_name: edit.getValue('gujBannerName')
      //   }
      // ];
      // let data = {
      //   banner_image: edit.getValue('banner_image'),
      //   banner_details,
      //   banner_type: 1,
      //   banner_status: 1
      // };
      let uData = {
        banner_status: edit.getValue('banner_status'),
        banner_type: edit.getValue('banner_type'),
        banner_image: edit.getValue('banner_image'),
        banner_details: [
          {
            language_id: 1,
            banner_name: edit.getValue('engBannerName'),
          },
          {
            language_id: 2,
            banner_name: edit.getValue('hinBannerName')
          },
          {
            language_id: 3,
            banner_name: edit.getValue('gujBannerName')
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
        // let banner_details = [
        //   {
        //     language_id: 1,
        //     banner_name: edit.getValue('banner_name')
        //   },
        //   {
        //     language_id: 2,
        //     banner_name: edit.getValue('banner_name_hindi')
        //   },
        //   {
        //     language_id: 3,
        //     banner_name: edit.getValue('banner_name_gujarati')
        //   }
        // ];
        // let data = {
        //   banner_image: edit.getValue('banner_image'),
        //   banner_details,
        //   banner_type: 1,
        //   banner_status: 1
        // };
        response = await API_SERVICES.bannerManagementService.update(
          rowData?.banner_id,
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