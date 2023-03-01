import React, { useState } from 'react';
import {
  Grid,
  InputAdornment,
  makeStyles,
  useTheme
} from '@material-ui/core';
import MultipleSelectComp from './../../components/MultipleSelectComp/index';
import AddCourseTitleAndDescription from './AddCourseTitleAndDescription';
import { ButtonComp, TextInputComponent } from 'src/components';
import {
  COURSE_PAYMENT_NAME,
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  MODE_NAME,
} from 'src/Config/constant';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';
import { PercentageIcon } from 'src/Assets';
import { HighlightOff } from '@material-ui/icons';
import { toast } from 'react-hot-toast';

const useStyles = makeStyles(() => ({
  mainContainer: {
    padding: '10px 10px 70px 10px'
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '20px',
    background: 'white',
    borderTop: '1px solid #e0e0e0'
  },
  spacingTop: {
    marginTop: 10
  },
  duration: {
    marginTop: 10,
    color: '#3C78F0',
    fontWeight: 500
  }
}));

interface Props {
  error: any;
  edit: any;
  categories: any[];
  mentors: any[];
  courseLevels: any[];
  isDisableCourseType: boolean;
  dateError: any;
}

const CreatePrimaryDetails = ({
  error,
  dateError,
  edit,
  categories,
  mentors,
  courseLevels,
  isDisableCourseType = false
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const [profileImage, setProfileImage] = useState('No file choosen'); 
  const imageError = error && !edit.allFilled('image_url');
  const nameError = error && !edit.allFilled('mentor_name');
  const categoryError = error && !edit.allFilled('category_name');
  const subcategoryError = error && !edit.allFilled('sub_category_name');
  const startTimeError =  error && !edit.allFilled('starting_time');
  const endTimeError =  error && !edit.allFilled('ending_time');
  const startDateError = error && !edit.allFilled('starting_date');
  const endDateError = error && !edit.allFilled('ending_date');

  console.log(mentors,"mentorname")

  const courseType = [
    { courseTypeId: 1, courseTypeName: 'Seminar' },
    { courseTypeId: 2, courseTypeName: 'Masterclass' },
    { courseTypeId: 3, courseTypeName: 'Webinar' },
    { courseTypeId: 4, courseTypeName: 'Workshop' },
    { courseTypeId: 5, courseTypeName: 'Live courses' },
    { courseTypeId: 6, courseTypeName: 'Recorded Course' }
  ];

  const courseMode =
    edit.getValue('course_type') === COURSE_TYPE_NAME[1]
      ? [{ courseModeId: 2, courseModeName: 'Offline' }]
      : [{ courseModeId: 1, courseModeName: 'Online' }];

  const costType = [
    { costTypeId: 1, costTypeName: 'FREE' },
    { costTypeId: 2, costTypeName: 'PAID' }
  ];

  const getSubCategory = async (id: number) => {
    let getLanguageId = DETECT_LANGUAGE[i18n.language];
    const response: any =
      await API_SERVICES.categoryManagementService.getAllSubCategoryByCategoryIdNoPermission(
        getLanguageId,
        id,
        getLanguageId
      );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      if (response?.data?.subCategories?.length) {
        setSubCategories(response?.data?.subCategories);
      } else {
        setSubCategories([]);
      }
    }
  };

  const onUploadFiles = async (event: any) => {
    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = async () => {
      if (img.width <= 350 && img.width >=300 && img.height <= 250 && img.height >=200) {
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
        ${img.width} x ${img.height} but we require size image between 350 x 250 to 300 x 200.`);
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
    <Grid container spacing={3} className={classes.mainContainer}>
      <Grid container item xs={6} spacing={1}>
        <Grid item xs={12}>
          <MultipleSelectComp
            isPlaceholderNone
            selectItems={
              mentors.length &&
              mentors?.map((item: any) => ({
                label: item?.first_name + ' ' + item?.last_name,
                value: item?.id
              }))
            }
            titleText={'Instructor Name'}
            value={edit.getValue('mentor_id')}
            onChange={(e) => {
              if (!e.target.value) {
                edit.update({
                  mentor_id: '',
                  mentor_name: ''
                });
                return;
              }
              let mentorName = mentors.filter(
                (item) => item.id === Number(e.target.value)
              )[0].first_name + ' ' + mentors.filter(
                (item) => item.id === Number(e.target.value)
              )[0].last_name
              edit.update({
                mentor_id: e.target.value,
                mentor_name: mentorName
              });
            }}
            renderValue={(value: any) =>
              value ? edit.getValue('mentor_name') : 'Select'
            }
            displayEmpty
            required
            isError={nameError}
            helperText={nameError && 'Please select an instructor'}
          />
        </Grid>
        <Grid item xs={12}>
          <MultipleSelectComp
            isPlaceholderNone
            selectItems={
              categories.length &&
              categories?.map((item: any) => ({
                label: item.category_name,
                value: item.category_id
              }))
            }
            titleText={'Category'}
            value={edit.getValue('category_id')}
            onChange={(e) => {
              if (!e.target.value) {
                edit.update({
                  category_id: '',
                  category_name: ''
                });
                setSubCategories([]);
                return;
              }
              let categoryName = categories.filter(
                (item) => item.category_id === Number(e.target.value)
              )[0].category_name;
              edit.update({
                category_id: e.target.value,
                category_name: categoryName
              });
              getSubCategory(Number(e.target.value));
            }}
            renderValue={(value: any) =>
              value ? edit.getValue('category_name') : 'Select'
            }
            displayEmpty
            required
            isError={categoryError}
            helperText={categoryError && 'Please choose a category'}
          />
        </Grid>
        <Grid item xs={12}>
          <MultipleSelectComp
            isPlaceholderNone
            selectItems={
              subCategories?.length &&
              subCategories?.map((item: any) => ({
                label: item.sub_category_name,
                value: item.sub_category_id
              }))
            }
            titleText={'SubCategory'}
            value={edit.getValue('sub_category_id')}
            onChange={(e) => {
              if (!e.target.value) {
                edit.update({
                  sub_category_id: '',
                  sub_category_name: ''
                });
                return;
              }
              let subCategoryName = subCategories.filter(
                (item) => item.sub_category_id === Number(e.target.value)
              )[0].sub_category_name;
              edit.update({
                sub_category_id: e.target.value,
                sub_category_name: subCategoryName
              });
            }}
            renderValue={(value: any) =>
              value ? edit.getValue('sub_category_name') : 'Select'
            }
            displayEmpty
            required
            isError={subcategoryError}
            helperText={subcategoryError && 'Please choose a Subcategory'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={'Course Image'}
            value={edit.getValue('image_url').split('/')[3] || profileImage}
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
                  <HighlightOff
                    style={{ cursor: 'pointer' }}
                    onClick={removeProfile}
                  />
                </InputAdornment>
              )
            }}
            required
            isError={imageError}
            helperText={imageError ? 'Please upload the profile image' : "Only .png, .jpg, .jpeg, .bmp format is allowed & max size 2 MB with 350 X 250 resolution" }
          />
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <AddCourseTitleAndDescription edit={edit} />
      </Grid>
      <Grid container item xs={6} spacing={1}>
        <Grid item xs>
          <TextInputComponent
            inputLabel={'Start Time'}
            type="time"
            value={edit.getValue('starting_time')}
            onChange={(e) => edit.update({ starting_time: e.target.value })}
            required
            isError={startTimeError}
            helperText={startTimeError && 'Please select a Start time'}
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel={'End Time'}
            type="time"
            value={edit.getValue('ending_time')}
            onChange={(e) => edit.update({ ending_time: e.target.value })}
            required
            isError={endTimeError}
            helperText={endTimeError && 'Please select a Start time'}
          />
        </Grid>
      </Grid>
      <Grid container item xs={6} spacing={1}>
        <Grid item xs>
          <TextInputComponent
            type="date"
            inputLabel={'From Date'}
            value={edit.getValue('starting_date')}
            onChange={(e) => edit.update({ starting_date: e.target.value })}
            required
            isError={startDateError }
            helperText={startDateError && 'Please select a Start Date'}
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            type="date"
            inputLabel={'To Date'}
            value={edit.getValue('ending_date')}
            onChange={(e) => edit.update({ ending_date: e.target.value })}
            required
            isError={endDateError}
            helperText={endDateError && 'Please select an ending date'}
          />
        </Grid>
      </Grid>

      <Grid container item xs={6} spacing={1}>
        <Grid container item xs spacing={1}>
          <Grid item xs={12}>
            <MultipleSelectComp
              required
              isPlaceholderNone
              disabled={isDisableCourseType}
              titleText={'Course Type'}
              selectItems={
                courseType.length &&
                courseType?.map((item) => ({
                  label: item.courseTypeName,
                  value: item.courseTypeName
                }))
              }
              value={edit.getValue('course_type')}
              onChange={(e) => {
                if (!e.target.value) {
                  edit.update({
                    course_type: '',
                    course_mode: '',
                    meeting_link: '',
                    total_no_of_students: 0,
                    meeting_location: '',
                    section: 0,
                    chapter: 0
                  });
                  return;
                }
                edit.update({
                  course_type: e.target.value,
                  course_mode: '',
                  meeting_link: '',
                  total_no_of_students: 0,
                  meeting_location: '',
                  section: 0,
                  chapter: 0
                });
              }}
              renderValue={(value: any) => (value ? value : 'Select')}
              displayEmpty
              isError={error && !edit.allFilled('course_type')}
              helperText={error && !edit.allFilled('course_type') && 'Please select a course type'}
            />
          </Grid>
          {/* {edit.getValue('course_type') === COURSE_TYPE_NAME[6] ? (
            <>
              <Grid item xs={12}>
                <TextInputComponent
                  inputLabel={'Sections Count'}
                  value={edit.getValue('chapter')}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    edit.update({ chapter: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputComponent
                  inputLabel={'Lessons Count'}
                  value={edit.getValue('section')}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    edit.update({ section: Number(e.target.value) });
                  }}
                />
              </Grid>
            </>
          ) : null} */}
        </Grid>

        <Grid container item xs spacing={1}>
          {edit.getValue('course_type') === COURSE_TYPE_NAME[6] ? null : (
            <Grid item xs={12}>
              <MultipleSelectComp
                required
                isPlaceholderNone
                displayEmpty
                renderValue={(value: any) => (value ? value : 'Select')}
                titleText={'Course Mode'}
                selectItems={
                  courseMode.length &&
                  courseMode?.map((item) => ({
                    label: item.courseModeName,
                    value: item.courseModeName
                  }))
                }
                value={edit.getValue('course_mode')}
                onChange={(e) => {
                  if (!e.target.value) {
                    edit.update({
                      course_mode: ''
                    });
                    return;
                  }
                  edit.update({ course_mode: e.target.value });
                }}
                isError={error && !edit.allFilled('course_mode')}
                helperText={error && !edit.allFilled('course_mode') && 'Please select a course mode'}
              />
            </Grid>
          )}
          {edit.getValue('course_mode') === MODE_NAME[1] &&
          edit.getValue('course_type') !== COURSE_TYPE_NAME[6] &&
          edit.getValue('course_type') !== COURSE_TYPE_NAME[1] ? (
            <Grid item xs={12}>
              <TextInputComponent
                inputLabel={'Zoom Link'}
                value={edit.getValue('meeting_link')}
                onChange={(e) => edit.update({ meeting_link: e.target.value })}
                required
                isError={error && !edit.allFilled('meeting_link')}
                helperText={error && !edit.allFilled('meeting_link') && 'Please Enter link'}
              />
            </Grid>
          ) : null}
          {edit.getValue('course_mode') === MODE_NAME[2] &&
          edit.getValue('course_type') === COURSE_TYPE_NAME[1] ? (
            <>
              <Grid item xs={12}>
                <TextInputComponent
                  inputLabel={'Venue'}
                  value={edit.getValue('meeting_location')}
                  onChange={(e) =>
                    edit.update({ meeting_location: e.target.value })
                  }
                  required
                  isError={error && !edit.allFilled('meeting_location')}
                  helperText={error && !edit.allFilled('meeting_location') && 'Please enter a meeting location'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputComponent
                  inputLabel={'Total no students'}
                  value={edit.getValue('total_no_of_students')}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    edit.update({ total_no_of_students: e.target.value });
                  }}
                  required
                  isError={(error && edit.getValue('total_no_of_students')<1) ? true : false}
                  helperText={(error && edit.getValue('total_no_of_students')<1) ? "Count should be more than 0" : ""}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>
      <Grid container item xs={6} spacing={1}>
        <Grid container item xs spacing={1}>
          <Grid item xs={12}>
            <MultipleSelectComp
              isPlaceholderNone
              renderValue={(value: any) => (value ? value : 'Select')}
              displayEmpty
              titleText={'Cost Type'}
              selectItems={
                costType.length &&
                costType?.map((item) => ({
                  label: item.costTypeName,
                  value: item.costTypeName
                }))
              }
              value={edit.getValue('cost_type')}
              onChange={(e) => {
                if (!e.target.value) {
                  edit.update({
                    cost_type: '',
                    discount: 0,
                    amount: 0
                  });
                  return;
                }
                edit.update({
                  cost_type: e.target.value,
                  discount: 0,
                  amount: 0
                });
              }}
              required
              isError={error && !edit.allFilled('cost_type')}
              helperText={error && !edit.allFilled('cost_type') && 'Please select a cost type'}
            />
          </Grid>
          {edit.getValue('cost_type') === COURSE_PAYMENT_NAME[1] ? (
            <>
              <Grid item xs={12}>
                <TextInputComponent
                  inputLabel={'Fees'}
                  value={edit.getValue('amount')}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    edit.update({ amount: e.target.value });
                  }}
                  required
                  isError={(error && edit.getValue('amount')<1) ? true : false}
                  helperText={(error && edit.getValue('amount')<1) ? "Fees cannot be 0" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputComponent
                  inputLabel={'Discount'}
                  value={edit.getValue('discount')}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      return;
                    }
                    edit.update({ discount: e.target.value });
                  }}
                  iconEnd={<PercentageIcon />}
                  required
                  isError={error && !edit.allFilled('discount')}
                  helperText={error && !edit.allFilled('discount') && 'Please select discount'}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        <Grid container item xs spacing={1}>
          <Grid item xs={12}>
            <MultipleSelectComp
              required
              isPlaceholderNone
              renderValue={(value: any) =>
                value ? edit.getValue('course_level_name') : 'Select'
              }
              displayEmpty
              titleText={'Course Level'}
              selectItems={
                courseLevels.length &&
                courseLevels?.map((item) => ({
                  label: item.course_level_name,
                  value: item.id
                }))
              }
              value={edit.getValue('course_level_id')}
              onChange={(e) => {
                if (!e.target.value) {
                  edit.update({
                    course_level_id: '',
                    course_level_name: ''
                  });
                  return;
                }
                let courseLevelName = courseLevels.filter(
                  (item) => item.id === Number(e.target.value)
                )[0].course_level_name;
                edit.update({
                  course_level_id: e.target.value,
                  course_level_name: courseLevelName
                });
              }}
              isError={error && !edit.allFilled('course_level_name')}
              helperText={error && !edit.allFilled('course_level_name') && 'Please select course level'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(CreatePrimaryDetails);
