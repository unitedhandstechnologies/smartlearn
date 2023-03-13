import {
  useTheme
} from '@material-ui/core';
import { DeleteOutlineSharp, EditOutlined } from '@material-ui/icons';
import React, { useMemo, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import ButtonComp from '../../components/ButtonComp/index';
import { CheckStatus, ListItemCell, MuiConfirmModal } from 'src/components';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';
import { useEdit } from 'src/hooks/useEdit';
import toast from 'react-hot-toast';

type Props = {
  onClickActionButton: (row: any) => void;
  rowsData?: any[];
  updateData?: () => void;
  handleEditCategory?: (row: any) => void;
  loading?: boolean;
};

const CourseLevelTable = ({
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
  const { t, i18n } = useTranslation();

  const initialValues = {
    status_name: '',
    status_id: 0
  };
  const edit = useEdit(initialValues);

  const onChangeActive = async (row) => {
    const statusId = row?.status == 2 ? 1 : 2;
    try {
      let response: any =
        await API_SERVICES.courseLevelManagementService.updateCourseLevel(row.course_level_id, {
          data: { status: statusId },
          successMessage:
            row?.status === 1
              ? 'Course Inactive successfully!'
              : 'Course Active Successfully'
        });

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };


  const columns = [
    {
      field: 'course_level_name',
      headerName: 'Course Level Name',
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell
          title={row?.course_level_name}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        />
      )
    },
    {
      field: 'sort_no',
      headerName: t('Category.sortNo'),
      flex: 1.3,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.sort_no} />
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
      field: 'status',
      headerName: t('course.status'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <CheckStatus
          Value={row.status === 1 ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    }
  ];

  const filterRowData = useMemo(() => {
    let rowItems = [...rowsData];
    if (!edit.getValue('status')) {
      return rowItems;
    }
    return rowItems.length
      ? rowItems.filter((item) => item.status_id === edit.getValue('status'))
      : [];
  }, [rowsData, edit.edits]);

  const handleClickDeleteUser = (rowItems: any) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteRes: any = await API_SERVICES.courseLevelManagementService.delete(
        rowItems?.course_level_id,
        { successMessage: 'Course Details deleted successfully!' }
      );
      if (deleteRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        updateData();
      }
    };

    let props = {
      color: theme.Colors.redPrimary,
      description: t('courselevel.delete'),
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
        title={t('courselevel.details')}
        columns={columns}
        rows={filterRowData}
        loading={loading}
        disableSelectionOnClick={true}
        autoHeight={true}
        getRowActions={renderRowActions}
        onSortClick={onSortClick}
      />
      {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
    </>
  );
};

export default CourseLevelTable;
