import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SortIcon, FilterIcon, PDFIcon, ExcelIcon } from '../../Assets/Images';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';
import { MoreVert } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import MenuActionComp from '../MenuActionComp';
import ButtonComp from '../ButtonComp';
import { DEFAULT_TABLE_ROW_COUNT } from 'src/Config/constant';
import MuiExcelExport, { ExcelProps } from '../MuiExcelExport';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    width: '100%',
    flex: 1,
    minHeight: 400,
    '&.MuiDataGrid-root': {
      border: 'none'
    },
    '& .MuiDataGrid-columnSeparator': {
      visibility: 'hidden'
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      padding: 0
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.MetricsSizes.small_xx,
      color: theme.Colors.greyPrimary
    },
    '& .MuiDataGrid-row:last-child .MuiDataGrid-cell ': {
      borderBottom: 0
    },
    '& .MuiInputBase-inputMarginDense': {
      paddingTop: '4px'
    }
  },
  heading: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.MetricsSizes.regular_x,
    color: theme.Colors.blueDark
  },
  iconStyle: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.MetricsSizes.small_xx,
    paddingLeft: theme.spacing(1)
  },
  gridStyle: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #DFE0EB',
    margin: theme.spacing(0, 0, 4, 0),
    padding: theme.spacing(3, 4),
    borderRadius: theme.MetricsSizes.tiny_xx
  },
  iconButtonStyle: {
    padding: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.Colors.white
    }
  }
}));
type Props = DataGridProps &
  Partial<ExcelProps> & {
    title?: String;
    rows: any[];
    columns: any[];
    checkboxSelection?: boolean | any;
    disableSelectionOnClick?: boolean | any;
    rowHeight?: number;
    getRowActions?: any;
    actionIconStyle?: React.CSSProperties;
    onFilterClick?: () => void;
    onSortClick?: () => void;
    renderActionButton?: () => React.ReactNode;
    isFilters?: boolean;
    // onSelectionModelChange?: (id?: number[], details?: any) => void;
    handleExcelClick?: (item?: any) => void;
    isDownloadButton?: boolean;
  };
const MuiTable = (props: Props) => {
  const {
    rowHeight,
    title,
    rows,
    columns,
    checkboxSelection = false,
    getRowActions,
    actionIconStyle,
    onSortClick,
    onFilterClick,
    isFilters = false,
    // onSelectionModelChange,
    renderActionButton,
    handleExcelClick,
    isDownloadButton = false,
    excelData = [],
    excelHeaders = [],
    fileName,
    ...rest
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [colDefs, setColDefs] = useState(columns);
  const [selectedActionRow, setSelectedActionRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [selectedRows, setSelection] = React.useState([]);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionsIconSelect = (e, row) => {
    if (row?.id === selectedActionRow?.id) {
      setSelectedActionRow(null);
      setAnchorEl(null);
    } else {
      setSelectedActionRow(row);
      setAnchorEl(e.currentTarget);
    }
    e.stopPropagation();
  };

  const renderActions = () => {
    if (!selectedActionRow) {
      return;
    }
    const rowActions = getRowActions(selectedActionRow);
    if (!rowActions.length) {
      return;
    }

    return (
      <MenuActionComp
        open={open}
        selectedActionRow={selectedActionRow}
        rowActions={rowActions}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    );
  };

  useEffect(() => {
    const getPageCount = () => {
      let rowCount = 0;
      let newPageCount = 1;
      if (rows.length)
        rows.forEach(() => {
          if (rowCount === DEFAULT_TABLE_ROW_COUNT) {
            newPageCount++;
            rowCount = 0;
          }
          rowCount++;
        });
      return newPageCount;
    };
    setPageCount(getPageCount());
    setPage(1);
  }, [rows]);

  useEffect(() => {
    const updatedDefs = [...columns];
    if (getRowActions) {
      updatedDefs.push({
        headerName: '',
        field: '',
        sortable: false,
        disableColumnMenu: true,
        align: 'right',
        flex: 1,
        renderCell: ({ row }) => (
          <IconButton onClick={(e) => handleActionsIconSelect(e, row)}>
            <MoreVert style={actionIconStyle} />
            {row.id === selectedActionRow?.id && renderActions()}
          </IconButton>
        )
      });
    }
    setColDefs(updatedDefs);
  }, [selectedActionRow, columns]);

  const handlePdfClick = () => {
    if (!excelData.length) {
      return;
    }
    //let pdfDoc = new jsPDF('p', 'pt', 'a2');
    let pdfDoc = new jsPDF();
    const pdfHeader = excelHeaders.length
      ? excelHeaders.map((item) => {
          return { header: item.label, dataKey: item.key };
        })
      : [];
    pdfDoc.text(fileName, 10, 10);
    autoTable(pdfDoc, {
      body: excelData,
      columns: pdfHeader,
      styles: {
        cellWidth: 'wrap',
        cellPadding: 4
      },
      margin: { top: 10, vertical: 10, horizontal: 10 },
      tableWidth: 'auto',
      startY: 15,
      horizontalPageBreak: true,
      horizontalPageBreakRepeat: 0
    });
    pdfDoc.save(`${fileName}.pdf`);
  };

  return (
    <>
      <Grid container className={classes.gridStyle}>
        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: theme.spacing(3) }}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography className={classes.heading}>{title}</Typography>
          </Grid>
          {isFilters ? (
            <Grid
              container
              item
              xs={6}
              justifyContent="flex-end"
              alignItems="center"
            >
              {renderActionButton ? (
                <Grid item>{renderActionButton()}</Grid>
              ) : null}

              {onSortClick ? (
                <Grid item>
                  <ButtonComp
                    backgroundColor={'transparent'}
                    buttonFontSize={theme.MetricsSizes.small}
                    buttonFontWeight={theme.fontWeight.mediumBold}
                    buttonText="Sort"
                    onClickButton={onSortClick}
                    buttonTextColor={theme.Colors.greyScale}
                    startIcon={<SortIcon width="13" height="13" />}
                  />
                </Grid>
              ) : null}
              {onFilterClick ? (
                <Grid item>
                  <ButtonComp
                    backgroundColor={'transparent'}
                    buttonFontSize={theme.MetricsSizes.small}
                    buttonFontWeight={theme.fontWeight.mediumBold}
                    buttonText="Filter"
                    onClickButton={onFilterClick}
                    buttonTextColor={theme.Colors.greyScale}
                    startIcon={<FilterIcon width="13" height="13" />}
                    disableRipple
                  />
                </Grid>
              ) : null}
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            className={classes.tableContainer}
            rows={rows}
            columns={colDefs}
            checkboxSelection={checkboxSelection}
            disableSelectionOnClick
            rowHeight={rowHeight || 90}
            hideFooter
            // onSelectionModelChange={onSelectionModelChange}
            page={page - 1}
            pageSize={DEFAULT_TABLE_ROW_COUNT}
            onSelectionModelChange={(newSelection) => {
              console.log('newSelection', newSelection);
              // setSelection(newSelection.rowIds);
            }}
            {...rest}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        {isDownloadButton ? (
          <Grid item style={{ display: 'flex' }}>
            <MuiExcelExport
              excelData={excelData}
              excelHeaders={excelHeaders}
              fileName={fileName}
            />
            <IconButton
              onClick={handlePdfClick}
              className={classes.iconButtonStyle}
            >
              <img src={PDFIcon} />
            </IconButton>
          </Grid>
        ) : null}
        <Grid container item xs justifyContent="flex-end">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePagination}
            color="primary"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(MuiTable);
