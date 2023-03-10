import { Divider } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PopOver from 'src/components/PopOverComp';

type notiPrpos = {
  title: string;
  content: string;
};

type Props = {
  anchorEl: null | HTMLElement;
  notifications: notiPrpos[];
  handleClose: () => void;
};

const NotificationPopover = (props: Props) => {
  const { notifications, anchorEl, handleClose } = props;

  const renderComponenet = () => {
    return (
      <>
        {notifications.map((notification, index) => {
          return (
            <Grid container key={index} gap={1} padding={1}>
              <Grid item paddingTop={0.4}>
                <FiberManualRecordIcon
                  fontSize="small"
                  style={{ color: `${index === 0 ? '#3C78F0' : '#B4BEC8'}` }}
                />
              </Grid>
              <Grid item xs>
                <Typography
                  style={{
                    fontFamily: 'Switzer Variable',
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#3C414B'
                  }}
                >
                  {notification.title}
                </Typography>
                <Typography
                  style={{
                    fontFamily: 'Switzer Variable',
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#78828C',
                    paddingTop: 7
                  }}
                >
                  {notification.content}
                  <Divider light={true} style={{ paddingTop: 25 }} />
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  return (
    <PopOver
      anchorEl={anchorEl}
      handleClose={handleClose}
      popOverTitle={'Notifications'}
      renderContent={renderComponenet}
    />
  );
};

export default NotificationPopover;
