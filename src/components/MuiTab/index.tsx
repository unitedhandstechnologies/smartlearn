import React, { useState, useEffect } from 'react';
import { Tabs, Tab, makeStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    tabContainer: {
      backgroundColor: 'white'
    },
    wrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column'
    },
    indicator: {
      height: 3
    },
    root: {
      fontSize: 16,
      textTransform: 'none'
    }
  };
});
type Props = {
  tabs: any;
  onTabChange: any;
  currenttab: any;
  renderTabContent: any;
  tabIndicatorColor?: any;
  orientation: any;
  contentFullWidth: any;
};
const MuiTab = (props: Props) => {
  const {
    tabs = [],
    onTabChange,
    currenttab,
    renderTabContent,
    tabIndicatorColor,
    orientation = 'horizontal',
    contentFullWidth
  } = props;

  const [value, setValue] = useState(tabs[0]?.value || 0);
  const classes = useStyles({
    orientation: orientation,
    indicatorcolor: tabIndicatorColor
  });

  useEffect(() => {
    setValue(currenttab);
  }, [currenttab]);

  const handleChange: any = (e, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  const renderIcon = (tab) => {
    if (!tab.renderIcon) {
      return null;
    }
    return tab.renderIcon();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.tabContainer} data-testid="MuiTabs">
        <Tabs onChange={handleChange} value={value} orientation={orientation}>
          {tabs.map((tab, index) => {
            return (
              <Tab
                label={tab.label}
                key={index}
                value={tab.value || index}
                icon={renderIcon(tab)}
                disabled={tab.disabled}
                classes={{ root: classes.root }}
              />
            );
          })}
        </Tabs>
        <Divider />
      </div>
      <div style={{ flex: contentFullWidth ? 1 : '' }}>
        {renderTabContent && renderTabContent(value)}
      </div>
    </div>
  );
};
export default React.memo(MuiTab);
