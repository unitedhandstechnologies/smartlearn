import { FC, ReactNode } from 'react';
import { Box, Grid, Typography, useTheme } from '@material-ui/core';
import ButtonComp from '../ButtonComp';
import { useNavigate } from 'react-router';

interface Status404Props {
  children?: ReactNode;
}

const Status404: FC<Status404Props> = () => {
  const navigateTo = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Typography
          variant="h2"
          style={{ fontWeight: 700, marginBottom: theme.spacing(2) }}
        >
          PAGE NOT FOUND!
        </Typography>
        <ButtonComp
          buttonText="Back to Home"
          onClickButton={() => navigateTo('')}
          btnWidth={200}
          color="primary"
        />
      </Grid>
    </Box>
  );
};

export default Status404;
