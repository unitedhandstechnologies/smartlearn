import React, { useState } from 'react';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { DialogComp, MuiTabComponent } from 'src/components';
import DualActionButton from 'src/components/DualActionButton';
import { CONFIRM_MODAL, HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import TextInput from './TextInput';

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
  onClose?: () => void;
  rowData?: any;
  updateData?: () => void;
  type?: string;
  categories?: any[];
};
const AddNewSubCategoryModal = ({
  onClose,
  rowData,
  type,
  updateData,
  categories
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);

  const getLanguageData = (lanID: number) => {
    let data =
      rowData?.sub_category_language?.length &&
      rowData?.sub_category_language?.filter(
        (item) => item.language_id === lanID
      );
    return data?.length && data[0].sub_category_name;
  };

  const initialValues = {
    engCategoryName: getLanguageData(LANGUAGE_ID.english) || '',
    hinCategoryName: getLanguageData(LANGUAGE_ID.hindi) || '',
    gujCategoryName: getLanguageData(LANGUAGE_ID.gujarati) || '',
    sort_no: rowData?.subCategory?.sort_no ?? '',
    status: rowData?.subCategory?.status ?? 1,
    category_id: rowData?.subCategory?.category_id ?? 0
  };
  const edit = useEdit(initialValues);
  const RequiredFields = [
    'engCategoryName',
    'hinCategoryName',
    'gujCategoryName',
    'sort_no',
    'status'
  ];

  const types = {
    [CONFIRM_MODAL.create]: {
      handleType: 1
    },
    [CONFIRM_MODAL.edit]: {
      handleType: 2
    }
  };

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

  const handleChangeTab = (value) => {
    setSelected(value);
  };

  const renderTab = (tabValue) => {
    return (
      <TextInput
        edit={edit}
        tabValue={tabValue}
        isError={isError}
        categories={categories}
        labelName={'Sub Category Name'}
      />
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

  const handleCreate = async () => {
    try {
      let data = {
        sort_no: edit.getValue('sort_no'),
        status: edit.getValue('status'),
        category_id: edit.getValue('category_id'),
        language_details: [
          {
            language_id: LANGUAGE_ID.english,
            sub_category_name: edit.getValue('engCategoryName')
          },
          {
            language_id: LANGUAGE_ID.hindi,
            sub_category_name: edit.getValue('hinCategoryName')
          },
          {
            language_id: LANGUAGE_ID.gujarati,
            sub_category_name: edit.getValue('gujCategoryName')
          }
        ]
      };
      if (!edit.allFilled(...RequiredFields)) {
        setIsError(true);
        return toast.error('Please fill all the required fields');
      } else {
        setIsError(false);
      }
      let response: any;
      if (types[type].handleType === 1) {
        response =
          await API_SERVICES.categoryManagementService.createSubCategory(
            edit?.edits?.category_id,
            {
              data: data,
              successMessage: 'New Sub Category Added successfully!',
              failureMessage: 'Sort Number already Exist'
            }
          );
      } else if (types[type].handleType === 2) {
        response =
          await API_SERVICES.categoryManagementService.updateSubCategory(
            rowData?.subCategory?.id,
            {
              data: data,
              successMessage: 'SubCategory updated successfully!',
              failureMessage: 'Sort Number already Exist'
            }
          );
      }
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        onClose();
        updateData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const renderAction = () => {
    return (
      <Grid container justifyContent="center">
        <DualActionButton
          onLeftButtonClick={onClose}
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
          ? t('Category.editSubCategory')
          : t('Category.addNewSubCategory')
      }
      open={true}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      onClose={onClose}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default AddNewSubCategoryModal;
