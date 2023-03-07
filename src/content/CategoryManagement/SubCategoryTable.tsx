import React, { memo, useState, useEffect } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { CheckStatus, Loader } from 'src/components';
import MuiTable from 'src/components/MuiTable';
import { ListItemCell } from 'src/components';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineSharp, EditOutlined, ListAlt } from '@material-ui/icons';
import MultipleSelectComp from 'src/components/MultipleSelectComp';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import { toast } from 'react-hot-toast';
import { useEdit } from 'src/hooks/useEdit';

type Props = {
  handleViewSubCategory?: (row?: any, selIds?: number[]) => void;
  handleDeleteCategory?: (row: any) => void;
  handleEditCategory?: (row: any) => void;
  tableRowData?: any[];
  updateData?: () => void;
  categoryData?: any[];
};

const SubCategoryTable = ({
  handleViewSubCategory,
  handleEditCategory,
  handleDeleteCategory,
  tableRowData,
  updateData,
  categoryData
}: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [rowItems, setRowItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const initialValues = {
    category_name: '',
    category_Id: 0
  };
  const edit = useEdit(initialValues);

  const columns = [
    {
      field: 'id',
      headerName: 'SubCategory Id',
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.sub_category_id} />
    },
    {
      field: 'sub_category_name',
      headerName: 'Sub Category',
      flex: 1.4,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => {
        return <Typography>{row?.sub_category_name}</Typography>;
      }
    },
    {
      field: 'sort_no',
      headerName: t('Category.sortNo'),
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.sort_no} />
    },
    {
      field: 'parent_category',
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderHeader: () => (
        <MultipleSelectComp
          isPlaceholderNone
          selectItems={
            categories.length &&
            categories?.map((item: any) => ({
              label: item.category_name,
              value: item.category_id
            }))
          }
          displayEmpty
          renderValue={(value: any) => (value ? value : 'Parent Category')}
          value={edit.getValue('category_name')}
          onChange={(e) => {
            if (!e.target.value) {
              edit.update({
                category_name: '',
                category_Id: 0
              });
              return;
            }
            let categoryName = categories.filter((item) => {
              return item.category_id === Number(e.target.value);
            })[0].category_name;
            edit.update({
              category_name: categoryName,
              category_Id: Number(e.target.value)
            });
          }}
          borderColor={theme.Colors.white}
        />
      ),
      renderCell: ({ row }) => <ListItemCell title={row?.category_name} />
    },
    {
      field: 'Status',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <CheckStatus
          Value={row.status == 1 ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    }
  ];

  const onChangeActive = async (row) => {
    const statusId = row?.status == 2 ? 1 : 2;
    try {
      let response: any =
        await API_SERVICES.categoryManagementService.updateSubCategory(
          row?.sub_category_id,
          {
            data: { status: statusId },
            successMessage:
              row?.status === 1
                ? 'SubCategory Inactive successfully!'
                : 'SubCategory Active Successfully'
          }
        );

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const renderRowActions = () => {
    return [
      {
        text: t('view'),
        onClick: (rowData) => handleViewSubCategory(rowData),
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
    if (categoryData?.length) {
      setCategories(categoryData);
    } else {
      setCategories([]);
    }
    setLoading(false);
  }, [tableRowData, categoryData]);

  const filteredSubCategories: any = React.useMemo(() => {
    if (!edit.getValue('category_Id')) {
      return rowItems;
    }
    return rowItems.filter(
      (list) => list.category_id === edit.getValue('category_Id')
    );
  }, [rowItems, edit.edits]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <MuiTable
        title={'SubCategory Details'}
        columns={columns}
        rows={filteredSubCategories}
        autoHeight={true}
        getRowActions={renderRowActions}
      />
    );
  }
};
export default memo(SubCategoryTable);
