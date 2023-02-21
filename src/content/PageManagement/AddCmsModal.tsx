    import React, { useState } from 'react';
    import { Grid, makeStyles, useTheme } from '@material-ui/core';
    import { t } from 'i18next';
    import { toast } from 'react-hot-toast';
    import { DialogComp, MuiTabComponent } from 'src/components';
    import DualActionButton from 'src/components/DualActionButton';
    import {  HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
    import { useEdit } from 'src/hooks/useEdit';
    import { API_SERVICES } from 'src/Services';
    import FaqInputContent from './FaqInputContent';
import CmsInputContent from './CmsInputContent';
    
    
    const useStyles = makeStyles((theme) => ({
      title: {
        fontWeight: theme.fontWeight.bold,
        alignItems: 'center'
      },
      selectedTab: {
        fontWeight: theme.fontWeight.bold,
        color: theme.Colors.secondary
      },
      dialogPaper: {
        width: 847,
        padding: theme.spacing(2, 1, 2, 5),
        borderRadius: 18
      }
    }));
    
    type Props = {
      handleClose?: () => void;
      rowData?: any;
      updateData?: () => void;
      type?: string;
      categories?: any[];
      onCreateOrEditCmsButtonClick?: ()=>void;
      types:any,
    };
    const AddCmsModal = ({
        handleClose,
      rowData,
      type,
      types,
      updateData,
    }: Props) => {
      const classes = useStyles();
      const theme = useTheme();
      const [selected, setSelected] = useState(1);
      const [isError, setIsError] = useState<boolean>(false);
    
      const getName = (lanID: number) => {
        let data =
          rowData?.cms_language?.length &&
          rowData?.cms_language?.filter(
            (item) => item.language_id === lanID
          );
        return data?.length && data[0].name;
      };
    
      const getPageTitle = (lanID: number) => {
        let data =
          rowData?.cms_language?.length &&
          rowData?.cms_language?.filter(
            (item) => item.language_id === lanID
          );
        return data?.length && data[0].page_title;
      };

      const getKeywords = (lanID: number) => {
        let data =
          rowData?.cms_language?.length &&
          rowData?.cms_language?.filter(
            (item) => item.language_id === lanID
          );
        return data?.length && data[0].key_words;
      };

      const getDescription = (lanID: number) => {
        let data =
          rowData?.cms_language?.length &&
          rowData?.cms_language?.filter(
            (item) => item.language_id === lanID
          );
        return data?.length && data[0].description;
      };

      const getPageContent = (lanID: number) => {
        let data =
          rowData?.cms_language?.length &&
          rowData?.cms_language?.filter(
            (item) => item.language_id === lanID
          );
        return data?.length && data[0].page_content;
      };      
    
      const initialValues = {
        nameEnglish: getName(LANGUAGE_ID.english) || '',
        nameHindi: getName(LANGUAGE_ID.hindi) || '',
        nameGujarati: getName(LANGUAGE_ID.gujarati) || '',
        titleEnglish: getPageTitle(LANGUAGE_ID.english) || '',
        titleHindi: getPageTitle(LANGUAGE_ID.hindi) || '',
        titleGujarati: getPageTitle(LANGUAGE_ID.gujarati) || '',
        keywordsEnglish: getKeywords(LANGUAGE_ID.english) || '',
        keywordsHindi: getKeywords(LANGUAGE_ID.hindi) || '',
        keywordsGujarati: getKeywords(LANGUAGE_ID.gujarati) || '',
        descriptionEnglish: getDescription(LANGUAGE_ID.english) || '',
        descriptionHindi: getDescription(LANGUAGE_ID.hindi) || '',
        descriptionGujarati: getDescription(LANGUAGE_ID.gujarati) || '',
        pageEnglish: getPageContent(LANGUAGE_ID.english) || '',
        pageHindi: getPageContent(LANGUAGE_ID.hindi) || '',
        pageGujarati: getPageContent(LANGUAGE_ID.gujarati) || '',
        sort_no: rowData?.cms.sort_no ?? '',
        status: rowData?.cms?.status ?? 1,
      };

      const edit = useEdit(initialValues);
    
      const RequiredFields = [
        'nameEnglish',
        'titleEnglish',
        'pageEnglish',
        'sort_no',
      ];
    
      const tabs = [
        {
          label: 'English',
          id: 1
        }/* ,
        {
          label: 'Hindi',
          id: 2
        },
        {
          label: 'Gujarati',
          id: 3
        } */
      ];
    
      const handleCreateOrEdit = async () => {
        try {
          let uData = {
            sort_no: edit.getValue('sort_no'),
            status: edit.getValue('status'),
            language_details: [
              {
                language_id: 1,
                name : edit.getValue('nameEnglish'),
                page_title : edit.getValue('titleEnglish'),
                key_words : edit.getValue('keywordsEnglish'),
                description : edit.getValue('descriptionEnglish'),
                page_content : edit.getValue('pageEnglish')           

              },
              {
                language_id: 2,
                name : edit.getValue('nameHindi'),
                page_title : edit.getValue('titleHindi'),
                key_words : edit.getValue('keywordsHindi'),
                description : edit.getValue('descriptionHindi'),
                page_content : edit.getValue('pageHindi')   
              },
              {
                language_id : 3,
                name : edit.getValue('nameGujarati'),
                page_title : edit.getValue('titleGujarati'),
                key_words : edit.getValue('keywordsGujarati'),
                description : edit.getValue('descriptionGujarati'),
                page_content : edit.getValue('pageGujarati') 
              }
            ]
          };
          if (!edit.allFilled(...RequiredFields)) {
            setIsError(true);
            return toast.error('Please fill all the required fields');
          }
    
          let response: any;
          if (types[type].handleType === 1) {
            response = await API_SERVICES.pageManagementService.createCms({
              data: uData,
              successMessage: 'New CMS Added successfully!',
              failureMessage: 'Sort Number already Exist'
            });
          } else if (types[type].handleType === 2) {
            response = await API_SERVICES.pageManagementService.updateCms(
              rowData?.cms?.id,
              {
                data: uData,
                successMessage: 'CMS updated successfully!',
                failureMessage: 'Sort Number already Exist'
              }
            );
          }
          if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
            handleClose();
            updateData();
          }
        } catch (err) {
          toast.error(err?.message);
        }
      };
    
      const handleChangeTab = (value) => {
        setSelected(value);
      };
    
      const renderTab = (tabValue) => {
        return (
            <CmsInputContent 
                edit={edit}
                tabValue={tabValue}
                isError={isError}
            />
        );
      };
      const renderDialogContent = () => {
        return (
          <Grid container>
            <MuiTabComponent
              currentTabVal={selected}
              tabContent={tabs}
              tabIndicatorColor={theme.Colors.secondary}
              renderTabContent={renderTab}
              onTabChange={handleChangeTab}
              tabClasses={{
                selected: classes.selectedTab
              }}
            />
          </Grid>
        );
      };
    
    
      const renderAction = () => {
        return (
          <Grid container justifyContent="center">
            <DualActionButton
              onLeftButtonClick={handleClose}
              onRightButtonClick={handleCreateOrEdit}
              buttonText={
                 types[type].handleType === 2 ? t('save') :  t('button.create')
              }
            />
          </Grid>
        );
      };
    
      return (
        <DialogComp
          dialogTitle={
             types[type].handleType === 2
              ? t('Page.editCms'): 
               t('Page.addNewCms')
          }
          open={true}
          dialogClasses={{ paper: classes.dialogPaper }}
          dialogTitleStyle={{
            color: theme.Colors.blackMedium
          }}
          onClose={handleClose}
          renderDialogContent={renderDialogContent}
          renderAction={renderAction}
        />
      );
    };
    
    export default AddCmsModal;
    