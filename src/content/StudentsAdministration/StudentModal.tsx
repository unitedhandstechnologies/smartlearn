import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import StudentEnrollCourseDetails from './studentEnrollCourseDetail';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 847,
      //height: 705,
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
const StudentModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [enrollCourse, setEnrollCourse] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response: any =
        await API_SERVICES.enrollmentManagementService.getById(rowData?.id, {
          failureMessage: 'No course enrolled with the Student'
        });
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        setEnrollCourse(response?.data?.enrolledCourse);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDialogContent = () => {
    const { getMonth, getDate, getYear } = getDateFormat(rowData?.updated_at);
    const contentDetails = [
      { content: 'Student Id', value: rowData?.id },
      {
        content: 'First Name',
        value: rowData?.first_name
      },
      { content: 'Last Name', value: rowData?.last_name },
      { content: 'Email', value: rowData?.email_id },
      { content: 'Phone Number', value: rowData?.phone_number },
      { content: 'Social Medial Link', value: rowData?.social_information_url },
      { content: 'User Name', value: rowData?.user_name },
      {
        content: 'Date',
        value: `${getMonth} ${getDate}, ${getYear}`
      },
      {
        content: 'Profile Image',
        value: <img src={rowData?.image_url} width={250} height={250}/>
      }
    ];
    return (
      <Grid>
        <Grid item spacing={1}>
          <DialogContentDetails contentDetails={contentDetails} />
        </Grid>
        <Grid item style={{ marginTop: 20 }}>
          <StudentEnrollCourseDetails tableBody={enrollCourse} />
        </Grid>
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={`${rowData?.first_name} ${rowData?.last_name}`}
      avatarImg={rowData?.image_url}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default StudentModal;
