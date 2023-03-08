import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import React, { memo, useState } from 'react';
import { ButtonComp, Heading, TextInputComponent } from 'src/components';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router';
import useUserInfo from 'src/hooks/useUserInfo';
import { Grid } from '@mui/material';
import CountryCode from 'src/components/CountryCode';
import { t } from 'i18next';
import logo from '../../Assets/Images/Logo.svg';

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

const MentorProfile = () => {
  const theme = useTheme();
  const classes = useStyles();

  const { userDetails, updateUserInfo } = useUserInfo();
  const [profileImage, setProfileImage] = useState('No file choosen');
  const navigateTo = useNavigate();
  //const { updateStudentInfo } = useStudentInfo();
  const initialValues = {
    image_url: userDetails?.image_url || '',
    first_name: userDetails?.first_name || '',
    last_name: userDetails?.last_name || '',
    phone_number: userDetails?.phone_number || '',
    email_id: userDetails?.email_id || '',
    password: '',
    confirmPassword: '',
    code: '91',
    social_information_url: userDetails?.social_information_url || '',
    social_information_url_2: userDetails?.social_information_url_2 || '',
    social_information_url_3: userDetails?.social_information_url_3 || '',
    qualification: userDetails?.qualification || '',
    about: userDetails?.about || ''
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
      let data = { ...edit.edits };

      const response: any = await API_SERVICES.adminUserService.update(
        userDetails?.id,
        {
          data: data,
          successMessage: 'Instructor profile updated successfully!'
        }
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        setIsEdit(0);
        updateUserInfo((prevState: any) => {
          return { ...prevState, ...response?.data?.user };
        });
      }
    } catch (e) {
      console.log(e, '---login err-----');
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
    <>
      <Grid
        md={12}
        xs={12}
        sx={{
          paddingLeft: 20,
          paddingRight: 20,
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Grid
          container
          item
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
          xs={12}
          md={12}
        >
          <img
            src={logo}
            style={{
              height: 60,
              width: 200,
              mixBlendMode: 'multiply'
            }}
          />
        </Grid>
        <Grid
          item
          container
          sx={{
            display: 'flex',
            justifyContent: 'end'
          }}
          xs={12}
          md={12}
        >
          <ButtonComp
            buttonText="Back"
            backgroundColor="#3C78F0"
            buttonTextColor={theme.Colors.white}
            buttonFontSize={16}
            buttonFontWeight={400}
            btnWidth={'fit-content'}
            height="40px"
            buttonFontFamily="Switzer"
            onClick={() => navigateTo('/admin', { replace: true })}
          />
        </Grid>
        <Heading
          headingText={`Welcome back Mr/Ms ${
            userDetails.first_name + ' ' + userDetails.last_name
          }`}
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
                inputLabel="qualification"
                labelColor={'#78828C'}
                borderColor={'#3C78F0'}
                value={edit.getValue('qualification')}
                inputRef={(ele) => {
                  if (ele) {
                    ele.focus();
                  }
                }}
                onChange={handleChange}
                name="qualification"
                disabled={isEdit !== 5}
                iconEnd={<EditComp btnId={5} />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInputComponent
                inputLabel="LinkedIn Link"
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
                disabled={isEdit !== 6}
                iconEnd={<EditComp btnId={6} />}
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
                disabled={isEdit !== 7}
                iconEnd={<EditComp btnId={7} />}
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
                disabled={isEdit !== 8}
                iconEnd={<EditComp btnId={8} />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInputComponent
                inputLabel="About"
                labelColor={'#78828C'}
                borderColor={'#3C78F0'}
                value={edit.getValue('about')}
                inputRef={(ele) => {
                  if (ele) {
                    ele.focus();
                  }
                }}
                onChange={handleChange}
                name="about"
                disabled={isEdit !== 9}
                iconEnd={<EditComp btnId={9} />}
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
                placeholder={'Enter new password'}
                inputLabel={'Password'}
                borderColor={'#3C78F0'}
                variant="outlined"
                labelColor={'#78828C'}
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
                inputLabel="Confirm Password"
                placeholder={'Enter confirm password'}
                borderColor={'#3C78F0'}
                variant="outlined"
                labelColor={'#78828C'}
                value={edit.getValue('confirmPassword')}
                type={'password'}
                helperText={
                  confirmPasswordError &&
                  'Both password and confirm password should be same!'
                }
                isError={confirmPasswordError}
                onChange={(e) =>
                  edit.update({ confirmPassword: e.target.value })
                }
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
    </>
  );
};

export default memo(MentorProfile);
