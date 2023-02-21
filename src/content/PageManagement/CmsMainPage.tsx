import React, { useEffect, useMemo, useState } from 'react';
import { CheckStatus } from 'src/components';
import MuiTable from 'src/components/MuiTable';
import { ListItemCell } from 'src/components';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineSharp, EditOutlined, ListAlt } from '@material-ui/icons';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useEdit } from 'src/hooks/useEdit';
import toast from 'react-hot-toast';
import { Typography, useTheme } from '@material-ui/core';
import MultipleSelectComp from 'src/components/MultipleSelectComp';


type Props = {
  handleDeleteCms?: (row: any) => void;
  handleEditCms?: (row: any) => void;
  handleViewCms?: (row: any) => void;
  tableData?: any[];
  fetchData?: any;
};

const CmsMainPage = ({
  handleEditCms,
  handleDeleteCms,
  handleViewCms,
  tableData,
  fetchData
}: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [rowItems, setRowItems] = useState([]);

  const initialValues = {
    status_name: '',
    status_id: 0
  };
  const edit = useEdit(initialValues);

  const statusFilter = [
    {
      id: 1,
      name: 'Enabled'
    },
    {
      id: 2,
      name: 'Disabled'
    }
  ];
 
  const onChangeActive = async (row) => {
    const statusId = row?.status == 2 ? 1 : 2;
    try {
      let response: any =
        await API_SERVICES.pageManagementService.updateCms(
          row.id,
          {
            data: { status: statusId },
            successMessage:
              row?.status === 1
                ? 'CMS Inactive successfully!'
                : 'CMS Active Successfully'
          }
        );

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        fetchData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
   
  };

  const columns = [
    {
      field: 'cms_number',
      headerName: t('Page.cmsNumber'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell title={row?.id} />
      )
    },
    {
      field: 'cms_name',
      headerName: t('Page.cmsName'),
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.name} />
    },
    {
      field: 'sort_number',
      headerName: t('Page.sortNumber'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell title={row?.sort_no} />
      )
    },
    {
      field: 'actions',
      headerName: t('Page.status'),
      flex: 1,
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
          return value ? value : 
          <Typography style={{fontWeight: theme.fontWeight.bold, 
            fontSize: theme.MetricsSizes.small_xx,
            color: theme.Colors.greyMedium}}
          >Status
          </Typography>;
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
          Value={row.status === 1 ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    },
    
  ];

  const renderRowActions = () => {
    return [
      {
        text: t('view'),
        onClick: (rowData) => handleViewCms(rowData),
        renderIcon: () => <ListAlt />
      },
      {
        text: t('edit'),
        onClick: (rowData) => handleEditCms(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('delete'),
        onClick: (rowData) => handleDeleteCms(rowData),
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  const filterRowData = useMemo(() => {
    let rowData = [...rowItems];
    if (!edit.getValue('status_id')) {
      return rowData;
    }
    return rowData.length
      ? rowData.filter((item) => item.status === edit.getValue('status_id'))
      : [];
  }, [rowItems, edit.edits]);

  useEffect(() => {
    if (tableData?.length) {
      setRowItems(tableData);
    } else {
      setRowItems([]);
    }
  }, [tableData]);

  return (
    <MuiTable
      title={t('Page.cmsDetails')}
      columns={columns}
      rows={filterRowData}
      autoHeight={true}
      getRowActions={renderRowActions}
    />
  );
};

export default React.memo(CmsMainPage);

  