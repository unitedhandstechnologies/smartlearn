import React from 'react';
import { BreakpointOverrides } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    /* ------------------------------------- */
    /*      Removes defaults breakpoint      */
    /* ------------------------------------- */

    /* ------------------------------------- */
    /*            Adds new breakpoint        */
    /* ------------------------------------- */
    xxxs: true;
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    nmd: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
}
declare module '@material-ui/core/styles' {
  interface Theme {
    // breakpoints: BreakpointOverrides;
    MetricsSizes: {
      tiny: number;
      tiny_x: number;
      tiny_xx: number;
      tiny_xxx: number;

      small: number;
      small_x: number;
      small_xx: number;
      small_x3: number;
      small_xxx: number;

      regular: number;
      regular_x: number;
      regular_xx: number;
      regular_xxx: number;

      medium: number;
      medium_x: number;
      medium_xx: number;
      medium_xxx: number;

      large: number;
      large_x: number;
      large_xx: number;
      large_xxx: number;

      x_large: number;
    };
    fontWeight: {
      thin: number;
      light: number;
      regular: number;
      medium: number;
      mediumBold: number;
      bold: number;
      black: number;
    };
    Colors: {
      greyNobel: string;
      redPrimary: string;
      primary: string;
      secondary: string;
      blueDark: string;
      blueLight: string;
      blueMedium: string;
      blueGrey: string;
      lightBlue: string;
      blueGreen: string;
      darkGreen: string;
      mediumGreen: string;
      lightGreen : string;
      white: string;
      blueAsh: string;
      greyDark: string;
      black: string;
      orange: string;
      greyLight: string;
      greyPrimary: string;
      greyMedium: string;
      grey: string;
      blackPrimary: string;
      whitePure: string;
      whitePrimary: string;
      accentGrey: string;
      navBlue: string;
      inputText: string;
      lightShadeGrey: string;
      lightGrey: string;
      mediumGrey: string;
      mediumBlack: string;
      darkGrey: string;
      greyScale: string;
      greyScaleMedium: string;
      blackMedium: string;
      lightWhiteGrey: string;
      spanishGrey: string;
      greyShade: string;
      lightBlueGrey: string;
      whiteGreyLight: string;
      whiteLightGrey: string;
      blackBerry: string;
      mediumGreenShade: string;
      darkGrayishBlue: string;
      greyLightMedium: string;
    };
    general: {
      borderRadiusSm: number;
      borderRadius: number;
      borderRadiusLg: number;
      borderRadiusXl: number;
    };
    sidebar: {
      width: string;
    };
    header: {
      appBarHeight: string;
    };
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
  interface ThemeOptions {
    MetricsSizes: {
      tiny: number;
      tiny_x: number;
      tiny_xx: number;
      tiny_xxx: number;

      small: number;
      small_x: number;
      small_xx: number;
      small_x3: number;
      small_xxx: number;

      regular: number;
      regular_x: number;
      regular_xx: number;
      regular_xxx: number;

      large: number;
      large_x: number;
      large_xx: number;
      large_xxx: number;
    };
    fontWeight: {
      thin: number;
      light: number;
      regular: number;
      medium: number;
      bold: number;
      black: number;
    };
    Colors: {
      primary: string;
      secondary: string;
      blueDark: string;
      blueLight: string;
      blueMedium: string;
      blueGrey: string;
      lightBlue: string;
      blueGreen: string;
      darkGreen: string;
      mediumGreen: string;
      white: string;
      blueAsh: string;
      greyDark: string;
      black: string;
      orange: string;
      greyLight: string;
      greyPrimary: string;
      greyMedium: string;
      grey: string;
      blackPrimary: string;
      whitePure: string;
      whitePrimary: string;
      accentGrey: string;
      lightGrey: string;
      navBlue: string;
      inputText: string;
      greyScaleMedium: string;
      lightWhiteGrey: string;
      darkGrey: string;
      spanishGrey: string;
      lightBlueGrey: string;
      whiteGreyLight: string;
      greyNobel: string;
      whiteLightGrey: string;
      blackBerry: string;
      mediumGreenShade: string;
      darkGrayishBlue: string;
      greyLightMedium: string;
    };
    general: {
      borderRadiusSm: number;
      borderRadius: number;
      borderRadiusLg: number;
      borderRadiusXl: number;
    };
    sidebar: {
      width: string;
    };
    header: {
      appBarHeight: string;
    };
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
}
