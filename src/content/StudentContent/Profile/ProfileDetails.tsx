import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { ButtonComp, Heading, TextInputComponent } from 'src/components';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router';
import useStudentInfo from 'src/hooks/useStudentInfo';
import { Grid } from '@mui/material';
import CountryCode from 'src/components/CountryCode';
import { t } from 'i18next';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

const useStyles = makeStyles((theme) => ({
  forgotTxt: {
    display: 'flex',
    paddingTop: theme.MetricsSizes.tiny_xxx,
    color: theme.Colors.secondary,
    cursor: 'pointer'
  },
  buttonStyle: {
    marginTop: '25px',
    padding: theme.spacing(0, 1, 0, 0)
  },
  cancelButtonStyle: {
    color: theme.Colors.redPrimary,
    border: 'none',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.MetricsSizes.small_xx,
    textTransform: 'none',
    background: 'none',
    padding: 3
    //marginBottom: theme.MetricsSizes.small_x
  },
  saveButtonStyle: {
    color: theme.Colors.secondary,
    border: 'none',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.MetricsSizes.small_xx + 1,
    textTransform: 'none',
    background: 'none',
    padding: 3,
    //marginBottom: theme.MetricsSizes.small_x,
    display: 'flex',
    alignItems: 'center'
  }
}));

