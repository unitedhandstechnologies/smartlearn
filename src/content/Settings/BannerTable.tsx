import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { DeleteOutlineSharp, EditOutlined, Label } from '@material-ui/icons';
import React, { memo, useEffect, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import { CheckStatus, ListItemCell, MuiConfirmModal } from 'src/components';
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
  onClickActionButton?: (row: any) => void;
  rowsData?: any[];
  updateData?: () => void;
  handleEditBanner?: (row: any) => void;
};

const BannerTable = ({
  onClickActionButton,
  rowsData,
  updateData,
  handleEditBanner
}: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState([]);

  const onChangeActive = async (row) => {
    const banner_status = row?.banner_status == 2 ? 1 : 2;
    try {
      let response: any = await API_SERVICES.bannerManagementService.update(
        row?.banner_id,

        {
          data: { banner_status: banner_status },
          successMessage:
            row?.banner_status === 1
              ? t('Toast.bannerInactiveSuccessfully')
              : t('Toast.bannerActiveSuccessfully')
        }
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const columns = [
    {
      field: 'banner_image',
      headerName: t('setting.bannerImage'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <img src={row?.banner_image} width="100px" height="50px" />
      )
    },
    {
      field: 'banner_name',
      headerName: t('setting.bannerName'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.banner_name} />
    },
    {
      field: 'description',
      headerName: t('Page.bannerName'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell
          title={row?.description}
          titleStyle={{
            overflow: 'hidden',
            width: '100%',
            textOverflow: 'ellipsis'
          }}
        />
      )
    },
    {
      field: 'status_id',
      headerName: t('course.status'),
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <CheckStatus
          Value={row?.banner_status === 1 ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    }
  ];

  const handleClickDelete = (row: any) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteBanner: any =
        await API_SERVICES.bannerManagementService.delete(row?.banner_id, {
          successMessage: t('Toast.bannerDeletedSuccessfully')
        });
      if (deleteBanner?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        updateData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: t('areyousurewanttodeletetheBanner'),
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const renderRowActions = () => {
    return [
      {
        text: t('edit'),
        onClick: (rowData) => handleEditBanner(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('delete'),
        onClick: handleClickDelete,
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  useEffect(() => {
    setRowItems(rowsData);
  }, [rowsData]);

  return (
    <>
      <MuiTable
        title={t('setting.bannerManagement')}
        getRowId={(row) => row?.id}
        columns={columns}
        rows={rowItems}
        disableSelectionOnClick={true}
        autoHeight={true}
        getRowActions={renderRowActions}
      />
      {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
    </>
  );
};

export default memo(BannerTable);
