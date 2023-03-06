import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { DialogComp, DialogContentDetails } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { HTTP_STATUSES, LANGUAGE_NAME } from 'src/Config/constant';
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
      width: '341px',
      height: '228px'
    }
  };
});

type Props = { onClose: () => void; rowData: any };
const CategoryModal = (props: Props) => {
  const { onClose, rowData } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    try {
      setCategoryData([]);
      const response: any = await (
        API_SERVICES.categoryManagementService.getCategoryById(
          rowData?.id,
        )
      );
        if (response?.data?.category_language) {
          setCategoryData(response?.data?.category_language);
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
      { content: t('Category.categoryCode'), value: rowData?.id },
      {
        content: t('Category.categoryName'),
        value: rowData?.category_name
      },
      {
        content: t('language'),
        value:categoryData.map((item)=>{
          return (LANGUAGE_NAME[item.language_id])
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
      },
      {
        content: 'Category Image',
        value: <img src={rowData?.image_url} width={341} height={228}/>
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
