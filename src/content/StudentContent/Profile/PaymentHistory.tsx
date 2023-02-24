import { IconButton, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { ListItemCell } from 'src/components';
import MuiTable from 'src/components/MuiTable';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Grid, Typography, useTheme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiChip-root': {
      borderRadius: 4
    }
  }
}));

const rows = [
  {
    id: 1,
    invoiceId: 1,
    particular: 'Course: Basics of stock market',
    status: 'paid',
    dateOfPayment: '01/02/2023',
    amount: 200
  },
  {
    id: 2,
    invoiceId: 1,
    particular: 'Workshop: Basics of stock market',
    status: 'paid',
    dateOfPayment: '01/02/2023',
    amount: 200
  },
  {
    id: 3,
    invoiceId: 1,
    particular: 'Hi',
    status: 'Completed',
    dateOfPayment: '01/02/2023',
    amount: 200
  },
  {
    id: 4,
    invoiceId: 1,
    particular: 'Hi',
    status: 'paid',
    dateOfPayment: '01/02/2023',
    amount: 34000
  }
];

const PaymentHistory = () => {
  const classes = useStyles();
  const theme = useTheme();
  const getBackgroundColor = (status) => {
    if (status === 'paid') {
      let background = 'rgba(60, 200, 120, 0.2)';
      let color = '#3CC878';
      return { background, color };
    } else {
      let background = 'rgba(255, 120, 60, 0.2)';
      let color = '#FF783C';
      return { background, color };
    }
  };
  const columns = [
    {
      field: 'invoiceId',
      headerName: 'Invoice id',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={`#${row?.invoiceId}`} />
    },
    {
      field: 'particular',
      headerName: 'Particulars',
      flex: 2.8,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.particular} />
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Grid className={classes.root}>
          <ChipComp
            label={row?.status}
            style={{
              backgroundColor: getBackgroundColor(row?.status).background,
              borderColor: 'transparent',
              color: getBackgroundColor(row?.status).color
            }}
          />
        </Grid>
      )
    },
    {
      field: 'dateOfPayment',
      headerName: 'Date of payment',
      flex: 1.5,
      renderCell: ({ row }) => <ListItemCell title={row?.dateOfPayment} />
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={`${row?.amount}`} />
    },
    {
      field: 'invoice',
      headerName: 'Invoice',
      flex: 1,
      renderCell: ({ row }) => (
        <IconButton style={{ color: '#3C78F0' }}>
          <GetAppIcon fontSize="small" />
        </IconButton>
      )
    }
  ];
  return (
    <Grid
      item
      container
      sx={{
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      }}
    >
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 500,
          fontFamily: 'IBM Plex Serif',
          color: '#3C414B',
          paddingBottom: 5
        }}
      >
        Payment history
      </Typography>
      <MuiTable
        columns={columns}
        rows={rows}
        autoHeight={true}
        hideFooterPagination={true}
      />
    </Grid>
  );
};

export default PaymentHistory;
