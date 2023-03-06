import React from 'react';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';

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
const InstructorModal = (props: Props) => {
  const { onClose, rowData } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const renderDialogContent = () => {
    const { getMonth, getDate, getYear } = getDateFormat(rowData?.updated_at);
    let contentDetails = [
      { content: t('instructorCode'), value: rowData?.id },
      {
        content: t('firstName'),
        value: rowData?.first_name
      },
      { content: t('lastName'), value: rowData?.last_name },
      { content: t('email'), value: rowData?.email_id },
      { content: t('phoneNumber'), value: rowData?.phone_number },
      { content: t('About'), value: rowData?.about },
      {
        content: t('date'),
        value: `${getMonth} ${getDate}, ${getYear}`
      },
      {
        content: t('adminManagement.socialMediaLinkFaceBook'),
        value: (
          <a
            href={rowData?.social_information_url}
            rel="noopener noreferrer"
            target={'_blank'}
          >
            {rowData?.social_information_url}
          </a>
        )
      },
      {
        content: t('adminManagement.socialMediaLinkInstagram'),
        value: (
          <a
            href={rowData?.social_information_url_2}
            rel="noopener noreferrer"
            target={'_blank'}
          >
            {rowData?.social_information_url_2}
          </a>
        )
      },
      {
        content: t('adminManagement.socialMediaLinkTwitter'),
        value: (
          <a
            href={rowData?.social_information_url_3}
            rel="noopener noreferrer"
            target={'_blank'}
          >
            {rowData?.social_information_url_3}
          </a>
        )
      },
      {
        content: 'Profile Image',
        value: <img src={rowData?.image_url} width={250} height={250} />
      }
    ];
    contentDetails = contentDetails.filter(
      (i) => i.value != 'undefined' && i.value != ''
    );

    return (
      <Grid>
        <DialogContentDetails contentDetails={contentDetails} />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={t('Instructor.instructorDetails')}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default InstructorModal;
