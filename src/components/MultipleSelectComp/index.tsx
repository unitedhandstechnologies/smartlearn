import React from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';
import { FormHelperText, Grid, Typography } from '@material-ui/core';

type StyleProp = {
  borderColor?: string;
};

const useStyles = makeStyles<Theme, StyleProp>((theme: Theme) =>
  createStyles({
    selectStyle: {
      height: theme.MetricsSizes.large_xxx,
      color: theme.Colors.inputText,
      fontSize: theme.MetricsSizes.small_xx,
      fontWeight: theme.fontWeight.medium,
      marginTop: theme.MetricsSizes.tiny,
      '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: (props) => props.borderColor || theme.Colors.lightGrey,
        borderWidth: '1px'
      },
      '& .MuiSelect-select:focus': {
        background: 'transparent',
        outline: 'none'
      }
    },
    required: {
      color: theme.Colors.redPrimary,
      fontWeight: theme.fontWeight.bold
    },
    helperTextStyle: {
      textTransform: 'none',
      color: theme.Colors.redPrimary,
      paddingLeft: theme.spacing(2)
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type Props = SelectProps & {
  selectItems?: any;
  titleText?: string;
  variant?: string;
  multiple?: boolean;
  value?: string[];
  onChange?: (val: any) => void;
  selectBoxStyle?: React.CSSProperties;
  isPlaceholderNone?: boolean;
  placeholderText?: string;
  isError?: boolean;
  borderColor?: string;
  helperText?: string;
  required?: boolean;
};

function MultipleSelectComp(props: Props) {
  const {
    selectItems,
    titleText,
    multiple = false,
    variant = 'outlined',
    value,
    onChange,
    selectBoxStyle,
    isPlaceholderNone = false,
    placeholderText,
    isError = false,
    borderColor,
    helperText,
    required,
    ...rest
  } = props;
  const theme = useTheme();
  const classes = useStyles({
    borderColor: (isError && theme.Colors.redPrimary) || borderColor
  });
  const getMenuItems = () => {
    if (!selectItems?.length) {
      return null;
    }
    return selectItems.map((item, index) => (
      <MenuItem key={index} value={item.value}>
        {item.label}
      </MenuItem>
    ));
  };
  return (
    <Grid container direction="column">
      {titleText && (
        <Typography
          style={{
            color: (isError && theme.Colors.redPrimary) || theme.Colors.primary,
            fontWeight: theme.fontWeight.medium
          }}
        >
          {titleText}
          {required && <span className={classes.required}>&nbsp;*</span>}
        </Typography>
      )}
      <Select
        multiple={multiple}
        variant={variant}
        fullWidth
        value={value}
        onChange={onChange}
        className={classes.selectStyle}
        MenuProps={MenuProps}
        style={{ ...selectBoxStyle }}
        {...rest}
      >
        {isPlaceholderNone && (
          <MenuItem value={'' || 0}>{placeholderText || 'None'}</MenuItem>
        )}
        {getMenuItems()}
      </Select>
      {isError ? (
        <FormHelperText className={classes.helperTextStyle}>
          {helperText}
        </FormHelperText>
      ) : null}
    </Grid>
  );
}
export default MultipleSelectComp;
