import React, { useState } from 'react';
import { makeStyles, useTheme, Theme, InputAdornment } from '@material-ui/core';
import TextInputComponent from './../TextInputComponent/index';

const useStyles = makeStyles<Theme>((theme: Theme) => {
  return {
    outerContainer: {
      background: theme.Colors.whitePrimary,
      borderRadius: '5px',
      width: theme.spacing(14),

      '& .MuiInputBase-input': {
        color: theme.Colors.primary,
        fontSize: theme.MetricsSizes.small_xxx,
        fontWeight: theme.fontWeight.medium
      },
      '& fieldset': {
        borderColor: theme.Colors.black
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: '5px'
      },
      '& .MuiOutlinedInput-input': {
        borderLeft: '0.5px solid',
        background: theme.Colors.whitePure,
        padding: '10px 5px 10px 10px'
      },
      '.focused': {
        border: 0
      },
      '.active': {
        border: 0
      }
    },
    headingStyle: {
      fontSize: theme.MetricsSizes.regular_x,
      fontWeight: theme.fontWeight.bold,
      textAlign: 'left',
      color: theme.Colors.black
    },
    priceSignContainer: {
      color: theme.Colors.primary,
      fontSize: theme.MetricsSizes.small_xxx,
      fontWeight: theme.fontWeight.mediumBold,
      width: theme.spacing(8)
    }
  };
});

export const SymbolTextInputField = React.memo(
  ({
    valueLeft,
    valueRight,
    leftIsIcon,
    onChange
  }: {
    valueLeft: any;
    valueRight: any;
    leftIsIcon?: boolean;
    onChange?: any;
  }) => {
    const classes = useStyles();
    const theme: Theme = useTheme();

    return (
      <TextInputComponent
        variant="outlined"
        value={valueRight}
        className={classes.outerContainer}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              disableTypography={true}
              className={classes.priceSignContainer}
            >
              {(leftIsIcon && <img src={valueLeft} alt="image" />) || valueLeft}
            </InputAdornment>
          )
        }}
      />
    );
  }
);
