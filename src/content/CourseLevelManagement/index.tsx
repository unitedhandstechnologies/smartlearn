import { useTheme } from '@material-ui/core';
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonComp, Heading, Loader } from 'src/components';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { toast } from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
} from 'src/Config/constant';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import CourseLevelTable from './CourseLevelTable';
import AddNewCourseLevelModal from './AddNewCourseLevelModal';
import CourseLevelViewModal from './CourseLevelViewModal';

function CourseLevelManagement() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 1000);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [viewModal, setViewModal] = useState<any>({ open: false });

  const onClickViewOrder = useCallback((rowData: any) => {
    setViewModal({ open: true, rowData: rowData });
  }, []);

  const onCreateOrEditButtonClick = useCallback(
    async (rowData?: any, type?: string) => {
      try {
        if (type === CONFIRM_MODAL.edit) {
          const response: any =
            await API_SERVICES.courseLevelService.getCourseLevelById(
              rowData?.course_level_id
            );
          if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
            if (response?.data?.course_level && response?.data?.course_level_language) {
              setModalOpen({
                open: true,
                rowData: response.data,
                type: type
              });
            }
          }
          return;
        }
        setModalOpen({ open: true, type: type });
      } catch (e) {
        toast.error(e);
      }
    },
    []
  );


  const fetchData = async () => {
    try {
      setLoading(true);
      setData([]);
      let getLanguageId = DETECT_LANGUAGE[i18n.language];
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await  API_SERVICES.courseLevelService.getAllCourse(getLanguageId, params);
      
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.course_level?.length) {
          setData(response?.data?.course_level);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Heading headingText={t('courselevel.createNewLevel')}/>
      <ButtonComp
        btnWidth={84}
        backgroundColor={theme.Colors.primary}
        buttonFontSize={theme.MetricsSizes.tiny_xxx}
        btnBorderRadius={theme.MetricsSizes.large}
        buttonText={t('button.create')}
        onClickButton={() =>
          onCreateOrEditButtonClick({}, CONFIRM_MODAL.create)
        }
        endIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
        height={theme.MetricsSizes.large}
        style={{ marginBottom: theme.MetricsSizes.large }}
      />
      <CourseLevelTable
        onClickActionButton={onClickViewOrder}
        rowsData={data}
        updateData={fetchData}
        handleEditCategory={(rowData) =>
          onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
        }
        loading={loading}
      />
      {modalOpen.open ? (
        <AddNewCourseLevelModal
        handleClose={() => setModalOpen({ open: false })}
          {...modalOpen}
          updateData={fetchData}
        />
      ) : null}
      {viewModal.open && (
        <CourseLevelViewModal
          onClose={() => setViewModal({ open: false })}
          {...viewModal}
        />
      )}
    </>
  );
}

export default CourseLevelManagement;
