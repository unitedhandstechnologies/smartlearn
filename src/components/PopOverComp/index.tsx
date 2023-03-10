import { Popover } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  popOverTitle?: string;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  renderContent: () => void;
};

const PopOver = (props: Props) => {
  const { popOverTitle, anchorEl, handleClose, renderContent } = props;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      elevation={1}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      PaperProps={{
        style: {
          marginTop: 35,
          width: '400px',
          borderRadius: 0
        }
      }}
    >
      <Grid alignItems={'center'} padding={2.2}>
        <Grid
          container
          justifyContent={'space-between'}
          padding={1}
          paddingBottom={2}
        >
          <Typography
            style={{
              fontFamily: 'IBM Plex Serif',
              fontSize: 32,
              fontWeight: 500,
              color: '#3C414B'
            }}
          >
            {popOverTitle}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        {renderContent()}
      </Grid>
    </Popover>
  );
};

export default PopOver;
