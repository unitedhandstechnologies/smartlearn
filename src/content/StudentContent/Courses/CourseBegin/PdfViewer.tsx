import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Grid, makeStyles, styled, useTheme } from '@material-ui/core';
import { ButtonComp, Loader } from 'src/components';
import { Document, Page, pdfjs } from 'react-pdf';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const useStyles = makeStyles((theme) => ({
  pagePdf: {
    '& .react-pdf__Page__canvas': {
      width: '100% !important',
      height: '100% !important'
    }
  }
}));

const PdfViewer = ({ pdfFile }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(false); //true
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('inside Document');
    //setLoading(false);
    setNumPages(numPages);
  };

  const handleClickPreviousPage = () => {
    let currentPage = pageNumber;
    setPageNumber(currentPage - 1);
  };

  const handleClickNextPage = () => {
    let currentPage = pageNumber;
    setPageNumber(currentPage + 1);
  };

  useEffect(() => {
    console.log('Inside useefefect');
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Grid
          style={{
            padding: '0px 48px 0px 32px'
          }}
        >
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
          >
            <Page
              className={classes.pagePdf}
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              Page {pageNumber} of {numPages}
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <ButtonComp
                    buttonTextColor={theme.Colors.whitePure}
                    //btnWidth='fit-content'
                    height="fit-content"
                    onClickButton={handleClickPreviousPage}
                    iconImage={<ArrowBackIosNewIcon />}
                    disabled={pageNumber === 1}
                  ></ButtonComp>
                </Grid>
                <Grid item>
                  <ButtonComp
                    buttonTextColor={theme.Colors.whitePure}
                    height="fit-content"
                    style={{
                      marginLeft: '10px'
                    }}
                    onClickButton={handleClickNextPage}
                    iconImage={<ArrowForwardIosIcon />}
                    disabled={pageNumber === numPages}
                  ></ButtonComp>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default PdfViewer;
