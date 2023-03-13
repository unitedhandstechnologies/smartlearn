import React, { useState } from 'react';
import { Grid, InputAdornment, Typography, useTheme } from '@material-ui/core';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ButtonComp, CheckStatus, TextInputComponent } from 'src/components';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { capitalizeFirstLetter } from 'src/Utils';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const TextInput = ({
  tabValue,
  edit,
  types,
  type,
  error,
  setIsMissingImageEntry
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [bannerImage, setBannerImage] = useState('No file choosen');
  const getBannerName =
    tabValue === 1
      ? edit.getValue('engBannerName')
      : tabValue === 2
      ? edit.getValue('hinBannerName')
      : edit.getValue('gujBannerName');

  const getBannerDescription =
    tabValue === 1
      ? edit.getValue('engBannerDescription')
      : tabValue === 2
      ? edit.getValue('hinBannerDescription')
      : edit.getValue('gujBannerDescription');

  const imageError = error && !edit.allFilled('banner_image');

  const nameError = error && !getBannerName;
  const descriptionError = error && !edit.allFilled('description');

  const removeBanner = () => {
    setIsMissingImageEntry(true);
    edit.update({
      banner_image: ''
    });
    setBannerImage('No file choosen');
    if (!edit.allFilled('banner_image')) {
      return;
    } else {
      toast.success(`${t('Toast.imageRemovedSuccessfully')}`);
    }
  };

  const onUploadFiles = async (event: any) => {
    let formData = new FormData();
    setBannerImage(event.target.files[0].name);
    formData.append('file', event.target.files[0]);
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = async () => {
      if (
        img.width <= 550 &&
        img.width >= 500 &&
        img.height <= 350 &&
        img.height >= 300
      ) {
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
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
      ${img.width} x ${img.height} but we require size image between 550 x 350 to 500 x 300.`);
      }
    };
  };

  return (
    <Grid container spacing={2} style={{ padding: theme.spacing(2, 10, 0, 0) }}>
      <Grid item xs>
        <TextInputComponent
          inputLabel={t('setting.bannerImage')}
          value={
            types[type].handleType === 2
              ? edit.getValue('banner_image').split('/')[3]
              : bannerImage
          }
          disabled
          isError={imageError}
          helperText={imageError  ? 'Please upload the profile image'
          : 'Only .png, .jpg, .jpeg, .bmp format is allowed & max size 2 MB with 550 X 350 resolution'
   }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ButtonComp
                  backgroundColor={theme.Colors.primary}
                  buttonText={'Browse'}
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
      <Grid item xs>
        <TextInputComponent
          inputLabel={t('setting.bannerName')}
          labelColor={theme.Colors.primary}
          value={getBannerName}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ engBannerName: value });
            } else if (tabValue === 2) {
              edit.update({ hinBannerName: value });
            } else {
              edit.update({ gujBannerName: value });
            }
          }}
          isError={nameError}
          helperText={nameError && 'Please enter the banner Name'}
          required
        />
      </Grid>
      <Grid container item >
        <Grid item xs>
          <TextInputComponent
            multiline={true}
            maxRows={4}
            inputHeight={100}
            inputLabel="Description"
            placeholderText="Describe the Course"
            variant="outlined"
            containerStyle={{
              marginTop: 10
            }}
            labelColor={theme.Colors.primary}
            value = {edit.getValue('description')}
            onChange={(e) => {
              edit.update({description: capitalizeFirstLetter(e.target.value)})
            }}
            // value={getBannerDescription}
            // onChange={(e) => {
            //   let value = capitalizeFirstLetter(e.target.value);
            //   if (tabValue === 1) {
            //     edit.update({ engBannerDes: value });
            //   } else if (tabValue === 2) {
            //     edit.update({ hinBannerDes: value });
            //   } else {
            //     edit.update({ gujBannerDec: value });
            //   }
            // }}
            isError={descriptionError}
            helperText={descriptionError && 'Please enter the description'}
            required
          />
        </Grid>

        <Grid item xs 
        style={{paddingLeft: 15, paddingTop:10}}
        >
          <Typography
            style={{
              color: theme.Colors.primary,
              fontWeight: theme.fontWeight.medium,
              paddingBottom: theme.spacing(1),
              paddingTop: theme.spacing(0.5)
            }}
          >
            Banner Status
          </Typography>
          <CheckStatus
            Value={edit.getValue('banner_status') === 1 ? true : false}
            onClick={(e) => {
              let value = !!e ? 2 : 1;
              edit.update({ banner_status: value });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
