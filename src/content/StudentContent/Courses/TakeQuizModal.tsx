import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { RichTextInput } from 'src/components/RichTextInput';
import Quiz from './QASection/Quiz';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 647,
      padding: theme.spacing(2, 2, 2, 5),
      borderRadius: theme.MetricsSizes.regular
    },
    imgStyle: {
      borderRadius: theme.MetricsSizes.small_x,
      width: '300px',
      height: '180px'
    }
  };
});

type Props = { onClose: () => void; courseDataFromLib: any };

const TakeQuizModal = (props: Props) => {
  const { onClose, courseDataFromLib } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const renderDialogContent = () => {    
    return (
      <Grid>
        <Quiz  courseDataFromLib={courseDataFromLib} onClose={onClose} fromLibrary={true} />
      </Grid>
    );
  };

  return (
    <DialogComp      
      dialogTitle={'Quiz'}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default TakeQuizModal;
