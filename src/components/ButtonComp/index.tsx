import React from 'react';
import { makeStyles, Theme, Button, ButtonProps } from '@material-ui/core';

type ThemeProps = {
  bgColor?: string;
  height?: string | number;
  buttonFontSize?: number;
  btnTextColor?: string;
  buttonFontWeight?: number;
  btnWidth?: string | number;
  btnBorderRadius?: number | string;
  buttonFontFamily?: string;
};

const useStyles = makeStyles<Theme, ThemeProps>((theme) => {
  return {
    container: {
      display: 'flex',
      width: (props) => props.btnWidth || 'fit-content',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: (props) => props.bgColor || theme.Colors.secondary,

      height: (props) => props.height || theme.MetricsSizes.large_xxx,
      borderRadius: (props) =>
        props.btnBorderRadius || theme.MetricsSizes.tiny_xx,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: (props) => props.bgColor || theme.Colors.secondary
      },
      '& .MuiButton-label': {
        color: (props) => props.btnTextColor || theme.Colors.white,
        fontSize: (props) => props.buttonFontSize || theme.MetricsSizes.regular,
        fontWeight: (props) =>
          props.buttonFontWeight || theme.fontWeight.medium,
        fontFamily: (props) => props.buttonFontFamily || 'DM Sans'
      }
    }
  };
});

type Props = ButtonProps & {
  backgroundColor?: string;
  height?: string | number;
  buttonText?: string;
  buttonFontSize?: number;
  onClickButton?: () => void;
  variant?: string;
  buttonTextColor?: string;
  buttonFontWeight?: number;
  buttonFontFamily?: string;
  btnWidth?: string | number;
  btnBorderRadius?: number | string;
  onBrowseButtonClick?: (event: any) => void;
  isBrowseButton?: boolean;
  acceptType?: any;
  iconImage?: any;
  isMultipleUpload?: boolean;
};

const ButtonComp = (props: Props) => {
  const {
    backgroundColor,
    height,
    buttonText,
    buttonFontSize,
    variant = 'contained',
    buttonTextColor,
    buttonFontWeight,
    btnWidth,
    btnBorderRadius,
    onClickButton,
    isBrowseButton,
    onBrowseButtonClick,
    acceptType,
    iconImage,
    buttonFontFamily,
    isMultipleUpload = false,
    ...rest
  } = props;
  const classes = useStyles({
    bgColor: backgroundColor,
    height: height,
    buttonFontSize: buttonFontSize,
    btnTextColor: buttonTextColor,
    buttonFontWeight,
    btnWidth,
    btnBorderRadius,
    buttonFontFamily
  });

  if (isBrowseButton)
    return (
      <Button className={classes.container} component="label" variant={variant}>
        Browse
        <input
          type="file"
          multiple={isMultipleUpload}
          accept={acceptType || 'image/*'}
          //accept="application/pdf,image/jpg,image/jpeg"
          hidden
          onChange={onBrowseButtonClick}
        />
      </Button>
    );

  return (
    <Button
      className={classes.container}
      disableElevation
      variant={variant}
      onClick={onClickButton}
      endIcon={iconImage}
      {...rest}
    >
      {buttonText}
    </Button>
  );
};
export default ButtonComp;
