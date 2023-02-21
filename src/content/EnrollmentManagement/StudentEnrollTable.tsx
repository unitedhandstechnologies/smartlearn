import React, { useEffect, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import { useTheme } from '@material-ui/core/styles';
import ButtonComp from '../../components/ButtonComp/index';
import { ListItemCell } from 'src/components';
import { getDateFormat } from 'src/Utils';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineSharp, EditOutlined } from '@material-ui/icons';

type Props = {
  onClickActionButton?: (row?: any) => void;
  tableRowData?: any[];
  renderActionBtn?: boolean;
  handleDeleteCategory?: (row: any) => void;
  handleEditCategory?: (row: any) => void;
};

const StudentEnrollTable = ({
  onClickActionButton,
  tableRowData,
  handleDeleteCategory,
  handleEditCategory
}: Props) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [rowItems, setRowItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns = [
    {
      field: ' user_name',
      headerName: t('studentName'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.user_name} />
    },
    {
      field: 'course_name',
      headerName: t('enrollmentCourse'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.course_name} />
    },
    {
      field: 'level',
      headerName: t('level'),
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.level} />
    },
    {
      field: 'amount',
      headerName: t('amount'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.amount} />
    },
    {
      field: 'enrolled_date',
      headerName: t('enrollmentDate'),
      flex: 2,
      sortable: true,
      disableColumnMenu: false,
      renderCell: ({ row }) => {
        const { getMonth, getDate, getYear, getTime } = getDateFormat(
          row?.created_at
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
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <ButtonComp
            btnBorderRadius={theme.MetricsSizes.regular_x}
            buttonText={t('button.view')}
            buttonFontSize={theme.MetricsSizes.small_x}
            btnWidth={71}
            height={theme.MetricsSizes.regular_xxx}
            onClickButton={() => onClickActionButton(row)}
          />
        );
      }
    }
  ];

  const onGetSelectedRows = (selectedIDs: number[]) => {
    setSelectedRows(selectedIDs);
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
        onClick: (rowData) => handleDeleteCategory(rowData),
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };
  useEffect(() => {
    setRowItems(tableRowData);
  }, [tableRowData]);

  return (
    <MuiTable
      title={t('enrollmentStudentDetails')}
      columns={columns}
      rows={rowItems}
      autoHeight={true}
      // getRowActions={renderRowActions}
      onSelectionModelChange={onGetSelectedRows}
    />
  );
};

export default React.memo(StudentEnrollTable);