const ProfileDetails = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { studentDetails, updateStudentInfo } = useStudentInfo();
  const [profileImage, setProfileImage] = useState('No file chosen');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigateTo = useNavigate();
  //const { updateStudentInfo } = useStudentInfo();
  const initialValues = {
    image_url: studentDetails.image_url || '',
    first_name: studentDetails.first_name || '',
    last_name: studentDetails.last_name || '',
    phone_number: studentDetails.phone_number || '',
    email_id: studentDetails.email_id || '',
    password: '',
    confirmPassword: '',
    code: '91',
    social_information_url: studentDetails.social_information_url || '',
    social_information_url_2:
      studentDetails.social_information_url_2 === 'undefined'
        ? ''
        : studentDetails.social_information_url_2 || '',
    social_information_url_3:
      studentDetails.social_information_url_3 === 'undefined'
        ? ''
        : studentDetails.social_information_url_3 || ''
  };
  const edit = useEdit(initialValues);
  const [isEdit, setIsEdit] = useState<number>(0);
  const [error, setError] = useState(false);
  const [values, setValues] = useState('');
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

  const onEditClick = (editEvent: any) => {
    edit.reset();
    setIsEdit(parseInt(editEvent.currentTarget.id));
  };
  const onClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };
  const onClickEyeIconConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleChange = (event) => {
    edit.update({ [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    if (!Object.keys(edit.edits).length) {
      setIsEdit(0);
      return;
    }
    try {
      //  if (!edit.allFilled(...RequiredFields)) {
      //    setError(true);
      //    return toast.error('Please fill all the required fields');
      //  }
      //setLoading(true);
      if (edit.getValue('confirmPassword') && edit.getValue('password')) {
        if (
          edit.getValue('confirmPassword') !== edit.getValue('password') ||
          edit.getValue('password').length < 7
        ) {
          return setError(true);
        }
      }
      let data = { ...edit.edits };

      const response: any = await API_SERVICES.adminUserService.update(
        studentDetails?.id,
        {
          data: data,
          successMessage: 'Student details updated successfully!'
        }
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        setIsEdit(0);
        updateStudentInfo((prevState: any) => {
          return { ...prevState, ...response?.data?.user };
        });
      }
    } catch (e) {
      toast.error(e);
    } finally {
      // setLoading(false);
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
          toast.success(
            'Image uploaded,click the Save & Edit the Profile Image'
          );

          if (uploadImageRes?.data?.images) {
            edit.update({
              image_url: uploadImageRes?.data?.images[0].Location
            });
            handleSave();
          }
        }
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's
      ${img.width} x ${img.height} but we require 250 x 250 size image or below this size.`);
      }
    };
  };

  const handleClickCancelBtn = () => {
    edit.reset();
    setIsEdit(0);
  };
  const handleChangeCode = (event) => {
    setValues(event.target.value);
    edit.update({ code: event.target.value });
  };

  const EditComp = ({ btnId }: { btnId?: number }) => {
    return isEdit === btnId ? (
      <Grid container spacing={2} style={{ padding: 4 }}>
        <Grid item xs={6}>
          <Button
            id={btnId.toString()}
            className={classes.cancelButtonStyle}
            onClick={handleClickCancelBtn}
          >
            {'Cancel'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            id={btnId.toString()}
            className={classes.saveButtonStyle}
            onClick={handleSave}
          >
            {'Save'}
          </Button>
        </Grid>
      </Grid>
    ) : (
      <IconButton id={btnId.toString()} onClick={onEditClick}>
        <EditOutlined />
      </IconButton>
    );
  };

  return (
    <Grid
      sx={{
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      }}
    >
      <Heading
        headingText={'Profile details'}
        headerFontSize={'32px'}
        headerFontWeight={500}
        headerFontFamily={'IBM Plex Serif'}
        headingColor={'#3C414B'}
      />
      <Grid
        xs={2}
        container
        item
        sx={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Avatar
          alt=""
          src={edit.getValue('image_url')}
          style={{
            width: 150,
            height: 150,
            [theme.breakpoints.down('sm')]: {
              width: 50,
              height: 50
            }
          }}
        />
        {/* <Typography
          style={{
            color: '#3C78F0',
            fontSize: 18,
            fontFamily: 'Switzer',
            fontWeight: 400,
            textAlign: 'center',
            paddingTop: 5,
            cursor: 'pointer'
          }}
          //onClick={}
        >
          Edit
        </Typography> */}

        <ButtonComp
          backgroundColor={'transparent'}
          buttonText="Edit"
          buttonFontSize={18}
          buttonTextColor="#3C78F0"
          buttonFontWeight={400}
          disableElevation={true}
          onBrowseButtonClick={onUploadFiles}
          isBrowseButton
          height={'30px'}
          btnWidth={'fit-content'}
        />
      </Grid>
      <Grid container direction="column" sx={{ paddingTop: 2 }}>
        <Grid container spacing={1} item style={{ paddingTop: 15 }}>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel="First Name"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('first_name')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              onChange={handleChange}
              name="first_name"
              disabled={isEdit !== 1}
              iconEnd={<EditComp btnId={1} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel="Last Name"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('last_name')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              onChange={handleChange}
              name="last_name"
              disabled={isEdit !== 2}
              iconEnd={<EditComp btnId={2} />}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          spacing={1}
          style={{ paddingTop: 15 }}
        >
          <Grid item xs={3} md={1}>
            {/* <TextInputComponent
              inputLabel="Code"
              labelColor={'#78828C'}
              value={'+91'}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              name="phone_number"
              onChange={handleChange}
            /> */}
            <CountryCode
              inputLabel={t('code')}
              labelColor={'#78828C'}
              required
              handleChange={handleChangeCode}
              value={edit.getValue('code')}
            />
          </Grid>
          <Grid item xs={9} md={5}>
            <TextInputComponent
              inputLabel="Phone Number"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('phone_number')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              name="phone_number"
              onChange={handleChange}
              disabled={isEdit !== 3}
              iconEnd={<EditComp btnId={3} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel="Email Id"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('email_id')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              onChange={handleChange}
              name="email_id"
              disabled={isEdit !== 4}
              iconEnd={<EditComp btnId={4} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel="FaceBook Link"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('social_information_url')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              onChange={handleChange}
              name="social_information_url"
              disabled={isEdit !== 5}
              iconEnd={<EditComp btnId={5} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel="Instagram Link"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('social_information_url_2')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              onChange={handleChange}
              name="social_information_url_2"
              disabled={isEdit !== 6}
              iconEnd={<EditComp btnId={6} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel="Twitter Link "
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('social_information_url_3')}
              inputRef={(ele) => {
                if (ele) {
                  ele.focus();
                }
              }}
              onChange={handleChange}
              name="social_information_url_3"
              disabled={isEdit !== 7}
              iconEnd={<EditComp btnId={7} />}
            />
          </Grid>
        </Grid>
        <Divider sx={{ color: '#F2F4F7', marginTop: 5, height: '1px' }} />

        <Grid container style={{ paddingTop: 15 }}>
          <Heading
            headingText={'Change Password'}
            headerFontSize={'24px'}
            headerFontWeight={500}
            headerFontFamily={'IBM Plex Serif'}
            headingColor={'#3C414B'}
          />
        </Grid>
        <Grid container spacing={1} item style={{ paddingTop: 15 }}>
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel={'Password'}
              placeholder={'Enter new password'}
              variant="outlined"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('password')}
              size="medium"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => edit.update({ password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <IconButton
                    //   className={styles.eyeIcon}
                    onClick={onClickEyeIcon}
                    disableFocusRipple
                    disableRipple
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                )
              }}
              helperText={
                passwordError &&
                'The password must contain minimum 7 and maximum 12 characters!'
              }
              isError={passwordError}
            />
            <Typography
              className={classes.forgotTxt}
              onClick={() => navigateTo('/home/forgetpassword')}
            >
              Forgot Password?
            </Typography>
          </Grid>
          <Divider sx={{ color: '#F2F4F7', marginTop: 5, height: '1px' }} />
          <Grid item xs={12} md={6}>
            <TextInputComponent
              inputLabel={'Confirm Password'}
              placeholder={'Enter confirm password'}
              variant="outlined"
              labelColor={'#78828C'}
              borderColor={'#3C78F0'}
              value={edit.getValue('confirmPassword')}
              size="medium"
              type={showPasswordConfirm ? 'text' : 'password'}
              onChange={(e) => edit.update({ confirmPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <IconButton
                    //   className={styles.eyeIcon}
                    onClick={onClickEyeIconConfirm}
                    disableFocusRipple
                    disableRipple
                    edge="end"
                  >
                    {showPasswordConfirm ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                )
              }}
              helperText={
                confirmPasswordError &&
                'Both password and confirm password should be same!'
              }
              isError={confirmPasswordError}
            />
          </Grid>

          <Grid item xs={12} className={classes.buttonStyle}>
            <ButtonComp
              buttonText="Save"
              backgroundColor="#3C78F0"
              buttonTextColor={theme.Colors.white}
              buttonFontSize={16}
              buttonFontWeight={400}
              btnWidth={'fit-content'}
              height="40px"
              buttonFontFamily="Switzer"
              onClick={handleSave}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
