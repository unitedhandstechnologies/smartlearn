import React, { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  makeStyles,
  Divider,
  Theme,
  Grid,
  useTheme,
  TabsProps,
  Typography
} from '@material-ui/core';

export const ORIENTATION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};
type StyleProps = {
  orientation?: any;
  tabIndicatorColor?: string;
  fontSize?: number;
};
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => {
  return {
    tabContainer: {
      backgroundColor: 'transparent'
    },
    wrapper: {
      height: '100%',
      display: 'flex',
      width: '100%',
      flexDirection: (props) =>
        props.orientation === ORIENTATION.VERTICAL ? 'row' : 'column'
    },
    indicator: {
      width: 5,
      backgroundColor: (props) =>
        props.tabIndicatorColor || theme.Colors.secondary,
      left: '0px'
    },
    tabContent: {
      fontSize: theme.MetricsSizes.small_xxx,
      color: theme.Colors.mediumBlack,
      fontWeight: theme.fontWeight.regular,
      minWidth: 150,
      minHeight: 55,
      textTransform: 'none',
      '&.MuiTab-root':{
        maxWidth: '100%'
      },
      opacity: 1,
      '& > span > div': {
        '& > svg , path': {
          fill: theme.Colors.secondary,
        //  background: theme.Colors.whiteLightGrey,
        },
        color: theme.Colors.secondary,
      //  background: theme.Colors.whiteLightGrey,
      },
      '&.Mui-selected': {
        '& > span > div': {
          '& > svg , path': {
            fill: theme.Colors.white,
          },
          color: theme.Colors.white,
        }
      },
    },
    textStyle: {
      marginLeft: theme.spacing(2),
      fontSize: (props) => props.fontSize || theme.MetricsSizes.small_xxx
    },
    ContainerStyle: {
      marginLeft: theme.MetricsSizes.tiny
    }
  };
});

interface Props extends TabsProps {
  tabContent: any[];
  onTabChange?: (val: any) => void;
  currentTabVal: any;
  renderTabContent?: (currentTabVal: number | string) => React.ReactNode;
  orientation?: any;
  tabIndicatorColor?: string;
  tabClasses?: any;
  isDivider?: boolean;
  tabContainerClassName?: any;
  tabContentClassName?: any;
  fontSize?: number;
  renderHeader?: () => void;
}

const MuiTabComponent = (props: Props) => {
  const {
    tabContent = [],
    onTabChange,
    currentTabVal,
    renderTabContent,
    tabIndicatorColor,
    orientation = ORIENTATION.HORIZONTAL,
    tabClasses,
    isDivider = true,
    tabContainerClassName,
    tabContentClassName,
    fontSize,
    renderHeader,
    ...rest
  } = props;
  const classes = useStyles({
    orientation,
    tabIndicatorColor,
    fontSize
  });
  const theme = useTheme();
  const [currentTabValue, setCurrentTabValue] = useState<number | string>(
    tabContent[0]?.value || 0
  );

  const handleChange = (_: any, val: any) => {
    if (onTabChange) {
      onTabChange(val);
      return;
    }
    setCurrentTabValue(val);
  };

  useEffect(() => {
    setCurrentTabValue(currentTabVal);
  }, [currentTabVal]);

  return (
    <Grid container className={classes.wrapper}>
      <Grid item className={`${classes.tabContainer} ${tabContainerClassName}`}>
        {renderHeader ? renderHeader() : null}

        <Tabs
          onChange={handleChange}
          value={currentTabValue}
          orientation={orientation}
          classes={{
            indicator: classes.indicator
          }}
          {...rest}
        >
          {tabContent.length &&
            tabContent.map((item, index) => {
              return (
                <Tab
                  label={
                    orientation === ORIENTATION.VERTICAL ? (
                      <Grid container className={classes.ContainerStyle}>
                        {item?.tabIcon ? item.tabIcon() : null}
                        <Typography className={classes.textStyle}>
                          {item?.label}
                        </Typography>
                      </Grid>
                    ) : (
                      item.label
                    )
                  }
                  key={index}
                  value={item?.value || item?.id || index}
                  //  icon={ renderIcon(item.tabIcon)}
                  disabled={!!item?.disabled}
                  className={classes.tabContent}
                  classes={{
                    ...tabClasses
                  }}
                />
              );
            })}
        </Tabs>
        {isDivider && <Divider />}
      </Grid>
      <Grid item xs className={tabContentClassName}>
        {renderTabContent && renderTabContent(currentTabValue)}
      </Grid>
    </Grid>
  );
};

export default MuiTabComponent;
