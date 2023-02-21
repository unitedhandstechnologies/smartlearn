import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationConfiguration from './ApplicationConfiguration';
import Smtp from './Smtp';
import Notification from './Notification';
import { InstructorSettings } from 'src/Assets';
import Sms from './Sms';
import Banner from './Banner';

const Settings = () => {
  const [tabToDisplay, setTabToDisplay] = useState(0);
  const { t, i18n } = useTranslation();

  const handleSetSelectedTab = (value) => {
    setTabToDisplay(value);
  };

  function TabPanel(props) {
    const { children, value, index } = props;

    return value === index && <>{children}</>;
  }

  const detailsToDisplay = [
    {
      id: 0,
      heading: t('setting.applicationConfiguration'),
      subText: '',
      iconImage: InstructorSettings
    },
    {
      id: 1,
      heading: t('setting.sms'),
      subText: '',
      iconImage: InstructorSettings
    },
    {
      id: 2,
      heading: t('setting.smtp'),
      subText: '',
      iconImage: InstructorSettings
    },
    {
      id: 3,
      heading: t('setting.notification'),
      subText: '',
      iconImage: InstructorSettings
    },
    {
      id: 4,
      heading: t('setting.bannerManagement'),
      subText: '',
      iconImage: InstructorSettings
    }
  ];
  return (
    <>
      <ContentDisplayTiles
        displayContent={detailsToDisplay}
        isTileTypeOrders={false}
        onTabChange={handleSetSelectedTab}
      />
      <TabPanel value={tabToDisplay} index={0}>
        <ApplicationConfiguration />
      </TabPanel>
      <TabPanel value={tabToDisplay} index={1}>
        <Sms />
      </TabPanel>
      <TabPanel value={tabToDisplay} index={2}>
        <Smtp />
      </TabPanel>
      <TabPanel value={tabToDisplay} index={3}>
        <Notification />
      </TabPanel>
      <TabPanel value={tabToDisplay} index={4}>
        <Banner />
      </TabPanel>
    </>
  );
};

export default Settings;
