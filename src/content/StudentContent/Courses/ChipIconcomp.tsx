import React from 'react';
import { useTheme } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';

type Props = {
  chipText?: string;
  checkboxText?: string;
  img?: string;
  onClick?: (event: any) => void;
};
const ChipIconcomp = (props: Props) => {
  const { chipText, checkboxText, img, onClick } = props;
  const theme = useTheme();
  return (
    <Grid
      container
      alignItems="center"
      sx={{
        border: '1px solid #3C78F0',
        borderRadius: '25px',
        padding: theme.spacing(0.5, 1),
        gap: '10px',
        width: 'fit-content',
        cursor: 'pointer'
      }}
    >
      <Grid item>
        <Typography
          sx={{
            color: '#3C414B',
            fontSize: 18,
            fontWeight: 400,
            fontFamily: 'Switzer',
            textAlign: 'center'
          }}
          onClick={(event) => {
            event.stopPropagation();
            onClick(event);
          }}
        >
          {chipText}
        </Typography>
      </Grid>
      <Grid
        item
        xs
        container
        sx={{
          borderRadius: '40px',
          background: '#3C78F0',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(0.8, 1.2)
        }}
      >
        {img ? <img src={img} /> : null}
        <Typography
          sx={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 400,
            fontFamily: 'Switzer',
            padding: theme.spacing(0.1, 1.1)
          }}
        >
          {checkboxText}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ChipIconcomp;
