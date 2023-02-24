import React from 'react';
import {
  makeStyles,
  useTheme,
  Box,
  Typography,
  Theme,
  BoxProps
} from '@material-ui/core';

type Props = {
  headerFontWeight?: number;
  headingColor?: string;
  headerFontSize?: string | number;
  headerFontFamily?: string;
};
const useStyles = makeStyles<Theme, Props>((theme) => {
  return {
    headingContainer: {
      marginBottom: theme.MetricsSizes.tiny_xxx
    },
    headingStyle: {
      fontFamily: (props) => props.headerFontFamily || 'Roboto',
      fontSize: (props) => props.headerFontSize || theme.MetricsSizes.regular_x,
      fontWeight: (props) => props.headerFontWeight || theme.fontWeight.bold,
      color: (props) =>
        props.headingColor ? props.headingColor : theme.Colors.blueDark
    }
  };
});

interface HeadingProp extends BoxProps {
  headingText: string | JSX.Element;
  headingColor?: string;
  headerFontSize?: string | number;
  headerFontWeight?: number;
  headerFontFamily?: string;
}

const Heading = ({
  headingText,
  headingColor,
  headerFontWeight,
  headerFontSize,
  headerFontFamily,
  ...rest
}: HeadingProp) => {
  const classes = useStyles({
    headingColor,
    headerFontSize,
    headerFontWeight,
    headerFontFamily
  });
  const theme: Theme = useTheme();

  return (
    <Box className={classes.headingContainer} {...rest}>
      <Typography className={classes.headingStyle}>{headingText}</Typography>
    </Box>
  );
};

export default Heading;
