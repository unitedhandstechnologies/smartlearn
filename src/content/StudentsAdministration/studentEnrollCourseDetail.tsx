import { Grid } from '@material-ui/core';
import { ListItemCell } from 'src/components';
import MuiTable from 'src/components/MuiTable';

const StudentEnrollCourseDetails = ({ tableBody }) => {
  const columns = [
    {
      field: 'course-name',
      headerName: 'Course Name',
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.course_name} />
    },
    {
      field: 'mentor_name',
      headerName: 'Mentor Name',
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.mentor_name} />
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.amount} />
    },
    {
      field: 'level',
      headerName: 'Level',
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.level} />
    },
    {
      field: 'enrolled_date',
      headerName: 'Date',
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      disableColumnSeparator: true,
      renderCell: ({ row }) => <ListItemCell title={row?.enrolled_date} />
    }
  ];
  return (
    <Grid xs={12}>
      <MuiTable
        title={'Enrolled Course Details'}
        columns={columns}
        rows={tableBody}
        autoHeight={true}
      />
    </Grid>
  );
};
export default StudentEnrollCourseDetails;
