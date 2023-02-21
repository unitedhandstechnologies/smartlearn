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
      alignItems: 'center'
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
    ...rest
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container {...rest}>
      {icon ? (
        <Grid item xs={1} className={classes.imageAlign}>
          <img src={icon} />
        </Grid>
      ) : null}
      <Grid
        item
        xs
        style={{ marginLeft: theme.spacing(2.4), ...textContentStyle }}
      >
        {renderComponent && renderComponent()}
        {value ? (
          <Typography
            variant={isBlur ? 'subtitle2' : 'h5'}
            className={isBlur ? classes.blurText : classes.clearText}
            style={{
              color: valueColor || "primary"
            }}
          >
            {value}
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default IconTextComp;
