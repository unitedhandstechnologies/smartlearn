import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@material-ui/core';
import { DeleteOutlineSharp, EditOutlined } from '@material-ui/icons';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ButtonComp from '../../components/ButtonComp/index';
import { CheckStatus, ListItemCell, MuiConfirmModal } from 'src/components';
import { getDateFormat } from 'src/Utils';
import {
  CONFIRM_MODAL,
  HTTP_STATUSES,
  USER_TYPE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import toast from 'react-hot-toast';
import { UserInfoContext } from 'src/contexts/UserContext';
import { useTranslation } from 'react-i18next';
import MuiTable from 'src/components/MuiTable';
import MultipleSelectComp from 'src/components/MultipleSelectComp';
import { useEdit } from 'src/hooks/useEdit';

type Props = {
  onClickActionButton: (row: any) => void;
  rowsData: any[];
  updateData?: () => void;
  handleEditCategory?: (row: any) => void;
  selectedStatusId: any;
  setSelectedStatusId: any;
};

const AdminManagementTable = ({
  onClickActionButton,
  rowsData,
  updateData,
  handleEditCategory,
  selectedStatusId,
  setSelectedStatusId
}: Props) => {
  const theme = useTheme();
  const [passwordVisibleRowId, setPasswordVisibleRowId] = useState<number>();
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });
  const { userDetails } = useContext(UserInfoContext);
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState(rowsData);

  const initialValues = {
    status_name: '',
    status_id: 0
  };
  const edit = useEdit(initialValues);

  const InputField = (props: any) => {
    const { inputId, value, disabled } = props;
    const handlePassword = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      selectedId: React.SetStateAction<number>
    ) => {
      if (passwordVisibleRowId === selectedId) {
        setPasswordVisibleRowId(0);
      } else {
        setPasswordVisibleRowId(selectedId);
      }
    };
    return (
      <>
        <TextField
          disabled={disabled}
          value={value}
          type={passwordVisibleRowId === inputId ? 'text' : 'password'}
          size="small"
          InputProps={{ disableUnderline: true }}
        />
        <IconButton onClick={(e) => handlePassword(e, inputId)}>
          {passwordVisibleRowId === inputId ? (
            <VisibilityOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </IconButton>
      </>
    );
  };

  const onChangeActive = async (row: any) => {
    const statusId = row?.status_id === 3 ? 2 : 3;
    const response: any = await API_SERVICES.adminUserService.update(row?.id, {
      data: { status_id: statusId },
      successMessage:
        row?.status_id === 2
          ? 'User Inactive successfully!'
          : 'User Active Successfully'
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
      field: 'name',
      headerName: t('name'),
      flex: 2.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell
          avatarImg={row?.image_url}
          title={`${row?.first_name} ${row?.last_name}`}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '80%'
          }}
          subTitle={
            row?.user_type === USER_TYPE_ID.superAdmin ? 'SuperAdmin' : 'Admin'
          }
        />
      )
    },
    {
      field: 'email_id',
      headerName: t('email'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => 
      <ListItemCell 
      title={row?.email_id}  
      titleStyle={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '80%'
      }} />
    },
    {
      field: 'password',
      headerName: t('password'),
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => {
        return (
          <InputField
            inputId={row?.id}
            value={row?.password}
            showPassword={row?.showPassword}
          />
        );
      }
    },
    {
      field: 'updated_at',
      headerName: t('date'),
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => {
        const { getMonth, getDate, getYear, getTime } = getDateFormat(
          row?.updated_at
        );
        return (
          <ListItemCell
            title={`${getMonth} ${getDate}, ${getYear}`}
            subTitle={getTime}
          />
        );
      }
    },
    {
      field: 'action',
      headerName: t('course.action'),
      flex: 1.5,
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
      disableColumnSeparator: true,
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

  const handleClickDeleteAdmin = (rowItem: any) => {
    if (
      rowItem.user_type === USER_TYPE_ID.superAdmin ||
      rowItem?.id === userDetails.id
    ) {
      return toast.error('Access Denied!');
    }
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any = await API_SERVICES.adminUserService.delete(
        rowItem?.id,
        { successMessage: 'Admin deleted successfully!' }
      );
      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        updateData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the Admin?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const filterRowData = useMemo(() => {
    let rowItems = [...rowsData];
    if (!edit.getValue('status_id')) {
      return rowItems;
    }
    return rowItems.length
      ? rowItems.filter((item) => item.status_id === edit.getValue('status_id'))
      : [];
  }, [rowsData, edit.edits]);

  const renderRowActions = () => {
    return [
      {
        text: t('edit'),
        onClick: (rowData) => handleEditCategory(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('deleteAdmin'),
        onClick: handleClickDeleteAdmin,
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  return (
    <>
      <MuiTable
        title={t('allUser')}
        columns={columns}
        rows={filterRowData}
        disableSelectionOnClick={true}
        autoHeight={true}
        getRowActions={renderRowActions}
      />
      {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
    </>
  );
};

export default AdminManagementTable;
