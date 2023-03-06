import React, { useEffect, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import { makeStyles, useTheme } from '@material-ui/core';
import ButtonComp from '../../components/ButtonComp/index';
import { ListItemCell, TextInputComponent } from 'src/components';
import { useTranslation } from 'react-i18next';
import { PercentageIcon } from 'src/Assets';

type Props = {
  settingData?: any[];
  handleEditInstructorCommission?: (row: any) => void;
  loading?: boolean;
};

const useStyles = makeStyles(() => ({
  percentage: {
    height: 15,
    width: 15
  }
}));

const InstructorSettingsTable = ({
  settingData,
  handleEditInstructorCommission,
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
      renderCell: ({ row }) => <ListItemCell title={row?.user_name} />
    },
    {
      field: 'commission',
      headerName: 'Commission',
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <TextInputComponent
          labelColor={theme.Colors.primary}
          inputWidth={'100px'}
          value={row?.commission}
          iconEnd={<PercentageIcon className={classes.percentage} />}
          borderColor={'transparent'}
          disabled
        />
      )
    },
    {
      field: 'action',
      headerName: t('course.action'),
      flex: 1.5,
      sortable: false,
      disableColumnMenu: false,
      renderCell: ({ row }) => (
        <ButtonComp
          btnBorderRadius={theme.MetricsSizes.regular_x}
          buttonText={t('button.edit')}
          buttonFontSize={theme.MetricsSizes.small_x}
          btnWidth={theme.spacing(9)}
          backgroundColor={theme.Colors.secondary}
          height={theme.MetricsSizes.medium}
          onClickButton={() => handleEditInstructorCommission(row)}
        />
      )
    }
  ];

  const onSelectionModelChange = (e) => {
    console.log('e model', e);
  };
  useEffect(() => {
    setRowItems(settingData);
  }, [settingData]);

  return (
    <MuiTable
      columns={columns}
      rows={rowItems}
      loading={loading}
      autoHeight={true}
      hideFooterPagination={true}
      onSelectionModelChange={onSelectionModelChange}
    />
  );
};

export default React.memo(InstructorSettingsTable);
