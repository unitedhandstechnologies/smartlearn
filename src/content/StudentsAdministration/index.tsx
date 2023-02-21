import { useTheme } from '@material-ui/core';
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonComp, Heading, Loader } from 'src/components';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import StudentTable from './StudentTable';
import { toast } from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  HTTP_STATUSES,
  USER_TYPE_ID
} from 'src/Config/constant';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import StudentCreateModel from './StudentCreateModel';
import StudentModal from './StudentModal';

function StudentsAdministration() {
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
    (rowData?: any, type?: string) => {
      if (CONFIRM_MODAL.edit) {
        setModalOpen({
          open: true,
          rowData: rowData,
          type: type
        });
        return;
      }
      setModalOpen({
        open: true,
        type: type
      });
    },
    []
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setData([]);
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any = await API_SERVICES.adminUserService.getAll(params);

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.users?.length) {
          const onlyStudentList = response.data.users.filter(
            (item) => item.user_type === USER_TYPE_ID.student
          );
          setData(onlyStudentList);
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
  }, []);

  return (
    <>
      <Heading headingText={t('createNewUser')}/>
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
      <StudentTable
        onClickActionButton={onClickViewOrder}
        rowsData={data}
        updateData={fetchData}
        handleEditCategory={(rowData) =>
          onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
        }
        loading={loading}
      />
      {modalOpen.open ? (
        <StudentCreateModel
          onClose={() => setModalOpen({ open: false })}
          {...modalOpen}
          updateData={fetchData}
        />
      ) : null}
      {viewModal.open && (
        <StudentModal
          onClose={() => setViewModal({ open: false })}
          {...viewModal}
        />
      )}
    </>
  );
}

export default StudentsAdministration;
