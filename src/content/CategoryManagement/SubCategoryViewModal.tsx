import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { LANGUAGE_ID, LANGUAGE_NAME } from 'src/Config/constant';

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
const SubCategoryViewModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const renderDialogContent = () => {
    const { getMonth, getDate, getYear } = getDateFormat(rowData?.updated_at);
    const contentDetails = [
      { content: t('Category.categoryId'), value: rowData?.category_id },
      {
        content: t('Category.categoryName'),
        value: rowData?.category_name
      },
      {
        content: t('Category.subCategoryName'),
        value: rowData?.sub_category_name
      },
      {
        content: t('language'),
        value:
          rowData?.language_id === LANGUAGE_ID.english
            ? LANGUAGE_NAME[1]
            : rowData?.language_id === LANGUAGE_ID.hindi
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
      dialogTitle={'Sub Category Details'}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default SubCategoryViewModal;
