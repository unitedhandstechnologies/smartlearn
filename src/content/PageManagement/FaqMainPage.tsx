import React, { useEffect, useMemo, useState } from 'react';
import { CheckStatus } from 'src/components';
import MuiTable from 'src/components/MuiTable';
import { ListItemCell } from 'src/components';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineSharp, EditOutlined, ListAlt } from '@material-ui/icons';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import { useEdit } from 'src/hooks/useEdit';
import { useTheme, Typography } from '@material-ui/core';
import MultipleSelectComp from 'src/components/MultipleSelectComp';
import { RichTextInput } from 'src/components/RichTextInput';

type Props = {
  handleDeleteFaq?: (row: any) => void;
  handleEditFaq?: (row: any) => void;
  handleViewFaq?: (row: any) => void;
  tableData?: any[];
  fetchData?: any;
};

const FaqMainPage = ({
  handleEditFaq,
  handleDeleteFaq,
  handleViewFaq,
  tableData,
  fetchData
}: Props) => {
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState([]);
  const theme = useTheme();

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
        await API_SERVICES.pageManagementService.updateFaq(
          row.id,
          {
            data: { status: statusId },
            successMessage:
              row?.status === 1
                ? 'FAQ Inactive successfully!'
                : 'FAQ Active Successfully'
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
      field: 'id',
      headerName: t('Page.faqNumber'),
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (        
        <ListItemCell title={row?.id} />
      )
    }, 
    {
      field: 'faq_question',
      headerName: t('Page.faqQuestion'),
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => 
        <ListItemCell title={row?.question}
         titleStyle={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%'
        }} />
    },
    {
        field: 'faq_answer',
        headerName: t('Page.faqAnswer'),
        flex: 3,
        sortable: false,
        disableColumnMenu: true,
        disableColumnSeparator: true,
        renderCell: ({ row }) => <RichTextInput value={(row?.answer)}
        readOnly={true}
        displayToolBar={"none"} 
        heightValue = {'auto'} borderSize={'0px'}
         />
      },
    {
      field: 'sort_number',
      headerName: t('Page.sortNumber'),
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (<ListItemCell title={row?.sort_no} />)
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
          Value={row?.status === 1 ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    },
    
  ];

  const renderRowActions = () => {
    return [
      {
        text: t('view'),
        onClick: (rowData) => handleViewFaq(rowData),
        renderIcon: () => <ListAlt />
      },
      {
        text: t('edit'),
        onClick: (rowData) => handleEditFaq(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('delete'),
        onClick: (rowData) => handleDeleteFaq(rowData),
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  useEffect(() => {
    if (tableData?.length) {
      setRowItems(tableData);
    } else {
      setRowItems([]);
    }
  }, [tableData]);

  const filterRowData = useMemo(() => {
    let rowData = [...rowItems];
    if (!edit.getValue('status_id')) {
      return rowData;
    }
    return rowData.length
      ? rowData.filter((item) => item.status === edit.getValue('status_id'))
      : [];
  }, [rowItems, edit.edits]);

  return (
    <MuiTable
      title={t('Page.faqManagement')}
      columns={columns}
      rows={filterRowData}
      autoHeight={true}
      getRowActions={renderRowActions}
    />
  );
};

export default React.memo(FaqMainPage);

  