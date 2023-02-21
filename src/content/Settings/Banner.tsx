import { useTheme } from '@material-ui/core';
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonComp, Heading, Loader } from 'src/components';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import BannerTable from './BannerTable';
import { toast } from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import {
  CONFIRM_MODAL,
  HANDLE_SUBMIT,
  HTTP_STATUSES
} from 'src/Config/constant';
import { useSearchVal } from 'src/hooks/useSearchVal';
import { useDebounce } from 'src/hooks/useDebounce';
import AddBannerModel from './AddBannerModel';

function Banner() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchValue } = useSearchVal();
  const debValue = useDebounce(searchValue, 2000);
  const [modalOpen, setModalOpen] = useState<any>({ open: false });
  const [isMissingImageEntry, setIsMissingImageEntry] = useState(true);
  const [isMissingNameEntry, setIsMissingNameEntry] = useState(true);

  function TabPanel(props) {
    const { children, value, index } = props;

    return value === index && <>{children}</>;
  }

  const onCreateOrEditButtonClick = (rowData?: any, type?: string) => {
    if (type === CONFIRM_MODAL.edit) {
      setModalOpen({
        open: true,
        rowData: rowData,
        type: type
      });
      return;
    }
    setModalOpen({ open: true, type: type });
  };

  const fetchData = useCallback(async () => {
    try {
      let languageId = 1;
      setLoading(true);
      setData([]);
      let params: any = {};
      if (debValue !== '') {
        params.searchString = debValue;
      }
      const response: any =
        await API_SERVICES.bannerManagementService.getAllBannerManagement(
          languageId,
          params
        );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.bannerManagement) {
          setData(response.data.bannerManagement);
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
  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
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
        <BannerTable
          rowsData={data}
          updateData={fetchData}
          handleEditBanner={(rowData) =>
            onCreateOrEditButtonClick(rowData, CONFIRM_MODAL.edit)
          }
        />
        {modalOpen.open && (
          <AddBannerModel
            handleClose={() => setModalOpen({ open: false })}
            {...modalOpen}
            updateData={fetchData}
            setIsMissingImageEntry={setIsMissingImageEntry}
            isMissingImageEntry={isMissingImageEntry}
            setIsMissingNameEntry={setIsMissingNameEntry}
            isMissingNameEntry={isMissingNameEntry}
          
          />
        )}
      </>
    );
  }
}

export default Banner;
