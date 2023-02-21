import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import { cmsIcon, faqIcon } from 'src/Assets/Images';
import CmsMainPage from './CmsMainPage';
import FaqMainPage from './FaqMainPage';
import { ButtonComp, Heading, MuiConfirmModal } from 'src/components';
import {
    CONFIRM_MODAL,
    DETECT_LANGUAGE,
    HTTP_STATUSES
  } from 'src/Config/constant';
  import toast from 'react-hot-toast';
  import { AddCircleOutline } from '@material-ui/icons';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';
import AddCmsModal from './AddCmsModal';
import AddFaqModal from './AddFaqModal';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import { API_SERVICES } from 'src/Services';
import ViewFaqModal from './ViewFaqModal';
import ViewCmsModal from './ViewCmsModal';

const useStyles = makeStyles((theme) => ({
    headingStyle: {
      paddingLeft: theme.spacing(2.5)
    }
  }));

  

const PageManagement = () =>{

    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [viewFaqModalOpen, setViewFaqModalOpen] = useState<any>({ open: false });
    const [viewCmsModalOpen, setViewCmsModalOpen] = useState<any>({ open: false });
    const [openAddCMSModal , setOpenAddCmsModal ] = useState<any>({ open: false });
    const [openAddFAQModal , setOpenAddFaqModal ] = useState<any>({ open: false });
    const [confirmModal, setConfirmModal] = useState<any>({ open: false });
    const [ faqData ,setFaqData ] = useState([]);
    const [ cmsData ,setCmsData ] = useState([]);
    const { searchValue } = useSearchVal();
    const debValue = useDebounce(searchValue, 1000);

    const types = {
        [CONFIRM_MODAL.create]: {
          handleType: 1
        },
        [CONFIRM_MODAL.edit]: {
          handleType: 2
        }
      };
    
    const PageManagementTabValues = [
        {
          heading: t('cms'),
          subText: "",
          iconImage: cmsIcon,
          value: 0
        },
        {
          heading: t('faq'),
          subText: "",
          iconImage: faqIcon,
          value: 1
        }
      ];

      const [selectedTab, setSelectedTab] = useState<string | number>(
        PageManagementTabValues[0].value
    );

    const handleSelectedTab = (value: number | string) => {
        setSelectedTab(value);
      };

    function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && <>{children}</>;
    }

    const fetchData = useCallback( async ()  => {
        try{
            setLoading(true);
            setCmsData([]);
            setFaqData([]);
            let getLanguageId = DETECT_LANGUAGE[i18n.language];
            let params: any = {};
            if (debValue !== '') {
                params.searchString = debValue;
            }
            const response: any = await Promise.all([
                API_SERVICES.pageManagementService.getAllFaq(
                  getLanguageId,
                  params
                ),       
                API_SERVICES.pageManagementService.getAllCms(
                  getLanguageId,
                  params
                ),           
            ]);

            if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
                if (response[0]?.data?.faq?.length) {
                setFaqData(response[0]?.data?.faq);
             }
            }

            if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
              if (response[1]?.data?.cms?.length) {
              setCmsData(response[1]?.data?.cms);
           }
          }
        }
        catch{

        }
        finally {
            setLoading(false);
        }

    }, [debValue]);

    const onCreateOrEditCmsButtonClick = useCallback(
      async (rowData?: any, type?: string) => {
        try {
          if (type === CONFIRM_MODAL.edit) {
              const response: any =
                await API_SERVICES.pageManagementService.getCmsById(
                  rowData?.cms_id
                );
              if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
                {
                  setOpenAddCmsModal({
                    open: true,
                    rowData: response.data,
                    type: type,
                    types : types,                      
                  });
                }
              }
              return;
            }
            setOpenAddCmsModal({ open: true, type: type , types : types});
          
        } catch (e) {
          toast.error(e);
        }
      },
      []
      );

    const onCreateOrEditFaqButtonClick = useCallback(
        async (rowData?: any, type?: string) => {
          try {
            if (type === CONFIRM_MODAL.edit) {
                const response: any =
                  await API_SERVICES.pageManagementService.getFaqById(
                    rowData?.faq_id
                  );
                if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
                  {
                    setOpenAddFaqModal({
                      open: true,
                      rowData: response.data,
                      type: type,
                      types : types,                      
                    });
                  }
                }
                return;
              }
              setOpenAddFaqModal({ open: true, type: type , types : types});
            
          } catch (e) {
            toast.error(e);
          }
        },
        []
      );

      const onDeleteFaq  = async (rowData?: any) => {
        
        const onCancelClick = () => {
            setConfirmModal({ open: false });
          };
          const onConfirmClick = async () => {
            const deleteFaq: any =
              await API_SERVICES.pageManagementService.deleteFaq(
                rowData?.id,
                {
                  successMessage: 'FAQ Deleted Successfully',
                  failureMessage: 'This FAQ could not be deleted'
                }
              );
            if (deleteFaq?.status < HTTP_STATUSES.BAD_REQUEST) {
              onCancelClick();
              fetchData();
            }
          };
          let props = {
            color: theme.Colors.redPrimary,
            description: 'Are you sure want to delete this FAQ?',
            title: t('delete'),
            iconType: CONFIRM_MODAL.delete
          };
          setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
        };

        const onDeleteCms  = async (rowData?: any) => {
        
          const onCancelClick = () => {
              setConfirmModal({ open: false });
            };
            const onConfirmClick = async () => {
              const deleteCms: any =
                await API_SERVICES.pageManagementService.deleteCms(
                  rowData?.id,
                  {
                    successMessage: 'CMS Deleted Successfully',
                    failureMessage: 'This CMS could not be deleted'
                  }
                );
              if (deleteCms?.status < HTTP_STATUSES.BAD_REQUEST) {
                onCancelClick();
                fetchData();
              }
            };
            let props = {
              color: theme.Colors.redPrimary,
              description: 'Are you sure want to delete this CMS?',
              title: t('delete'),
              iconType: CONFIRM_MODAL.delete
            };
            setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
          };
  

        const onViewFaq  = async (rowData?: any) => {        
            setViewFaqModalOpen({ open: true, rowData: rowData });
        };

        const onViewCms  = async (rowData?: any) => {        
          setViewCmsModalOpen({ open: true, rowData: rowData });
      };

        useEffect(() => {
        fetchData();
        }, [fetchData]);

    return (
      <> <TabPanel value={selectedTab} index={0}>
        <Heading headingText={t('Page.cmsManagement')} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
        <Heading headingText={t('Page.faqManagement')} />
        </TabPanel>
        <Grid item className={classes.headingStyle}>
          <TabPanel value={selectedTab} index={0}>
            <ButtonComp
              buttonText={t('Page.addNewCMS')}
              onClickButton={() =>
                onCreateOrEditCmsButtonClick({}, CONFIRM_MODAL.create)
              }
              backgroundColor={theme.Colors.primary}
              height="33px"
              buttonFontSize={theme.MetricsSizes.tiny_xxx}
              buttonTextColor={theme.Colors.white}
              buttonFontWeight={theme.fontWeight.medium}
              btnWidth={'fit-content'} 
              btnBorderRadius={100}
              endIcon={<AddCircleOutline fontSize="small" /> }
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <ButtonComp
              buttonText={t('Page.addNewFAQ')}
              onClickButton={() =>
                onCreateOrEditFaqButtonClick({}, CONFIRM_MODAL.create)
              }
              backgroundColor={theme.Colors.primary}
              height="33px"
              buttonFontSize={theme.MetricsSizes.tiny_xxx}
              buttonTextColor={theme.Colors.white}
              buttonFontWeight={theme.fontWeight.medium}
              btnWidth={'fit-content'} 
              btnBorderRadius={100}
              endIcon={<AddCircleOutline fontSize="small" />}
            />
          </TabPanel>
        </Grid>
        <ContentDisplayTiles
          displayContent={PageManagementTabValues}
          isTileTypeOrders={false}
          onTabChange={handleSelectedTab}
          tabValue={selectedTab}
        />
        <Box sx={{ mt: 3 }}>
            <TabPanel value={selectedTab} index={0}>
                <CmsMainPage 
                    tableData = {cmsData}
                    handleEditCms = {(rowData) =>
                        onCreateOrEditCmsButtonClick(rowData, CONFIRM_MODAL.edit)
                      }
                    handleDeleteCms = {onDeleteCms}
                    handleViewCms = {onViewCms}                   
                    fetchData = {fetchData}
                />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <FaqMainPage 
                    tableData = {faqData}
                    handleEditFaq = {(rowData) =>
                        onCreateOrEditFaqButtonClick(rowData, CONFIRM_MODAL.edit)
                      }
                    handleDeleteFaq = {onDeleteFaq}
                    handleViewFaq = {onViewFaq}                   
                    fetchData = {fetchData}
                />
            </TabPanel>
        </Box>
        {viewFaqModalOpen.open && (
            <ViewFaqModal
                onClose={() => setViewFaqModalOpen({ open: false })}
                {...viewFaqModalOpen}
            />
        )}

        {viewCmsModalOpen.open && (
            <ViewCmsModal
                onClose={() => setViewCmsModalOpen({ open: false })}
                {...viewCmsModalOpen}
            />
        )}


        {confirmModal.open && <MuiConfirmModal {...confirmModal} />}
        {openAddCMSModal.open && (
          <AddCmsModal
            handleClose={() => setOpenAddCmsModal({ open: false })}
            updateData={fetchData}
            {...openAddCMSModal}
          />
        )}
        {openAddFAQModal.open && (
          <AddFaqModal
            handleClose={() => setOpenAddFaqModal({ open: false })}
            updateData={fetchData}
            {...openAddFAQModal}
          />
        )}
      </>
    );
  }
  
  export default PageManagement;
  