import { useState } from 'react';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { DialogComp, TextInputComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import toast from 'react-hot-toast';
import { HANDLE_SUBMIT, HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useEdit } from 'src/hooks/useEdit';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter, isPhoneNumber, isWebsiteName } from 'src/Utils';

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
    }
  };
});

type Props = {
  onClose?: () => void;
  rowData?: any;
  type: string;
  updateData?: () => void;
};

const UserCreateModal = (props: Props) => {
  const { onClose, rowData, type, updateData } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const { t, i18n } = useTranslation();

  const USER_INITIAL_DATA = {
    first_name: rowData?.first_name || '',
    last_name: rowData?.last_name || '',
    user_name: rowData?.user_name || '',
    phone_number: rowData?.phone_number || '',
    email_id: rowData?.email_id || '',
    password: rowData?.password || '',
    confirmPassword: rowData?.password || '',
    user_type: rowData?.user_type || 0,
    social_information_url: rowData?.social_information_url || ''
  };

  const RequiredFields = [
    'first_name',
    'last_name',
    'user_name',
    'email_id',
    'password',
    'confirmPassword',
    'social_information_url'
  ];
  const edit = useEdit(USER_INITIAL_DATA);

  const confirmPasswordError =
    error &&
    edit.getValue('confirmPassword') &&
    edit.getValue('password') &&
    edit.getValue('confirmPassword') !== edit.getValue('password');
  const passwordError =
    error && edit.getValue('password') && edit.getValue('password').length < 7;
  const phoneError =
    (error && !edit.allFilled('phone_number')) ||
    (error &&
      edit.allFilled('phone_number') &&
      !isPhoneNumber(edit.getValue('phone_number')));
  const urlError =
    error &&
    edit.allFilled('social_information_url') &&
    !isWebsiteName(edit.getValue('social_information_url'));

  const handleCreate = async () => {
    try {
      if (!edit.allFilled(...RequiredFields)) {
        return toast.error('Please fill all the details');
      } else if (!edit.getValue('permissions').length) {
        return toast.error('Please select any one of the access permission');
      } else if (
        edit.getValue('confirmPassword') !== edit.getValue('password') ||
        edit.getValue('password').length < 7
      ) {
        return setError(true);
      }
      let userData = { ...USER_INITIAL_DATA, ...edit.edits };
      //admin create api call
      const createUserRes: any = await API_SERVICES.adminUserService.create({
        data: userData,
        successMessage: 'User created successfully!'
      });
      if (createUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        onClose();
        setError(false);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleEdit = async () => {
    try {
      if (!edit.allFilled(...RequiredFields)) {
        return toast.error('Please fill all the details');
      } else if (!edit.getValue('permissions').length) {
        return toast.error('Please select any one of the access permission');
      } else if (
        edit.getValue('confirmPassword') !== edit.getValue('password') ||
        edit.getValue('password').length < 7
      ) {
        return setError(true);
      }
      let userData = { ...USER_INITIAL_DATA, ...edit.edits };
      //admin edit api call
      const createUserRes: any = await API_SERVICES.adminUserService.update(
        rowData?.id,
        {
          data: userData,
          successMessage: 'User updated successfully!'
        }
      );
      if (createUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        onClose();
        setError(false);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const types = {
    [HANDLE_SUBMIT.viewUser]: {
      dialogTitle: 'User Details',
      handleAction: handleEdit
    },
    [HANDLE_SUBMIT.createUser]: {
      dialogTitle: 'Create New User',
      handleAction: handleCreate
    }
  };

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
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
              helperText={phoneError && 'Please enter your valid mobile number'}
              isError={phoneError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('email')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('email_id')}
              onChange={(e) => edit.update({ email_id: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('username')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('user_name')}
              onChange={(e) => edit.update({ user_name: e.target.value })}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('adminManagement.socialMediaLink')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('social_information_url')}
              helperText={urlError && 'Please enter valide details'}
              isError={urlError}
              onChange={(e) =>
                edit.update({ social_information_url: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderAction = () => {
    return (
      <DualActionButton
        onLeftButtonClick={onClose}
        onRightButtonClick={types[type].handleAction}
        disabledRightBtn={!edit.isAnyModified()}
      />
    );
  };

  return (
    <DialogComp
      dialogTitle={types[type].dialogTitle}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default UserCreateModal;
