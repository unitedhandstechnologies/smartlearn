import { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Theme,
  Typography,
  useTheme,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  InputAdornment,
  Avatar
} from '@material-ui/core';
import { ButtonComp, DialogComp, TextInputComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import toast from 'react-hot-toast';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
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
    contentStyle: {
      padding: theme.spacing(0, 10.5)
    },
    avatarStyle: {
      height: 42,
      width: 42,
      marginTop: theme.MetricsSizes.regular_x
    }
  };
});

type permissionData = {
  id: number;
  permission: string;
};

type Props = {
  onClose?: () => void;
  rowData?: any;
  type: string;
  updateData?: () => void;
  permissions: permissionData[];
};

const AdminManagementModal = (props: Props) => {
  const { onClose, rowData, type, updateData, permissions } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [adminGender, setAdminGender] = useState('');
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState('No file choosen');

  const USER_INITIAL_DATA = {
    first_name: rowData?.first_name || '',
    last_name: rowData?.last_name || '',
    user_name: rowData?.user_name || '',
    phone_number: rowData?.phone_number || '',
    email_id: rowData?.email_id || '',
    password: rowData?.password || '',
    confirmPassword: rowData?.password || '',
    user_type: rowData?.user_type || 2,
    permissions: rowData?.permissions || [],
    image_url: rowData?.image_url || '',
    social_information_url: rowData?.social_information_url || '',
    code: rowData?.code || '+91',
    language_id: rowData?.language_id || 1,
    gender: rowData?.gender || ''
  };

  const RequiredFields = [
    'first_name',
    'last_name',
    'user_name',
    'email_id',
    'password',
    'confirmPassword',
    'permissions',
    'social_information_url',
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

  const urlError =
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

  const handleChangeCheckbox = (event: any) => {
    let targetId = Number(event?.target?.id);
    let targetCheckedState = event?.target?.checked;
    let permissionData = edit.getValue('permissions');
    if (!!targetCheckedState) {
      permissionData.push(targetId);
    } else if (!targetCheckedState) {
      permissionData = permissionData.filter((item) => item !== targetId);
    }
    edit.update({ permissions: permissionData });
  };

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
      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please fill all the details');
      }
      if (!isPhoneNumber(edit.getValue('phone_number'))) {
        setError(true);
        return toast.error('Please enter your valid 10 digit mobile number');
      } else {
        setError(false);
      }
      if (
        edit.getValue('confirmPassword') !== edit.getValue('password') ||
        edit.getValue('password').length < 7
      ) {
        return setError(true);
      }
      let userData = { ...USER_INITIAL_DATA, ...edit.edits };
      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.adminUserService.create({
          data: userData,
          successMessage: 'New Admin Created successfully!',
          failureMessage: 'Error: Admin Already Exist'
        });
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.adminUserService.update(rowData?.id, {
          data: userData,
          successMessage: 'Admin details updated successfully!'
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

  const permission = [
    {
      id: 1,
      permission: t('home.dashboardReport')
    },
    {
      id: 2,
      permission: t('home.enrollmentManagement')
    },
    {
      id: 3,
      permission: t('home.categoryManagement')
    },
    {
      id: 4,
      permission: t('home.courseManagement')
    },
    {
      id: 5,
      permission: t('home.instructorManagement')
    },
    {
      id: 6,
      permission: t('home.studentsAdministration')
    },
    {
      id: 7,
      permission: t('home.adminManagement')
    },
    {
      id: 8,
      permission: t('home.reports')
    },
    {
      id: 9,
      permission: t('home.settings')
    }
  ];

  const LanguageData = [
    {
      name: 'English',
      id: 1
    },
    {
      name: 'Hindi',
      id: 2
    },
    {
      name: 'Gujarati',
      id: 3
    }
  ];

  const renderDialogContent = () => {
    return (
      <Grid container justifyContent="center">
        <Grid container spacing={1} className={classes.contentStyle}>
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
              helperText={firstNameError && 'Please enter your first name'}
            />
            <Grid item xs={12}>
              <TextInputComponent
                inputLabel={t('lastName')}
                labelColor={theme.Colors.primary}
                value={edit.getValue('last_name')}
                onChange={(e) =>
                  edit.update({
                    last_name: capitalizeFirstLetter(e.target.value)
                  })
                }
                required
                isError={lastNameError}
                helperText={lastNameError && 'Please enter your last name'}
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
              value={edit.getValue('code')}
              inputWidth={'55px'}
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
              required
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
              helperText={
                imageError
                  ? 'Please upload the profile image'
                  : 'Only .png, .jpg, .jpeg, .bmp format is allowed & max size 2 MB with 270 X 350 resolution'
              }
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
              inputLabel={t('email')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('email_id')}
              onChange={(e) => edit.update({ email_id: e.target.value })}
              required
              isError={emailError}
              helperText={emailError && 'Please enter valid Email id'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('username')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('user_name')}
              onChange={(e) => edit.update({ user_name: e.target.value })}
              required
              isError={userNameError}
              helperText={userNameError && 'Please enter your user name'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('password')}
              labelColor={theme.Colors.primary}
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
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('confirmPassword')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('confirmPassword')}
              type={'password'}
              helperText={
                confirmPasswordError &&
                'Both password and confirm password should be same!'
              }
              isError={confirmPasswordError}
              onChange={(e) => edit.update({ confirmPassword: e.target.value })}
              required
            />
          </Grid>
          {/* <Grid item xs={12}>
            <MultipleSelectComp
              titleText={t('Language')}
              value={edit.getValue('language_id')}
              onChange={(e: any) => {
                edit.update({
                  language_id: e.target.value
                });
              }}
              displayEmpty
              selectItems={
                LanguageData.length &&
                LanguageData?.map((item) => ({
                  label: item.name,
                  value: item.id
                }))
              }
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('adminManagement.socialMediaLinkFaceBook')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('social_information_url')}
              helperText={urlError && 'Please enter valid details'}
              isError={urlError}
              onChange={(e) =>
                edit.update({ social_information_url: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>{t('accessPermission')}</Typography>
          </Grid>
          {permission?.length &&
            permission.map((item, index) => {
              return (
                <Grid item md={4} sm={6} key={index}>
                  <FormControlLabel
                    style={{ marginRight: 0 }}
                    control={
                      <Checkbox
                        id={item.id.toString()}
                        checked={edit.getValue('permissions').includes(item.id)}
                        color="primary"
                        onChange={handleChangeCheckbox}
                      />
                    }
                    label={item.permission}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    );
  };

  const renderAction = () => {
    return (
      <DualActionButton
        onLeftButtonClick={onClose}
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
        types[type].handleType === 2 ? t('editAdminDetails') : t('addNewAdmin')
      }
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default AdminManagementModal;
