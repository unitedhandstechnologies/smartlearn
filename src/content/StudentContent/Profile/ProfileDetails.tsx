import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { Avatar1 } from 'src/Assets';
import {
  ButtonComp,
  Heading,
  ListItemCell,
  TextInputComponent
} from 'src/components';
import { useEdit } from 'src/hooks/useEdit';

const useStyles = makeStyles((theme) => ({
  forgotTxt: {
    display: 'flex',
    paddingTop: theme.MetricsSizes.tiny_xxx,
    color: theme.Colors.secondary,
    cursor: 'pointer'
  },
  buttonStyle: {
    padding: '70px 0px 70px 0px'
  },
  cancelButtonStyle: {
    color: theme.Colors.redPrimary,
    border: 'none',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.MetricsSizes.small_xx,
    textTransform: 'none',
    background: 'none',
    padding: 0,
    marginBottom: theme.MetricsSizes.small_x
  },
  saveButtonStyle: {
    color: theme.Colors.secondary,
    border: 'none',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.MetricsSizes.small_xx + 1,
    textTransform: 'none',
    background: 'none',
    padding: 0,
    marginBottom: theme.MetricsSizes.small_x,
    display: 'flex',
    alignItems: 'center'
  },
}));

const ProfileDetails = () => {
  const classes = useStyles();
  const initialValues = {
    image_url: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email_id: ''
  };
  const edit = useEdit(initialValues);
  const [isEdit, setIsEdit] = useState<number>(0);

  const onEditClick = (editEvent: any) => {
    edit.reset();
    setIsEdit(parseInt(editEvent.currentTarget.id));
  };

  const handleChange = (event) => {
    edit.update({ [event.target.name]: event.target.value });
    if (event.key === 'enter') {
      console.log('inside');

      handleSave();
    }
  };

  const handleSave = async () => {
    if (!Object.keys(edit.edits).length) {
      setIsEdit(0);
      return;
    }
    console.log('Press enter key');

    // let data = { ...edit.edits };
    // let response: any = await handleSaveEdits(data);
    // if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
    //   setIsEdit(0);
    // }
  };

  const handleClickCancelBtn = () => {
    edit.reset();
    setIsEdit(0);
  };

  const EditComp = ({ btnId }: { btnId?: number }) => {
    return isEdit === btnId ? (
      <Grid container>
        <Grid item >
        <Button
          id={btnId.toString()}
          className={classes.cancelButtonStyle}
          onClick={handleClickCancelBtn}
        >
          {'Cancel'}
        </Button>
        </Grid>
        <Grid item >
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
      <IconButton id="1" onClick={onEditClick}>
        <EditOutlined />
      </IconButton>
    );
  };

  return (
    <Grid>
      <Heading
        headingText={'Profile details'}
        headerFontSize={'32px'}
        headerFontWeight={500}
        headerFontFamily={'IBM Plex Serif'}
        headingColor={'#3C414B'}
      />
      <Grid>
        <img src={Avatar1} alt="Not found" width={160} height={160} />
      </Grid>
      <Grid container spacing={3} item>
        <Grid item xs>
          <TextInputComponent
            inputLabel="First Nmae"
            value={edit.getValue('first_name')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
            name="first_name"
            disabled={isEdit !== 1}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
            }}
            iconEnd={
              <EditComp btnId={1} />
            }
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Last Nmae"
            value={edit.getValue('last_name')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
            name="last_name"
            disabled={isEdit !== 2}
            iconEnd={
              <IconButton id="2" onClick={onEditClick}>
                <EditOutlined />
              </IconButton>
            }
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} item>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Phone Number"
            value={edit.getValue('phone_number')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            name="phone_number"
            onChange={handleChange}
            disabled={isEdit !== 3}
            iconEnd={
              <IconButton id="3" onClick={onEditClick}>
                <EditOutlined />
              </IconButton>
            }
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
            }}
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Email Id"
            value={edit.getValue('email_id')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
            name="email_id"
            disabled={isEdit !== 4}
            iconEnd={
              <IconButton id="4" onClick={onEditClick}>
                <EditOutlined />
              </IconButton>
            }
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Heading
          headingText={'Change Password'}
          headerFontSize={'24px'}
          headerFontWeight={500}
          headerFontFamily={'IBM Plex Serif'}
          headingColor={'#3C414B'}
        />
      </Grid>
      <Grid container spacing={3} item>
        <Grid item xs>
          <TextInputComponent inputLabel="Old Password" />
          <Typography className={classes.forgotTxt}>
            Forgot Password?
          </Typography>
        </Grid>
        <Grid item xs>
          <TextInputComponent inputLabel="New Password" />
        </Grid>
        <Grid item xs={12} className={classes.buttonStyle}>
          <ButtonComp buttonText="Save" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
