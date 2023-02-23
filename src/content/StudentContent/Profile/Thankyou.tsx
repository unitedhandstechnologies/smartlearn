import { Divider, Grid, Typography } from '@mui/material';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PopOver from 'src/components/PopOverComp';
import TextField from '@mui/material/TextField';
import { ButtonComp } from 'src/components';

type notiPrpos = {
  title: string;
  content: string;
};

type Props = {
  anchorEl?: null | HTMLElement;
  notifications?: notiPrpos[];
  handleClose?: () => void;
};

const Thankyou = (props: Props) => {
  const { notifications, anchorEl, handleClose } = props;

  const renderComponenet = () => {
    return (
      <>
        <Grid width={'50%'}>
          <Grid
            container
            sx={{
              background: '#002350',
              transform: 'skewX(-40deg)',
              width: '380px'
            }}
          />
        </Grid>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            fontFamily: 'Switzer',
            textAlign: 'center',
            color: '#3C414B'
          }}
        >
          Thank you for your reviews. You just contributed in improving our
          experience.
        </Typography>
      </>
    );
  };

  return (
    <>
      <PopOver
        anchorEl={anchorEl}
        handleClose={handleClose}
        popOverTitle={'Thank you'}
        renderContent={renderComponenet}
      />
    </>
  );
};

export default Thankyou;
