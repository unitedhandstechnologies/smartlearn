import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Avatar1 } from 'src/Assets';
import {
  ButtonComp,
  Heading,
  ListItemCell,
  TextInputComponent
} from 'src/components';
import { useEdit } from 'src/hooks/useEdit';
import { StudentInfoContext } from 'src/contexts/StudentContext';

const useStyles = makeStyles((theme) => ({
  forgotTxt: {
    display: 'flex',
    paddingTop: theme.MetricsSizes.tiny_xxx,
    color: theme.Colors.secondary,
    cursor: 'pointer'
  },
  buttonStyle: {
    paddingTop: '10px'
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
  }
}));

const ProfileDetails = () => {
  const classes = useStyles();
  const { studentDetails } = useContext(StudentInfoContext);
  const initialValues = {
    image_url: studentDetails.image_url || '',
    first_name: studentDetails.first_name || '',
    last_name: studentDetails.last_name || '',
    phone_number: studentDetails.phone_number || '',
    email_id: studentDetails.email_id || ''
  };
  const edit = useEdit(initialValues);
  const [isEdit, setIsEdit] = useState<number>(0);
  console.log(studentDetails, ' profile');
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
        <Grid item>
          <Button
            id={btnId.toString()}
            className={classes.cancelButtonStyle}
            onClick={handleClickCancelBtn}
          >
            {'Cancel'}
          </Button>
        </Grid>
        <Grid item>
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
      <Grid
        xs={2}
        item
        style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src={Avatar1}
          alt="Not found"
          width={160}
          height={160}
          style={{ marginLeft: 5 }}
        />
        <Typography
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
        </Typography>
      </Grid>
      <Grid container spacing={2} item style={{ paddingTop: 15 }}>
        <Grid item xs>
          <TextInputComponent
            inputLabel="First Name"
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
            iconEnd={<EditComp btnId={1} />}
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Last Name"
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
      <Grid container spacing={2} item style={{ paddingTop: 15 }}>
        <Grid item xs={1}>
          <TextInputComponent
            inputLabel="Code"
            value={'+91'}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            name="phone_number"
            onChange={handleChange}
            disabled={isEdit !== 3}
            // iconEnd={
            //   <IconButton id="3" onClick={onEditClick}>
            //     <EditOutlined />
            //   </IconButton>
            // }
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
            }}
          />
        </Grid>
        <Grid item xs={5}>
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
        <Grid item xs={6}>
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
      <Grid container style={{ paddingTop: 15 }}>
        <Heading
          headingText={'Change Password'}
          headerFontSize={'24px'}
          headerFontWeight={500}
          headerFontFamily={'IBM Plex Serif'}
          headingColor={'#3C414B'}
        />
      </Grid>
      <Grid container spacing={3} item style={{ paddingTop: 15 }}>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Old Password"
            placeholder={'Enter old password'}
          />
          <Typography className={classes.forgotTxt}>
            Forgot Password?
          </Typography>
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel="New Password"
            placeholder={'Enter new password'}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonStyle}>
          <ButtonComp buttonText="Save" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
