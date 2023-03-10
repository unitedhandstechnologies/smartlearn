import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { DeleteOutlineSharp, EditOutlined } from '@material-ui/icons';
import React, { useEffect, useMemo, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import ButtonComp from '../../components/ButtonComp/index';
import { CheckStatus, ListItemCell, MuiConfirmModal } from 'src/components';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';
import MultipleSelectComp from 'src/components/MultipleSelectComp';
import { useEdit } from 'src/hooks/useEdit';

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    borderRadius: '20px',
    background: theme.Colors.secondary,
    color: theme.Colors.white,
    padding: theme.spacing(0.4, 2),
    fontSize: theme.MetricsSizes.small_x
  },
  selectStyle: {
    '&.MuiSelect-root': {
      borderBottom: 'none'
    }
  }
}));

type Props = {
  onClickActionButton: (row: any) => void;
  rowsData?: any[];
  updateData?: () => void;
  handleEditCategory?: (row: any) => void;
  loading?: boolean;
};

const StudentTable = ({
  onClickActionButton,
  rowsData,
  updateData,
  handleEditCategory,
  loading = false
}: Props) => {
  const theme = useTheme();
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });
  const { t } = useTranslation();

  const initialValues = {
    status_name: '',
    status_id: 0
  };
  const edit = useEdit(initialValues);

  const onChangeActive = async (row: any) => {
    const statusId = row?.status_id === 3 ? 2 : 3;
    const response: any = await API_SERVICES.adminUserService.update(row?.id, {
      data: { status_id: statusId },
      successMessage:
        row?.status_id === 2
          ? 'Student Inactive successfully!'
          : 'Student Active Successfully'
    });
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      updateData();
    }
  };
  const statusFilter = [
    {
      id: 2,
      name: 'Enabled'
    },
    {
      id: 3,
      name: 'Disabled'
    }
  ];

  const columns = [
    {
      field: 'first_name',
      headerName: t('name'),
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell
          avatarImg={row?.image_url}
          title={row?.first_name}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        />
      )
    },
    {
      field: 'email_id',
      headerName: t('email'),
      flex: 2.6,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.email_id} />
    },
    {
      field: 'phone_number',
      headerName: t('mobileNumber'),
      flex: 1.8,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.phone_number} />
    },

    {
      field: 'action',
      headerName: t('course.action'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ButtonComp
          btnBorderRadius={20}
          buttonText={t('button.view')}
          buttonFontSize={12}
          btnWidth={50}
          height="25px"
          onClickButton={() => onClickActionButton(row)}
        />
      )
    },
    {
      field: 'status_id',
      headerName: t('course.status'),
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <MultipleSelectComp
          isPlaceholderNone
          selectItems={
            statusFilter.length &&
            statusFilter?.map((item: any) => ({
              label: item.name,
              value: item.id
            }))
          }
          displayEmpty
          renderValue={(value: any) => {
            return value ? value : 'Status';
          }}
          value={edit.getValue('status_name')}
          onChange={(e) => {
            if (!e.target.value) {
              edit.update({
                status_name: '',
                status_id: 0
              });
              return;
            }
            let statusName = statusFilter.filter((item) => {
              return item.id === Number(e.target.value);
            })[0].name;
            edit.update({
              status_name: statusName,
              status_id: Number(e.target.value)
            });
          }}
          borderColor={theme.Colors.white}
        />
      ),
      renderCell: ({ row }) => (
        <CheckStatus
          Value={row.status_id === 2 ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    }
  ];

  const filterRowData = useMemo(() => {
    let rowItems = [...rowsData];
    if (!edit.getValue('status_id')) {
      return rowItems;
    }
    return rowItems.length
      ? rowItems.filter((item) => item.status_id === edit.getValue('status_id'))
      : [];
  }, [rowsData, edit.edits]);

  const handleClickDeleteUser = (rowItem: any) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteStudentRes: any = await API_SERVICES.adminUserService.delete(
        rowItem?.id,
        { successMessage: 'Student deleted successfully!' }
      );
      if (deleteStudentRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        updateData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the Student?',
      title: 'Delete',
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const renderRowActions = () => {
    return [
      {
        text: t('edit'),
        onClick: (rowData) => handleEditCategory(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('delete'),
        onClick: handleClickDeleteUser,
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  const onSortClick = () => {};

  return (
    <>
      <MuiTable
        title={t('studentDetails')}
        columns={columns}
        rows={filterRowData}
        loading={loading}
        // checkboxSelection={true}
        disableSelectionOnClick={true}
        autoHeight={true}
        getRowActions={renderRowActions}
        onSortClick={onSortClick}
      />
      {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
    </>
  );
};

export default StudentTable;
