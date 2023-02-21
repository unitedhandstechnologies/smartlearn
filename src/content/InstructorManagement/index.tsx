import { useCallback, useEffect, useState } from 'react';
import { ButtonComp, Heading, MuiConfirmModal } from 'src/components';
import InstructorManagementTable from './InstructorManagementTable';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import { NewOrder, Payouts, InstructorSettings } from 'src/Assets/Images';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import {
  CONFIRM_MODAL,
  HTTP_STATUSES,
  STATUS_ID,
  USER_TYPE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import InstructorManagementCreateModal from './InstructorManagementCreateModal';
import InstructorModal from './InstructorModal';
import InstructorCommissionModal from './InstructorCommissionModal';
import InstructorSettingsTable from './InstructorSettingsTable';
import InstructorPayoutTable from './InstructorPayoutTable';
import PayoutModal from './PayoutModal';
import InstructorPayoutModal from './InstructorPayoutModal';

const useStyles = makeStyles((theme) => ({
  headingStyle: {
    paddingLeft: theme.spacing(2.5)
  }
}));

function InstructorManagement() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [settingData, setSettingData] = useState([]);
  const [payoutData, setPayoutData] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [confirmModal, setConfirmModal] = useState<any>({ open: false });
  const [viewModal, setViewModal] = useState<any>({ open: false });
  const [viewPayoutOpen, setViewPayoutOpen] = useState<any>({ open: false });
  const [viewInstructorPayoutOpen, setViewInstructorPayoutOpen] = useState<any>(
    { open: false }
  );
  const [openCommissionModal, setOpenCommissionModal] = useState<any>({
    open: false
  });
  const [selectedTabVal, setSelectedTabVal] = useState<string | number>(0);

  const newRequest = tableData?.length
    ? tableData.filter(
        (item) =>
          item.user_type === USER_TYPE_ID.mentors &&
          item.status_id === STATUS_ID.New
      )
    : [];

  const acceptedMentor = tableData?.length
    ? tableData.filter(
        (item) =>
          (item.user_type === USER_TYPE_ID.mentors &&
            item.status_id === STATUS_ID.Accepted) ||
          item.status_id === STATUS_ID.Rejected
      )
    : [];

  const instructorList = [
    {
      heading: 'New Request',
      subText: newRequest.length,
      iconImage: NewOrder,
      value: 0
    },
    {
      heading: 'Accepted Instructor',
      subText: acceptedMentor.length,
      iconImage: NewOrder,
      value: 1
    }
  ];

  const instructorDetails = [
    {
      heading: t('Instructor.instructorList'),
      subText: '',
      iconImage: NewOrder,
      value: 0
    },
    {
      heading: t('Instructor.instructorPayouts'),
      subText: '',
      iconImage: Payouts,
      value: 1
    },
    {
      heading: t('Instructor.instructorSettings'),
      subText: '',
      iconImage: InstructorSettings,
      value: 2
    }
  ];
  const [selectedTab, setSelectedTab] = useState<string | number>(
    instructorDetails[0].value
  );

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
  }

  const handleSetSelectedTab = (value) => {
    setSelectedTab(value);
  };

  const handleOnTabChange = (value) => {
    setSelectedTabVal(value);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setTableData([]);
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await Promise.all([
        API_SERVICES.adminUserService.getAll(params),
        API_SERVICES.instructorReportsService.getAllInstructorReports(params),
        API_SERVICES.instructorService.getAllMentorCommissionSettings()
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.users?.length) {
          const onlyMentorList = response[0].data.users.filter(
            (item) => item.user_type === 3
          );
          setTableData(onlyMentorList);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        console.log('response[1]', response[1]);
        if (response[1]?.data?.mentorPayouts?.length) {
          setPayoutData(response[1]?.data?.mentorPayouts);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[2]?.data?.mentorCommission) {
          setSettingData(response[2].data.mentorCommission);
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

  const onCreateOrEditButtonClick = (rowData?: any, type?: string) => {
    setModalOpen({
      open: true,
      rowData: rowData,
      type: type
    });
  };

  const onDeleteMentor = (rowData) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any = await API_SERVICES.adminUserService.delete(
        rowData?.id,
        { successMessage: 'Mentor deleted successfully!' }
      );
      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the Mentor?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const onClickAcceptOrRejectMentor = (rowData: any, statusId: number) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    let updateData = {
      status_id: statusId
    };
    const onConfirmClick = async () => {
      const response: any = await API_SERVICES.adminUserService.update(
        rowData?.id,
        {
          data: updateData,
          successMessage: 'Mentor updated successfully!'
        }
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.secondary,
      description: 'Are you sure want to accept this mentor?',
      title: 'Accept',
      iconType: CONFIRM_MODAL.accept
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const EditCommissionButtonClick = (rowData?: any, type?: string) => {
    if (type === CONFIRM_MODAL.edit) {
      setOpenCommissionModal({
        open: true,
        rowData: rowData,
        type: type
      });
      return;
    }
    setOpenCommissionModal({ open: true, type: type });
  };

  const onClickViewButton = (rowData: any, rowIds?: number[]) => {
    if (rowData && Object.keys(rowData).length) {
      return onClickViewOrder(rowData);
    }
  };
  const onClickViewOrder = (rowData: any) => {
    setViewModal({ open: true, rowData: rowData });
  };

  const onClickViewPayoutdetails = (rowData: any, rowIds?: number[]) => {
    if (rowData && Object.keys(rowData).length) {
      return onClickViewPayout(rowData);
    }
  };
  const onClickViewPayout = (rowData: any) => {
    setViewPayoutOpen({ open: true, rowData: rowData });
  };

  const onClickViewInstructorPayout = async (rowData: any) => {
    console.log('rowData', rowData);

    const response: any =
      await API_SERVICES.instructorReportsService.getAllPaymentHistory(
        rowData?.mentor_id
      );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      console.log('paymentresponse', response);
      if (response?.data?.paymentHistory?.length) {
        setPaymentHistory(response?.data?.paymentHistory);
      }
    }
    setViewInstructorPayoutOpen({ rowData: response?.data, open: true });
  };

  return (
    <>
      <Heading headingText={t('Instructor.instructorDetails')} />
      <Grid item className={classes.headingStyle}>
        <TabPanel value={selectedTab} index={0}>
          <ButtonComp
            buttonText={t('button.create')}
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
      </Grid>
      <ContentDisplayTiles
        displayContent={instructorDetails}
        isTileTypeOrders={true}
        onTabChange={handleSetSelectedTab}
        tabValue={selectedTab}
      />
      <Box sx={{ mt: 3 }}>
        <TabPanel value={selectedTab} index={0}>
          <ContentDisplayTiles
            displayContent={instructorList}
            isTileTypeOrders={true}
            onTabChange={handleOnTabChange}
            tabValue={selectedTabVal}
          />
          <InstructorManagementTable
            loading={loading}
            selectedTabVal={selectedTabVal}
            tableData={
              selectedTabVal === instructorList[0].value
                ? newRequest
                : acceptedMentor
            }
            onClickViewButton={onClickViewButton}
            onDeleteMentor={onDeleteMentor}
            onClickAcceptOrRejectMentor={onClickAcceptOrRejectMentor}
            updateData={fetchData}
            handleEditCategory={(rowData) =>
              onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
            }
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <InstructorPayoutTable
            payoutData={payoutData}
            handleViewPayout={onClickViewPayoutdetails}
            handleViewInstructorPayout={onClickViewInstructorPayout}
            loading={loading}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <InstructorSettingsTable
            settingData={settingData}
            handleEditInstructorCommission={(rowData) =>
              EditCommissionButtonClick(rowData, CONFIRM_MODAL.edit)
            }
            loading={loading}
          />
        </TabPanel>
      </Box>
      {modalOpen.open && (
        <InstructorManagementCreateModal
          onClose={() => setModalOpen({ open: false })}
          {...modalOpen}
          updateData={fetchData}
        />
      )}
      {viewModal.open && (
        <InstructorModal
          onClose={() => setViewModal({ open: false })}
          {...viewModal}
        />
      )}
      {viewPayoutOpen.open && (
        <PayoutModal
          onClose={() => setViewPayoutOpen({ open: false })}
          {...viewPayoutOpen}
        />
      )}
      {viewInstructorPayoutOpen.open && (
        <InstructorPayoutModal
          onClose={() => setViewInstructorPayoutOpen({ open: false })}
          {...viewInstructorPayoutOpen}
        />
      )}
      {openCommissionModal.open && (
        <InstructorCommissionModal
          onClose={() => setOpenCommissionModal({ open: false })}
          updateData={fetchData}
          {...openCommissionModal}
        />
      )}
      {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
    </>
  );
}

export default InstructorManagement;
