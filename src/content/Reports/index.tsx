import { useEffect, useCallback, useContext } from 'react';
import { useState } from 'react';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import {
  NewOrder,
  ListIcon,
  DownloadIcon,
  LineBarIcon
} from 'src/Assets/Images';
import toast from 'react-hot-toast';
import { Heading, Loader } from 'src/components';
import { Box, useTheme } from '@material-ui/core';
import { HTTP_STATUSES, USER_TYPE_ID } from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { API_SERVICES } from 'src/Services';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import { useNavigate } from 'react-router';
import InstructorReportsTable from './InstructorReportsTable';
import InstructorModal from './InstructorModal';
import { UserInfoContext } from 'src/contexts/UserContext';
import { Grid } from '@mui/material';

function AdminDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string | number>(0);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [tableData, setTableData] = useState([]);
  const navigateTo = useNavigate();
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);
  const { userDetails } = useContext(UserInfoContext);

  const handleSetSelectedTab = (value) => {
    setSelectedTab(value);
  };
  const reportMentor = tableData.filter((item) => {
    return item.mentor_id === userDetails.id;
  });
  const onClickViewReportsdetails = (rowData: any) => {
    setModalOpen({ open: true, rowData: rowData });
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setTableData([]);
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any =
        await API_SERVICES.instructorReportsService.getAllInstructorReports(
          params
        );
      console.log(response, 'response');
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.mentorPayouts?.length) {
          setTableData(response?.data?.mentorPayouts);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [debValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const overAllDetails = [
    {
      heading: t('reports.instructorReports'),
      subText: '',
      iconImage: DownloadIcon
    },
    {
      heading: t('reports.salesReport'),
      subText: '',
      iconImage: ListIcon
    },
    {
      heading: t('reports.paymentReports'),
      subText: '',
      iconImage: NewOrder
    }
  ];

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {userDetails.user_type === USER_TYPE_ID.mentors ? (
          <Grid>
            <Heading
              headingText={
                userDetails.user_type === USER_TYPE_ID.mentors
                  ? `${userDetails.first_name}'s Reports `
                  : 'Reports'
              }
              headerFontSize={'32px'}
              headerFontWeight={500}
              headingColor={'#3C414B'}
              headerFontFamily={'IBM Plex Serif'}
              style={{
                [theme.breakpoints.down('xs')]: {
                  fontSize: 15
                },
                padding: '0px 0px 20px 0px'
              }}
            />
            <Grid>
              <img src={LineBarIcon} alt="" />
            </Grid>
          </Grid>
        ) : (
          <ContentDisplayTiles
            displayContent={overAllDetails}
            isTileTypeOrders={true}
            onTabChange={handleSetSelectedTab}
            tabValue={selectedTab}
          />
        )}

        <Box sx={{ mt: 3 }}>
          <TabPanel value={selectedTab} index={0}>
            <InstructorReportsTable
              tableRowData={
                userDetails.user_type === USER_TYPE_ID.mentors
                  ? reportMentor
                  : tableData
              }
              handleViewReports={onClickViewReportsdetails}
              // handleDeleteReport={handleDeleteReport}
              // handleEditReport={(rowData) =>
              //   onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
              // }
              fetchData={fetchData}
            />
          </TabPanel>
        </Box>
        {modalOpen.open && (
          <InstructorModal
            onClose={() => setModalOpen({ open: false })}
            {...modalOpen}
          />
        )}
      </>
    );
  }
}

export default AdminDashboard;
