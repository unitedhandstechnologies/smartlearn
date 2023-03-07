import React, { useState } from 'react';
import { makeStyles, Grid, useTheme } from '@material-ui/core';
import TextInput from './TextInput';
import { useEdit } from 'src/hooks/useEdit';
import DualActionButton from 'src/components/DualActionButton';
import { CONFIRM_MODAL, HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';
import { DialogComp, MuiTabComponent } from 'src/components';
import { t } from 'i18next';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.fontWeight.bold,
    alignItems: 'center'
  },
  selectedTab: {
    fontWeight: theme.fontWeight.bold,
    color: theme.Colors.secondary
  },
  dialogPaper: {
    width: 847,
    padding: theme.spacing(2, 1, 2, 5),
    borderRadius: 18
  }
}));

type Props = {
  handleClose?: () => void;
  updateData?: () => void;
  rowData?: any;
  type?: string;
};
const AddNewCourseCategoryModal = ({
  handleClose,
  updateData,
  rowData,
  type
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.category_language?.length &&
      rowData?.category_language.filter((item) => item.language_id === lanID);
    return data?.length && data[0].category_name;
  };

  const initialValues = {
    engCategoryName: getLanguageData(LANGUAGE_ID.english) || '',
    hinCategoryName: getLanguageData(LANGUAGE_ID.hindi) || '',
    gujCategoryName: getLanguageData(LANGUAGE_ID.gujarati) || '',
    sort_no: rowData?.category?.sort_no ?? '',
    status: rowData?.category?.status ?? 1,
    image_url: rowData?.category?.image_url ?? ''
  };

  const edit = useEdit(initialValues);

  const RequiredFields = [
    'engCategoryName',
    'hinCategoryName',
    'gujCategoryName',
    'sort_no',
    'status',
    'image_url'
  ];

  const tabs = [
    {
      label: 'English',
      id: 1
    },
    {
      label: 'Hindi',
      id: 2
    },
    {
      label: 'Gujarati',
      id: 3
    }
  ];

  const types = {
    [CONFIRM_MODAL.create]: {
      handleType: 1
    },
    [CONFIRM_MODAL.edit]: {
      handleType: 2
    }
  };

  const handleCreate = async () => {
    try {
      let uData = {
        sort_no: edit.getValue('sort_no'),
        status: edit.getValue('status'),
        image_url: edit.getValue('image_url'),
        language_details: [
          {
            language_id: 1,
            category_name: edit.getValue('engCategoryName')
          },
          {
            language_id: 2,
            category_name: edit.getValue('hinCategoryName')
          },
          {
            language_id: 3,
            category_name: edit.getValue('gujCategoryName')
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      }

      let response: any;
      if (types[type].handleType === 1) {
        response = await API_SERVICES.categoryManagementService.create({
          data: uData,
          successMessage: 'New Category Added successfully!',
          failureMessage: 'Sort Number or Category Name already Exist'
        });
      } else if (types[type].handleType === 2) {
        response = await API_SERVICES.categoryManagementService.updateCategory(
          rowData?.category?.id,
          {
            data: uData,
            successMessage: 'Category updated successfully!',
            failureMessage: 'Sort Number or Category Name already Exist'
          }
        );
      }
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        handleClose();
        updateData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleChangeTab = (value) => {
    setSelected(value);
  };

  const renderTab = (tabValue) => {
    return (
      <Grid>
        <TextInput
          edit={edit}
          tabValue={tabValue}
          isError={isError}
          types={types}
          type={type}
        />
      </Grid>
    );
  };

  const renderDialogContent = () => {
    return (
      <Grid container>
        <MuiTabComponent
          currentTabVal={selected}
          tabContent={tabs}
          tabIndicatorColor={theme.Colors.secondary}
          renderTabContent={renderTab}
          onTabChange={handleChangeTab}
          tabClasses={{
            selected: classes.selectedTab
          }}
        />
      </Grid>
    );
  };

  const renderAction = () => {
    return (
      <Grid container justifyContent="center">
        <DualActionButton
          onLeftButtonClick={handleClose}
          onRightButtonClick={handleCreate}
          buttonText={
            types[type].handleType === 2 ? t('save') : t('button.create')
          }
        />
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={
        types[type].handleType === 2
          ? t('Category.editCategoryDetails')
          : t('Category.addNewCategory')
      }
      open={true}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      onClose={handleClose}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default React.memo(AddNewCourseCategoryModal);
