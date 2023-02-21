import React, { useEffect, useMemo, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import { useTheme } from '@material-ui/core';
import ButtonComp from '../../components/ButtonComp/index';
import { CheckStatus, ListItemCell } from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { HTTP_STATUSES, STATUS_ID } from 'src/Config/constant';
import { DeleteOutlineSharp, Done, EditOutlined } from '@material-ui/icons';

import { API_SERVICES } from 'src/Services';
import MultipleSelectComp from 'src/components/MultipleSelectComp';
import { useEdit } from 'src/hooks/useEdit';

type Props = {
  tableData?: any[];
  onClickViewButton?: (row: any) => void;
  onClickAcceptOrRejectMentor?: (row: any, statusId) => void;
  onDeleteMentor?: (row: any) => void;
  updateData?: () => void;
  handleEditCategory?: (row: any) => void;
  selectedTabVal?: number | string;
  loading?: boolean;
};

const InstructorManagementTable = ({
  tableData,
  onDeleteMentor,
  onClickAcceptOrRejectMentor,
  onClickViewButton,
  handleEditCategory,
  updateData,
  selectedTabVal,
  loading = false
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState([]);

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
          ? 'Mentor Inactive successfully!'
          : 'Mentor Active successfully'
    });
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      updateData();
    }
  };

  const statusFilter = [
    {
      id: 2,
      value: 'enabled'
    },
    {
      id: 3,
      value: 'disabled'
    }
  ];

  const columns: any = [
    {
      field: 'first_name',
      headerName: t('name'),
      flex: 2,
      sortable: true,
      disableColumnMenu: false,
      renderCell: ({ row }) => (
        <ListItemCell
          avatarImg={row?.image_url}
          title={row?.name ?? `${row?.first_name} ${row?.last_name}`}
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
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.email_id} />
    },
    {
      field: 'phone_number',
      headerName: t('phoneNumber'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.phone_number} />
    },
    {
      field: 'created_at',
      headerName: t('date'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        const { getMonth, getDate, getYear, getTime } = getDateFormat(
          row.created_at
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
      renderCell: ({ row }) => (
        <ButtonComp
          btnBorderRadius={theme.MetricsSizes.regular_x}
          buttonText={t('button.view')}
          buttonFontSize={theme.MetricsSizes.small_x}
          btnWidth={theme.spacing(9)}
          backgroundColor={theme.Colors.secondary}
          height={theme.MetricsSizes.medium}
          onClickButton={() => onClickViewButton(row)}
        />
      )
    }
  ];

  useEffect(() => {
    if (tableData?.length) {
      setRowItems(tableData);
    } else {
      setRowItems([]);
    }
  }, [tableData]);

  const getColumns = useMemo(() => {
    if (selectedTabVal === 1) {
      columns.push({
        field: 'status_id',
        headerName: t('course.status'),
        flex: 2,
        sortable: false,
        disableColumnMenu: true,
        headerAlign: 'left',
        renderHeader: () => (
          <MultipleSelectComp
            isPlaceholderNone
            selectItems={
              statusFilter.length &&
              statusFilter?.map((item: any) => ({
                label: item.value,
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
              })[0].value;
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
            Value={row?.status_id === 2 ? true : false}
            onClick={() => onChangeActive(row)}
          />
        )
      });
    }
    return columns;
  }, [selectedTabVal, edit.edits]);

  const filterRowData = useMemo(() => {
    if (selectedTabVal === 1) {
      if (!edit.getValue('status_id')) {
        return rowItems;
      }
      return rowItems.length
        ? rowItems.filter(
            (item) => item.status_id === edit.getValue('status_id')
          )
        : [];
    } else return rowItems;
  }, [rowItems, selectedTabVal, edit.edits]);

  const renderRowAction = (rowData) => {
    if (rowData.status_id === 1) {
      return [
        {
          text: t('accept'),
          onClick: (rowData) =>
            onClickAcceptOrRejectMentor(rowData, STATUS_ID.Accepted),
          renderIcon: () => <Done />
        },
        {
          text: t('edit'),
          onClick: (rowData) => handleEditCategory(rowData),
          renderIcon: () => <EditOutlined />
        },
        {
          text: t('delete'),
          onClick: (rowData) => onDeleteMentor(rowData),
          renderIcon: () => <DeleteOutlineSharp />
        }
      ];
    } else if (rowData.status_id === 2) {
      return [
        {
          text: t('edit'),
          onClick: (rowData) => handleEditCategory(rowData),
          renderIcon: () => <EditOutlined />
        },
        {
          text: t('delete'),
          onClick: (rowData) => onDeleteMentor(rowData),
          renderIcon: () => <DeleteOutlineSharp />
        }
      ];
    }
    return [];
  };

  return (
    <MuiTable
      columns={getColumns}
      rows={filterRowData}
      //checkboxSelection={true}
      disableSelectionOnClick={true}
      autoHeight={true}
      hideFooterPagination={true}
      getRowActions={renderRowAction}
      loading={loading}
    />
  );
};

export default React.memo(InstructorManagementTable);
