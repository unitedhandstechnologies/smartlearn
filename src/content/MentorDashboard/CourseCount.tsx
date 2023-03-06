import { Box, makeStyles, useTheme, Tab } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';

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
  count?: string;

  handleClickIcon?: () => void;
};

const CourseCount = ({ icon, heading, count, handleClickIcon }: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box
      sx={{
        padding: '25px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: 230,
        boxShadow: '0px 4px 24px rgba(0, 35, 80, 0.1)'
      }}
    >
      <Grid container direction={'row'}>
        <Grid item xs={12} display="flex" justifyContent={'space-between'}>
          <img src={icon} alt="" />
        </Grid>
        <Grid item xs>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              color: '#78828C',
              paddingTop: 3
            }}
          >
            {heading}
          </Typography>
          <Typography
            sx={{
              color: '#3C414B',
              fontWeight: 700,
              fontSize: '32px',
              fontFamily: 'Switzer'
            }}
          >
            {' '}
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseCount;
