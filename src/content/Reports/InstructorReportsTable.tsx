import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CheckStatus } from 'src/components';
import MuiTable from 'src/components/MuiTable';
import { ListItemCell } from 'src/components';
import { getDateFormat } from 'src/Utils';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineSharp, EditOutlined, ListAlt } from '@material-ui/icons';
import {
  HTTP_STATUSES,
  LANGUAGE_ID,
  LANGUAGE_NAME,
  USER_TYPE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';
import { UserInfoContext } from 'src/contexts/UserContext';

type Props = {
  onClickActionButton?: (row?: any, selIds?: number[]) => void;
  handleDeleteReports?: (row: any) => void;
  handleEditReports?: (row: any) => void;
  handleViewReports?: (row: any) => void;
  tableRowData?: any[];
  fetchData?: any;
};

const InstructorReportsTable = ({
  handleEditReports,
  handleDeleteReports,
  handleViewReports,
  tableRowData,
  fetchData
}: Props) => {
  const { t } = useTranslation();
  const [rowItems, setRowItems] = useState([]);
  const { userDetails } = useContext(UserInfoContext);

  const columns = [
    {
      field: 'mentor_name',
      headerName: t('reports.instructorName'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => (
        <ListItemCell
          title={row?.mentor_name}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        />
      )
    },
    {
      field: 'pending_payout',
      headerName: t('reports.pendingPayout'),
      flex: 1.3,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.pending_payout} />
    },
    {
      field: 'completed_payout',
      headerName: t('reports.completedPayout'),
      flex: 1.4,
      sortable: true,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => {
        return (
          <Grid>
            <Typography>{row?.completed_payout}</Typography>
          </Grid>
        );
      }
    },
    {
      field: 'payout_date',
      headerName: t('reports.payoutDate'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => {
        return (
          <Grid>
            <Typography>{row?.payout_date}</Typography>
          </Grid>
        );
      }
    }
  ];

  const renderRowActions = () => {
    return [
      {
        text: t('view'),
        onClick: (rowData) => handleViewReports(rowData),
        renderIcon: () => <ListAlt />
      },
      {
        text: t('edit'),
        onClick: (rowData) => handleEditReports(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: t('delete'),
        onClick: (rowData) => handleDeleteReports(rowData),
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
      title={
        userDetails.user_type === USER_TYPE_ID.mentors
          ? null
          : t('reports.instructorReports')
      }
      columns={columns}
      rows={rowItems}
      autoHeight={true}
      //getRowActions={renderRowActions}
      getRowActions={
        userDetails.user_type === USER_TYPE_ID.mentors ? null : renderRowActions
      }
    />
  );
};

export default React.memo(InstructorReportsTable);
