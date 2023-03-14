import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Rating,
  FormControl,
  FormControlLabel
} from '@mui/material';
import { ButtonComp, TextInputComponent } from 'src/components';
import ReUseableDialogBox from './RatingDialog';
import { RectangleBox } from 'src/Assets';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import { useEdit } from 'src/hooks/useEdit';
import toast from 'react-hot-toast';
import { capitalizeFirstLetter, getUserId } from 'src/Utils';
import { Divider, FormHelperText, useTheme } from '@material-ui/core';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const typoGraphyStyle = {
  fontFamily: 'Switzer',
  fontSize: 18,
  fontWeight: 400,
  color: '#3C414B',
  paddingTop: 20
};

const RateYourExperience = ({ courseDetails }) => {
  const theme = useTheme();
  const [open, setOpen] = useState([]);
  const [courseRating, setCourseRating] = useState<number | null>();
  const [mentorRating, setMentorRating] = useState<number | null>();
  const [error, setError] = useState(false);
  const data = {
    course_rating: courseRating,
    mentor_rating: mentorRating,
    command: ''
  };
  const RequiredFields = ['command', 'course_rating', 'mentor_rating'];
  const edit = useEdit(data);
  const commandError = error && !edit.allFilled('command');
  const courseError = error && !edit.allFilled('course_rating');
  const mentorError = error && !edit.allFilled('mentor_rating');

  const handleClickOpen = () => {
    setOpen([true]);
  };
  const handleClose = () => {
    setOpen([false]);
    setCourseRating(0);
    setMentorRating(0);
    edit.update({
      command: ''
    });
  };

  const handleRatingActionBtnClick = async () => {
    let userId = getUserId();
    try {
      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please select the stars');
      }
      let userData = { ...data, ...edit.edits };
      const response: any = await API_SERVICES.homeUserService.create(
        userId,
        courseDetails?.course_id,
        {
          data: userData,
          successMessage: 'Ratings submitted successfully!',
          failureMessage: 'Ratings already Given'
        }
      );

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        setOpen([true, true]);
        setCourseRating(0);
        setMentorRating(0);
        edit.reset();
      }
    } catch (e) {
      toast.error(e);
    } finally {
      // setLoading(false);
    }
  };
  const ActionDialogTitle = () => {
    return (
      <Typography
        style={{
          fontFamily: 'IBM Plex Serif',
          fontSize: 32,
          fontWeight: 500,
          color: '#3C414B'
        }}
      >
        Thank you
      </Typography>
    );
  };

  const ActionDialogContent = () => {
    return (
      <Grid
        container
        alignItems={'center'}
        flexDirection={'column'}
        paddingTop={2}
        style={{
          height: '350px'
        }}
      >
        <Grid>
          <img
            src={RectangleBox}
            alt=""
            style={{
              width: '150px'
            }}
          />
        </Grid>
        <Grid paddingTop={2}>
          <Typography
            style={{
              fontFamily: 'Switzer',
              fontSize: 18,
              fontWeight: 400,
              color: '#3C414B',
              textAlign: 'center'
            }}
          >
            Thank you for your reviews.
          </Typography>
          <Typography
            style={{
              fontFamily: 'Switzer',
              fontSize: 18,
              fontWeight: 400,
              color: '#3C414B'
            }}
          >
            You just contributed in improving our experience.
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const RatingDialogTitle = () => {
    return (
      <>
        <Typography
          style={{
            fontFamily: 'IBM Plex Serif',
            fontSize: 32,
            fontWeight: 500,
            color: '#3C414B'
          }}
        >
          Rate your course
        </Typography>
        <Typography
          style={{
            fontFamily: 'Switzer',
            fontSize: 18,
            fontWeight: 400,
            color: '#3C78F0'
          }}
        >
          {courseDetails?.course_name}
        </Typography>
      </>
    );
  };

  const RatingDialogContent = () => {
    return (
      <>
        <Typography style={typoGraphyStyle}>
          1. How was your experience with the course?
        </Typography>
        <Grid style={{ padding: 10 }}>
          <FormControl>
            <FormControlLabel
              labelPlacement="top"
              label=""
              control={
                <Rating
                  sx={{ color: theme.Colors.secondary }}
                  size="large"
                  value={courseRating}
                  onChange={(event, newValue) => {
                    setCourseRating(newValue);
                  }}
                  emptyIcon={
                    <StarBorderIcon
                      fontSize="inherit"
                      style={{
                        color: courseError
                          ? theme.Colors.redPrimary
                          : theme.Colors.whiteGreyLight
                      }}
                    />
                  }
                />
              }
            />
            {courseError ? (
              <FormHelperText
                style={{
                  color: theme.Colors.redPrimary,
                  textTransform: 'none',
                  fontSize: theme.MetricsSizes.small_x,
                  fontWeight: theme.fontWeight.regular
                }}
              >
                Please give the ratings for the Course
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Typography style={typoGraphyStyle}>
          2. How was your experience with your instructor?
        </Typography>
        <Grid style={{ padding: 10 }}>
          <FormControl error={true}>
            <FormControlLabel
              labelPlacement="top"
              label=""
              control={
                <Rating
                  sx={{ color: theme.Colors.secondary }}
                  size="large"
                  value={mentorRating}
                  onChange={(event, newValue) => {
                    setMentorRating(newValue);
                  }}
                  emptyIcon={
                    <StarBorderIcon
                      fontSize="inherit"
                      style={{
                        color: mentorError
                          ? theme.Colors.redPrimary
                          : theme.Colors.whiteGreyLight
                      }}
                    />
                  }
                />
              }
            />
            {mentorError ? (
              <FormHelperText
                style={{
                  color: theme.Colors.redPrimary,
                  textTransform: 'none',
                  fontSize: theme.MetricsSizes.small_x,
                  fontWeight: theme.fontWeight.regular
                }}
              >
                Please give the ratings for the Mentor
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Typography style={typoGraphyStyle}>
          3. How can we improve to provide you a better experience?
        </Typography>
        <Grid style={{ paddingTop: 10 }}>
          <TextInputComponent
            placeholder={'Type in here your experience'}
            borderColor={'#B4BEC8'}
            inputWidth={'100%'}
            inputHeight={'80px'}
            value={edit.getValue('command')}
            onChange={(e) =>
              edit.update({
                command: capitalizeFirstLetter(e.target.value)
              })
            }
            isError={commandError}
            helperText={commandError && 'Please enter your valuable command'}
            autoFocus
          />
        </Grid>
      </>
    );
  };

  const RatingDialogActions = () => {
    return (
      <ButtonComp
        buttonText={'Submit review'}
        buttonFontSize={16}
        buttonFontWeight={400}
        height={'40px'}
        btnBorderRadius={4}
        buttonFontFamily={'Switzer'}
        onClickButton={handleRatingActionBtnClick}
      />
    );
  };

  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        style={{
          border: '1.6px solid #3C78F0',
          padding: 11,
          borderRadius: 2,
          marginTop: 15,
          background: '#e8f0ff'
        }}
      >
        <Grid>
          <Typography
            style={{
              fontFamily: 'IBM Plex Serif',
              fontSize: 24,
              fontWeight: 400,
              color: '#3C414B'
            }}
          >
            Rate the experience of the course just you completed
          </Typography>
          <Typography
            style={{
              fontFamily: 'Switzer',
              fontSize: 18,
              fontWeight: 400,
              color: '#3C78F0',
              marginTop: 7
            }}
          >
            {courseDetails?.course_name}
          </Typography>
        </Grid>
        <Grid paddingTop={2}>
          <ButtonComp
            buttonText={'Rate your experience'}
            buttonFontFamily={'Switzer'}
            buttonFontSize={16}
            buttonFontWeight={400}
            height={'40px'}
            btnBorderRadius={4}
            onClick={() => handleClickOpen()}
          />
        </Grid>
      </Grid>
      {open.length === 1 ? (
        <ReUseableDialogBox
          open={open[0]}
          dialogTitle={<RatingDialogTitle />}
          dialogContent={<RatingDialogContent />}
          dialogActions={<RatingDialogActions />}
          dialogWidth={'827px'}
          divider={true}
          handleClose={handleClose}
        />
      ) : (
        <ReUseableDialogBox
          open={open[0]}
          dialogTitle={<ActionDialogTitle />}
          dialogContent={<ActionDialogContent />}
          dialogWidth={'800px'}
          divider={true}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default RateYourExperience;
