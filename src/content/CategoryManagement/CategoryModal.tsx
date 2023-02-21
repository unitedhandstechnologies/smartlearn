import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { LANGUAGE_NAME } from 'src/Config/constant';

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
const CategoryModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const renderDialogContent = () => {
    const { getMonth, getDate, getYear } = getDateFormat(rowData?.updated_at);
    const contentDetails = [
      { content: t('Category.categoryCode'), value: rowData?.id },
      {
        content: t('Category.categoryName'),
        value: rowData?.category_name
      },
      {
        content: t('language'),
        value:
          rowData?.language_id === 1
            ? LANGUAGE_NAME[1]
            : rowData?.language_id === 2
            ? LANGUAGE_NAME[2]
            : LANGUAGE_NAME[3]
      },
      {
        content: t('Category.sortNo'),
        value: rowData?.sort_no
      },
      {
        content: t('course.status'),
        value: rowData?.status === 1 ? 'Available' : 'Not Available'
      },
      {
        content: t('date'),
        value: `${getMonth} ${getDate}, ${getYear}`
      },
      {
        content: 'Category Image',
        value: <img src={rowData?.image_url} width={250} height={250}/>
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
      dialogTitle={'Category Details'}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default CategoryModal;
