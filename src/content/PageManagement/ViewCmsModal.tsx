import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { RichTextInput } from 'src/components/RichTextInput';

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

type Props = { onClose: () => void; rowData: any };

const ViewCmsModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const renderDialogContent = () => {
    

    const contentDetails = [
      { content: t('Page.sortNumber'), value: rowData?.sort_no },
      {
        content: t('Page.name'),
        value: rowData?.name
      },
      {
        content: t('Page.title'),
        value: rowData?.page_title
      },
      {
        content: t('Page.keywords'),
        value: rowData?.key_words
      },
      {
        content: t('Page.description'),
        value: rowData?.description
      },
      {
        content: t('Page.pageContent'),
        value: <RichTextInput value={(rowData?.page_content)} readOnly={true} displayToolBar={"none"} borderSize={'0px'} heightValue = {'auto'} paddingValue = { "0px 0px" } />
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
      dialogTitle={'CMS Details'}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default ViewCmsModal;
