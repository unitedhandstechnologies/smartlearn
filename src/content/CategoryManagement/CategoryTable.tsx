import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CheckStatus } from 'src/components';
import MuiTable from 'src/components/MuiTable';
import { ListItemCell } from 'src/components';
import { getDateFormat } from 'src/Utils';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineSharp, EditOutlined, ListAlt } from '@material-ui/icons';
import { HTTP_STATUSES, LANGUAGE_ID, LANGUAGE_NAME } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';

type Props = {
  onClickActionButton?: (row?: any, selIds?: number[]) => void;
  handleDeleteCategory?: (row: any) => void;
  handleEditCategory?: (row: any) => void;
  handleViewCategory?: (row: any) => void;
  tableRowData?: any[];
  fetchData?: any;
};

const CategoryTable = ({
  handleEditCategory,
  handleDeleteCategory,
  handleViewCategory,
  tableRowData,
  fetchData
}: Props) => {
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState([]);

  const onChangeActive = async (row) => {
    const statusId = row?.status == 2 ? 1 : 2;
    try {
      let response: any =
        await API_SERVICES.categoryManagementService.updateCategory(
          row.category_id,
          {
            data: { status: statusId },
            successMessage:
              row?.status === 1
                ? 'Category Inactive successfully!'
                : 'Category Active Successfully'
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
      field: 'category_name',
      headerName: t('Category.categoryName'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell
          avatarImg={row?.image_url}
          title={row?.category_name}
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
      field: 'id',
      headerName: t('Category.categoryCode'),
      flex: 1.4,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => {
        return (
          <Grid>
            <Typography>{row?.id}</Typography>
          </Grid>
        );
      }
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
    },
    {
      field: 'updated_at',
      headerName: t('date'),
      flex: 1.4,
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
    }
  ];

  const languageChange = (id) => {
    if (id === LANGUAGE_ID.english) {
      return LANGUAGE_NAME[1];
    } else if (id === LANGUAGE_ID.hindi) {
      return LANGUAGE_NAME[2];
    } else {
      return LANGUAGE_NAME[3];
    }
  };

  const renderRowActions = () => {
    return [
      {
        text: t('view'),
        onClick: (rowData) => handleViewCategory(rowData),
        renderIcon: () => <ListAlt />
      },
      {
        text: t('edit'),
        onClick: (rowData) => handleEditCategory(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('delete'),
        onClick: (rowData) => handleDeleteCategory(rowData),
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  useEffect(() => {
    if (tableRowData?.length) {
      setRowItems(tableRowData);
    } else {
      setRowItems([]);
    }
  }, [tableRowData]);

  return (
    <MuiTable
      title={t('Category.categoryDetails')}
      columns={columns}
      rows={rowItems}
      autoHeight={true}
      getRowActions={renderRowActions}
    />
  );
};

export default React.memo(CategoryTable);
