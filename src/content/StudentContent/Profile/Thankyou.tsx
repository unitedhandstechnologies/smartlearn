import { Divider, Grid, Typography } from '@mui/material';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PopOver from 'src/components/PopOverComp';
import TextField from '@mui/material/TextField';
import { ButtonComp } from 'src/components';
import Thanks from '../../../Assets/Images/Thanks.svg';

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
        <Grid container justifyContent="center" paddingTop={3}>
          <img src={Thanks} />
        </Grid>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            fontFamily: 'Switzer',
            textAlign: 'center',
            color: '#3C414B',
            paddingTop: 5
          }}
        >
          Thank you for your reviews.
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            fontFamily: 'Switzer',
            textAlign: 'center',
            color: '#3C414B',
            paddingBottom: 5
          }}
        >
          You just contributed in improving our experience.
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
        width={500}
        isDivider={true}
      />
    </>
  );
};

export default Thankyou;
