import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Avatar,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
  useTheme
} from '@material-ui/core';
import { ButtonComp, DialogComp, TextInputComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import toast from 'react-hot-toast';
import {
  CONFIRM_MODAL,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  USER_TYPE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useEdit } from 'src/hooks/useEdit';
import { useTranslation } from 'react-i18next';
import {
  capitalizeFirstLetter,
  isPhoneNumber,
  isValidEmail,
  isWebsiteName
} from 'src/Utils';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 847,
      height: 705,
      padding: theme.spacing(4, 4, 3, 4),
      borderRadius: 18
    },
    avatarStyle: {
      height: 42,
      width: 42,
      marginTop: theme.MetricsSizes.regular_x
    }
  };
});

type Props = {
  onClose?: () => void;
  rowData?: any;
  type: string;
  updateData?: () => void;
};

const StudentCreateModal = (props: Props) => {
  const { onClose, rowData, type, updateData } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const { t, i18n } = useTranslation();
  const [profileImage, setProfileImage] = useState('No file choosen');

  const USER_INITIAL_DATA = {
    first_name: rowData?.first_name || '',
    last_name: rowData?.last_name || '',
    user_name: rowData?.user_name || '',
    phone_number: rowData?.phone_number || '',
    email_id: rowData?.email_id || '',
    password: rowData?.password || '',
    image_url: rowData?.image_url || '',
    confirmPassword: rowData?.password || '',
    user_type: rowData?.user_type || USER_TYPE_ID.student,
    social_information_url: rowData?.social_information_url || '',
    permissions: [],
    code: rowData?.code || '+91',
    language_id: rowData?.language_id || DETECT_LANGUAGE[i18n.language],
    gender: rowData?.gender || '',
    qualification: rowData?.qualification || ''
  };

  const RequiredFields = [
    'first_name',
    'last_name',
    'user_name',
    'email_id',
    'password',
    'confirmPassword',
    'phone_number',
    'image_url'
  ];
  const edit = useEdit(USER_INITIAL_DATA);

  const firstNameError = error && !edit.allFilled('first_name');
  const lastNameError = error && !edit.allFilled('last_name');
  const userNameError = error && !edit.allFilled('user_name');

  const confirmPasswordError =
    (error && !edit.getValue('confirmPassword')) ||
    (error &&
      edit.getValue('confirmPassword') &&
      edit.getValue('password') &&
      edit.getValue('confirmPassword') !== edit.getValue('password'));

  const passwordError =
    (error && !edit.getValue('password')) ||
    (error &&
      edit.getValue('password') &&
      edit.getValue('password').length < 7);

  const emailError =
    (error && !edit.allFilled('email_id')) ||
    (error &&
      edit.allFilled('email_id') &&
      !isValidEmail(edit.getValue('email_id')));

  const websiteError =
    (error && !edit.allFilled('social_information_url')) ||
    (error &&
      edit.allFilled('social_information_url') &&
      !isWebsiteName(edit.getValue('social_information_url')));

  const phoneError =
    (error && !edit.allFilled('phone_number')) ||
    (error &&
      edit.allFilled('phone_number') &&
      !isPhoneNumber(edit.getValue('phone_number')));

  const imageError = error && !edit.allFilled('image_url');

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
      let userData = { ...USER_INITIAL_DATA, ...edit.edits };
      let response: any;
      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please fill all the required fields');
      }
      if (types[type].handleType === 1) {
        response = await API_SERVICES.adminUserService.create({
          data: userData,
          successMessage: 'New Student Created successfully!',
          failureMessage: 'Error: Student Already Exist'
        });
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.adminUserService.update(rowData?.id, {
          data: userData,
          successMessage: 'Student details updated successfully!'
        });
      }
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        onClose();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onUploadFiles = async (event: any) => {
    let formData = new FormData();
    let image = event.target.files[0];
    setProfileImage(image.name);
    formData.append('file', image);
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = async () => {
      if (img.width <= 250 && img.height <= 250) {
        const uploadImageRes: any =
          await API_SERVICES.imageUploadService.uploadImage(formData);
        if (uploadImageRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          toast.success(`${t('Toast.imageUploadSuccessfully')}`);
          if (uploadImageRes?.data?.images) {
            edit.update({
              image_url: uploadImageRes?.data?.images[0].Location
            });
          }
        }
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
        ${img.width} x ${img.height} but we require 250 x 250 size image or below this size.`);
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

  const renderDialogContent = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('firstName')}
            labelColor={theme.Colors.primary}
            value={edit.getValue('first_name')}
            onChange={(e) =>
              edit.update({
                first_name: capitalizeFirstLetter(e.target.value)
              })
            }
            required
            isError={firstNameError}
            helperText={
              firstNameError && 'Please enter your vfirst name'
            }
          />
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('lastName')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('last_name')}
              required
              onChange={(e) =>
                edit.update({
                  last_name: capitalizeFirstLetter(e.target.value)
                })
              }
              isError={lastNameError}
              helperText={
                lastNameError && 'Please enter your last name'
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>
              <Typography
                style={{
                  color: theme.Colors.primary,
                  fontWeight: theme.fontWeight.medium
                }}
              >
                {t('gender')}
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              name="gender"
              value={`${edit.getValue('gender')}`}
              onChange={(e) => {
                edit.update({
                  gender: (e.target as HTMLInputElement).value
                });
              }}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={t('male')}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={t('female')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextInputComponent
            inputLabel={t('code')}
            labelColor={theme.Colors.primary}
            inputWidth={'55px'}
            value={edit.getValue('code')}
            inputProps={{ maxLength: 3 }}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                return;
              }
              edit.update({ code: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={10}>
          <TextInputComponent
            inputLabel={t('mobileNumber')}
            labelColor={theme.Colors.primary}
            value={edit.getValue('phone_number')}
            required
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                return;
              }
              edit.update({ phone_number: e.target.value });
            }}
            isError={phoneError}
            helperText={
              phoneError && 'Please enter your valid 10 digit mobile number'
            }
          />
        </Grid>
        <Grid item xs={7}>
          <TextInputComponent
            inputLabel={t('profileImage')}
            value={
              types[type].handleType === 2
                ? edit.getValue('image_url').split('/')[3] || profileImage
                : profileImage
            }
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ButtonComp
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
            isError={imageError}
            helperText={imageError ? 'Please upload the profile image' : "Only .png, .jpg, .jpeg, .bmp format is allowed & max size 2 MB"}
          />
        </Grid>
        <Grid item xs={5}>
          <Avatar
            className={classes.avatarStyle}
            alt="Prabu"
            src={edit.getValue('image_url')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('qualification')}
            labelColor={theme.Colors.primary}
            value={edit.getValue('qualification')}
            onChange={(e) => edit.update({ qualification: capitalizeFirstLetter(e.target.value) })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('email')}
            labelColor={theme.Colors.primary}
            required
            value={edit.getValue('email_id')}
            onChange={(e) => edit.update({ email_id: e.target.value })}
            isError={emailError}
            helperText={emailError && 'Please enter valid Email'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('username')}
            labelColor={theme.Colors.primary}
            required
            value={edit.getValue('user_name')}
            onChange={(e) => edit.update({ user_name: e.target.value })}
            isError={userNameError}
            helperText={userNameError && 'Please enter your user name'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('password')}
            labelColor={theme.Colors.primary}
            required
            value={edit.getValue('password')}
            onChange={(e) => edit.update({ password: e.target.value })}
            type={'password'}
            inputProps={{
              maxLength: 12
            }}
            helperText={
              passwordError &&
              'The password must contain minimum 7 and maximum 12 characters!'
            }
            isError={passwordError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('confirmPassword')}
            labelColor={theme.Colors.primary}
            required
            value={edit.getValue('confirmPassword')}
            type={'password'}
            helperText={
              confirmPasswordError &&
              'Both password and confirm password should be same!'
            }
            isError={confirmPasswordError}
            onChange={(e) => edit.update({ confirmPassword: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={t('adminManagement.socialMediaLink')}
            labelColor={theme.Colors.primary}
            value={edit.getValue('social_information_url')}
            onChange={(e) =>
              edit.update({ social_information_url: e.target.value })
            }
            isError={websiteError}
            helperText={websiteError && 'Please enter valid URL'}
          />
        </Grid>
      </Grid>
    );
  };

  const renderAction = () => {
    return (
      <DualActionButton
        onLeftButtonClick={onClose}
        onRightButtonClick={handleCreate}
        disabledRightBtn={!edit.isAnyModified()}
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
          ? t('editStudentDetails')
          : t('addNewStudent')
      }
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default React.memo(StudentCreateModal);
