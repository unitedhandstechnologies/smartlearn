import React, { useState, useEffect, useCallback } from 'react';
import { ButtonComp, Heading, Loader } from 'src/components';
import AdminManagementModal from './AdminManagementModal';
import AdminManagementTable from './AdminManagementTable';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from '@material-ui/core';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  HTTP_STATUSES,
  USER_TYPE_ID
} from 'src/Config/constant';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import AdminModal from './AdminModal';

function AdminManagement() {
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { t } = useTranslation();
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);
  const [viewModal, setViewModal] = useState<any>({ open: false });
  const [selectedStatusId, setSelectedStatusId] = useState<number>(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setData([]);
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await API_SERVICES.adminUserService.getAll(params);
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.users?.length) {
          const onlyAdminList = response.data.users.filter(
            (item) =>
              item.user_type === USER_TYPE_ID.superAdmin ||
              item.user_type === USER_TYPE_ID.admin
          );
          setData(onlyAdminList);
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

  useEffect(() => {
    const fetchPermissions = async () => {
      const response: any =
        await API_SERVICES.adminUserService.getAccessPermissions();
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data) {
          setPermissions(response?.data);
        }
      }
    };
    fetchPermissions();
  }, []);

  const onActionButtonClick = (rowData: any, rowIds?: number[]) => {
    if (rowData && Object.keys(rowData).length) {
      return onClickViewOrder(rowData);
    }
  };

  const onClickViewOrder = (rowData: any) => {
    setViewModal({ open: true, rowData: rowData });
  };

  const onCreateOrEditButtonClick = (rowData?: any, type?: string) => {
    setModalOpen({
      open: true,
      rowData: rowData,
      type: type
    });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Heading headingText={t('adminManagement.createNewAdmin')} />
        <ButtonComp
          btnWidth={84}
          backgroundColor={theme.Colors.primary}
          buttonFontSize={theme.MetricsSizes.tiny_xxx}
          btnBorderRadius={theme.MetricsSizes.large}
          buttonText={t('button.create')}
          onClickButton={() =>
            onCreateOrEditButtonClick({}, CONFIRM_MODAL.create)
          }
          endIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          height={theme.MetricsSizes.large}
          style={{ marginBottom: theme.MetricsSizes.large }}
        />
        <AdminManagementTable
          onClickActionButton={onActionButtonClick}
          rowsData={data}
          updateData={fetchData}
          handleEditCategory={(rowData) =>
            onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
          }
          setSelectedStatusId={setSelectedStatusId}
          selectedStatusId={selectedStatusId}
        />
        {modalOpen.open && (
          <AdminManagementModal
            onClose={() => setModalOpen({ open: false })}
            permissions={permissions}
            {...modalOpen}
            updateData={fetchData}
          />
        )}
        {viewModal.open && (
          <AdminModal
            onClose={() => setViewModal({ open: false })}
            {...viewModal}
          />
        )}
      </>
    );
  }
}

export default AdminManagement;
