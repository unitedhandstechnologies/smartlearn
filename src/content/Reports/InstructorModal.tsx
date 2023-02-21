import React, {useState, useCallback} from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
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

const InstructorModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setTableData([]);
//       let params: any = {};
      
//       const response: any = await(
//         API_SERVICES.instructorReportsService.getInstructorPaymentHistory(
//           params
//         )
//       );
//       console.log(response, "response45");

//       if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
//         if (response?.data?.mentorPayouts?.length) {
//           setTableData(response?.data?.mentorPayouts);
//         }
//       }
//     } catch (err) {
//       toast.error(err?.message);
//     } finally {
//       setLoading(false);
//     }
//   },[]);

  const renderDialogContent = () => {
    const contentDetails = [
      { content: "id", value: rowData?.mentor_id },
      { content: t('reports.instructorName'), value: rowData?.mentor_name },
      { content: t('reports.paymentAmount'), value: rowData?.payment_amount },
      { content: t('reports.paymentDate'),  value: rowData?.payment_date },
    ];
    return (
      <Grid>
        <DialogContentDetails contentDetails={contentDetails} />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={'Instructor Payment History'}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default InstructorModal;
