import React, { useEffect, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import { makeStyles, useTheme } from '@material-ui/core';
import { ButtonComp, ListItemCell } from 'src/components';
import { useTranslation } from 'react-i18next';
import { ListAlt } from '@material-ui/icons';

type Props = {
  payoutData?: any[];
  loading?: boolean;
  handleViewPayout?: (row: any) => void;
  handleViewInstructorPayout?: (row: any) => void;
};

const useStyles = makeStyles(() => ({
  percentage: {
    height: 15,
    width: 15
  }
}));

const InstructorUpdateTable = ({
  payoutData,
  handleViewInstructorPayout,
  handleViewPayout,
  loading = false
}: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState([]);

  const columns = [
    {
      field: 'name',
      headerName: 'Instructor Name',
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.mentor_name} />
    },
    {
      field: 'pendingPayout',
      headerName: 'Pending Payout',
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.pending_payout} />
    },
    {
      field: 'completedPayout',
      headerName: 'Completed Payout',
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.completed_payout} />
    },
    {
      field: 'payoutDate',
      headerName: 'Payout Date',
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.payout_date} />
    },
    {
      field: 'action',
      headerName: t('course.action'),
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <ButtonComp
          btnBorderRadius={theme.MetricsSizes.regular_x}
          buttonText={t('payout.view')}
          buttonFontSize={theme.MetricsSizes.small_x}
          btnWidth={theme.spacing(11)}
          backgroundColor={theme.Colors.secondary}
          height={theme.MetricsSizes.medium}
          onClickButton={() => handleViewInstructorPayout(row)}
        />
      )
    }
  ];

  const renderRowActions = () => {
    return [
      {
        text: t('view'),
        onClick: (rowData) => handleViewPayout(rowData),
        renderIcon: () => <ListAlt />
      }
    ];
  };

  const onSelectionModelChange = (e) => {
    console.log('e model', e);
  };
  useEffect(() => {
    setRowItems(payoutData);
  }, [payoutData]);

  return (
    <MuiTable
      columns={columns}
      rows={rowItems}
      loading={loading}
      checkboxSelection={true}
      disableSelectionOnClick={true}
      autoHeight={true}
      hideFooterPagination={true}
      getRowActions={renderRowActions}
      onSelectionModelChange={onSelectionModelChange}
    />
  );
};

export default React.memo(InstructorUpdateTable);
