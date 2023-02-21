import {
  Grid,
  InputAdornment,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core';
import React, { useState, memo } from 'react';
import { ButtonComp, DialogComp, TextInputComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import { useEdit } from 'src/hooks/useEdit';
import { capitalizeFirstLetter } from 'src/Utils';
import { t } from 'i18next';
import { API_SERVICES } from 'src/Services';
import toast from 'react-hot-toast';
import { HTTP_STATUSES, CONFIRM_MODAL } from 'src/Config/constant';
import MuiTab from 'src/components/MuiTab';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 847,
      padding: theme.spacing(2, 1, 2, 5),
      borderRadius: 18
    }
  };
});

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
  const [bannerImage, setBannerImage] = useState('No file choosen');
  const [error, setError] = useState(false);

  const initialValues = {
    banner_type: '',
    banner_status: 1,
    banner_image: rowData?.banner_image || '',
    banner_name: rowData?.banner_name || '',
    banner_name_hindi: rowData?.banner_name || '',
    banner_name_gujarati: rowData?.banner_name || ''
  };
  const types = {
    [CONFIRM_MODAL.create]: {
      handleType: 1
    },
    [CONFIRM_MODAL.edit]: {
      handleType: 2
    }
  };

  const RequiredFields = [
    'banner_name',
    'banner_image',
    'banner_name_hindi',
    'banner_name_gujarati'
  ];
  const edit = useEdit(initialValues);
  const imageError = error && !edit.allFilled('banner_image') 

  const nameError = error && !edit.allFilled('banner_name');
  const GujaratinameError = error && !edit.allFilled('banner_name_gujarati');
  const hindinameError =  error && !edit.allFilled('banner_name_hindi');

  const removeBanner = () => {
    setIsMissingImageEntry(true);
    edit.update({
      banner_image: ''
    });
    setBannerImage('No file choosen');
    if( !edit.allFilled('banner_image')){
      return
   }else{
     toast.success(`${t('Toast.imageRemovedSuccessfully')}`);
   }
  };

  const onUploadFiles = async (event: any) => {
    let formData = new FormData();
    let image = event.target.files[0];
    setBannerImage(image.name);
    formData.append('file', image);
    if (image.size < (2 * 1024 * 1024)) {
    const uploadImageRes: any =
      await API_SERVICES.bannerManagementService.uploadImage(formData);
    if (uploadImageRes?.status < HTTP_STATUSES.BAD_REQUEST) {
      toast.success(`${t('Toast.imageUploadSuccessfully')}`);
      if (uploadImageRes?.data?.images) {
        edit.update({
          banner_image: uploadImageRes?.data?.images[0].Location
        });
        setIsMissingImageEntry(false);
      }
    }
  } else {
    let imgsize = image.size / (1024 * 1024);
    alert(`Sorry, this image doesn't look like the size we wanted. It's 
    ${imgsize.toFixed(2)}Mb but we require below 2Mb size image.`);
  }
};;

  const TextInput = () => {
    return (
      <Grid
        container
        spacing={2}
        style={{ padding: theme.spacing(2, 10, 0, 0) }}
      >
        <Grid item xs={6}>
          <TextInputComponent
            inputLabel={t('setting.bannerImage')}
            value={
              types[type].handleType === 2
                ? edit.getValue('banner_image').split('/')[3] 
                : bannerImage
            }
            disabled
            isError={imageError}
            helperText={
              imageError 
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ButtonComp
                    backgroundColor={theme.Colors.primary}
                    buttonText={'Browe'}
                    buttonFontSize={theme.MetricsSizes.small_xxx}
                    buttonTextColor="white"
                    buttonFontWeight={theme.fontWeight.medium}
                    disableElevation={true}
                    onBrowseButtonClick={onUploadFiles}
                    isBrowseButton
                    height={'30px'}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <HighlightOffIcon
                    style={{ cursor: 'pointer' }}
                    onClick={removeBanner}
                  />
                </InputAdornment>
              )
            }}
            required
          />
        </Grid>
        {step === 1 ? (
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.bannerName')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('banner_name')}
              autoFocus
              isError={nameError}
              helperText={
                nameError && 'Please enter your banner name'
              }
              onChange={(e) => {
                if (e.target.value) setIsMissingNameEntry(false);
                edit.update({
                  banner_name: capitalizeFirstLetter(e.target.value)
                });
              }}
              required
            />
          </Grid>
        ) : step === 2 ? (
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.bannerName')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('banner_name_hindi')}
              autoFocus
              isError={hindinameError}
              helperText={
                hindinameError && 'Please enter banner name' 
              }
              onChange={(e) => {
                if (e.target.value) setIsMissingNameEntry(false);
                edit.update({
                  banner_name_hindi: capitalizeFirstLetter(e.target.value)
                });
              }}
              required
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.bannerName')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('banner_name_gujarati')}
              autoFocus
              isError={GujaratinameError}
              helperText={
                GujaratinameError && 'Please enter banner name'
              }
              onChange={(e) => {
                if (e.target.value) setIsMissingNameEntry(false);
                edit.update({
                  banner_name_gujarati: capitalizeFirstLetter(e.target.value)
                });
              }}
              required
            />
          </Grid>
        )}
      </Grid>
    );
  };
  const tabs = [
    {
      label: 'English',
      value: 'English',
      child: () => (
        <Grid>
          <TextInput />
        </Grid>
      ),
      id: 1
    },
    {
      label: 'Hindi',
      value: 'Hindi',
      child: () => (
        <Grid>
          <TextInput />
        </Grid>
      ),
      id: 2
    },
    {
      label: 'Gujarati',
      value: 'Gujarati',
      child: () => (
        <Grid>
          <TextInput />
        </Grid>
      ),
      id: 3
    }
  ];
  let currentTab = tabs.find((t) => t.id === step)?.value;

  const handleChangeTab = (value) => {
    const fTab = tabs.find((t) => t.value === value);
    if (fTab && step <= 4) {
      setStep(fTab.id);
    }
  };

  const renderTab = (tabValue) => {
    const fTab = tabs.find(({ value }) => tabValue === value);
    return <Grid>{fTab ? fTab.child() : null}</Grid>;
  };
  const renderDialogContent = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <MuiTab
            currenttab={currentTab}
            renderTabContent={renderTab}
            tabs={tabs}
            contentFullWidth
            onTabChange={handleChangeTab}
            orientation={'horizontal'}
          />
        </Grid>
      </Grid>
    );
  };

  const handleCreate = async () => {
      try {
        let banner_details = [
          {
            language_id: 1,
            banner_name: edit.getValue('banner_name')
          },
          {
            language_id: 2,
            banner_name: edit.getValue('banner_name_hindi')
          },
          {
            language_id: 3,
            banner_name: edit.getValue('banner_name_gujarati')
          }
        ];
        let data = {
          banner_image: edit.getValue('banner_image'),
          banner_details,
          banner_type: 1,
          banner_status: 1
        };
        if (!edit.allFilled(...RequiredFields)) {
          setError(true);
          return toast.error('Please fill all the required fields');
        }
        let response: any;
        if (types[type].handleType === 1) {
          response = await API_SERVICES.bannerManagementService.create({
            data: data,
            successMessage: t('Toast.bannerCreatedSuccessfully'),
            failureMessage: t('Toast.failedtoUpdate')
          });
        } else if (types[type].handleType === 2) {
          let banner_details = [
            {
              language_id: 1,
              banner_name: edit.getValue('banner_name')
            },
            {
              language_id: 2,
              banner_name: edit.getValue('banner_name_hindi')
            },
            {
              language_id: 3,
              banner_name: edit.getValue('banner_name_gujarati')
            }
          ];
          let data = {
            banner_image: edit.getValue('banner_image'),
            banner_details,
            banner_type: 1,
            banner_status: 1
          };
          response = await API_SERVICES.bannerManagementService.update(
            rowData?.banner_id,
            {
              data: data,
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
