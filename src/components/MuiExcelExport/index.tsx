import React from 'react';
import { IconButton, makeStyles, Theme } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { ExcelIcon } from 'src/Assets';

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonStyle: {
    padding: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.Colors.white
    }
  }
}));

export type ExcelProps = {
  excelData: any[];
  excelHeaders: any[];
  fileName: string;
};

const MuiExcelExport = (props: ExcelProps) => {
  const { excelData, excelHeaders, fileName } = props;
  const classes = useStyles();

  return (
    <IconButton className={classes.iconButtonStyle}>
      {excelData.length ? (
        <CSVLink
          data={excelData}
          headers={excelHeaders}
          filename={`${fileName}.csv`}
        >
          <img src={ExcelIcon} />
        </CSVLink>
      ) : (
        <img src={ExcelIcon} />
      )}
    </IconButton>
  );
};

export default React.memo(MuiExcelExport);
