import { useCallback, useEffect, useState } from 'react';
import { CategoryIcon } from 'src/Assets/Images';
import { ButtonComp, Heading, MuiConfirmModal } from 'src/components';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import { Loader } from 'src/components';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  DETECT_LANGUAGE,
  HTTP_STATUSES
} from 'src/Config/constant';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import { AddCircleOutline } from '@material-ui/icons';
import CategoryTable from './CategoryTable';
import CategoryModal from './CategoryModal';
import SubCategoryTable from './SubCategoryTable';
import AddNewSubCategoryModal from './AddNewSubCategoryModal';
import AddNewCourseCategoryModal from './AddNewCourseCategoryModal';
import SubCategoryViewModal from './SubCategoryViewModal';

const useStyles = makeStyles((theme) => ({
  headingStyle: {
    paddingLeft: theme.spacing(2.5)
  }
}));

function CategoryManagement() {
  const theme = useTheme();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [subCategoryTableData, setSubCategoryTableData] = useState([]);
  const [confirmModal, setConfirmModal] = useState<any>({ open: false });

  const categoryDetails = [
    {
      heading: t('Category.viewAllCategory'),
      subText: tableData.length,
      iconImage: CategoryIcon,
      value: 0
    },
    {
      heading: t('Category.viewAllSubCategory'),
      subText: subCategoryTableData.length,
      iconImage: CategoryIcon,
      value: 1
    }
  ];
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState<any>({
    open: false
  });
  const [openAddSubCategoryModal, setOpenAddSubCategoryModal] = useState<any>({
    open: false
  });
  const [viewModalOpen, setViewModalOpen] = useState<any>({ open: false });
  const [selectedTab, setSelectedTab] = useState<number>(
    categoryDetails[0].value
  );
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);

  const handleSelectedTab = (value) => {
    setSelectedTab(value);
  };

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setTableData([]);
      setSubCategoryTableData([]);
      let getLanguageId = DETECT_LANGUAGE[i18n.language];
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await Promise.all([
        API_SERVICES.categoryManagementService.getAllCategory(
          getLanguageId,
          params
        ),
        API_SERVICES.categoryManagementService.getAllSubCategory(
          getLanguageId,
          params
        )
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.categories?.length) {
          setTableData(response[0]?.data?.categories);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.subCategories?.length) {
          setSubCategoryTableData(response[1]?.data?.subCategories);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [debValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onClickViewCategorydetails = (rowData: any) => {
    setModalOpen({ open: true, rowData: rowData });
  };

  const onClickViewSubCategorydetails = (rowData: any) => {
    setViewModalOpen({ open: true, rowData: rowData });
  };

  const onCreateOrEditButtonClick = useCallback(
    async (rowData?: any, type?: string) => {
      try {
        if (type === CONFIRM_MODAL.edit) {
          const response: any =
            await API_SERVICES.categoryManagementService.getCategoryById(
              rowData?.category_id
            );
          if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
            if (response?.data?.category && response?.data?.category_language) {
              console.log('response?.data?.category', response?.data?.category)
              console.log('response?.data?.category_language', response?.data?.category_language);
              
              setOpenAddCategoryModal({
                open: true,
                rowData: response.data,
                type: type
              });
            }
          }
          return;
        }
        setOpenAddCategoryModal({ open: true, type: type });
      } catch (e) {
        toast.error(e);
      }
    },
    []
  );

  const handleDeleteCategory = async (rowData?: any) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any =
        await API_SERVICES.categoryManagementService.delete(
          rowData?.category_id,
          {
            successMessage: 'Category Deleted Successfully',
            failureMessage: "Category already has been using, can't delete"
          }
        );
      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete this Category?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const onCreateOrEditSubCategoryButtonClick = useCallback(
    async (rowData?: any, type?: string) => {
      try {
        if (type === CONFIRM_MODAL.edit) {
          const response: any =
            await API_SERVICES.categoryManagementService.getSubCategoryById(
              rowData?.sub_category_id
            );
          if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
            if (
              response?.data?.subCategory &&
              response?.data?.sub_category_language
            ) {
              setOpenAddSubCategoryModal({
                open: true,
                rowData: response.data,
                type: type
              });
            }
          }
          return;
        }
        setOpenAddSubCategoryModal({ open: true, type: type });
      } catch (e) {
        toast.error(e);
      }
    },
    []
  );

  const handleDeleteSubCategory = async (rowData?: any) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any =
        await API_SERVICES.categoryManagementService.deleteSubCategory(
          rowData?.sub_category_id,
          {
            successMessage: 'SubCategory Deleted Successfully',
            failureMessage: "Sub-Category already has been using, can't delete"
          }
        );
      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete this SubCategory?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Heading headingText={t('home.categoryManagement')} />
        <Grid item className={classes.headingStyle}>
          <TabPanel value={selectedTab} index={0}>
            <ButtonComp
              buttonText={t('Category.addNewCategory')}
              onClickButton={() =>
                onCreateOrEditButtonClick({}, CONFIRM_MODAL.create)
              }
              backgroundColor={theme.Colors.primary}
              height="33px"
              buttonFontSize={theme.MetricsSizes.tiny_xxx}
              buttonTextColor={theme.Colors.white}
              buttonFontWeight={theme.fontWeight.medium}
              btnWidth={'fit-content'}
              btnBorderRadius={100}
              endIcon={<AddCircleOutline fontSize="small" />}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <ButtonComp
              buttonText={t('Category.addNewSubCategory')}
              onClickButton={() =>
                onCreateOrEditSubCategoryButtonClick({}, CONFIRM_MODAL.create)
              }
              backgroundColor={theme.Colors.primary}
              height="33px"
              buttonFontSize={theme.MetricsSizes.tiny_xxx}
              buttonTextColor={theme.Colors.white}
              buttonFontWeight={theme.fontWeight.medium}
              btnWidth={'fit-content'}
              btnBorderRadius={100}
              endIcon={<AddCircleOutline fontSize="small" />}
            />
          </TabPanel>
        </Grid>
        <ContentDisplayTiles
          displayContent={categoryDetails}
          isTileTypeOrders={true}
          tabValue={selectedTab}
          onTabChange={handleSelectedTab}
        />
        <Box sx={{ mt: 3 }}>
          <TabPanel value={selectedTab} index={0}>
            <CategoryTable
              tableRowData={tableData}
              handleViewCategory={onClickViewCategorydetails}
              handleDeleteCategory={handleDeleteCategory}
              handleEditCategory={(rowData) =>
                onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
              }
              fetchData={fetchData}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <SubCategoryTable
              tableRowData={subCategoryTableData}
              categoryData={tableData}
              handleViewSubCategory={onClickViewSubCategorydetails}
              handleDeleteCategory={handleDeleteSubCategory}
              handleEditCategory={(rowData) =>
                onCreateOrEditSubCategoryButtonClick(
                  rowData,
                  CONFIRM_MODAL.edit
                )
              }
              updateData={fetchData}
            />
          </TabPanel>
        </Box>
        {modalOpen.open && (
          <CategoryModal
            onClose={() => setModalOpen({ open: false })}
            {...modalOpen}
          />
        )}
        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
        {openAddCategoryModal.open && (
          <AddNewCourseCategoryModal
            handleClose={() => setOpenAddCategoryModal({ open: false })}
            updateData={fetchData}
            {...openAddCategoryModal}
          />
        )}
        {openAddSubCategoryModal.open && (
          <AddNewSubCategoryModal
            onClose={() => setOpenAddSubCategoryModal({ open: false })}
            updateData={fetchData}
            categories={tableData}
            {...openAddSubCategoryModal}
          />
        )}
        {viewModalOpen.open && (
          <SubCategoryViewModal
            onClose={() => setViewModalOpen({ open: false })}
            {...viewModalOpen}
          />
        )}
      </>
    );
  }
}

export default CategoryManagement;
