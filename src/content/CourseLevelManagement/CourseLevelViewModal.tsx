import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_NAME } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 647,
      minHheight: 305,
      padding: theme.spacing(2, 2, 0, 5),
      borderRadius: theme.MetricsSizes.regular
    },
    imgStyle: {
      borderRadius: theme.MetricsSizes.small_x,
      width: '300px',
      height: '180px'
    }
  };
});

type Props = { onClose: () => void; rowData: any };
const CourseLevelViewModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [courseLevelData, setcourseLevelData] = useState([]);

  const fetchData = async () => {
    try {
      setcourseLevelData([]);
      const response: any = await (
        API_SERVICES.courseLevelManagementService.getCourseLevelById(
          rowData?.id,
        )
      );
        if (response?.data?.course_level_language) {
          setcourseLevelData(response?.data?.course_level_language);
        }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDialogContent = () => {
    const contentDetails = [
      { content: 'Course Level Id', value: rowData?.id },
      {
        content: 'Course Level',
        value: rowData?.course_level_name
      },
      {
        content: t('language'),
        value: courseLevelData.map((item)=>{
          return LANGUAGE_NAME[item.language_id]
        }).join(',')
      },
      {
        content: 'Sort No',
        value: rowData?.sort_no
      },
      {
        content: t('course.status'),
        value: rowData?.status === 1 ? 'Available' : 'Not Available'
      },
    ];
    return (
      <Grid>
        <DialogContentDetails contentDetails={contentDetails} />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={t('courselevel.details')}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default CourseLevelViewModal;
