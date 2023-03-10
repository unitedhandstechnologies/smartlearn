import { useCallback, useEffect, useState } from 'react';
import { NewOrder, Published } from 'src/Assets/Images';
import { Heading, MuiConfirmModal, MultiSelectChip } from 'src/components';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import { Loader } from 'src/components';
import { Box, Divider, useTheme } from '@material-ui/core';
import EnrollmentTable from './EnrollmentTable';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  FILTER_CHIPS,
  GET_FILTER_VALUES,
  HTTP_STATUSES
} from 'src/Config/constant';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import EnrollmentViewModal from './EnrollmentViewModal';
import StudentEnrollCourse from './StudentModel';
import StudentEnrollTable from './StudentEnrollTable';

const EnrollmentManagement = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const EnrollmentDetailsTabValues = [
    {
      heading: t('enrollmentHistory'),
      subText: tableData.length,
      iconImage: Published,
      value: 0
    },
    {
      heading: t('enrollStudent'),
      subText: tableData.length,
      iconImage: NewOrder,
      value: 1
    }
  ];
  // const [selectedValue,setSelectedValue] = useState<string | number>(tableValue[0]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string | number>(
    EnrollmentDetailsTabValues[0].value
  );
  const [enrollmentChipFilter, setEnrollmentChipFilter] = useState([
    FILTER_CHIPS[0]
  ]);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [openModel, setOpenModel] = useState<any>({ open: false });
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);

  const handleSelectedTab = (value: number | string) => {
    setSelectedTab(value);
  };

  const fetchData = useCallback(async () => {
    try {
      const params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any =
        await API_SERVICES.enrollmentManagementService.getAllBy(
          GET_FILTER_VALUES[enrollmentChipFilter[0]],
          params
        );
      if (
        response?.status < HTTP_STATUSES.BAD_REQUEST &&
        response?.data?.distinctStudentCourse?.length
      ) {
        setTableData(response?.data?.distinctStudentCourse);
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [debValue, selectedTab, enrollmentChipFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
  }

  const onActionButtonClick = (rowData: any, rowIds?: number[]) => {
    if (rowData && Object.keys(rowData).length) {
      return onClickViewDetail(rowData);
    }
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    let updateData = {
      status_id: 1,
      orders: rowIds ?? [rowData?.id]
    };
    const onConfirmClick = async () => {
      // const response: any =
      //   await API_SERVICES.enrollmentManagementService.replace({
      //     data: updateData,
      //     successMessage: ' successfully!'
      //   });
      // if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      //   onCancelClick();
      //   fetchData();
      // }
    };
    let props = {
      color: theme.Colors.secondary,

      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };
  const onActionStudentButtonClick = (rowData: any) => {
    setModalOpen({ open: true, rowData: rowData });
  };
  const handleDeleteCategory = async (rowData?: any, type?: string) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any =
        await API_SERVICES.enrollmentManagementService.delete(rowData?.id, {
          successMessage: 'Enroll Deleted Successfully',
          failureMessage: 'Failure to Delete Enroll'
        });
      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: t('areYouSureDeleteEnroll'),
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const onClickViewDetail = (rowData: any) => {
    setModalOpen({ open: true, rowData: rowData });
  };

  const onCreateOrEditButtonClick = (rowData?: any, type?: string) => {
    if (type === CONFIRM_MODAL.edit) {
      setOpenModel({
        open: true,
        rowData: rowData,
        type: type
      });
      return;
    }
    setOpenModel({ open: true, type: type });
  };

  const handleChangeEnrollmentChip = (selectedChipItem: string[]) => {
    setEnrollmentChipFilter(selectedChipItem);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Heading headingText={t('permission.enrollmentManagement')} />
        <MultiSelectChip
          chipItems={FILTER_CHIPS}
          selectedChipItem={enrollmentChipFilter}
          handleChange={handleChangeEnrollmentChip}
          chipStyle={{
            padding: theme.spacing(2, 0.8),
            height: theme.MetricsSizes.large
          }}
        />
        <ContentDisplayTiles
          displayContent={EnrollmentDetailsTabValues}
          isTileTypeOrders={true}
          onTabChange={handleSelectedTab}
          tabValue={selectedTab}
        />
        <Divider style={{ backgroundColor: theme.Colors.lightBlue }} />
        <Box sx={{ mt: 3 }}>
          <TabPanel value={selectedTab} index={0}>
            <EnrollmentTable
              onClickActionButton={onActionButtonClick}
              tableRowData={tableData}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            {/* <ButtonComp
              btnWidth={84}
              backgroundColor={theme.Colors.primary}
              buttonFontSize={theme.MetricsSizes.tiny_xxx}
              btnBorderRadius={theme.MetricsSizes.large}
              buttonText={t('enroll')}
              onClickButton={() =>
                onCreateOrEditButtonClick({}, CONFIRM_MODAL.create)
              }
              endIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
              height={theme.MetricsSizes.large}
              style={{ marginBottom: theme.MetricsSizes.large }}
            /> */}
            <StudentEnrollTable
              onClickActionButton={onActionStudentButtonClick}
              tableRowData={tableData}
              handleDeleteCategory={handleDeleteCategory}
              handleEditCategory={(rowData) =>
                onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
              }
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={2}></TabPanel>
        </Box>
        {modalOpen.open && (
          <EnrollmentViewModal
            onClose={() => setModalOpen({ open: false })}
            {...modalOpen}
          />
        )}
        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
        {openModel.open && (
          <StudentEnrollCourse
            onClose={() => setOpenModel({ open: false })}
            {...openModel}
            updateData={fetchData}
          />
        )}
      </>
    );
  }
};

export default EnrollmentManagement;
