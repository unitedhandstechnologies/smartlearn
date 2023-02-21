import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Theme,
  Typography,
  createStyles,
  Divider
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

type Props = {
  bgColor: string;
  height: string;
  isTileTypeOrders: boolean;
  NumOfTiles: number;
  dividerBgColor?: string;
};

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    outerContainer: {
      borderRadius: theme.spacing(1),
      border: '1px solid',
      borderColor: theme.Colors.lightBlue,
      background: theme.Colors.white,
      margin: theme.spacing(2, 0, 4.3, 0),
      justifyContent: 'space-between',
      width: (props) =>
        props.NumOfTiles > 3 ? '100%' : `${props.NumOfTiles * 25}%`,
      '& .MuiTabs-flexContainer': {}
    },
    tabItemContainer: {
      borderRight: '1px solid',
      borderRightColor: theme.Colors.lightBlue,
      margin: theme.spacing(1, 0, 1, 1.25),
      paddingTop: (props) =>
        props.isTileTypeOrders ? theme.spacing(1) : theme.spacing(2.75),
      paddingBottom: (props) =>
        props.isTileTypeOrders ? theme.spacing(1) : theme.spacing(2.75),
      borderTopLeftRadius: theme.spacing(1),
      borderBottomLeftRadius: theme.spacing(1)
    },
    contentContainer: {
      borderRadius: theme.spacing(1),
      textTransform: 'capitalize',
      padding: theme.spacing(0.5, 0.25, 0.5, 0.25),
      margin: theme.spacing(0.25),
      width: '100%'
    },
    title: {
      fontSize: theme.MetricsSizes.regular_x,
      fontWeight: theme.fontWeight.bold,
      textAlign: 'left',
      color: theme.Colors.black
    },
    textStyle: {
      fontSize: theme.MetricsSizes.small_xxx,
      fontWeight: theme.fontWeight.regular,
      textAlign: 'left',
      color: theme.Colors.black,
      paddingBottom: (props) =>
        props.isTileTypeOrders ? theme.spacing(0) : theme.spacing(0.25)
    },
    numberStyle: {
      fontSize: (props) =>
        props.isTileTypeOrders
          ? theme.MetricsSizes.medium_x
          : theme.MetricsSizes.small_xxx,
      fontWeight: (props) =>
        props.isTileTypeOrders
          ? theme.fontWeight.mediumBold
          : theme.fontWeight.regular,
      textAlign: 'left',
      color: theme.Colors.black,
      paddingTop: (props) =>
        props.isTileTypeOrders ? theme.spacing(0) : theme.spacing(0.25)
    },
    iconStyle: {
      background: theme.Colors.white,
      boxShadow: '0px 2px 10px rgba(124, 141, 181, 0.12)',
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(1.9),
      marginRight: theme.spacing(3.25)
    },
    root: {
      width: '100%'
    },
    labelContainer: {
      width: 'auto',
      padding: 0
    },
    iconWrapper: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-evenly'
    },
    tabDivider: {
      height: theme.spacing(13),
      alignSelf: 'center'
    },
    selectedTab: {
      background:
        'linear-gradient(115.76deg, #3e4959 -80.62%, rgba(242, 242, 242, 0) 30.55%)'
    },
    tabIndicator: {
      display: 'none'
    },
    dividerStyle: {
      background: (props) => props.dividerBgColor || theme.Colors.lightBlue
    }
  })
);

type TabValues = {
  heading: string;
  subText: number | string;
  iconImage: any;
  value?: string | number;
};

export const ContentDisplayTiles = React.memo(
  ({
    backgroundColor,
    height,
    displayContent,
    isTileTypeOrders,
    onTabChange,
    withBottomLine,
    tabValue,
    dividerBgColor
  }: {
    children?: JSX.Element | any;
    backgroundColor?: string;
    height?: string;
    displayContent?: TabValues[];
    isTileTypeOrders?: boolean;
    onTabChange?: (val: number | string) => void;
    withBottomLine?: boolean;
    tabValue?: string | number;
    dividerBgColor?: string;
  }) => {
    const classes = useStyles({
      bgColor: backgroundColor,
      height,
      isTileTypeOrders,
      NumOfTiles: displayContent.length,
      dividerBgColor: dividerBgColor
    });
    const [tabToDisplay, setTabToDisplay] = useState<number | string>(
      tabValue || 0
    );
    const totalTiles = displayContent.length;

    const handleTabChange = (event, value: number | string) => {
      setTabToDisplay(value);
      if (onTabChange) onTabChange(value);
    };

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Tabs
            value={tabToDisplay}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            className={classes.outerContainer}
            classes={{
              indicator: classes.tabIndicator
            }}
          >
            {displayContent.map((item, index) => {
              return (
                <Tab
                  key={index}
                  value={item.value || index}
                  icon={
                    <img
                      src={item.iconImage}
                      alt="image"
                      className={classes.iconStyle}
                    />
                  }
                  label={
                    <div className={classes.contentContainer}>
                      <Typography className={classes.textStyle}>
                        {item.heading}
                      </Typography>
                      <Typography className={classes.numberStyle}>
                        {`${item.subText}`}
                      </Typography>
                    </div>
                  }
                  className={classes.tabItemContainer}
                  classes={{
                    wrapper: classes.iconWrapper,
                    selected: classes.selectedTab
                  }}
                />
              );
            })}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {withBottomLine && (
            <Divider classes={{ root: classes.dividerStyle }} />
          )}
        </Grid>
      </Grid>
    );
  }
);
