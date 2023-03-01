import { Divider, Rating } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PopOver from 'src/components/PopOverComp';
import TextField from '@mui/material/TextField';
import { ButtonComp } from 'src/components';

type notiPrpos = {
  title: string;
  content: string;
};

type Props = {
  anchorEl: null | HTMLElement;
  notifications: notiPrpos[];
  handleClose: () => void;
  onClick?: () => void;
};

const Rateyourcourse = (props: Props) => {
  const { notifications, anchorEl, handleClose, onClick } = props;

  const renderComponenet = () => {
    return (
      <>
        {notifications.map((notification, index) => {
          return (
            <Grid container key={index} gap={1} padding={1}>
              <Grid item paddingTop={0.4}>
                {/* <FiberManualRecordIcon
                  fontSize="small"
                  style={{ color: `${index === 0 ? '#3C78F0' : '#B4BEC8'}` }}
                /> */}
              </Grid>

              <Grid item xs>
                <Typography
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#3C414B'
                  }}
                >
                  {notification.title}
                </Typography>
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#78828C',
                    paddingTop: 7
                  }}
                >
                  {notification.content}
                  <Rating sx={{ color: '#3C78F0' }} size="large" />
                  <Divider light={true} style={{ paddingTop: 25 }} />
                </Typography>
              </Grid>
            </Grid>
          );
        })}
        <TextField
          placeholder="Type in here your experience"
          multiline
          fullWidth
        />
        <Grid paddingTop={5}>
          <ButtonComp
            buttonText="Submit review"
            onClick={onClick}
            backgroundColor="#3C78F0"
            buttonTextColor={'white'}
            buttonFontSize={16}
            buttonFontWeight={400}
            btnWidth={'fit-content'}
            height="40px"
            buttonFontFamily="Switzer"
          />
        </Grid>
      </>
    );
  };

  return (
    <PopOver
      anchorEl={anchorEl}
      handleClose={handleClose}
      popOverTitle={'Rate your course'}
      renderContent={renderComponenet}
    />
  );
};

export default Rateyourcourse;
