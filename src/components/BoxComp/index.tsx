import React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';

type Props = {
  bgColor: string;
  height: string;
};

const useStyles = makeStyles<Theme, Props>((theme) => {
  return {
    container: {
      padding: theme.spacing(0, 4, 3, 4),
      backgroundColor: (props) => props.bgColor || theme.Colors.white,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
  };
});

const BoxComp = ({
  children,
  backgroundColor,
  height
}: {
  children?: JSX.Element | any;
  backgroundColor?: string;
  height?: string;
}) => {
  const classes = useStyles({ bgColor: backgroundColor, height });
  return <Box className={classes.container}>{children}</Box>;
};
export default BoxComp;
