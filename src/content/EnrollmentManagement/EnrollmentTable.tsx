import React, { useEffect, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ButtonComp from '../../components/ButtonComp/index';
import { ListItemCell, TextInputComponent } from 'src/components';
import { getDateFormat } from 'src/Utils';
import { useTranslation } from 'react-i18next';
import { ListAlt } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({}));

type Props = {
  onClickActionButton?: (row?: any) => void;
  tableRowData?: any[];
  renderActionBtn?: boolean;
  column?: any;
};

const EnrollmentTable = ({ onClickActionButton, tableRowData }: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [rowItems, setRowItems] = useState([]);
  const [sortData, setSortData] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns = [
    {
      field: 'user_name',
      headerName: t('studentName'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.user_name} />
    },
    {
      field: 'course_name',
      headerName: t('enrollmentCourse'),
      flex: 1.9,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.course_name} />
    },
    {
      field: 'category_name',
      headerName: t('category'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      style: { whiteSpace: 'unset' },
      renderCell: ({ row }) => <ListItemCell title={row?.category_name} />
    },
    {
      field: 'sub_category_name',
      headerName: t('subCategory'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      style: { whiteSpace: 'unset' },
      renderCell: ({ row }) => <ListItemCell title={row?.sub_category_name} />
    },
    {
      field: 'mentor_name',
      headerName: t('instructorName'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      style: { whiteSpace: 'unset' },
      renderCell: ({ row }) => <ListItemCell title={row?.mentor_name} />
    },

    {
      field: 'amount',
      headerName: t('amount'),
      flex: 1.2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.amount} />
    },
    {
      field: 'enrolled_date',
      headerName: t('enrolledDate'),
      flex: 2,
      sortable: true,
      disableColumnMenu: false,
      // renderHeader: () => (
      //   <TextInputComponent
      //   defaultValue={t('enrolledDate')}
      //   type="date"
      //   borderColor={theme.Colors.white}
      //   />
      // ),
      renderCell: ({ row }) => {
        return (
          <ListItemCell
            title={row.enrolled_date}
            //subTitle={getTime}
          />
        );
      }
    }
  ];
  const renderRowActions = () => {
    return [
      {
        text: t('button.view'),
        onClick: (rowData) => onClickActionButton(rowData),
        renderIcon: () => <ListAlt />
      }
    ];
  };

  const onGetSelectedRows = (selectedIDs: number[]) => {
    setSelectedRows(selectedIDs);
  };
  useEffect(() => {
    setRowItems(tableRowData);
  }, [tableRowData]);

  return (
    <MuiTable
      title={t('enrollmentHistory')}
      columns={columns}
      rows={rowItems}
      autoHeight={true}
      onSelectionModelChange={onGetSelectedRows}
      getRowActions={renderRowActions}
    />
  );
};

export default React.memo(EnrollmentTable);
