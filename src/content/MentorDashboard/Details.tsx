import { Box, makeStyles, Typography, useTheme, Tab } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid, IconButton } from '@mui/material';
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
  details?: any;
  reports?: any;
  handleClickIcon?: (val?: any) => void;
};

const Details = ({ heading, icon, count, reports, handleClickIcon }: Props) => {
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
        <Grid item xs={12} display='flex' justifyContent={'space-between'}>
          <img src={icon} alt="" />
          <IconButton
            sx={{
              color: '#3C78F0',
              fontSize: 16,
              fontWeight:700,
              marginBottom: 5,
              padding: '12px 0px 0px 0px',
              ':hover': {
                background: 'transparent',
              }
            }}
            onClick={handleClickIcon}
          >
           Details <ArrowForwardIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
        <Typography
            style={{
              fontWeight: 400,
              fontSize: '16px',
              color: '#78828C',
              padding: '5px 5px 0px 0px'
            }}
          >
            {heading}
          </Typography>
          <Typography
            style={{
              [theme.breakpoints.down('xs')]: { fontSize: '12px' },
              color: '#3C414B',
              fontWeight: 700,
              fontSize: '18px',
              paddingBottom: '5px'
            }}
          >
          {/* <img src={icon} alt="" /> */}
            {count}
          </Typography>
        </Grid>
        <Grid>
              <ContentDisplayTiles
               displayContent={reports}
               isTileTypeOrders={true}
              />
            </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
