import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import '@mui/lab/themeAugmentation';

const defaultColors = {
  BLUE: {
    900: '#3C78F0',
    800: '#333333',
    700: '#222222',
    600: '#16192C',
    500: '#7C8DB5',
    400: '#718096',
    300: '#E6EDFF',
    dark: '#263238',
    100: '#103D43',
    200: '#78828C'
  },
  GREEN: {
    900: '#6CB044',
    800: '#163C45',
    700: '#3CC878',
    600: '#388E3C',
    500: '#e2af29',
    400: '#99C773'
  },
  WHITE: {
    900: '#FFFF',
    800: '#718096',
    700: '#F5F5F5',
    600: '#F2F4F7'
  },
  GREY: {
    900: '#667080',
    800: '#D2D2D2',
    700: '#9FA2B4',
    600: '#C5C7CD',
    500: '#EBEBEB',
    a400: '#979797',
    400: '#919AA9',
    300: '#696969',
    a200: '#CCCCCC',
    200: '#E0E0E0',
    a700: '#343434',
    a300: '#C4C4C4',
    100: '#F2F2F2',
    a900: '#777777',
    a600: '#4B506D',
    a500: '#9D9999',
    a100: '#A5A5A5',
    aa700: '#9D9999'
  },
  BLACK: {
    900: ' #000000',
    800: '#252733',
    700: '#808080',
    600: ' #252733',
    500: '#3C414B'
  },
  ORANGE: {
    900: '#FF3B30'
  },
  RED: {
    900: '#E10600'
  }
};
const Colors = {
  primary: defaultColors.BLUE[900],
  secondary: defaultColors.BLUE[900],
  blueDark: defaultColors.BLUE[800],
  blueLight: defaultColors.BLUE[500],
  blueMedium: defaultColors.BLUE[700],
  blueGrey: defaultColors.BLUE[600],
  lightBlue: defaultColors.BLUE[300],
  blueGreen: defaultColors.GREEN[800],
  darkGreen: defaultColors.GREEN[600],
  mediumGreen: defaultColors.GREEN[500],
  lightGreen: defaultColors.GREEN[400],
  white: defaultColors.WHITE[900],
  blueAsh: defaultColors.BLUE[400],
  greyDark: defaultColors.GREY[800],
  black: defaultColors.BLACK[900],
  orange: defaultColors.ORANGE[900],
  greyLight: defaultColors.GREY[600],
  greyPrimary: defaultColors.GREY[900],
  greyMedium: defaultColors.GREY[700],
  grey: defaultColors.GREY[500],
  darkGrey: defaultColors.GREY['a900'],
  blackPrimary: defaultColors.BLACK[800],
  whitePure: defaultColors.WHITE[900],
  whitePrimary: defaultColors.WHITE[700],
  accentGrey: defaultColors.GREY[400],
  lightShadeGrey: defaultColors.GREY['a200'],
  navBlue: defaultColors.BLUE.dark,
  inputText: defaultColors.GREY[300],
  redPrimary: defaultColors.RED[900],
  lightGrey: defaultColors.GREY[200],
  mediumGrey: defaultColors.GREY['a700'],
  mediumBlack: defaultColors.BLACK[700],
  greyScale: defaultColors.GREY['a600'],
  greyScaleMedium: defaultColors.GREY['a300'],
  lightWhiteGrey: defaultColors.GREY['100'],
  spanishGrey: defaultColors.GREY['a400'],
  blackMedium: defaultColors.BLACK[600],
  greyShade: defaultColors.GREY['a500'],
  lightBlueGrey: defaultColors.BLUE[100],
  greyNobel: defaultColors.GREY['aa700'],
  whiteGreyLight: defaultColors.GREY['a100'],
  whiteLightGrey: defaultColors.WHITE['600'],
  blackBerry: defaultColors.BLACK['500'],
  mediumGreenShade: defaultColors.GREEN['700'],
  darkGrayishBlue: defaultColors.BLUE['200']
};

const fontWeight = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  mediumBold: 600,
  bold: 700,
  black: 900
};

export const MetricsSizes = {
  tiny: 4,
  tiny_x: 6,
  tiny_xx: 8,
  tiny_xxx: 10,

  small: 13,
  small_x: 12,
  small_xx: 14,
  small_x3: 15,
  small_xxx: 16,

  regular: 18,
  regular_x: 20,
  regular_xx: 22,
  regular_xxx: 24,

  medium: 26,
  medium_x: 28,
  medium_xx: 30,
  medium_xxx: 32,

  large: 34,
  large_x: 36,
  large_xx: 40,
  large_xxx: 48,

  x_large: 52
};

export const PureLightTheme = (options?: ThemeOptions) =>
  createTheme(
    { ...options },
    {
      MetricsSizes: { ...MetricsSizes },
      Colors: { ...Colors },
      fontWeight: { ...fontWeight },
      general: {
        borderRadiusSm: MetricsSizes.tiny_x,
        borderRadius: MetricsSizes.tiny_xx,
        borderRadiusLg: MetricsSizes.small,
        borderRadiusXl: MetricsSizes.small_xx
      },
      sidebar: {
        width: ' 304px'
      },
      header: {
        appBarHeight: '120px'
      },
      palette: {
        primary: {
          light: Colors.blueLight,
          main: Colors.primary,
          dark: Colors.blueDark
        },
        secondary: {
          light: Colors.darkGreen,
          main: Colors.secondary,
          dark: Colors.blueGreen
        }
      },
      breakpoints: {
        values: {
          xxxs: 0,
          xxs: 400,
          xs: 600,
          sm: 840,
          md: 960,
          nmd: 1050,
          lg: 1280,
          xl: 1440,
          xxl: 1600,
          xxxl: 1920
        }
      },
      typography: {
        fontFamily: 'Switzer',
        h1: {
          fontSize: 35,
          fontFamily: 'Switzer'
        },
        h2: {
          fontSize: 30,
          fontFamily: 'Switzer'
        },
        h3: {
          fontSize: 25,
          fontFamily: 'Switzer'
        },
        h4: {
          fontSize: 16,
          fontFamily: 'Switzer'
        },
        h5: {
          fontSize: 14,
          fontFamily: 'Switzer'
        },
        h6: {
          fontSize: 15,
          fontFamily: 'Switzer'
        },
        body1: {
          fontSize: 14,
          fontFamily: 'Switzer'
        },
        body2: {
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'Switzer'
        },
        button: {
          fontWeight: 500,
          fontFamily: 'Switzer'
        },
        caption: {
          fontSize: 13,
          textTransform: 'uppercase'
        },
        subtitle1: {
          fontSize: 14,
          fontFamily: 'Switzer'
        },
        subtitle2: {
          fontWeight: 400,
          fontSize: 12,
          fontFamily: 'Switzer'
        },
        overline: {
          fontSize: 13,
          fontWeight: 700,
          textTransform: 'uppercase'
        }
      }
    }
  );
