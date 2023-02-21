import React from 'react';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 670,
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
const PayoutModal = (props: Props) => {
  const { onClose, rowData } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const renderDialogContent = () => {
    const contentDetails = [
      { content: t('Instructor.instructorId'), value: rowData?.mentor_id },
      {
        content: t('reports.instructorName'),
        value: rowData?.mentor_name
      },
      {
        content: t('reports.completedPayout'),
        value: rowData?.completed_payout
      },
      {
        content: t('reports.pendingPayout'),
        value: rowData?.pending_payout
      },
      {
        content: t('reports.payoutDate'),
        value: rowData?.payout_date
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
      dialogTitle={t('payout.payoutDetails')}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default PayoutModal;
