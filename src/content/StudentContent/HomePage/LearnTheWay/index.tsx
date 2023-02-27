import { Box, makeStyles, Typography, useTheme } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid, IconButton } from '@mui/material';
import { ArrowNext } from 'src/Assets';
import { ButtonComp } from 'src/components';

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    '&:hover': {
      background: 'transparent'
    }
  },
  button: {
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  }
}));
type Props = {
  heading?: string;
  icon?: any;
  subText?: string;
  handleClickIcon?: (val?: any) => void;
};

const LearnWayBox = ({ heading, icon, subText, handleClickIcon }: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box
      sx={{
        padding: '25px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 24px rgba(0, 35, 80, 0.1)'
      }}
    >
      <Grid container spacing={3} direction={'row'}>
        <Grid item>
          <img src={icon} alt="" />
        </Grid>
        <Grid item xs>
          <Typography
            style={{
              [theme.breakpoints.down('xs')]: { fontSize: '12px' },
              color: '#3C414B',
              fontWeight: 700,
              fontSize: '20px',
              paddingBottom: '5px'
            }}
          >
            {heading}
          </Typography>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: '18px',
              color: '#78828C',
              padding: '5px 5px 0px 0px'
            }}
          >
            {subText}
          </Typography>
          <IconButton
            sx={{
              color: '#3C78F0',
              padding: '12px 0px 0px 0px',
              ':hover': {
                background: 'transparent'
              }
            }}
            onClick={handleClickIcon}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearnWayBox;
