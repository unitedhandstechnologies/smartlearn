import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { LANGUAGE_ID, LANGUAGE_NAME } from 'src/Config/constant';
import { toast } from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';

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
  const [subCategoryData, setSubCategoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response: any = await (
        API_SERVICES.categoryManagementService.getSubCategoryById(
          rowData?.id,
        )
      );
        if (response?.data?.sub_category_language) {
          setSubCategoryData(response?.data?.sub_category_language);
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
        value:subCategoryData.map((item)=>{
          return LANGUAGE_NAME[item.language_id]
        }).join(',')
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
