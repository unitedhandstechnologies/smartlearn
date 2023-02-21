import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { DialogComp, TextInputComponent } from 'src/components';
import { useTranslation } from 'react-i18next';
import DualActionButton from 'src/components/DualActionButton';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import MultipleSelectComp from 'src/components/MultipleSelectComp';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 847,
      padding: theme.spacing(2, 1, 2, 5),
      borderRadius: 18
    },
    contentStyle: {
      padding: theme.spacing(0, 10, 0, 0)
    },
    buttonStyle: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.MetricsSizes.tiny_xxx
    },
    textStyle: {
      color: theme.Colors.primary,
      fontWeight: theme.fontWeight.medium
    }
  };
});

type Props = {
  onClose: () => void;
  updateData?: () => void;
  rowData?: any;
  type?: string;
};

const StudentEnrollCourse = (props: Props) => {
  const { onClose, updateData, rowData, type } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState<any>();

  const defaultValues = {
    student_id: rowData?.student_id || 0,
    course_id: rowData?.course_id || 0,
    status_id: rowData?.status_id || 0,
    enrolled_date: rowData?.enrolled_date || '',
    amount: rowData?.amount || 0,
    level: rowData?.level || '',
    //language_id: rowData?.language_id || '',
    ...rowData
  };

  const edit = useEdit(defaultValues);
  const types = {
    [CONFIRM_MODAL.create]: {
      handleType: 1
    },
    [CONFIRM_MODAL.edit]: {
      handleType: 2
    }
  };

  const fetchData = async () => {
    const response: any = await API_SERVICES.courseManagementService.getAll(
      // edit.getValue('language_id')
      1
    );

    const temp = response.data.courses.map((item) => {
      return item.course_name;
    });

    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      const courseName = response.data.courses.map((item) => {
        return { id: item.id, name: item.category_name };
      });

      setCourses(courseName);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      let enrollData = { ...defaultValues, ...edit.edits };
      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.enrollmentManagementService.create(
          edit.getValue('student_id'),
          edit.getValue('course_id'),
          {
            data: enrollData,
            successMessage: 'Student enrolled successfully!',
            failureMessage: 'Error: Failed to enroll'
          }
        );
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.enrollmentManagementService.replace(
          rowData?.id,
          {
            data: enrollData,
            successMessage: 'enroll updated successfully!',
            failureMessage: 'Error: Failed to update enroll'
          }
        );
      }
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        onClose();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  // const LanguageData = [
  //   {
  //     name: 'English',
  //     id: 1
  //   },
  //   {
  //     name: 'Hindi',
  //     id: 2
  //   },
  //   {
  //     name: 'Gujarati',
  //     id: 3
  //   }
  // ];

  const renderDialogContent = () => {
    return (
      <Grid container justifyContent="center">
        <Grid container spacing={1} className={classes.contentStyle}>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('studentId')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('student_id')}
              onChange={(e) => {
                edit.update({ student_id: Number(e.target.value) });
              }}
              required
            />
          </Grid>
          {/* <Grid item xs={12}>
            <MultipleSelectComp
              titleText={'Language '}
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
            <MultipleSelectComp
              titleText={t('courseName')}
              value={edit.getValue('course_id')}
              onChange={(e: any) => {
                edit.update({ course_id: e.target.value });
              }}
              displayEmpty
              selectItems={courses?.map((item) => ({
                label: item.name,
                value: item.id
              }))}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('enrolledDate')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('enrolled_date')}
              onChange={(e) => {
                edit.update({ enrolled_date: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('amount')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('amount')}
              onChange={(e) => {
                edit.update({ amount: Number(e.target.value) });
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('level')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('level')}
              onChange={(e) => {
                edit.update({ level: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputComponent
              inputLabel={t('statusId')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('status_id')}
              onChange={(e) => {
                edit.update({ status_id: Number(e.target.value) });
              }}
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
        onRightButtonClick={handleCreate}
        buttonText={types[type].handleType === 2 ? t('save') : t('button.create')}
      />
    );
  };

  return (
    <DialogComp
      dialogTitle={
        types[type].handleType === 2
          ? t('editEnrollDetails')
          : t('studentEnroll')
      }
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default StudentEnrollCourse;
