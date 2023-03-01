import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { ButtonComp, Heading } from 'src/components';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 0,
    padding: theme.spacing(0)
  }
}));
type SummaryProps = {
  purchaseData?: any[];
  coursePrice?: number;
  tax?: number;
  total?: number;
};

const Summary = ({ purchaseData, coursePrice, tax, total }: SummaryProps) => {
  const theme = useTheme();
  return (
    <Grid
      container
      direction={'column'}
      spacing={2}
      sx={{
        padding: theme.spacing(0.4),
        border: '1px solid #3C78F0',
        borderRadius: '8px'
      }}
    >
      <Grid item>
        <Heading
          headingText={'Summary'}
          headerFontSize={'24px'}
          headerFontFamily={'IBM Plex Serif'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
        />
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 400,
            fontFamily: 'Switzer',
            color: '#78828C'
          }}
        >
          Items:
        </Typography>
      </Grid>
      <Grid item>
        <CourseDetails purchaseData={purchaseData} />
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 400,
            fontFamily: 'Switzer',
            color: '#78828C'
          }}
        >
          Price:
        </Typography>
      </Grid>
      <Grid container item>
        <Grid item xs>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 500,
              fontFamily: 'Switzer',
              color: '#3C414B'
            }}
          >
            Item(s):
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#3C414B'
            }}
          >
            {purchaseData.length} x ₹ {coursePrice}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#3C414B'
            }}
          >
            Additional Tax:
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#3C414B'
            }}
          >
            ₹ {tax}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs>
          <Typography
            style={{
              fontSize: '24px',
              fontWeight: 400,
              fontFamily: 'Switzer',
              color: '#3C414B'
            }}
          >
            Subtotal:
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: '24px',
              fontWeight: 600,
              fontFamily: 'Switzer',
              color: '#3C414B'
            }}
          >
            ₹ {total}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Summary;

export const CourseDetails = ({ purchaseData }) => {
  const theme = useTheme();
  const classes = useStyles();
  const onClickRemoveCourse = (rowData) => {
    console.log('rowData', rowData);
  };

  return (
    <Grid container spacing={2} direction={'column'}>
      {purchaseData?.length
        ? purchaseData.map((item, index) => {
            return (
              <Grid item key={index}>
                <Grid container item>
                  <Grid item xs>
                    <ChipComp
                      label={item.chipValue}
                      style={{
                        borderColor: '#3CC878',
                        color: '#78828C',
                        fontSize: theme.MetricsSizes.small_x,
                        fontWeight: theme.fontWeight.regular
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <ButtonComp
                      buttonText="remove"
                      backgroundColor={'transparent'}
                      buttonTextColor={'#78828C'}
                      height={theme.MetricsSizes.regular_xx}
                      buttonFontSize={theme.MetricsSizes.small_x}
                      buttonFontWeight={theme.fontWeight.regular}
                      classes={{ root: classes.button }}
                      onClickButton={() => onClickRemoveCourse(item)}
                    />
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs>
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      ₹ {item.price}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs>
                  <Grid item xs>
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      {item.seat}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      border: '1px solid #3C78F0',
                      padding: theme.spacing(0, 1, 0, 1),
                      borderRadius: '8px'
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        fontFamily: 'Switzer',
                        color: '#3C414B'
                      }}
                    >
                      {item.seatCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};
