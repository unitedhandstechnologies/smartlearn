import { Grid, InputAdornment, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ButtonComp, CheckStatus, TextInputComponent } from 'src/components';
import MultipleSelectComp from 'src/components/MultipleSelectComp';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { capitalizeFirstLetter } from 'src/Utils';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useTranslation } from 'react-i18next';

type Props = {
  edit?: any;
  isError?: boolean;
  tabValue?: number;
  categories?: any[];
  labelName?: string;
  types?: any;
  type?: any;
};

const TextInput = ({
  edit,
  isError,
  tabValue,
  labelName,
  categories,
  types,
  type
}: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [profileImage, setProfileImage] = useState('No file choosen');

  const getCategoryVal =
    tabValue === 1
      ? edit.getValue('engCategoryName')
      : tabValue === 2
      ? edit.getValue('hinCategoryName')
      : edit.getValue('gujCategoryName');

  const categoryError = isError && !getCategoryVal;
  const sortError = isError && !edit.getValue('sort_no');
  const parentCategoryError = isError && !edit.getValue('category_id');
  const imageError = isError && !edit.allFilled('image_url');

  const onUploadFiles = async (event: any) => {
    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = async () => {
      if (img.width <= 341 && img.height <= 228) {
        const uploadImageRes: any =
          await API_SERVICES.imageUploadService.uploadImage(formData);
        if (uploadImageRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          toast.success(`${'Image Upload Successfully'}`);
          if (uploadImageRes?.data?.images) {
            edit.update({
              image_url: uploadImageRes?.data?.images[0].Location
            });
          }
        }
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
        ${img.width} x ${img.height} but we require 341 x 228 size image or below this size.`);
      }
    };
  };

  const removeProfile = () => {
    edit.update({
      image_url: ''
    });
    setProfileImage('No file choosen');
    if (!edit.allFilled('image_url')) {
      return;
    } else {
      toast.success(`${t('Toast.imageRemovedSuccessfully')}`);
    }
  };

  return (
    <Grid container direction="row" spacing={2} style={{ marginTop: '25px' }}>
      {!categories ? (
        <Grid item xs={6}>
          <TextInputComponent
            inputLabel={'Category Image'}
            value={
              types[type].handleType === 2
                ? edit.getValue('image_url').split('/')[3] || profileImage
                : profileImage
            }
            isError={imageError}
            helperText={
              imageError
                ? 'Please upload the profile image'
                : 'Only .png, .jpg, .jpeg, .bmp format is allowed & max size 2 MB'
            }
            disabled
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
                    onClick={removeProfile}
                  />
                </InputAdornment>
              )
            }}
            required
          />
        </Grid>
      ) : null}
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={labelName || 'Category Name'}
          labelColor={theme.Colors.primary}
          value={getCategoryVal}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ engCategoryName: value });
            } else if (tabValue === 2) {
              edit.update({ hinCategoryName: value });
            } else {
              edit.update({ gujCategoryName: value });
            }
          }}
          isError={categoryError}
          helperText={categoryError && 'Please enter the Category Name'}
          required
        />
      </Grid>
      {categories ? (
        <Grid item xs={6}>
          <MultipleSelectComp
            isPlaceholderNone
            titleText={'Category'}
            selectItems={
              categories.length &&
              categories?.map((item: any) => ({
                label: item.category_name,
                value: item.category_id
              }))
            }
            value={edit.getValue('category_id')}
            onChange={(e) => {
              if (!e.target.value) {
                edit.update({
                  category_id: 0
                });
                return;
              }
              edit.update({
                category_id: Number(e.target.value)
              });
            }}
            isError={parentCategoryError}
            helperText={parentCategoryError && 'Please select the category'}
            required
          />
        </Grid>
      ) : null}
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={'Sort Number'}
          labelColor={theme.Colors.primary}
          value={edit.getValue('sort_no')}
          onChange={(e) => {
            edit.update({ sort_no: e.target.value });
          }}
          isError={sortError}
          helperText={sortError && 'Please enter the Sort Number'}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{
            color: theme.Colors.primary,
            fontWeight: theme.fontWeight.medium,
            paddingBottom: theme.spacing(1),
            paddingTop: theme.spacing(0.5)
          }}
        >
          Category Status
        </Typography>
        <CheckStatus
          Value={edit.getValue('status') === 1 ? true : false}
          onClick={(e) => {
            let value = !!e ? 2 : 1;
            edit.update({ status: value });
          }}
        />
      </Grid>
    </Grid>
  );
};
export default React.memo(TextInput);
