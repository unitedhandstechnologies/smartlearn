import React from 'react';
import {
  TextField,
  Typography,
  useTheme,
  TextFieldProps,
  InputAdornment,
  Grid
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Property } from 'csstype';

type StyleProps = {
  width?: string | number;
  height?: string | number;
  borderColor?: string;
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  subText: {
    width: (props) => props.width || '100%',
    '& .MuiOutlinedInput-multiline': {
      padding: theme.spacing(1, 0),
      height: (props) => props.height || 46,
      alignItems: 'initial'
    },
    '& .MuiOutlinedInput-input': {
      height: (props) => props.height || 46,
      padding: theme.spacing(0, 1.8),
      fontSize: theme.MetricsSizes.small_x3,
      fontWeight: theme.fontWeight.medium,
      color: theme.Colors.inputText
    },
    '& .MuiOutlinedInput-root': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: (props) => props.borderColor || theme.Colors.lightGrey,
      borderWidth: '1px'
    },
    '& .MuiInput-root': {
      fontSize: theme.MetricsSizes.small_xx + 1,
      fontWeight: theme.fontWeight.bold,
      color: theme.Colors.mediumGrey
    },
    '& .MuiInput-underline::before, .MuiInput-underline:hover::before': {
      borderBottom: '0.5px solid',
      borderBottomColor: theme.Colors.greyDark
    },
    '& .MuiInput-underline::after': {
      borderBottom: '0.5px solid',
      borderBottomColor: theme.Colors.secondary
    }
  },
  helperRoot: {
    textTransform: 'none',
    fontSize: theme.MetricsSizes.small_x
  },
  required: {
    color: theme.Colors.redPrimary,
    fontWeight: theme.fontWeight.bold
  }
}));

type Props = TextFieldProps & {
  inputLabel?: string;
  labelColor?: string;
  inputWidth?: string | number;
  inputHeight?: string | number;
  variant?: string;
  borderColor?: string;
  isError?: boolean;
  required?: boolean;
  placeholderText?: string;
  textColor?: string;
  iconEnd?: any;
  containerStyle?: React.CSSProperties;
};

const TextInputComponent = (props: Props) => {
  const theme: Theme = useTheme();
  const {
    inputLabel,
    labelColor,
    textColor,
    inputWidth,
    placeholderText,
    variant = 'outlined',
    inputHeight,
    borderColor,
    iconEnd,
    isError = false,
    required = false,
    containerStyle,
    ...rest
  } = props;
  const styles = useStyles({
    width: inputWidth,
    height: inputHeight,
    borderColor: (isError && theme.Colors.redPrimary) || borderColor
  });
  return (
    <Grid container direction="column" style={{ ...containerStyle }}>
      {inputLabel && (
        <Typography
          style={{
            color:
              (isError && theme.Colors.redPrimary) ||
              labelColor ||
              theme.Colors.primary,
            fontWeight: theme.fontWeight.medium
          }}
        >
          {inputLabel}
          {required && <span className={styles.required}>&nbsp;*</span>}
        </Typography>
      )}
      <TextField
        className={styles.subText}
        size="medium"
        variant={variant}
        FormHelperTextProps={{ classes: { root: styles.helperRoot } }}
        error={isError}
        InputProps={{
          endAdornment: iconEnd ? (
            <InputAdornment position="end">{iconEnd}</InputAdornment>
          ) : null
        }}
        {...rest}
      />
    </Grid>
  );
};

export default React.memo(TextInputComponent);
