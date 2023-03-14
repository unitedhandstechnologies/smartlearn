import React from 'react';
import {
  makeStyles,
  Theme,
  Grid,
  Typography,
  GridProps,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  return {
    blurText: {
      filter: 'blur(5px)',
      paddingTop: theme.MetricsSizes.small_xx
    },
    clearText: {
      color: theme.Colors.blackBerry,
      fontSize: theme.MetricsSizes.small_xxx,
      fontWeight: theme.fontWeight.regular
    },
    imageAlign: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: '4px'
    }
  };
});

export type UHIconTextProps = GridProps & {
  icon?: any;
  isBlur?: boolean;
  value?: string;
  valueColor?: string;
  renderComponent?: () => JSX.Element;
  textContentStyle?: React.CSSProperties;
  isCrown?: boolean;
  nextvalue?: string;
};

const IconTextComp = (props: UHIconTextProps) => {
  const {
    icon,
    value,
    valueColor,
    renderComponent,
    textContentStyle,
    isBlur = false,
    isCrown = false,
    nextvalue,
    ...rest
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container {...rest}>
      {icon ? (
        <Grid item className={classes.imageAlign}>
          <img src={icon} />
        </Grid>
      ) : null}
      <Grid
        item
        xs
        style={{ marginLeft: theme.spacing(1.2), ...textContentStyle }}
      >
        {renderComponent && renderComponent()}
        {value ? (
          <Typography
            variant={isBlur ? 'subtitle2' : 'h5'}
            className={isBlur ? classes.blurText : classes.clearText}
            style={{
              color: valueColor || '#3C414B'
            }}
          >
            {value}
          </Typography>
        ) : null}
        {nextvalue ? (
          <Typography
            variant={isBlur ? 'subtitle2' : 'h5'}
            className={isBlur ? classes.blurText : classes.clearText}
            style={{
              color: valueColor || 'primary'
            }}
          >
            Next class: {nextvalue}
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default IconTextComp;
