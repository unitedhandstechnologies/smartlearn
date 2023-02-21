import React from 'react';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { getDateFormat } from 'src/Utils';
import { t } from 'i18next';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 847,
      height: 705,
      padding: theme.spacing(2, 3, 0, 6),
      borderRadius: theme.MetricsSizes.regular
    },
    imgStyle: {
      borderRadius: theme.MetricsSizes.small_x,
      width: '320px',
      height: '200px'
    }
  };
});

type Props = { onClose: () => void; rowData: any };

const EnrollmentViewModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();

  const renderDialogContent = () => {
    const { getMonth, getDate, getYear } = getDateFormat(rowData?.created_at);
    const contentDetails = [
      {
        content: t('studentId'),
        value: rowData?.student_id
      },
      {
        content: t('name'),
        value: rowData?.user_name
      },
      {
        content: t('enrollmentCourse'),
        value: rowData?.course_name
      },
      { content: t('level'), value: rowData?.level },
      { content: t('amount'), value: rowData?.amount },
      {
        content: t('enrolledDate'),
        value: `${getMonth} ${getDate}, ${getYear}`
      },
      {
        content: t('instructorName'),
        value: rowData?.mentor_name
      },
      {
        content: t('category'),
        value: rowData?.category_name
      },
      {
        content: t('subCategory'),
        value: rowData?.sub_category_name
      }
    ];

    return (
      <Grid>
        <DialogContentDetails contentDetails={contentDetails} />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={t('viewDetails')}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default EnrollmentViewModal;
