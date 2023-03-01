import { Icon, IconButton, Typography, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { ButtonComp, Heading } from 'src/components';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import RemoveIcon from '@material-ui/icons/Remove';
import { Add } from '@material-ui/icons';

const Summary = () => {
  const theme = useTheme();
  const [seatCount, setSeatCount] = useState<number>(0);
  let coursePrice = 4500;
  let tax = (4500 / 100) * 10;
  let total = seatCount * coursePrice + tax;
  const onClickDecrement = () => {
    setSeatCount((prev) => prev - 1);
  };

  const onClickIncrement = () => {
    setSeatCount((prev) => prev + 1);
  };
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
        <ChipComp label={'Course'} />
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
            Title
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
            ₹ {coursePrice}
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
            No. of Available Seats
          </Typography>
        </Grid>
        <Grid container spacing={0.5} item xs justifyContent={'flex-end'}>
          <Grid item>
            <IconButton
              onClick={onClickDecrement}
              disabled={seatCount <= 0}
              style={{ background: theme.Colors.whiteLightGrey }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 500,
                fontFamily: 'Switzer',
                color: '#3C414B',
                border: '1px solid #3C78F0',
                padding: theme.spacing(1),
                borderRadius: '8px'
              }}
            >
              {seatCount}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={onClickIncrement}
              style={{ background: theme.Colors.whiteLightGrey }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
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
            {seatCount} x ₹ {coursePrice}
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
